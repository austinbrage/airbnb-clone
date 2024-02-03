import MapView from 'react-native-map-clustering'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import defaultStyles from '@/constants/Styles'
import { useRouter } from 'expo-router'
import { View, Text, StyleSheet } from "react-native"
import type { ListingGeo, Feature } from "@/interfaces/listingGeo"

interface Props {
    listings: ListingGeo
}

const INITIAL_REGION = {
    latitude: 37.33,
    longitude: -122,
    latitudeDelta: 9,
    longitudeDelta: 9,
}

export default function ListingMap({ listings }: Props) {

    const router = useRouter()

    const onMarkerSelected = (item: Feature) => {
        router.push(`/listing/${item.properties.id}`)
    }

    const renderCluster = (cluster: any) => {
        const { id, geometry, onPress, properties } = cluster
        const points = properties.point_count

        return (
            <Marker 
                key={`cluster-${id}`}
                onPress={onPress}
                coordinate={{
                    latitude: geometry.coordinates[0],
                    longitude: geometry.coordinates[1],
                }}
            >   
                <View style={styles.marker}>
                    <Text style={{
                        color: '#000',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {points}
                    </Text>
                </View>
            </Marker>
        )
    }

    return (
        <View style={defaultStyles.container}>
            <MapView 
                style={StyleSheet.absoluteFill} 
                provider={PROVIDER_GOOGLE}
                animationEnabled={false}
                showsUserLocation
                showsMyLocationButton
                initialRegion={INITIAL_REGION}
                clusterColor='#fff'
                clusterTextColor='#000'
                clusterFontFamily='mon-sb'
                renderCluster={renderCluster}
            >
                {listings.features.map(item => (
                    <Marker 
                        key={item.properties.id}
                        onPress={() => onMarkerSelected(item)}
                        coordinate={{
                            latitude: +item.properties.latitude,
                            longitude: +item.properties.longitude
                        }} 
                    >
                        <View style={styles.marker}>
                            <Text style={styles.markerText}>
                                € {item.properties.price}
                            </Text>
                        </View>
                    </Marker>
                ))}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    marker: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        padding: 6,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10
        }
    },
    markerText: {
        fontSize: 14,
        fontFamily: 'mon-sb'
    }
})