import {
  Engine,
  Events,
  Render,
  Runner,
  Body,
  Composite,
  Composites,
  Constraint,
  MouseConstraint,
  Mouse,
  World,
  Bodies,
  Matter,
} from "matter-js";

import React from "react";

const mountDemo = (element: HTMLElement) => {
  const engine = Engine.create();
  const world = engine.world;

  const render = Render.create({
    element: element,
    engine: engine,
    options: {
      width: 800,
      height: 600,
      showAngleIndicator: true,
      showCollisions: true,
      showVelocity: true,
    },
  });

  Render.run(render);

  const runner = Runner.create();
  Runner.run(runner, engine);

  let group = Body.nextGroup(true);

  let ropeA = Composites.stack(100, 500, 8, 1, 10, 10, function (x, y) {
    return Bodies.rectangle(x, y, 50, 20, {
      collisionFilter: { group: group },
    });
  });

  Composites.chain(ropeA, 0.5, 0, -0.5, 0, {
    stiffness: 0.8,
    length: 2,
    render: { type: "line" },
  });
  Composite.add(
    ropeA,
    Constraint.create({
      bodyB: ropeA.bodies[0],
      pointB: { x: -10, y: 0 },
      pointA: { x: ropeA.bodies[0].position.x, y: ropeA.bodies[0].position.y },
      stiffness: 0.5,
    })
  );

  Composite.rotate(ropeA, -Math.PI / 2, ropeA.bodies[0].position);

  group = Body.nextGroup(true);

  var ropeC = Composites.stack(600, 500, 13, 1, 10, 10, function (x, y) {
    return Bodies.rectangle(x - 20, y, 50, 20, {
      collisionFilter: { group: group },
      chamfer: 5,
    });
  });

  Composites.chain(ropeC, 0.3, 0, -0.3, 0, { stiffness: 1, length: 0 });
  Composite.add(
    ropeC,
    Constraint.create({
      bodyB: ropeC.bodies[0],
      pointB: { x: -20, y: 0 },
      pointA: { x: ropeC.bodies[0].position.x, y: ropeC.bodies[0].position.y },
      stiffness: 0.5,
    })
  );

  Composite.rotate(ropeC, -Math.PI / 2, ropeC.bodies[0].position);

  World.add(world, [
    ropeA,
    ropeC,
    Bodies.rectangle(400, 600, 1200, 50.5, { isStatic: true }),
  ]);

  // add mouse control
  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

  World.add(world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  // fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 700, y: 600 },
  });

  // context for MatterTools.Demo
  return {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function () {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    },
  };
};

class Demo extends React.PureComponent {
  componentDidMount() {
    if (this.container) {
      const demo = mountDemo(this.container);
      window.requestAnimationFrame(() => {
        console.log(demo.engine.world.composites);
      });
    }
    // Todo: [] Perlin noise gravityX for wind
  }

  render() {
    return (
      <article
        ref={(element) => {
          this.container = element;
        }}
      />
    );
  }
}

export default Demo;
