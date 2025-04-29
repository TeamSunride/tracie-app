import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle, Rect, Path, Defs, LinearGradient, RadialGradient, Stop, G } from 'react-native-svg';

export default function DesertTheme() {
  const sunPosition = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(sunPosition, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, [sunPosition]);

  return (
    <View style={styles.container}>
      {/* Gradient Sky */}
      <Svg height="100%" width="100%" style={styles.background}>
        <Defs>
          <LinearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#FFCC80" />
            <Stop offset="50%" stopColor="#D38D5F" />
            <Stop offset="100%" stopColor="#4A2E2E" />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#skyGradient)" />
      </Svg>
      
      {/* Sun with Glare */}
      <View style={styles.sunContainer}>
        <Svg height="150" width="150" viewBox="0 0 100 100">
          <Defs>
            <RadialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#FFDA79" />
              <Stop offset="100%" stopColor="rgba(255,218,121,0)" />
            </RadialGradient>
          </Defs>
          <Circle cx="50" cy="50" r="40" fill="#FFAA33" />
          <Circle cx="50" cy="50" r="50" fill="url(#sunGradient)" opacity="0.5" />
        </Svg>
      </View>
      
      {/* Distant Mountains & Sand Dunes */}
      <Svg height="100%" width="100%" style={styles.mountains}>
        <Path d="M0,500 Q150,420 300,500 T600,500 T900,500 V600 H0 Z" fill="#5C4033" opacity="0.6" />
        <Path d="M0,550 Q200,450 400,550 T800,550 V600 H0 Z" fill="#7A5230" opacity="0.5" />
      </Svg>
      
      {/* Rock Formation */}
      <Svg height="100%" width="100%" style={styles.rockFormation}>
        <Path d="M100,500 Q150,400 200,500 Q220,450 250,500 Q270,420 300,500 Z" fill="#8B5A2B" />
      </Svg>
      
      {/* Hot Air Balloons (Silhouettes) */}
      <Svg height="100%" width="100%" style={styles.balloons}>
        <G fill="black" opacity="0.7">
          <Circle cx="100" cy="150" r="20" />
          <Rect x="95" y="170" width="10" height="10" />
        </G>
        <G fill="black" opacity="0.5">
          <Circle cx="300" cy="100" r="15" />
          <Rect x="295" y="115" width="10" height="10" />
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#4A2E2E',
    zIndex: -1,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  sunContainer: {
    position: 'absolute',
    top: '10%',
    left: '50%',
    marginLeft: -75,
    width: 150,
    height: 150,
  },
  mountains: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
  },
  rockFormation: {
    position: 'absolute',
    bottom: '10%',
    left: '10%',
    width: '30%',
    height: '20%',
  },
  balloons: {
    position: 'absolute',
    top: '5%',
    width: '100%',
    height: '20%',
  },
});