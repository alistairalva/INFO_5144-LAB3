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
  let totalCircles = 14;
  let gap = 3
  console.log('gap between circles: ', gap);
  let totalWidth = totalCircles * circleDiameter + ((totalCircles - 1) * gap);
  let startingX = (width - totalWidth) / 2;

  console.log('startingX', startingX);
  console.log('totalWidth of circles', totalWidth);

  let circles = [];

  // Create the circles
  for (let i = 0; i < totalCircles; i++) {

    const circleHeight = height - 300;
    const isCircleStatic = i === 0 || i === totalCircles - 1;
    const circle =  Circle2(world, 'green', { // color
      x: startingX + i * (circleDiameter + gap), // x position
      y: circleHeight // y position
    },
      circleRadius, {
      isCircleStatic,
    });

    console.log(`Height of circle [${i}] in the loop: ${circleHeight}`);
    console.log(`Horizontal position of circle [${i}]: ${startingX + i * (circleDiameter + gap)}\n\n`);
    circles.push(circle);
  }

  const circleEntities = circles.reduce((acc, circle, index) => {
    acc[`Circle_${index}`] = circle;
    return acc;
  }, {});

  const cornerSquare = Box(
    world,
    "green",
    { x: 120, y: 120 },
    { width: 40, height: 40 },
    { isStatic: false, label: "Enemy" }
  );

  const boundary = BoundaryBottom(
    world,
    'yellow',
    { x: 20, y: height },
    { height: 50, width: 900 }
  );

  return {
    physics: { engine, world },

    ...circleEntities,
    Square: cornerSquare,
    //Boundary: boundary,
  };
};