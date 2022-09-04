import { useEffect, useRef } from "react";
import {
  Engine,
  Render,
  Bodies,
  World,
  MatterMouse,
  MatterMouseConstraint,
} from "matter-js";

function Comp(props) {
  const scene = useRef();
  const engine = useRef(Engine.create());

  //test
  let a = Bodies.rectangle(500, 100, 150, 50, { isStatic: false });
  let b = Bodies.rectangle(600, 80, 150, 50, { isStatic: false });

  useEffect(() => {
    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: "transparent",
      },
    });

    //borders
    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
      a,
      b,
    ]);

    Engine.run(engine.current);
    Render.run(render);

    return () => {
      Render.stop(render);
      World.clear(engine.current.world);
      Engine.clear(engine.current);
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(b.position.x, b.position.y, b.angle);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div ref={scene} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default Comp;
