import { useRef } from "react";
import "./App.css";

import PlanckWorld from "./Components/PlanckWorld";

export default function App() {
  let circleAngle = useRef(10);

  return (
    <div>
      <PlanckWorld circleAngle={circleAngle} />
    </div>
  );
}
