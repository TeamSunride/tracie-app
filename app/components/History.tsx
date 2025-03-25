import React, {Suspense, useEffect, useRef, useState} from 'react';
import {Canvas, useFrame, useLoader} from '@react-three/fiber/native';
import {PerspectiveCamera, Stars, useGLTF, OrbitControls} from '@react-three/drei/native';
import {View} from 'react-native';
import {AmbientLight, DirectionalLight, MeshStandardMaterial} from 'three';

const Rocket2 = props => {
  const rocketRef = useRef();

  // Slowly spin the rocket
  useFrame(() => {
    if (rocketRef.current) {
      rocketRef.current.rotation.y += 0.005;
      rocketRef.current.rotation.x = -0.5;
    }
  });

  const {nodes, materials} = useGLTF(
    // require('../../assets/rockets/color.gltf'),
    require('../../assets/rockets/DART16COLOUREDandMETAL.glb'),
    // require('../../assets/rockets/DART16BlenderkitMETAL.glb'),
    // require('../../assets/rockets/DART15reducedroughness.glb'),
  );

  useEffect(() => {
    // Add ambient light to the scene
    const ambientLight = new AmbientLight(0xffffff, 1);
    rocketRef.current?.parent.add(ambientLight);

    // Add directional light to the scene
    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-5, 0, -5);
    rocketRef.current?.parent.add(directionalLight);

    // Add directional light to the scene
    const directionalLight2 = new DirectionalLight(0xffffff, 1);
    directionalLight2.position.set(-5, 0, 5);
    rocketRef.current?.parent.add(directionalLight2);
  }, []);

  return (
    <group {...props} dispose={null} ref={rocketRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DART.geometry}
        // material={materials.PBR}
        // material={materials['AR3DMat PBR Shiny Chrome']}
        // material={materials['Shiny Metal']}
        material={materials['Material.001']}
        scale={0.0015}
      />
    </group>
  );
};

const Rocket3 = props => {
  const rocketRef = useRef();

  // Slowly spin the rocket
  useFrame(() => {
    if (rocketRef.current) {
      rocketRef.current.rotation.y += 0.005;
    }
  });

  const {nodes, materials} = useGLTF(
    require('../../assets/rockets/DARTcoloured.glb'),
  );

  useEffect(() => {
    // Add ambient light to the scene
    const ambientLight = new AmbientLight(0xffffff, 3);
    rocketRef.current?.parent.add(ambientLight);

    // Add directional light to the scene
    const directionalLight = new DirectionalLight(0xffffff, 3);
    directionalLight.position.set(-5, 0, -5);
    rocketRef.current?.parent.add(directionalLight);

    // Add directional light to the scene
    const directionalLight2 = new DirectionalLight(0xffffff, 3);
    directionalLight2.position.set(5, 0, -5);
    rocketRef.current?.parent.add(directionalLight2);
  }, []);

  return (
    <group {...props} dispose={null} ref={rocketRef}>
      <mesh
        geometry={nodes.DART.geometry}
        material={materials['AR3DMat PBR Shiny Chrome']}
        scale={0.0003}
      />
    </group>
  );
};

const Rocket = () => {
  const rocketRef = useRef();

  // // Slowly spin the rocket
  useFrame(() => {
    if (rocketRef.current) {
      rocketRef.current.rotation.y += 0.01;
      rocketRef.current.rotation.z = 0.5;
    }
  });

  // // Load your 3D rocket model (ensure you have a GLTF model in your assets)
  const {scene} = useGLTF(require('../../assets/rockets/DARTcoloured2.glb'));
  // const {scene} = useGLTFCustom(require("../../assets/rockets/satellite.glb")); //useLoader(GLTFLoader, require("../../assets/rockets/satellite.glb"));

  const ambientLight = new AmbientLight(0xffffff, 4);
  scene.add(ambientLight);

  // const dirLight = new DirectionalLight(0xffffff, 4);
  // dirLight.position.set(0, 10, 7.5);
  // scene.add(dirLight);

  return <primitive object={scene} ref={rocketRef} scale={0.01} />;
};

// const SpinningRocketScreen = () => {
//   return (
//     <View style={{flex: 1, backgroundColor: 'white'}}>
//       <Canvas shadows camera={{position: [0, 2, 5], fov: 100}}>
//       <ambientLight intensity={1} />
//       <directionalLight position={[2, 5, 5]} intensity={1} />
//         <Stars
//           radius={100}
//           depth={50}
//           count={5000}
//           factor={4}
//           saturation={0}
//           fade={2}
//           speed={1}
//         />
//         <Suspense>
//           <Rocket />
//         </Suspense>
//       </Canvas>
//     </View>
//   );
// };

const OtherSpinningRocketScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Canvas camera={{position: [-2, 1, 0], fov: 100}}>
        <ambientLight intensity={3} />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade={2}
          speed={1}
        />
        <Suspense>
        <Rocket2 />
        </Suspense>
        <OrbitControls />
        {/* <Rocket /> */}
        {/* <Rocket3 /> */}
      </Canvas>
    </View>
  );
};

export default OtherSpinningRocketScreen;
