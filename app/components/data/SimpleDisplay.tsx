import {Text, View} from 'react-native';

export default function SimpleDisplay({title, value}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
      }}>
      <Text style={{color: 'white', fontWeight: '700'}}>{title}</Text>
      <Text style={{color: 'white', fontSize: 30}}>{value}</Text>
    </View>
  );
}