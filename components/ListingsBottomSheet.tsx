import React, { useRef, useMemo } from 'react'
import Colors from '@/constants/Color'
import Listings from '@/components/Listings'
import BottomSheet from '@gorhom/bottom-sheet'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { type Listing } from '@/interfaces/listing'

interface Props {
    listings: Listing[]
    category: string
}

export default function ListingsBottomSheet({ listings, category }: Props) {

    const bottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = useMemo(() => ['10%', '100%'], [])

    const showMap = () => bottomSheetRef.current?.collapse()

    return (
        <BottomSheet 
            index={1}
            ref={bottomSheetRef} 
            style={styles.sheetContainer}
            snapPoints={snapPoints}
            enablePanDownToClose={false}
            handleIndicatorStyle={{
                backgroundColor: Colors.grey
            }}
        >
            <View style={{ flex: 1 }}>
                <Listings listings={listings} category={category}/>
                <View style={styles.absoluteBtn}>
                    <TouchableOpacity style={styles.btn} onPress={showMap}>
                        <Text style={styles.btnText}>
                            Map
                        </Text>
                        <Ionicons name='map' size={20} color={'#000'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    sheetContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 1,
            height: 1
        }
    },
    absoluteBtn: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: 'center'
    },
    btn: {
        backgroundColor: Colors.dark,
        gap: 8,
        padding: 16,
        height: 50,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnText: {
        color: '#fff',
        fontFamily: 'mon-sb'
    }
})