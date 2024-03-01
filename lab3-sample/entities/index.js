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

  return {
    physics: { engine, world },

    Square: Box(world, 'green', { x: 130, y: 16 }, { width: 40, height: 40 }),

    BottomBoundary: BoundaryBottom(
      world,
      'yellow',
      { x: 20, y: 750 },
      { height: 50, width: 900 }
    ),

    Circle1: Circle1(world, 'red', { x: 150, y: 150 }, 50),

    Circle2: Circle2(world, 'red', { x: 150, y: 250 }, 10, {
      label: 'Circle2',
    
 
}),
  };
};
