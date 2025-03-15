import React, {Suspense, useEffect, useRef, useState} from 'react';
import {Canvas, useFrame, useLoader} from '@react-three/fiber/native';
import {PerspectiveCamera, Stars, useGLTF} from '@react-three/drei/native';
import {View} from 'react-native';
import {AmbientLight, DirectionalLight} from 'three';

const Rocket2 = (props) => {
  const rocketRef = useRef();

  // // Slowly spin the rocket
  useFrame(() => {
    if (rocketRef.current) {
      rocketRef.current.rotation.y += 0.005;
    }
  });

  const { nodes, materials } = useGLTF(require('../../assets/rockets/DARTcoloured.glb'));
  return (
    <group {...props} dispose={null} ref={rocketRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DART.geometry}
        material={materials['AR3DMat PBR Shiny Chrome']}
        scale={0.0005}
      />
    </group>
  )
};


const OtherSpinningRocketScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Canvas camera={{position: [0, 2, 5], fov: 100}}>
        <ambientLight intensity={1} />
        <Rocket2 />
      </Canvas>
    </View>
  );
};

export default OtherSpinningRocketScreen;
