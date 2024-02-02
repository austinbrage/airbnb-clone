import React, { useState, useMemo } from 'react'
import Listings from '@/components/Listings'
import Categories from '@/constants/Categories'
import ExploreHeader from '@/components/ExploreHeader'
import { Text, View } from 'react-native'
import { Link, Stack } from 'expo-router'
import listingsData from '@/assets/data/airbnb-listings.json'
import { type Listing } from '@/interfaces/listing'

export default function HomePage() {

    const [category, setCategory] = useState<string>(Categories[0].name)
    const items = useMemo(() => listingsData as Listing[], [])

    const onCategoryChange = (category: string) => {
        setCategory(category)
    }

    return (
        <View style={{ flex: 1, marginTop: 150 }}>
            <Stack.Screen
                options={{
                    header: () => <ExploreHeader {...{ onCategoryChange }}/>
                }}
            />
            <Listings listings={items} category={category}/>
        </View>
    )
}