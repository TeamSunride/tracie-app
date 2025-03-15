import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AboutSettings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About Settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
});

export default AboutSettings;
