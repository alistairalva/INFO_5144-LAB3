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

  let { width, height } = Dimensions.get('window');

  console.log('Width: ', width);
  let circleRadius = 15;
  let circleDiameter = circleRadius * 2;
  let gap = 3;

  let totalCircles = 10;
  let totalWidth = totalCircles * circleDiameter + ((totalCircles -1) * gap);
  let startingX = (width - totalWidth) / 2;

  console.log('startingX', startingX);
  console.log('totalWidth of circles', totalWidth);
  const circles = {};

  // Create the other circles
  for (let i = 0; i < totalCircles; i++) {
    const isCircleStatic = i === 0 || i === totalCircles -1;
    circles[`Circle${i}`] = Circle2(world, 'green', {
      x: startingX + i * (circleDiameter + gap),
      y: height - (totalWidth / 2),
    },
      circleRadius, {
      label: 'Circle2',
      isStatic: isCircleStatic,
    });
    console.log(`Height of circle ${i} in the loop: ${height}`);
    console.log(`Horizontal position of circle ${i}: ${startingX + i * (circleDiameter + gap)}\n\n`);
  }

  for (let key in circles) {
    let previousKey = Number(key.slice(6)) - 1;
    if (previousKey >= 0) {
      let connect1 = {
        bodyA: circles[`Circle${previousKey}`].body,
        bodyB: circles[key].body,
        length: 30,
        stiffness: 0.5,
        damping: 0.1,
      };
      console.log('previousKey: ', previousKey);
      var constraint1 = Matter.Constraint.create(connect1);
      Matter.World.add(world, constraint1);
    }
  
    console.log('Key: ', key);
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
