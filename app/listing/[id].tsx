import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"

export default function ListingPage() {

    const { id } = useLocalSearchParams<{ id: string }>()

    return (
        <View>
            <Text>Listing {id}</Text>
        </View>
    )
}