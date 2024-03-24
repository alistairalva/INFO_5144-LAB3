import Matter from "matter-js";
import Circle2 from "../components/Circle2";
import Box from "../components/Box";
import { Dimensions } from "react-native";

export default () => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;
  engine.gravity.y = 0.5;
  //engine.gravity.x = 0;

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

  console.log('startingX', startingX);
  console.log('totalWidth of circles', totalWidth);
  const circles = {};

  // Create the other circles
  for (let i = 0; i < totalCircles; i++) {
    const isCircleStatic = i === 0 || i === totalCircles -1;
    circles[`Circle${i}`] = Circle2(world, 'green', {
      x: startingX + i * (circleDiameter + gap),
      y: height - totalWidth
    },
      circleRadius, {
      label: 'Circle2',
      isStatic: isCircleStatic,
    });
    console.log(`Height of circle ${i} in the loop: ${height}`);
    console.log(`Horizontal position of circle ${i}: ${startingX + i * (circleDiameter + gap)}\n\n`);
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