

#ifndef _LINE_H
#define _LINE_H

class Line {
    Point a;
    Point b;

    Point(point x, double y): x(x), y(y) {}
    // Point(Point&& p): x(std::move(p.x)), y(std::move(p.y)) {}
};

#endif
