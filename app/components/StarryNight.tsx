import React from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';

export default function StarryNight() {
  const createAnimatedValue = () => new Animated.Value(0);

  const stars = Array.from({ length: 100 }).map((_, index) => {
    const opacity = createAnimatedValue();
    const left = Math.random() * 100 + '%';
    const top = Math.random() * 100 + '%';
    const size = Math.random() * 3 + 1;
    const delay = Math.random() * 2000; // Random delay up to 2 seconds

    React.useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
            delay,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1000,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
            delay,
          }),
        ])
      ).start();
    }, [opacity, delay]);

    return (
      <Animated.View
        key={index}
        style={[
          styles.star,
          { left, top, width: size, height: size, opacity },
        ]}
      />
    );
  });

  return (
    <View style={styles.container}>
      {stars}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    zIndex: -1,
  },
  star: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 50,
  },
});
