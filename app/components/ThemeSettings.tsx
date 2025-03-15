import React, {useState, useMemo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StarryNight from './StarryNight';
import Ionicons from '@expo/vector-icons/Ionicons';
import Desert from './Desert';

const ThemeSettings = () => {
  const [theme, setTheme] = useState('desert');
  const navigation = useNavigation();

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
  };

  const starryBackground = useMemo(() => <StarryNight />, []);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>Theme Settings</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleThemeChange('desert')}>
            <Ionicons name="sunny" size={22} color="#555" style={styles.icon} />
            <Text style={styles.label}>Desert</Text>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleThemeChange('starryNight')}>
            <Ionicons name="moon" size={22} color="#555" style={styles.icon} />
            <Text style={styles.label}>Starry Night</Text>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>
        </View>
      </View>
      {starryBackground}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 80, // Add padding to the top to make space for the back button
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent floating effect
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  icon: {
    marginRight: 16,
    color: '#fff',
  },
});

export default ThemeSettings;
