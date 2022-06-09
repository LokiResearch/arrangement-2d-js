// Author: Axel Antoine
// mail: ax.antoine@gmail.com
// website: https://axantoine.com
// 02/02/2021

// Loki, Inria project-team with Université de Lille
// within the Joint Research Unit UMR 9189 CNRS-Centrale
// Lille-Université de Lille, CRIStAL.
// https://loki.lille.inria.fr

// LICENCE: Licence.md

#ifndef _POLYGON_H
#define _POLYGON_H

#include <vector>
#include "Point.h"

extern "C" {
    #include "gpc.h"
}

typedef std::vector<Point> Contour;
typedef std::vector<Contour> ContourList;

class Polygon
{
public:
    Contour contour;
    ContourList holes;

	Polygon(const Contour &contour, const ContourList &holes);
	~Polygon();
    bool getInsidePoint(Point &point);
    double getPolyTristripArea();

private:
    gpc_polygon* poly;
    gpc_tristrip* tristrip;

    void buildGPCPolygon();
    void fillGPCVertexListFromContour(
        gpc_vertex_list &vertex_list,
        const Contour &contour);
};

#endif // _POLYGON_H

