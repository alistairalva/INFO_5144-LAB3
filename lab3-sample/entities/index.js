import Matter from "matter-js";
import Circle2 from "../components/Circle2";
import Box from "../components/Box";
import { Dimensions } from "react-native";

export default () => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;

  engine.world.gravity.y = 0.5;

  const rectangleRB = Box(
    world,
    "blue",
    { x: Dimensions.get("window").width / 2, y: 50 },
    { width: 50, height: 50 }
  );

  const circleRBs = [];
  const numCircles = 20;
  const circleSpacing = Dimensions.get("window").width / (numCircles + 1);
  for (let i = 0; i < numCircles; i++) {
    const isStatic = i === 0 || i === numCircles - 1;
    const circleX = (i + 1) * circleSpacing;
    const circleY = Dimensions.get("window").height - 300;

    let circleRB = Circle2(
      world,
      "green",
      { x: circleX, y: circleY },
      20,
      isStatic
    );
    circleRBs.push(circleRB);
  }

  for (let i = 0; i < numCircles - 1; i++) {
    Matter.World.add(
      world,
      Matter.Constraint.create({
        bodyA: circleRBs[i].body,
        bodyB: circleRBs[i + 1].body,
        length: circleSpacing,
        stiffness: 0.4,
      })
    );
  }

  const circleEntities = circleRBs.reduce((acc, circle, index) => {
    acc[`CircleRB_${index}`] = circle;
    return acc;
  }, {});

  return {
    physics: { engine, world },
    Square: rectangleRB,
    ...circleEntities,
  };
};