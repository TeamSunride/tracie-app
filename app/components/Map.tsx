import {useAssets} from 'expo-asset';
import React, {useEffect, useRef, useState} from 'react';
import {useWindowDimensions, Platform, View, Text} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {network} from '../util/network';

type Props = {
  onInitialized: (zoomToGeoJSONFunc: () => void) => void;
  onMapPress: (coordinates: [number, number]) => void;
};

const Map = (props: Props) => {
  const {onInitialized, onMapPress} = props;
  const dimensions = useWindowDimensions();
  const webViewRef = useRef<WebView | null>();

  const [assets] = useAssets([require('../../assets/index.html')]);
  const [htmlString, setHtmlString] = useState<string>();

  useEffect(() => {
    if (assets) {
      fetch(assets[0].localUri || '')
        .then(res => res.text())
        .then(html => {
          setHtmlString(html);
        });
    }
  }, [assets]);

  const messageHandler = (e: WebViewMessageEvent) => {
    const coords = JSON.parse(e.nativeEvent.data) as [number, number];
    onMapPress(coords);
  };

  if (!htmlString) {
    return <> </>;
  }

  network.onPayloadReceived(payload => {
    console.log('Map Payload received:', payload);
    console.log('SENDING TO WEBVIEW', JSON.stringify([
        payload.longitudeAndLatitude.latitude,
        payload.longitudeAndLatitude.longitude,
        payload.altitude,
      ]));
    webViewRef.current?.postMessage(
      JSON.stringify([
        payload.longitudeAndLatitude.latitude,
        payload.longitudeAndLatitude.longitude,
        payload.altitude,
      ]),
    );
  });

  return (
    <WebView
      ref={webViewRef}
      webviewDebuggingEnabled
      source={{
        html: htmlString,
      }}
      javaScriptEnabled
      style={{
        width: dimensions.width,
        height: dimensions.height,
      }}
      scrollEnabled={false}
      overScrollMode="never"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      scalesPageToFit={false}
      containerStyle={{flex: 1}}
      onMessage={messageHandler}
    />
  );
};

export default function MapView() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 30, // Padding from phone status bar
      }}>
      <Text>
        <Map />
      </Text>
    </View>
  );
}
