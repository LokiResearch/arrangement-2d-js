// Author: Axel Antoine
// mail: ax.antoine@gmail.com
// website: https://axantoine.com
// 02/02/2021

// Loki, Inria project-team with Université de Lille
// within the Joint Research Unit UMR 9189 CNRS-Centrale
// Lille-Université de Lille, CRIStAL.
// https://loki.lille.inria.fr

// LICENCE: Licence.md

#ifndef _POINT_H 
#define _POINT_H 

class Point {

public:
	double x = 0;
    double y = 0;

    Point() {}
	Point(double x, double y): x(x), y(y) {}
	// Point(Point&& p): x(std::move(p.x)), y(std::move(p.y)) {}
};

#endif

