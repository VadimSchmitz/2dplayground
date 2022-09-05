import * as planck from "planck-js/dist/planck-with-testbed";

//https://github.com/shakiba/planck.js/wiki/Body

function PlanckWorld({ circleAngle }) {
  let World = function PlanckWorld() {
    var pl = planck,
      Vec2 = pl.Vec2;
    var world = new pl.World(Vec2(0, -10));
    let edge = pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0));
    world.createBody().createFixture(edge);
    console.log();
    //x.y
    world.createDynamicBody(Vec2(0, 0)).createFixture(pl.Circle(5.0), 0.1);
    //x,y Size x,Size y  ,x,y , angle, mass
    world.createDynamicBody(Vec2(0, 0)).createFixture(pl.Box(5, 5, Vec2(15, 10), 0), 5);


    return world;
  };

  setInterval(function () {
    // a.setAngle(6.28318530718);
    // circleAngle.current = a.getAngle();

    console.log(circleAngle.current);
  }, 100000);

  let worldSimulation = World();
  console.log(worldSimulation);

  return <div>{planck.testbed(World)}</div>;
}

export default PlanckWorld;
