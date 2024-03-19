import { Dimensions } from 'react-native';
import Circle1 from '../components/Circle1';
import Circle2 from '../components/Circle2';
import Box from '../components/Box';
import BoundaryBottom from '../components/BoundaryBottom';

import Matter from 'matter-js';
//import Constants from "../Constants";

export default (gameWorld) => {
  let engine = Matter.Engine.create();
  let world = engine.world;
  //engine.gravity.y = 0.0;
  //engine.gravity.x = 0;

  let { width, height } = Dimensions.get('window');

  console.log('Width: ', width);
  let circleRadius = 10;
  let circleDiameter = circleRadius * 2;
  let gap = 3;

  let totalCircles = 14;
  let totalWidth = totalCircles * circleDiameter + ((totalCircles -1) * gap);
  let startingX = (width - totalWidth) / 2;

  console.log('startingX', startingX);
  console.log('totalWidth of circles', totalWidth);
  let circles = {};

  // Create the first and last circles
  circles['Circle0'] = Circle2(world, 'red', { x: startingX, y: height - totalWidth }, circleRadius, {
    label: 'Circle2',
    isStatic: true,
  });
  console.log(`Width of circle [0]: ${startingX}\n\n`);

  circles['Circle13'] = Circle2(world, 'red', { x: startingX + (totalCircles -1) * (circleDiameter + gap), y: height - totalWidth }, circleRadius, {
    label: 'Circle2',
    isStatic: true,
  });
  console.log(`Width of circle [13]: ${startingX + (totalCircles -1) * (circleDiameter + gap)}\n\n`);
  console.log("Height of static circles: ", height);

  // Create the other circles
  for (let i = 1; i < totalCircles - 1; i++) {
    circles[`Circle${i}`] = Circle2(world, 'green', {
      x: startingX + i * (circleDiameter + gap),
      y: height - totalWidth
    },
      circleRadius, {
      label: 'Circle2',
      isStatic: false,
    });
    console.log(`Height of circle ${i} in the loop: ${height}`);
    console.log(`Horizontal position of circle ${i}: ${startingX + i * (circleDiameter + gap)}\n\n`);
  }

  return {
    physics: { engine, world },

    Square: Box(
      world,
      "green",
      { x: 120, y: 120 },
      { width: 40, height: 40 },
      { isStatic: false, label: "Enemy" }
    ),
    BottomBoundary: BoundaryBottom(
      world,
      'yellow',
      { x: 20, y: height },
      { height: 50, width: 900 }
    ),

    ...circles,
  };
};
