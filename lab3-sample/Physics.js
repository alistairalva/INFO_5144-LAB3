import Matter, { Sleeping } from "matter-js";
import Constants from "./Constants"


const Physics = (entities, { touches, dispatch, events, time }) => {
  //console.log(entities);
  let engine = entities.physics.engine;
  let world = engine.world;

  engine.world.gravity.y = 0.5;

  // Filter out the circles from the entities
  let circles = entities.circles;

  //if i uncomment this line the app works but the circles fall down once created
  // if (!circles) {
  //   console.error('Circles is undefined or null');
  //   return entities;
  // }


  for (let key in circles) {
    let previousKey = Number(key) - 1;
    console.log('Previous Key: ', previousKey);
    if (previousKey >= 0) {
      let connect1 = {
        bodyA: circles[previousKey].body,
        bodyB: circles[key].body,
        length: 20,
        stiffness: 1.0,
        damping: 0.1,
      };
  
      let constraint1 = Matter.Constraint.create(connect1);
      Matter.World.add(world, constraint1);
    }
  
    console.log('Key: ', key);
  }

  touches
    .filter((t) => t.type === 'press')
    .forEach((t) => {
      Matter.Body.setPosition(entities.Square.body, {
        x: 180, 
        y: 50,
      });

  });  

  touches
    .filter((t) => t.type === 'press')
    .forEach((t) => {
      Matter.Body.setVelocity(entities.Square.body, {
        x: 0, //move along x-axis with given velocity
        y: 10, //move along y-axis with given velocity
      });

    });

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;