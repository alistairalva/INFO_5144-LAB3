import Matter, { Sleeping } from "matter-js";
import Constants from "./Constants"

const Physics = (entities, { touches, dispatch, events, time }) => {
  //console.log(entities);
  let engine = entities.physics.engine;
  let world = engine.world;

  engine.world.gravity.y = 0.5;

  // Filter out the circles from the entities
  let circles = entities.circleEntities;
  console.log('Num of Circles: ', circles.length);

  if (circles.length > 1) {
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
