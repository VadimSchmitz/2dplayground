import * as planck from "planck-js/dist/planck-with-testbed";

//https://github.com/shakiba/planck.js/wiki/Body

function PlanckWorld({ circleAngle }) {

  let World = function PlanckWorld() {
    // Viewbox size

    var pl = planck,
      Vec2 = pl.Vec2;
    var world = new pl.World(Vec2(0, -10));

    let cw = document.body.clientWidth;
    let ch = document.body.clientHeight;

    var ground = world.createBody();

    //1745 = 118m
    //1px = 0.0676217765
    function pixelToMeter(pixels) {
      return pixels * 0.0676217765;
    }

    //1m = 14.7881355932 px

    let planeWidth = pixelToMeter(cw);
    let planeHeight = pixelToMeter(ch);

    //create floor
    ground.createFixture(
      pl.Edge(
        Vec2(-planeWidth, -planeHeight * 0.28),
        Vec2(planeWidth, -planeHeight * 0.28)
      ),
      1
    );

    //create ceiling
    ground.createFixture(
      pl.Edge(
        Vec2(-planeWidth / 2, planeHeight * 0.6666),
        Vec2(planeWidth / 2, planeHeight * 0.6666)
      ),
      1
    );

    //x.y
    world.createDynamicBody(Vec2(0, 0)).createFixture(pl.Circle(5.0), 0.1);
    //x,y Size x,Size y  ,x,y , angle, mass
    // world.createDynamicBody(Vec2(0, 0)).createFixture(pl.Box(5, 5, Vec2(15, 10), 0), 5);

    return world;
  };

  setInterval(function () {
    // a.setAngle(6.28318530718);
    // circleAngle.current = a.getAngle();

    console.log(circleAngle.current);
  }, 100000);


  return <div>{planck.testbed(World)}</div>;
}

export default PlanckWorld;
