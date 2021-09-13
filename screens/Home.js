import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE,Marker }  from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Icon } from 'react-native-elements';

export default function Home() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [ region, setRegion ] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	})

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      setRegion({
        latitude:location.coords.latitude ,
        longitude :location.coords.longitude
      })
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
         <MapView style={styles.map}
              initialRegion={{
                latitude: 12.971599,
                longitude: 77.594566,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}>
              <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} 
              title="Current location" />
</MapView>
           <Icon
            raised
            name='google'
            
            type='font-awesome'
            color='#f50'
            onPress={() => alert("GPS Under Construction !!")} />
    
      
      </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
       ...StyleSheet.absoluteFillObject,
        height: 725,
      width: 500,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
 
});
