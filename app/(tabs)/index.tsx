import React from 'react'
import { Text, View } from 'react-native'
import { Link } from 'expo-router'

export default function HomePage() {
    return (
        <View>
            <Link href='/(modals)/login'>Login</Link>
            <Link href='/(modals)/booking'>Booking</Link>
        </View>
    )
}