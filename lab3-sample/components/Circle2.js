import Matter from 'matter-js';
import React from 'react';
import { View, Image,Text } from 'react-native';

const Circle2 = (props) => {
    const width = props.radius * 2;

    const x = props.body.position.x - width / 2;
    const y = props.body.position.y - width / 2;
    
    return (
        <View
          style={{
            borderWidth: 2,
            position: "absolute",
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
        const circle2 = Matter.Bodies.circle(
          pos.x, 
          pos.y, 
          radius, 
          { label: "Circle2"});
          
        Matter.World.add(world, circle2);
        return { body: circle2, color, radius, renderer: <Circle2 /> };
      };
