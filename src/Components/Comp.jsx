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
      Bodies = Matter.Bodies,
      Body = Matter.Body;

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

    // add bodies
    var group = Body.nextGroup(true),
      length = 200,
      width = 25;

    var pendulum = Composites.stack(400, 150, 1, 1, -20, 0, function (x, y) {
      return Bodies.rectangle(x, y, length, width, {
        collisionFilter: { group: group },
        frictionAir: 0,
        chamfer: 5,
        render: {
          fillStyle: "transparent",
          lineWidth: 1,
        },
      });
    });

    var square = Bodies.rectangle(600, 150, 50, 50, {
      frictionAir: 0,
      render: {
        fillStyle: "transparent",
        lineWidth: 1,
      },
    });

    let squareComp;
    squareComp = Composite.create();
    Composite.add(squareComp, square);
    console.log(squareComp);

    engine.gravity.scale = 0.002;

    Composite.add(
      pendulum,
      Constraint.create({
        bodyB: pendulum.bodies[0],
        pointB: { x: 20, y: 0 },
        pointA: {
          x: 200,
          y: 200,
        },
        stiffness: 0.9,
        length: 0,
        render: {
          strokeStyle: "#4a485b",
        },
      })
    );

    Composite.add(world, pendulum);
    Composite.add(world, squareComp);

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

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    //set pivot if clicked at position
    Matter.Events.on(runner, "tick", (event) => {
      let allConstraints = Composite.allConstraints(world);

      if (mouseConstraint.body) {
        console.log(mouseConstraint.body, mouseConstraint.mouse.absolute);
        Composite.add(
          squareComp,
          Constraint.create({
            bodyB: squareComp.bodies[0],
            pointB: {
              x:
                mouseConstraint.body.axes[0].x + mouseConstraint.body.axes[1].x,
              y:
                mouseConstraint.body.axes[0].y + mouseConstraint.body.axes[1].y,
            },
            pointA: {
              x: mouseConstraint.mouse.absolute.x,
              y: mouseConstraint.mouse.absolute.y,
            },
            stiffness: 0.9,
            length: 0,
            render: {
              strokeStyle: "#4a485b",
            },
          })
        );
        Composite.remove(squareComp, allConstraints);
      }
      Composite.remove(squareComp, allConstraints);
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
