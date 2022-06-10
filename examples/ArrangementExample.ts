import Arrangement2D from '../build/Arrangement2D.esm';

const eps = 1e-8;

const A  = {name: "A", x: 1, y: 3};
const B  = {name: "B", x: 6, y: 11};
const C  = {name: "C", x: 1, y: 5};
const D  = {name: "D", x: 7, y: 0};
const E  = {name: "E", x: 5, y: 1};
const F  = {name: "F", x: 13, y: 3};
const G  = {name: "G", x: 12, y: 2};
const H  = {name: "H", x: 14, y: 10};
const K  = {name: "K", x: 4, y: 10};
const L  = {name: "L", x: 15, y: 9};
const M  = {name: "M", x: 7, y: 8};
const N  = {name: "N", x: 4, y: 4};
const O  = {name: "O", x: 4, y: 5};
const P  = {name: "P", x: 7, y: 2};
const Q  = {name: "Q", x: 6, y: 8};
const R  = {name: "R", x: 11, y: 5};
const S  = {name: "S", x: 6, y: 2};
const T  = {name: "T", x: 11, y: 4};
const U  = {name: "U", x: 9, y: 7};
const V  = {name: "V", x: 10, y: 3};
const W  = {name: "W", x: 6, y: 5};
const Z  = {name: "Z", x: 7, y: 4};
const C1 = {name: "C1", x: 8, y: 5};
const I  = {name: "I", x: 5, y: 7};
const J  = {name: "J", x: 4, y: 6};
const F1 = {name: "F1", x: 10, y: 9};
const G1 = {name: "G1", x: 11, y: 9};
const H1 = {name: "H1", x: 12, y: 8};
const I1 = {name: "I1", x: 12, y: 5};
const J1 = {name: "J1", x: 14, y: 6};
const K1 = {name: "K1", x: 11, y: 6};
const L1 = {name: "L1", x: 10, y: 7};
const M1 = {name: "M1", x: 5.3010752688,  y: 9.8817204301};
const N1 = {name: "N1", x: 13.7777777779,  y: 9.1111111111};
const O1 = {name: "O1", x: 13, y: 6};
const P1 = {name: "P1", x: 12.2,  y: 2.8};
const Q1 = {name: "Q1", x: 9.8636363636,  y: 3.5454545455};
const R1 = {name: "R1", x: 9.2352941176,  y: 6.0588235294};
const S1 = {name: "S1", x: 7, y: 6};
const T1 = {name: "T1", x: 4.4285714286,  y: 4.5714285714};
const U1 = {name: "U1", x: 6.6896551724,  y: 7.5862068966};
const V1 = {name: "V1", x: 6.7142857143,  y: 2.2857142857};
const W1 = {name: "W1", x: 5.6153846154,  y: 1.1538461538};
const Z1 = {name: "Z1", x: 1.8219178082,  y: 4.3150684932};
const A2 = {name: "A2", x: 12,  y: 6};

const points = [
  A ,B ,C ,D ,E ,F ,G ,H ,K ,L ,M ,N ,O ,P ,Q ,R ,
  S ,T ,U ,V ,W ,Z ,S1,C1,S1,I ,J ,F1,G1,H1,I1,J1,
  K1,L1,M1,N1,O1,P1,Q1,R1,S1,T1,U1,V1,W1,Z1,A2
];

// Strokes to put in the arrangement: pairs of points
const strokes = [
  A,B,
  C,D,
  E,F,
  G,H,
  K,L,
  M,N,
  O,P,
  Q,R,
  S,T,
  U,V,
  W,Z,
  W,S1,
  C1,Z,
  Z,S1,
  S1,C1,
  I,J,
  F1,G1,
  G1,H1,
  H1,I1,
  J1,K1,
  K1,L1,
  L1,F1,
];

// Ugly, but works for the demo :)
function pointName(x: number, y: number) {

  for (const point of points) {
    if (Math.abs(point.x - x) < eps && Math.abs(point.y - y) < eps) {
      return point.name
    }
  }

  return "??";
}


Arrangement2D().then((Arr2D) => {

  // Fill the PointList
  const points = new Arr2D.PointList();
  for (const point of strokes) {
    points.push_back(new Arr2D.Point(point.x, point.y));
  }

  // Get the polygons
  const builder = new Arr2D.ArrangementBuilder();
  const polygonList = builder.getPolygons(points);


  // Traverse the arrangement and print the result
  let result_str = "";
  for (let i=0; i<polygonList.size(); i++) {

    const poly = polygonList.at(i);

    let poly_str = `Polygon ${i+1}:`;

    // Get the contour points
    poly_str += "\n\t Contour: ";
    for (let j=0; j<poly.contour.size(); j++) {
      const p = poly.contour.at(j);
      poly_str += pointName(p.x, p.y)+ " ";
    }

    // Get the holes points
    for (let j=0; j<poly.holes.size(); j++) {
      const hole = poly.holes.at(j);
      poly_str += `\n\t Hole ${j+1}: `;
      for (let k=0; k<hole.size(); k++) {
        const p = hole.at(k);
        poly_str += pointName(p.x, p.y) + " ";
      }
    }

    console.log(poly_str);
    result_str += poly_str + '\n\n';
  }

  // Print the result in the html doc
  const el = document.getElementById("results");
  if (el) {
    el.innerText = result_str;
  }

  // Clean up
  Arr2D.destroy(points);

  // destroy polygons (call destructor)
  for (let i=0; i<polygonList.size(); i++) {
    Arr2D.destroy(polygonList.at(i));
  }
  Arr2D.destroy(polygonList);
  Arr2D.destroy(builder);

});
