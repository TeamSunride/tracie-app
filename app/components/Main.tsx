import React, {useState, useEffect, useMemo} from 'react';
import {View, Text, Button} from 'react-native';
import {MotiView, MotiText, useAnimationState} from 'moti';
import {Easing} from 'react-native-reanimated';
import StarryNight from './StarryNight';
import Logo from './Logo';
import LinearGradient from 'react-native-linear-gradient';
import {connectToServer, scanBleDevices} from '../../util/ble';

function handleBle() {
  scanBleDevices().then(async devices => {
    console.log('returned devices', devices);
    if (devices && devices.length > 0) {
      console.log('connecting to device', devices[0]);
      await connectToServer(devices[0]);
    }
  });
}

function Hello() {
  const [serverConnected, setServerConnected] = useState(false);
  const [fadeToBlack, setFadeToBlack] = useState(false);

  const controls = useAnimationState({
    idle: {
      translateY: [0, -5, 0], // Small up and down movement
      transition: {
        type: 'timing',
        duration: 1000, // Smooth 1-second hover cycle
        easing: Easing.inOut(Easing.sin), // Sinusoidal easing for a natural feel
        loop: true, // Repeats indefinitely
      },
    },
    blastOff: {
      translateY: -1000,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 100,
      },
    },
    shake: {
      translateX: [0, -10, 10, -10, 10, -10, 10, 0],
      translateY: 0,
      transition: {
        duration: 100,
        loop: true,
        easing: Easing.linear,
      },
    },
  });

  const handleServerConnection = () => {
    setServerConnected(!serverConnected);
  };

  const handleFadeToBlack = () => {
    setFadeToBlack(true);
  };

  useEffect(() => {
    if (serverConnected) {
      controls.transitionTo('blastOff');
      handleFadeToBlack();
    } else if (!serverConnected) {
      controls.transitionTo('idle');
    }
  }, [serverConnected, controls]);

  useEffect(() => {
    controls.transitionTo('idle');
  }, []);

  const starryBackground = useMemo(() => <StarryNight />, []);

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <Logo />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 160,
        }}>
        <MotiView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16,
          }}
          from={{opacity: 1}}
          animate={{opacity: fadeToBlack ? 0 : 1}}
          transition={{duration: 1000}}>
          <LinearGradient
            colors={[
              '#ff6b6b',
              '#f06595',
              '#cc5de8',
              '#845ef7',
              '#5c7cfa',
              '#339af0',
              '#22b8cf',
              '#20c997',
              '#51cf66',
              '#94d82d',
              '#fcc419',
              '#ff922b',
            ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{
              borderRadius: 9999,
              padding: 16,
              height: 320,
              width: 320,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            // whileHover={{scale: 0.9, backgroundPosition: '100% 50%'}}
          >
            <MotiText
              style={{fontSize: 144, textAlign: 'center'}}
              state={controls}
              from={{translateY: 0}}
              /*animate={controls.current}*/
            >
              🚀
            </MotiText>
          </LinearGradient>
        </MotiView>
      </View>
      <MotiView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        from={{opacity: 1}}
        animate={{opacity: fadeToBlack ? 0 : 1}}
        transition={{duration: 1000}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <MotiText
            from={{opacity: 0, y: -20}}
            animate={{
              opacity: serverConnected ? 1 : 0,
              y: serverConnected ? 0 : -20,
            }}
            transition={{duration: 500}}
            style={{color: 'green'}}>
            SERVER Connected!
          </MotiText>
        </View>
      </MotiView>
      <MotiView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        from={{opacity: 1}}
        animate={{opacity: fadeToBlack ? 0 : 1}}
        transition={{duration: 1000}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <MotiText
            from={{opacity: 1, y: 0}}
            animate={{
              opacity: serverConnected ? 0 : 1,
              y: serverConnected ? 20 : 0,
            }}
            transition={{duration: 500}}
            style={{color: 'red'}}>
            Waiting for SERVER connection...
          </MotiText>
        </View>
      </MotiView>
      <Button
        onPress={handleServerConnection}
        title="Simulate SERVER Connection"
        color="#841584"
      />
      <Button onPress={handleBle} title="Scan BLE Devices" color="#841584" />
      {starryBackground}
    </>
  );
}

export default Hello;
