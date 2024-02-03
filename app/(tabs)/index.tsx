import React, { useState, useMemo } from 'react'
import Listings from '@/components/Listings'
import Categories from '@/constants/Categories'
import ListingsMap from '@/components/ListingsMap'
import ExploreHeader from '@/components/ExploreHeader'
import ListingsBottomSheet from '@/components/ListingsBottomSheet'
import { Text, View } from 'react-native'
import { Link, Stack } from 'expo-router'
import listingsData from '@/assets/data/airbnb-listings.json'
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json'
import { type Listing } from '@/interfaces/listing'
import { type ListingGeo } from '@/interfaces/listingGeo'

export default function HomePage() {

    const [category, setCategory] = useState<string>(Categories[0].name)
    const items = useMemo(() => listingsData as Listing[], [])

    const onCategoryChange = (category: string) => {
        setCategory(category)
    }

    return (
        <View style={{ flex: 1, marginTop: 80 }}>
            <Stack.Screen
                options={{
                    header: () => <ExploreHeader {...{ onCategoryChange }}/>
                }}
            />
            <ListingsMap listings={listingsDataGeo as ListingGeo}/>
            <ListingsBottomSheet listings={items} category={category}/>
        </View>
    )
}