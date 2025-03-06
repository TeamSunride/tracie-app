import {useEffect, useMemo, useState} from 'react';
import {Text, View} from 'react-native';
import StarryNight from './StarryNight';
import Logo from './Logo';
import SimpleDisplay from './data/SimpleDisplay';
import WebView from 'react-native-webview';

export default function History() {
  const starryBackground = useMemo(() => <StarryNight />, []);
  //   const [timeElapsed, setTimeElapsed] = useState('00:00:00');
  //   const [maxAltitude, setMaxAltitude] = useState('892');
  //   const [maxVerticalSpeed, setMaxVerticalSpeed] = useState('92');
  return (
    <>
      {/* <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <Logo />
      </View> */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 0,
        }}>
        {/* <Text style={{color: 'white', fontWeight: '700'}}>HISTORY:</Text> */}
        <WebView
          originWhitelist={['*']}
          //source={{ uri: "file:///android_asset/threejs/index.html" }} // Android
          source={require('../assets/index.html')} // iOS (needs bundling)
          allowFileAccess={true}
          allowFileAccessFromFileURLs={true}
          allowUniversalAccessFromFileURLs={true}
        />
      </View>
      {/* {starryBackground} */}
    </>
  );
}
