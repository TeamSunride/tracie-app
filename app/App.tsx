/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import '../global.css';
import { broadcast, setCompanyId } from 'react-native-ble-advertise';

const uuid = '44C13E43-097A-9C9F-537F-5666A6840C08';
const major = parseInt('CD00', 16);
const minor = parseInt('0003', 16);

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
          className="p-12">
          <Text className="text-5xl text-primary text-center font-bold">
            Sunride
          </Text>
          <Text className="text-3xl text-secondary text-center font-bold italics">
            Tracie App
          </Text>
          <Button
            title="set company id"
            onPress={() => {
              setCompanyId(0x00E0);
            }}
          />
          <Button
            title="advertise"
            onPress={() => {
              broadcast(uuid, major, minor)
                .then(success => {
                  console.log('broadcast started');
                })
                .catch(error => {
                  console.log('broadcast failed with: ' + error);
                });
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
