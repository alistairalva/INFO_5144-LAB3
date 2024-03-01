import Matter from 'matter-js';
import React from 'react';
import { View, Image, Text } from 'react-native';

const Circle1 = (props) => {
  const width = props.radius * 2;

  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - width / 2;

  return (
    <View
      style={{
        borderWidth: 2,
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: width,
        borderRadius: props.radius,
        backgroundColor: props.color,
      }}
    />
  );
};
export default (world, color, pos, radius) => {
  const circle1 = Matter.Bodies.circle(pos.x, pos.y, radius, {
    label: 'Circle1',
    //collisionFilter: { group: -1 } ,
  });

  Matter.World.add(world, circle1);
  return { body: circle1, color, radius, renderer: <Circle1 /> };
};
