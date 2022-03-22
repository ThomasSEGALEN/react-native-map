import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Dimensions, Image, StatusBar, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
// import Animated from 'react-native-reanimated';

export default function App() {
    const [markers, setMarkers] = useState([]);
    const [image, setImage] = useState(null);

    const pickImage = (event, marker) => {
        ImagePicker.launchCameraAsync().then(result => {
            if (result.cancelled) {
                return;
            }
            marker.image = result.uri
            setMarkers([...markers])
        })
    }

    const displayImage = (event, marker) => {
        setImage(marker.image)
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar />
            <MapView
                style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                }}
                initialRegion={{
                    latitude: 47.48,
                    longitude: -0.55,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.04,
                }}
                onLongPress={(event) =>
                    setMarkers([
                        ...markers,
                        event.nativeEvent
                    ])
                }
            >
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={marker.coordinate}
                        title={"Lieu"}
                        description={marker.image ? "Voir la photo" : "Cliquez pour prendre une photo"}
                        onCalloutPress={() => marker.image ? pickImage(marker) : displayImage(marker)}
                    />
                ))}
            </MapView>
            {image && (
                <View style={{ position: 'absolute', left: 20, right: 20, bottom: 20, elevation: 4, borderRadius: 20, alignItems: 'center', backgroundColor: 'white', padding: 5 }}>
                    <Image style={{ width: 200, height: 200, resizeMode: 'contain' }} source={image} />
                    <Ionicons name={'close-outline'} size={32} onPress={() => setImage(null)} />
                </View>
            )}
        </View>
    );
}
