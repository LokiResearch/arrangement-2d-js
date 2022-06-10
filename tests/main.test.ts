import Arrangement2D from "../build/Arrangement2D.umd.js";

const Arr2DPromise = Arrangement2D();
let Arr2D: Awaited<typeof Arr2DPromise>;

test("Test wasm can be loaded", async () => {
  await expect(Arr2DPromise).resolves.not.toThrow();
});

beforeAll(async () => Arr2D = await Arr2DPromise);

describe("Point class", () => {

  test("Create point", () => {
    const p = new Arr2D.Point(1.33, 2.99);
    expect(p.x).toBe(1.33);
    expect(p.y).toBe(2.99);
  });

  test("get/set x & y", () => {
    const p = new Arr2D.Point(1.33, 2.99);
    p.x = 2.44;
    p.y = 1.55;
    expect(p.x).toBe(2.44);
    expect(p.y).toBe(1.55);
  });


  test("Send Array of points", () => {

    const points = new Arr2D.PointList();

    const builder = new Arr2D.ArrangementBuilder();
    builder.getPolygons(points);

  });

});

describe("Test the arrangement", () => {

  test("Simple triangle", () => {

    /*
      F B
       \|
        |\
        | \
    C --+----- D
        |   \
        A    E
    */

    const points = new Arr2D.PointList();

    points.push_back(new Arr2D.Point(1, 0));
    points.push_back(new Arr2D.Point(1, 4));
    points.push_back(new Arr2D.Point(0, 1));
    points.push_back(new Arr2D.Point(4, 1));
    points.push_back(new Arr2D.Point(4, 0));
    points.push_back(new Arr2D.Point(0, 4));

    const builder = new Arr2D.ArrangementBuilder();
    const polygons = builder.getPolygons(points);

    expect(polygons.size()).toBe(1);

    const poly = polygons.at(0);

    expect(poly.contour.size()).toBe(3);

  });



})