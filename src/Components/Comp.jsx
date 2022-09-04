import { useEffect } from "react";
import Matter from "matter-js";

export default function App() {
  let barA;
  let barB;

  useEffect(() => {
    var Engine = Matter.Engine,
      Render = Matter.Render,
      Events = Matter.Events,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      World = Matter.World,
      Bodies = Matter.Bodies;

    // create an engine
    var engine = Engine.create(),
      world = engine.world;

    // create a renderer
    var render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: 2,
        wireframes: false,
      },
    });

    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;

    let ground = Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true });
    let leftWall = Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true });
    let rightWall = Bodies.rectangle(cw / 2, ch + 10, cw, 20, {
      isStatic: true,
    });
    let ceiling = Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true });

    // object colors & variables

    // create objects
    let a = Bodies.rectangle(500, 100, 150, 50, {
      isStatic: false,
      inertia: Infinity,
    });
    let b = Bodies.rectangle(600, 80, 150, 50, { isStatic: false });

    barA = a;
    barB = b;

    // add all of the bodies to the world
    World.add(engine.world, [ground, leftWall, rightWall, ceiling, a, b]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.1,
          render: {
            visible: false,
          },
        },
      });

    const runner = Matter.Runner.create();
    Matter.Events.on(runner, "tick", (event) => {
      if (mouseConstraint.body) {
        console.log(
          mouseConstraint.body.vertices[0],
          mouseConstraint.body.vertices[1],
          mouseConstraint.body.vertices[2],
          mouseConstraint.body.vertices[3]
        );
        console.log(
          mouseConstraint.mouse.absolute.x,
          mouseConstraint.mouse.absolute.y
        );
      }
    });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;
    // run the engine
    Matter.Runner.start(runner, engine);
    // run the renderer
    Render.run(render);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log(barB.position.x, barB.position.y, barB.angle);
      // console.log(
      //   barB.vertices[0],
      //   barB.vertices[1],
      //   barB.vertices[2],
      //   barB.vertices[3]
      // );
      // barB.torque += 10;
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return <div></div>;
}
