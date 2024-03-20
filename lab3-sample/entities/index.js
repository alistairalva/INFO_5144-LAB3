import { Dimensions } from 'react-native';

import Circle2 from '../components/Circle2';
import Box from '../components/Box';
import BoundaryBottom from '../components/BoundaryBottom';

import Matter from 'matter-js';

export default (gameWorld) => {
  let engine = Matter.Engine.create();
  let world = engine.world;

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

  let circles = [];

  // Create the first and last circles
  circles.push(Circle2(world, 'red', { x: startingX, y: height - totalWidth }, circleRadius, {
    label: 'Circle2',
    isStatic: true,
  }));
  console.log(`Width of circle [0]: ${startingX}\n\n`);

  // Create the other circles
  for (let i = 1; i < totalCircles - 1; i++) {
    circles.push(Circle2(world, 'green', {
      x: startingX + i * (circleDiameter + gap),
      y: height - totalWidth
    },
      circleRadius, {
      label: 'Circle2',
      isStatic: false,
    }));
    console.log(`Height of circle ${i} in the loop: ${height}`);
  console.log(`Horizontal position of circle ${i}: ${startingX + i * (circleDiameter + gap)}\n\n`);
  }

  circles.push(Circle2(world, 'red', { x: startingX + (totalCircles -1) * (circleDiameter + gap), y: height - totalWidth }, circleRadius, {
    label: 'Circle2',
    isStatic: true,
  }));
  console.log(`Width of circle [${totalCircles -1}]: ${startingX + (totalCircles -1) * (circleDiameter + gap)}\n\n`);
  console.log("Height of static circles: ", height);
  console.log(`Size of circle array: ${circles.length}`);

  return {
    physics: { engine, world },

    Bridge: {
      Circles: circles
    },
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
  };
};