import Arrangement2D from '../build/Arrangement2D.esm';

Arrangement2D().then((Arr2D) => {

  const p = new Arr2D.Point(1, 2);

  console.log(p.x, p.y);


});
