import { useState, useEffect } from 'react'
import { View, Text, FlatList } from "react-native"

interface Props {
    listings: any[]
    category: string
}

export default function Listings({ listings: items, category }: Props) {

    const [loading, setLoading] = useState<boolean>(false)
    
    useEffect(() => {
        setLoading(true)
        setTimeout(() => setLoading(false), 200)
    }, [category])

    return (
        <View>
            
        </View>
    )
}