import React, {Suspense, useEffect, useRef, useState} from 'react';
import {Canvas, useFrame, useLoader} from '@react-three/fiber/native';
import {useGLTF} from '@react-three/drei/native';
import {View} from 'react-native';

const Rocket = () => {

  const rocketRef = useRef();

  // // Slowly spin the rocket
  useFrame(() => {
    if (rocketRef.current) {
      rocketRef.current.rotation.y += 0.005;
    }
  });

  // // Load your 3D rocket model (ensure you have a GLTF model in your assets)
  const {scene} = useGLTF(require("../../assets/rockets/saturnV.glb"));
  // const {scene} = useGLTFCustom(require("../../assets/rockets/satellite.glb")); //useLoader(GLTFLoader, require("../../assets/rockets/satellite.glb"));
  return <primitive object={scene} ref={rocketRef} scale={1.5} />;

};


const SpinningRocketScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Canvas camera={{position: [0, 2, 5], fov: 50}}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 5, 5]} intensity={1} />
        <Suspense>
          <Rocket />
        </Suspense>
      </Canvas>
    </View>
  );
};

export default SpinningRocketScreen;
