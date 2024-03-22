import Matter, { Sleeping } from "matter-js";
import Constants from "./Constants"

const Physics = (entities, { touches, dispatch, events, time }) => {
  //console.log(entities);
  let engine = entities.physics.engine;
  let world = engine.world;

  engine.world.gravity.y = 0.5;

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
