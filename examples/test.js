import Arrangement2D from "./build/Arrangement2D.js";

const varToString = varObj => Object.keys(varObj)[0]
const EPSILON = 1E-9;

function htmlLog(s) {
    document.body.innerHTML += s + '<br>';
}

function getPointStr(p){
    return `[${p.x},${p.y}]`;
}

function getExpectedContourStr(contour){
    let s = "";
    for (let p of contour) {
        s += " "+getPointStr(p);
    }
    return s;
}

function getCgalContourStr(contour){
    let s = "";
    for (let i=0; i<contour.size(); i++){
        s += " "+getPointStr(contour.get(i));
    } 
    return s;
}

function getExpectedContourName(contour){
    let pts = [];
    for (let p of contour) {
        pts.push(p.name);
    }
    return "["+pts.join(', ')+"]"; 
}

function EPS_DIFF(a,b){
    return Math.abs(a-b) < EPSILON;
}

function checkContourMatch(cgal_contour, exp_contour){
    if (cgal_contour.size() != exp_contour.length) {
        return false;
    }

    // Find the first match point idx
    let idx = 0;
    let found = false;

    while (idx < exp_contour.length && !found) {
        found = EPS_DIFF(exp_contour[idx].x,cgal_contour.get(0).x) &&
            EPS_DIFF(exp_contour[idx].y, cgal_contour.get(0).y);
        idx+=1;
    }

    if (!found)
        return false;

    // check point by point
    idx -= 1;
    for (let i=0; i<cgal_contour.size(); i++) {
        if (!EPS_DIFF(exp_contour[idx].x,cgal_contour.get(i).x) ||
            !EPS_DIFF(exp_contour[idx].y,cgal_contour.get(i).y)) {
            return false;
        }
        idx = (idx + 1)%exp_contour.length;
    }
    return true;
}


function checkRegionMatch(cgal_region, exp_region) {
    // Check nb of holes:
    if (cgal_region.holes.size() != exp_region.holes.length)
        return false;

    // Check match contour:
    if (!checkContourMatch(cgal_region.contour, exp_region.contour))
        return false;

    // Check each holes:
    let unmatched_holes = Array.from(Array(exp_region.holes.length).keys())
    for (let i=0; i<cgal_region.holes.size(); i++) {
        let j = 0;
        let found = false;
        while (j<unmatched_holes.length && !found) {
            found = checkContourMatch(cgal_region.holes.get(i),
                exp_region.holes[unmatched_holes[j]]);
            j+=1;
        }
        if (!found) {
            return false;
        }
        else {
            unmatched_holes.splice(j-1, 1);
        }
    }
    return true;
}

Arrangement2D().then(function(Arrangement2D) {
    // Points
    console.time("Creating points");
    let A = new Arrangement2D.Point(1,3); A.name = "A";
    let B = new Arrangement2D.Point(6,11); B.name = "B";
    let C = new Arrangement2D.Point(1,5);  C.name = "C";
    let D = new Arrangement2D.Point(7,0);  D.name = "D";
    let E = new Arrangement2D.Point(5,1);  E.name = "E";
    let F = new Arrangement2D.Point(13,3); F.name = "F";
    let G = new Arrangement2D.Point(12,2); G.name = "G";
    let H = new Arrangement2D.Point(14,10); H.name = "H";
    let K = new Arrangement2D.Point(4,10); K.name = "K";
    let L = new Arrangement2D.Point(15,9); L.name = "L";
    let M = new Arrangement2D.Point(7,8);  M.name = "M";
    let N = new Arrangement2D.Point(4,4);  N.name = "N";
    let O = new Arrangement2D.Point(4,5);  O.name = "O";
    let P = new Arrangement2D.Point(7,2);  P.name = "P";
    let Q = new Arrangement2D.Point(6,8);  Q.name = "Q";
    let R = new Arrangement2D.Point(11,5); R.name = "R";
    let S = new Arrangement2D.Point(6,2);  S.name = "S";
    let T = new Arrangement2D.Point(11,4); T.name = "T";
    let U = new Arrangement2D.Point(9,7);  U.name = "U";
    let V = new Arrangement2D.Point(10,3); V.name = "V";
    let W = new Arrangement2D.Point(6,5);  W.name = "W";
    let Z = new Arrangement2D.Point(7,4);  Z.name = "Z";
    let A1 = new Arrangement2D.Point(7,6); A1.name = "A1";
    let C1 = new Arrangement2D.Point(8,5); C1.name = "C1";
    let D1 = new Arrangement2D.Point(7,6); D1.name = "D1";
    let I  = new Arrangement2D.Point(5,7); I .name = "I";
    let J  = new Arrangement2D.Point(4,6); J .name = "J";
    let F1 = new Arrangement2D.Point(10,9); F1.name = "F1";
    let G1 = new Arrangement2D.Point(11,9); G1.name = "G1";
    let H1 = new Arrangement2D.Point(12,8); H1.name = "H1";
    let I1 = new Arrangement2D.Point(12,5); I1.name = "I1";
    let J1 = new Arrangement2D.Point(14,6); J1.name = "J1";
    let K1 = new Arrangement2D.Point(11,6); K1.name = "K1";
    let L1 = new Arrangement2D.Point(10,7); L1.name = "L1";

    // Intersections
    let M1 = new Arrangement2D.Point(5.3010752688, 9.8817204301); M1.name = "M1";
    let N1 = new Arrangement2D.Point(13.7777777779, 9.1111111111); N1.name = "N1";
    let O1 = new Arrangement2D.Point(13,6); O1.name = "O1";
    let P1 = new Arrangement2D.Point(12.2, 2.8); P1.name = "P1";
    let Q1 = new Arrangement2D.Point(9.8636363636, 3.5454545455); Q1.name = "Q1";
    let R1 = new Arrangement2D.Point(9.2352941176, 6.0588235294); R1.name = "R1";
    let S1 = new Arrangement2D.Point(7,6); S1.name = "S1";
    let T1 = new Arrangement2D.Point(4.4285714286, 4.5714285714); T1.name = "T1";
    let U1 = new Arrangement2D.Point(6.6896551724, 7.5862068966); U1.name = "U1";
    let V1 = new Arrangement2D.Point(6.7142857143, 2.2857142857); V1.name = "V1";
    let W1 = new Arrangement2D.Point(5.6153846154, 1.1538461538); W1.name = "W1";
    let Z1 = new Arrangement2D.Point(1.8219178082, 4.3150684932); Z1.name = "Z1";
    let A2 = new Arrangement2D.Point(12, 6); A2.name = "A2";
    console.timeEnd("Creating points");

    console.time("Creating segments");
    let segments = new Arrangement2D.SegmentVector();
    segments.add(new Arrangement2D.Segment(A,B));
    segments.add(new Arrangement2D.Segment(C,D));
    segments.add(new Arrangement2D.Segment(E,F));
    segments.add(new Arrangement2D.Segment(G,H));
    segments.add(new Arrangement2D.Segment(K,L));
    segments.add(new Arrangement2D.Segment(M,N));
    segments.add(new Arrangement2D.Segment(O,P));
    segments.add(new Arrangement2D.Segment(Q,R));
    segments.add(new Arrangement2D.Segment(S,T));
    segments.add(new Arrangement2D.Segment(U,V));
    segments.add(new Arrangement2D.Segment(W,Z));
    segments.add(new Arrangement2D.Segment(W,A1));
    segments.add(new Arrangement2D.Segment(C1,Z));
    segments.add(new Arrangement2D.Segment(Z,D1));
    segments.add(new Arrangement2D.Segment(A1,C1));
    segments.add(new Arrangement2D.Segment(I,J));
    segments.add(new Arrangement2D.Segment(F1,G1));
    segments.add(new Arrangement2D.Segment(G1,H1));
    segments.add(new Arrangement2D.Segment(H1,I1));
    segments.add(new Arrangement2D.Segment(J1,K1));
    segments.add(new Arrangement2D.Segment(K1,L1));
    segments.add(new Arrangement2D.Segment(L1,F1));
    console.timeEnd("Creating segments");
    
    console.time("Computing regions");
    let regionBuilder = new Arrangement2D.RegionBuilder();
    let cgal_regions = regionBuilder.computeRegions(segments);
    console.timeEnd("Computing regions");

    // Expected results
    // Contours points should be CW oriented and holes points CCW oriented
    let expected_regions = [
        {
            name:"R0",
            contour:[M1, Z1, W1, P1, O1, N1],
            holes:[
                [T1, U1, R1, Q1, V1],
                [K1, L1, F1, G1, H1, A2]
            ]
        },
        {
            name:"R1",
            contour:[T1, V1, Q1, R1, U1],
            holes:[[W, S1, C1, Z]]
        },
        {
            name:"R2",
            contour:[W, Z, S1],
            holes:[]
        },
        {
            name:"R3",
            contour:[Z, C1, S1],
            holes:[]
        },
        {
            name:"R4",
            contour:[F1, L1, K1, A2, H1, G1],
            holes:[]
        }
    ];

    console.time("Checking regions");

    htmlLog(`Expecting ${expected_regions.length} regions`);
    for (let region of expected_regions) {
        htmlLog("#"+region.name);
        htmlLog("&nbsp;&nbsp;Contour: "+getExpectedContourName(region.contour));
        let s = "&nbsp;&nbsp;Holes:";
        for (let hole of region.holes) {
            s += " "+getExpectedContourName(hole);
        }
        htmlLog(s);
    }

    htmlLog(`<br>Found ${ cgal_regions.size()} regions from CGAL`);
    htmlLog("Matching regions...")
    let test_region_ok = true;
    let unmatched_regions = Array.from(Array(expected_regions.length).keys())
    for (let i=0; i<cgal_regions.size(); i++) {
        let cgal_region = cgal_regions.get(i);

        let j = 0;
        let found = false;
        let name = null;
        while (j<unmatched_regions.length && !found) {
            found = checkRegionMatch(cgal_region, expected_regions[unmatched_regions[j]]);
            if (found)
                name = expected_regions[unmatched_regions[j]].name
            j+=1;
        }       

        let s = `Region #${i} :`;
        if (!found){
            s += "NOT FOUND";
            test_region_ok = false; 
        }
        else {
            unmatched_regions.splice(j-1, 1);
            s += `FOUND (#${name})`
        }
        htmlLog(s);
    }
    console.timeEnd("Checking regions");

    if (test_region_ok) {
        htmlLog('<p style="color:#00AA00";>TESTS OK</p>');
        console.info("Tests ok");
    } else {
        htmlLog('<p style="color:#FF0000";>TESTS FAILED</p>');
        console.error("Tests failed");
    }
});