import Matter, { Sleeping } from "matter-js";
import Constants from "./Constants"

const Physics = (entities, { touches, dispatch, events, time }) => {
  //console.log(entities);
  let engine = entities.physics.engine;
  let world = engine.world;

  engine.world.gravity.y = 0.1;

  // Check if entities.Bridge exists and is properly initialized
  if (!entities.Bridge || !entities.Bridge.circles) {
    console.log('No bridge or circles are defined');
    return entities; // Return entities without further processing
  }

  // Filter out the circles from the entities
  let circles = entities.Bridge.circles;

    console.log('Num of Circles: ', entities.Bridge.circles.length);
  if (circles.length > 1) {
    //Sort the circles by their x position to ensure they're in the correct order
    circles.sort((a, b) => a.body.position.x - b.body.position.x);
  
    //Make the first and last circles static
    Matter.Body.setStatic(circles[0].body, true);
    Matter.Body.setStatic(circles[1].body, true);
  
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
  //////////////// Define connect1 as constraint between Two circles /////////////////////////////////////////////////////////////////
  // var connect1 = {

  //   bodyA: entities.Circle1.body,
  //   bodyB: entities.Circle2.body,
  //   length: 150,        //Distance between two bodies in pixel -- try with some Negative length.

  //   stiffness: 0.2,     // The rate at which it retruns to its resting. 
  //   //Default is 1 . A value of 1 is very stiff. 0.2 acts like a soft spring. Try 0.5,0.9,2

  //   damping: 0.1,   //the amount of resistance applied to each body based on their velocities to limit the amount of oscillation. 
  //   //A value of 0.1 means the constraint will apply heavy damping, resulting in little to no oscillation. 
  //   //A value of 0 means the constraint will apply no damping.


  // };

  // var constraint1 = Matter.Constraint.create(connect1); //Passing "connect1" constraint as an argument 
  // Matter.World.add(world, constraint1);

  //////////////////////////////// constraint2 between a Point A and Circle1 (bodyB)  /////////////////////////////////////////////////////////

  // var constraint2 = Matter.Constraint.create({
  //   pointA: { x: 180, y: 200 },
  //   bodyB: entities.Circle1.body,
  //   //pointB: { x: 0, y: 0 },
  //   length: 10
  // });

  //Matter.World.add(world, constraint2);

  //////////////////////////////////////////////////////////////////////////////



  //////////////////////////////////////////////////////////////////////////////


  touches
    .filter((t) => t.type === 'press')
    .forEach((t) => {
      Matter.Body.setVelocity(entities.Square.body, {
        x: 0, //move along x-axis with given velocity
        y: 10, //move along y-axis with given velocity
      });

    });

  //////////////////////////////////////////////////////////////////////////////

  // touches
  //     .filter((t) => t.type === 'press')
  //     .forEach((t) => {
  //       Matter.Body.setVelocity(entities.Circle1.body, {
  //         x: 0, //move along x-axis with given velocity
  //         y: 10, //move along y-axis with given velocity
  //       });

  //   });
  //   Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
