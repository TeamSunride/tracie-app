import {useEffect, useMemo, useState} from 'react';
import {Text, View} from 'react-native';
import StarryNight from './StarryNight';
import Logo from './Logo';
import SimpleDisplay from './data/SimpleDisplay';

export default function Complex() {
  const starryBackground = useMemo(() => <StarryNight />, []);
//   const [timeElapsed, setTimeElapsed] = useState('00:00:00');
//   const [maxAltitude, setMaxAltitude] = useState('892');
//   const [maxVerticalSpeed, setMaxVerticalSpeed] = useState('92');
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
          marginTop: 0,
        }}>
        <Text style={{color: 'white', fontWeight: '700'}}>COMPLICATED:</Text>
      </View>
      {starryBackground}
    </>
  );
}
