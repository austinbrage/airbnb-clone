import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Link } from 'expo-router'
import { useRef, useState, useEffect } from 'react'
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import { type ListRenderItem } from "react-native"
import { type Listing } from '@/interfaces/listing'

interface Props {
    listings: Listing[]
    category: string
}

export default function Listings({ listings: items, category }: Props) {

    const listRef = useRef<FlatList>(null)
    const [loading, setLoading] = useState<boolean>(false)
    
    useEffect(() => {
        setLoading(true)
        setTimeout(() => setLoading(false), 200)
    }, [category])
    
    const renderRow: ListRenderItem<Listing> = ({ item }) => (
        <Link href={`/listing/${item.id}`} asChild>
            <TouchableOpacity>
                <Animated.View 
                    style={styles.listing}
                    entering={FadeInRight}
                    exiting={FadeOutLeft}
                >

                    <Image source={{ uri: item.medium_url }} style={styles.image}/>
                    
                    <TouchableOpacity style={styles.heartIcon}>
                        <Ionicons name='heart-outline' size={24} color='#000'/>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, fontFamily: 'mon-sb' }}>
                            {item.name}
                        </Text>
                       
                        <View style={{ flexDirection: 'row', gap: 4 }}>
                            <Ionicons name='star' size={16}/>
                            <Text style={{ fontFamily: 'mon-sb' }}>
                                {item.review_scores_rating / 20}
                            </Text>
                        </View>
                    </View>

                    <Text style={{ fontFamily: 'mon' }}>{item.room_type}</Text>

                    <View style={{ flexDirection: 'row', gap: 4 }}>
                        <Text style={{ fontFamily: 'mon-sb' }}>{item.price}</Text>
                        <Text style={{ fontFamily: 'mon' }}>night</Text>
                    </View>

                </Animated.View>
            </TouchableOpacity>
        </Link>
    )

    return (
        <View>
            <FlatList
                ref={listRef}
                data={loading ? [] : items}
                keyExtractor={(item) => item.id}
                renderItem={renderRow}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    listing: {
        padding: 16,
        gap: 10,
        marginVertical: 16
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10
    },
    heartIcon: {
        position: 'absolute',
        right: 30,
        left:30
    }
})