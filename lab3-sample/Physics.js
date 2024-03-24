import Matter, { Sleeping } from "matter-js";
import Constants from "./Constants"


const Physics = (entities, { touches, dispatch, events, time }) => {
  //console.log(entities);
  let engine = entities.physics.engine;
  let world = engine.world;

  engine.world.gravity.y = 0.5;

  // Filter out the circles from the entities
  let circles = entities.circles;

  //if i uncomment this line the app works and the circles fall down once created
  if (!circles) {
    console.error('Circles is undefined or null');
    return entities;
  }

  // First, add all the circles to the world
  for (let key in circles) {
    for (let key in circles) {
      console.log("\n", key);
    }
    Matter.World.add(world, circles[key].body);
  }

  //this fails when uncommented
  // // Get an array of the keys
  //let keys = Object.keys(circles);

  // // Create constraints between each pair of adjacent circles
  // for (let i = 0; i < keys.length; i++) {
  //   if (i > 0) {
  //     let distance = Matter.Vector.magnitude(
  //       Matter.Vector.sub(circles[keys[i]].body.position, circles[keys[i - 1]].body.position)
  //     );

  //     let connect1 = {
  //       bodyA: circles[keys[i - 1]].body,
  //       bodyB: circles[keys[i]].body,
  //       length: distance, // Set the length to the initial distance between the circles
  //       stiffness: 0.2,
  //       damping: 0.1,
  //     };

  //     let constraint1 = Matter.Constraint.create(connect1);
  //     Matter.World.add(world, constraint1);
  //   }
  // }

  // // Create a fixed point at the top of the screen
  // let fixedPoint = { x: Constants.MAX_WIDTH / 2, y: 0 };

  // // Create constraints between the first and last circles and the fixed point
  // let connectFirst = {
  //   pointA: fixedPoint,
  //   bodyB: circles[keys[0]].body,
  //   length: circles[keys[0]].body.position.y,
  //   stiffness: 0.2,
  //   damping: 0.1,
  // };

  // let connectLast = {
  //   pointA: fixedPoint,
  //   bodyB: circles[keys[keys.length - 1]].body,
  //   length: circles[keys[keys.length - 1]].body.position.y,
  //   stiffness: 0.2,
  //   damping: 0.1,
  // };

  // let constraintFirst = Matter.Constraint.create(connectFirst);
  // let constraintLast = Matter.Constraint.create(connectLast);

  // Matter.World.add(world, [constraintFirst, constraintLast]);

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