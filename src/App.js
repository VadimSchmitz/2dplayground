import { useRef } from "react";
import "./App.css";

import PlanckWorld from "./Components/PlanckWorld";
import Comp from "./Components/Comp";

export default function App() {
  // let circleAngle = useRef(10);

  return (
    <div>
      {/* <PlanckWorld circleAngle={circleAngle} /> */}
      <Comp />
    </div>
  );
}
