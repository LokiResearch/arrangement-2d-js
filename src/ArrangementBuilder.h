// Author: Axel Antoine
// mail: ax.antoine@gmail.com
// website: https://axantoine.com
// 02/02/2021

// Loki, Inria project-team with Université de Lille
// within the Joint Research Unit UMR 9189 CNRS-Centrale
// Lille-Université de Lille, CRIStAL.
// https://loki.lille.inria.fr

// LICENCE: Licence.md

#ifndef _ARRANGEMENT_BUILDER_H
#define _ARRANGEMENT_BUILDER_H

#include <CGAL/Cartesian.h>
#include <CGAL/MP_Float.h>
#include <CGAL/Quotient.h>
#include <CGAL/Arr_segment_traits_2.h>
#include <CGAL/Arrangement_2.h>
#include <CGAL/Arr_face_index_map.h>

#include <vector>

#include "Polygon.h"

typedef std::vector<Polygon*> PolygonList;
typedef std::vector<Point> PointList;

typedef CGAL::Quotient<CGAL::MP_Float> Number_type;
typedef CGAL::Cartesian<Number_type> Kernel;
typedef CGAL::Arr_segment_traits_2<Kernel> Traits_2;
typedef Traits_2::Point_2 Point_2;
typedef Traits_2::X_monotone_curve_2 Segment_2;
typedef CGAL::Arrangement_2<Traits_2> Arrangement_2;
typedef CGAL::Arr_face_index_map<Arrangement_2> FaceIndexMap;

class ArrangementBuilder {

public:
    const PolygonList* getPolygons(const PointList& points);

private:
    Polygon* createPolygon(
        const Arrangement_2::Face_const_handle& f, 
        const FaceIndexMap& map);
    void fillContourFromHalfEdgeCirculator(
        Contour& contour,
        const Arrangement_2::Ccb_halfedge_const_circulator &first);
};

#endif //_ARRANGEMENT_BUILDER_H