import Matter, { Sleeping } from "matter-js";
import Constants from "./Constants"


const Physics = (entities, { touches, dispatch, events, time }) => {
  //console.log(entities);
  let engine = entities.physics.engine;
  let world = engine.world;

  engine.world.gravity.y = 0.5;

  // Filter out the circles from the entities
  
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
        y: 5, //move along y-axis with given velocity
      });

    });

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;