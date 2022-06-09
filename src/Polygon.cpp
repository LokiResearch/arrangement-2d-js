// Author: Axel Antoine
// mail: ax.antoine@gmail.com
// website: https://axantoine.com
// 02/02/2021

// Loki, Inria project-team with Université de Lille
// within the Joint Research Unit UMR 9189 CNRS-Centrale
// Lille-Université de Lille, CRIStAL.
// https://loki.lille.inria.fr

// LICENCE: Licence.md

#include "Polygon.h"
#include <cmath>
#include <iostream>

#define EPSILON 1E-10

void midFirstArray(int* array, int n) {
    // The goal here is to fill array such as mid indices are first in the array
    // such as:
    // [0, 1, 2, 3, 4] => [2, 3, 1, 4, 0]
    // [0, 1, 2, 3, 4, 5, 6, 7] => [3, 4, 2, 5, 1, 6, 0, 7]

    int mid = int(n/2);
    int idx=0;
    for(int j=mid; j<n; j++){
        array[idx] = j;
        idx+=2;
    }
    idx = 1;
    for(int j=mid-1;j>=0; j--){
        array[idx] = j;
        idx+=2;
    }
}

Polygon::Polygon(const Contour &contour, const ContourList &holes) {
  this->contour = contour;
  this->holes = holes;

  this->buildGPCPolygon();
}

Polygon::~Polygon() {
    if (this->poly) {
        gpc_free_tristrip(this->tristrip);
        gpc_free_polygon(this->poly);
    }
}

void Polygon::buildGPCPolygon() {
    this->poly = (gpc_polygon *) malloc(sizeof(gpc_polygon));
    this->poly->num_contours = 0;
    this->poly->hole = NULL;
    this->poly->contour = NULL;

    // Number of contours is external contour + number of holes
    int n_holes = this->holes.size();
    int n_contours = 1 + n_holes;
    int contour_idx;

    gpc_vertex_list *contour_array = 
        (gpc_vertex_list *) malloc(n_contours* sizeof(gpc_vertex_list));
    gpc_vertex_list *current_gpc_contour;

    // Fill the GPC polygon with the contour points
    contour_idx = 0;
    current_gpc_contour = contour_array + contour_idx;
    this->fillGPCVertexListFromContour(*current_gpc_contour, this->contour);
    gpc_add_contour(this->poly, current_gpc_contour, 0); // 0 = external contour

    // Fill the GPC polygon with the hole points
    for (int i=0; i<n_holes; i++) {
        contour_idx += 1;
        current_gpc_contour = contour_array + contour_idx;
        this->fillGPCVertexListFromContour(*current_gpc_contour, this->holes[i]);
        gpc_add_contour(this->poly, current_gpc_contour, 1); // 1 = hole
    }

    this->tristrip = (gpc_tristrip *) malloc(sizeof(gpc_tristrip));
    gpc_polygon_to_tristrip(this->poly, this->tristrip);

}

void Polygon::fillGPCVertexListFromContour(
        gpc_vertex_list &vertex_list,
        const Contour &contour) {
    int n_vertices = contour.size();
    gpc_vertex *vertex_array = 
        (gpc_vertex *) malloc(n_vertices * sizeof(gpc_vertex));
    for (int i=0; i < n_vertices; i++) {
        (*(vertex_array+i)).x = contour[i].x;
        (*(vertex_array+i)).y = contour[i].y;
    }
    vertex_list.num_vertices = n_vertices;
    vertex_list.vertex = vertex_array;
}

double Polygon::getPolyTristripArea() {

    gpc_vertex_list * vertex_list;
    gpc_vertex * vertex;

    double area = 0;
    int nbTri;

    for (int i=0; i< this->tristrip->num_strips; i++) {
        vertex_list = this->tristrip->strip + i;
        nbTri = vertex_list->num_vertices - 2;

        for (int j=0; j < nbTri; j++) {
            vertex = vertex_list->vertex + j;
            area += abs(0.5 * (
                vertex[0].x * (vertex[1].y - vertex[2].y) +
                vertex[1].x * (vertex[2].y - vertex[0].y) +
                vertex[2].x * (vertex[0].y - vertex[1].y)));
        }
    }

    return area;
}


bool Polygon::getInsidePoint(Point &point) {

    // See if we can compute the polygone triangle strip. If so, get the first
    // triangle with an area > 0 and set the provided point as the triangle
    // centroid coordinates and return true, otherwise return false

    gpc_vertex_list* vertex_list;
    double area;
    int nbTri;

    gpc_vertex * vertex;
    for (int i=0; i<this->tristrip->num_strips; i++) {
        vertex_list = this->tristrip->strip + i;
        nbTri = vertex_list->num_vertices-2;

        int indices[nbTri];
        midFirstArray(indices, nbTri);

        for (int j=0; j < nbTri; j++) {
            vertex = vertex_list->vertex+indices[j];
            area = abs(0.5 * (
                vertex[0].x * (vertex[1].y - vertex[2].y) +
                vertex[1].x * (vertex[2].y - vertex[0].y) +
                vertex[2].x * (vertex[0].y - vertex[1].y)));

            if (area > EPSILON) {
                point.x = 0;
                point.y = 0;
                for (int k=0; k < 3; k++) {
                    point.x += vertex[k].x;
                    point.y += vertex[k].y;
                }
                point.x /= 3;
                point.y /= 3;

                return true;
            }
        }
    }

    return false;
}

