// Author: Axel Antoine
// mail: ax.antoine@gmail.com
// website: https://axantoine.com
// 02/02/2021

// Loki, Inria project-team with Université de Lille
// within the Joint Research Unit UMR 9189 CNRS-Centrale
// Lille-Université de Lille, CRIStAL.
// https://loki.lille.inria.fr

// LICENCE: Licence.md

#include "ArrangementBuilder.h"
#include <iostream>
#include <math.h>

#define EPSILON 1E-10

const PolygonList* ArrangementBuilder::getPolygons(const PointList& points) {

    Arrangement_2 arr;
    FaceIndexMap faceMap(arr);

    const size_t size = points.size();
    Segment_2 seg[size/2];

    double distance;
    // Insert all segments in the arrangement
    int segcount=0;
    for (int i=0; i+1<size; i+=2) {
        const Point &a = points[i];
        const Point &b = points[i+1];

        // Avoid inserting segments where the points are too close as the
        // algorithm seems to be sensible with that
        // distance = distanceBetween(a, b);
        distance = sqrt(pow(a.x-b.x,2)+pow(a.y-b.y,2));
        if(distance > EPSILON) {
            seg[segcount] = Segment_2(
                Point_2(a.x, a.y),
                Point_2(b.x, b.y));
            segcount++;
        }
    }

    CGAL::insert(arr, &seg[0], &seg[segcount]);

    // Remove the isolated vertices located in the unbounded face.
    Arrangement_2::Vertex_iterator v_curr, v_next = arr.vertices_begin();
    for (v_curr = v_next++; v_curr != arr.vertices_end(); v_curr = v_next++) {
        // Keep an iterator to the v_next vertex, as v_curr might be deleted.
        if (v_curr->is_isolated())
            arr.remove_isolated_vertex(v_curr);
    }

    // Remove isolated edges i.e. connected to the same face
    Arrangement_2::Edge_iterator e_curr, e_next = arr.edges_begin();
    for (e_curr = e_next++; e_curr != arr.edges_end(); e_curr = e_next++) {
        // Keep an iterator to the e_next edge, as e_curr might be deleted.
        if (e_curr->face() == e_curr->twin()->face()) {
            arr.remove_edge(e_curr);
        }
    }

    // Get all the polygons in the arrangement
    PolygonList* polygons = new PolygonList();
    for (Arrangement_2::Face_const_iterator fit = arr.faces_begin(); 
            fit != arr.faces_end(); ++fit) {
        if (!fit->is_unbounded()) {
            polygons->push_back(createPolygon(fit, faceMap));
        }
    }
    return polygons;
}

Polygon* ArrangementBuilder::createPolygon(
        const Arrangement_2::Face_const_handle& f, 
        const FaceIndexMap& map) {    
    Contour contour;
    fillContourFromHalfEdgeCirculator(contour, f->outer_ccb());
    // Get the potential holes
    ContourList holes;
    for (Arrangement_2::Hole_const_iterator hi = f->holes_begin(); 
            hi != f->holes_end(); ++hi) {
        Contour hole;
        fillContourFromHalfEdgeCirculator(hole, *hi);
        holes.push_back(hole);
    }
    return new Polygon(contour, holes);
}

void ArrangementBuilder::fillContourFromHalfEdgeCirculator(
        Contour& contour,
        const Arrangement_2::Ccb_halfedge_const_circulator &first) {
    
    Arrangement_2::Ccb_halfedge_const_circulator curr;
    Arrangement_2::Halfedge_const_handle he;

    contour.clear();

    curr = first;
    do {
        he = curr;
        contour.push_back(Point(
            CGAL::to_double(he->target()->point().x()),
            CGAL::to_double(he->target()->point().y())
        ));
    } while (++curr != first);

}

