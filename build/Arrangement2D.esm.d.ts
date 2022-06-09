export default Arrangement2D;
declare function Arrangement2D<T>(target?: T): Promise<T & typeof Arrangement2D>;
declare module Arrangement2D {
    function destroy(obj: any): void;
    function _malloc(size: number): number;
    function _free(ptr: number): void;
    const HEAP8: Int8Array;
    const HEAP16: Int16Array;
    const HEAP32: Int32Array;
    const HEAPU8: Uint8Array;
    const HEAPU16: Uint16Array;
    const HEAPU32: Uint32Array;
    const HEAPF32: Float32Array;
    const HEAPF64: Float64Array;
    class ArrangementBuilder {
        constructor();
        getPolygons(points: PointList): PolygonList;
    }
    class Point {
        constructor();
        constructor(x: number, y: number);
        get_x(): number;
        set_x(x: number): void;
        x: number;
        get_y(): number;
        set_y(y: number): void;
        y: number;
    }
    class Polygon {
        constructor(contour: Contour, holes: ContourList);
        getInsidePoint(point: Point): boolean;
        getPolyTristripArea(): number;
        get_contour(): Contour;
        set_contour(contour: Contour): void;
        contour: Contour;
        get_holes(): ContourList;
        set_holes(holes: ContourList): void;
        holes: ContourList;
    }
    class PointList {
        constructor();
        push_back(s: Point): void;
        size(): number;
        at(i: number): Point;
        clear(): void;
    }
    class PolygonList {
        constructor();
        push_back(s: Polygon): void;
        size(): number;
        at(i: number): Polygon;
        clear(): void;
    }
    class Contour {
        constructor();
        push_back(s: Point): void;
        size(): number;
        at(i: number): Point;
        clear(): void;
    }
    class ContourList {
        constructor();
        push_back(s: Contour): void;
        size(): number;
        at(i: number): Contour;
        clear(): void;
    }
}