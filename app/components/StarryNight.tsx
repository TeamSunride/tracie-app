import React from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {MotiView} from 'moti';
// import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const particleVariants = (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  delay: number,
) => ({
  from: {
    opacity: 0,
    translateX: startX,
    translateY: startY,
  },
  animate: {
    opacity: [0, 0.8, 0],
    translateX: [startX, endX],
    translateY: [startY, endY],
    transition: {
      duration: 2000,
      repeat: Infinity,
      repeatDelay: 5000,
      delay: delay * 1000,
    },
  },
});

const generateRandomPosition = () => ({
  startX: Math.random() * width,
  startY: Math.random() * height,
  endX: Math.random() * width,
  endY: Math.random() * height,
});
const generateRandomStarPosition = () => ({
  top: Math.random() * height,
  left: Math.random() * width,
});

const generateRandomDelay = () => Math.random() * 10;
const generateRandomDuration = () => 1000 + Math.random() * 2000;

export default function StarryNight() {
  return (
    <View style={styles.starryNight}>
      {/* <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0)']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.milkyWay}
      /> */}
      <View style={styles.milkyWay} />
      {[...Array(300)].map((_, i) => {
        const {top, left} = generateRandomStarPosition();
        const delay = generateRandomDelay();
        const duration = generateRandomDuration();
        return (
          <MotiView
            key={i}
            style={[styles.star, {top, left}]}
            from={{opacity: 0}}
            animate={{opacity: [0, 1, 0]}}
            transition={{
              duration,
              repeat: Infinity,
              delay,
            }}
          />
        );
      })}
      {[...Array(5)].map((_, i) => {
        const {startX, startY, endX, endY} = generateRandomPosition();
        const delay = generateRandomDelay();
        return (
          <MotiView
            key={i}
            style={[styles.particles, {top: startY, left: startX}]}
            from={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
              type: 'timing',
              duration: 2000,
              repeat: Infinity,
              delay,
            }}>
            {[...Array(10)].map((_, j) => (
              <MotiView
                key={j}
                style={styles.particle}
                from={
                  particleVariants(startX, startY, endX, endY, delay + j * 0.1)
                    .from
                }
                animate={
                  particleVariants(startX, startY, endX, endY, delay + j * 0.1)
                    .animate
                }
              />
            ))}
          </MotiView>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  starryNight: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    zIndex: -1,
  },
  milkyWay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  star: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: 'white',
    borderRadius: 1,
  },
  particles: {
    position: 'absolute',
  },
  particle: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: 'white',
    borderRadius: 1,
  },
  comet: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: 'white',
    borderRadius: 2,
  },
});
