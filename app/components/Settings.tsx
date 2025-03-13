import {useEffect, useMemo, useState} from 'react';
import {
  Text,
  View,
  SectionList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import StarryNight from './StarryNight';
import Logo from './Logo';
import Ionicons from '@expo/vector-icons/Ionicons';

const DATA = [
  {
    title: 'General',
    data: [
      {
        key: 'theme',
        label: 'Theme',
        icon: 'sparkles-sharp',
      },
    ],
  },
  {
    title: 'Feedback and Support',
    data: [
      {
        key: 'about',
        label: 'About',
        icon: 'help-circle-sharp',
      },
      {
        key: 'help',
        label: 'Help',
        icon: 'help-buoy-sharp',
      },
    ],
  },
];

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 150,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#bbb',
    marginBottom: 6,
    marginLeft: 16,
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
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginLeft: 56,
  },
  sectionSeparator: {
    height: 16,
  },
});

export default function Settings() {
  const starryBackground = useMemo(() => <StarryNight />, []);
  //   const [timeElapsed, setTimeElapsed] = useState('00:00:00');
  //   const [maxAltitude, setMaxAltitude] = useState('892');
  //   const [maxVerticalSpeed, setMaxVerticalSpeed] = useState('92');

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.item}>
      <Ionicons name={item.icon} size={22} color="#555" style={styles.icon} />
      <Text style={styles.label}>{item.label}</Text>
      <Ionicons name="chevron-forward" size={20} color="#aaa" />
    </TouchableOpacity>
  );

  const renderSectionHeader = ({section: {title}}) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );
  return (
    <>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <View style={styles.container}>
        <SectionList
          sections={DATA}
          keyExtractor={item => item.key}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          SectionSeparatorComponent={() => (
            <View style={styles.sectionSeparator} />
          )}
        />
      </View>
      {starryBackground}
    </>
  );
}
