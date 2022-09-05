import { useEffect } from "react";
import Matter from "matter-js";

export default function App() {
  useEffect(() => {
    let Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Composite = Matter.Composite,
      Composites = Matter.Composites,
      Constraint = Matter.Constraint,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Bodies = Matter.Bodies;

    var engine = Engine.create(),
      world = engine.world;

    // create renderer
    var render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
      },
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    //gravity
    engine.gravity.scale = 0.001;

    // add bodies
    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;

    let celing = Bodies.rectangle(cw / 2, -10, cw, 25, { isStatic: true });
    let ground = Bodies.rectangle(cw / 2, ch, cw, 25, {
      isStatic: true,
    });

    let leftWall = Bodies.rectangle(-10, ch / 2, 25, ch, { isStatic: true });
    let rightWall = Bodies.rectangle(cw, ch / 2, 20, ch, {
      isStatic: true,
    });

    let length = 200;
    let width = 25;
    let x = 350;
    let y = 360;

    var pendulum = Composites.stack(350, 160, 1, 1, 0, 0, function () {
      return Bodies.rectangle(x, y, length, width, {
        frictionAir: 0,
        render: {
          lineWidth: 3,
        },
      });
    });

    //create constraint
    Composite.add(
      pendulum,
      Constraint.create({
        bodyB: pendulum.bodies[0],
        pointB: { x: -length * 0.42, y: 0 },
        pointA: {
          x: pendulum.bodies[0].position.x - length * 0.42,
          y: pendulum.bodies[0].position.y,
        },
        stiffness: 0.9,
        render: {
          strokeStyle: "#4a485b",
        },
      })
    );

    Composite.add(world, pendulum);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: true,
          },
        },
      });

    Composite.add(world, mouseConstraint);
    // Composite.add(ground, ceiling, leftWall, rightWall, ball);
    Composite.add(world, celing);
    Composite.add(world, ground);

    Composite.add(world, leftWall);
    Composite.add(world, rightWall);

    // add revolute constraint
    var body = Bodies.rectangle(600, 200, 200, 20);

    var constraint = Constraint.create({
      pointA: { x: 600, y: 200 },
      bodyB: body,
      length: 0,
    });

    Composite.add(world, [body, constraint]);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    let square = Bodies.rectangle(359, 160, 60, 60, {
      frictionAir: 0,
      isStatic: false,
      render: {
        lineWidth: 3,
      },
    });

    let square2 = Bodies.rectangle(359, 160, 60, 60, {
      frictionAir: 0,
      isStatic: false,
      render: {
        lineWidth: 3,
      },
    });

    Composite.add(world, square);

    //set pivot if clicked at position
    Matter.Events.on(runner, "tick", (event) => {
      if (mouseConstraint.body) {
        let allConstraints = Composite.allConstraints(world);
        // Composite.remove(world, allConstraints);

        let test = {};
        // test = Constraint.create({
        //   pointA: {
        //     x: mouseConstraint.mouse.absolute.x - length,
        //     y: mouseConstraint.mouse.absolute.y,
        //   },
        //   bodyB: mouseConstraint.body,
        //   pointB: {
        //     x: 0,
        //     y: 0,
        //   },
        //   stiffness: 0.9,
        //   render: {
        //     strokeStyle: "#4a485b",
        //   },
        // });

        console.log(test);
        Composite.add(world, test);
      }
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
  });

  useEffect(() => {}, []);

  return <div></div>;
}
