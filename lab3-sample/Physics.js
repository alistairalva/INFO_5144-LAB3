import Matter, { Sleeping } from "matter-js";
import Constants from "./Constants"

const Physics = (entities, { touches, dispatch, events, time }) => {
  //console.log(entities);
  let engine = entities.physics.engine;
  let world = engine.world;

  engine.world.gravity.y = 0.1;

  // Check if entities.Bridge exists and is properly initialized
  if (!entities.Bridge || !entities.Bridge.Circles) {
    console.log('No bridge or circles are defined');
    return entities; // Return entities without further processing
  }

  // Filter out the circles from the entities
  let circles = entities.Bridge.Circles;

    console.log('Num of Circles: ', circles.length);
  if (circles.length > 1) {
    //Sort the circles by their x position to ensure they're in the correct order
    //circles.sort((a, b) => a.body.position.x - b.body.position.x);
  
    // //Make the first and last circles static
    // Matter.Body.setStatic(circles[0].body, true);
    // Matter.Body.setStatic(circles[circles.length -1].body, true);
  
    //Create constraints between each pair of adjacent circles
    for (let i = 1; i < circles.length -1; i++) {
      let connect1 = {
        bodyA: circles[i-1].body,
        bodyB: circles[i].body,
        length: 150,
        stiffness: 0.2,
        damping: 0.1,
      };
  
      let constraint1 = Matter.Constraint.create(connect1);
      Matter.World.add(world, constraint1);
    }
  }
  
  touches
    .filter((t) => t.type === 'press')
    .forEach((t) => {
      Matter.Body.setVelocity(entities.Square.body, {
        x: 0, //move along x-axis with given velocity
        y: 10, //move along y-axis with given velocity
      });

    });

  return entities;
};

export default Physics;
