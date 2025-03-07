import React, {useRef} from 'react';
import {Canvas} from '@react-three/fiber/native';
// import {useFrame} from '@react-three/fiber';
import { View } from 'react-native';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { resolveAsync } from 'expo-asset-utils';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { Renderer, TextureLoader, loadObjAsync, loadTextureAsync } from 'expo-three';
import OrbitControlsView from 'expo-three-orbit-controls';
import { Asset } from 'expo-asset'
import {
  AmbientLight,
  BoxGeometry,
  Fog,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
  Camera,
} from 'three';

// import { GLView } from "expo-gl";

// const EnableWebGL = () => {
//   return <GLView style={{ width: 100, height: 100 }} />;
// };
// import {OrbitControls, useGLTF} from '@react-three/drei';

// const Rocket = () => {
//   const rocketRef = useRef();

//   // Slowly spin the rocket
//   useFrame(() => {
//     if (rocketRef.current) {
//       rocketRef.current.rotation.y += 0.005;
//     }
//   });

//   // Load your 3D rocket model (ensure you have a GLTF model in your assets)
//   const {scene} = useGLTF(require('./saturnV.glb'));

//   return <primitive object={scene} ref={rocketRef} scale={1.5} />;
// };

const SpinningRocketScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
        {/* <EnableWebGL /> */}
        <Canvas>
      <ambientLight intensity={0.5} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </Canvas>
      {/* <Canvas camera={{position: [0, 2, 5], fov: 50}}> */}
        {/* <ambientLight intensity={0.8} />
        <directionalLight position={[2, 5, 5]} intensity={1} /> */}
        {/* <Rocket /> */}
        {/* <OrbitControls enableZoom={false} /> */}
      {/* </Canvas> */}
    </View>
  );
};

export default SpinningRocketScreen;
