import Colors from "@/constants/Color"
import Categories from "@/constants/Categories"
import Ionicons from "@expo/vector-icons/Ionicons"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import * as Haptics from 'expo-haptics'
import { Link } from 'expo-router'
import { useRef, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"

interface Props {
    onCategoryChange: (category: string) => void
}

export default function ExploreHeader({ onCategoryChange }: Props) {

    const scrollRef = useRef<ScrollView>(null)
    const itemsRef = useRef<TouchableOpacity[] | null[]>([])
    const [activeItem, setActiveItem] = useState<number>(0)

    const selectCategory = (index: number) => {
        setActiveItem(index)
        onCategoryChange(Categories[index].name)

        const selected = itemsRef.current[index]
        selected?.measure((x) => {
            scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true })
        })

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
               
                <View style={styles.actionRow}>
                   
                    <Link href='/(modals)/booking' asChild>
                        <TouchableOpacity style={styles.searchBtn}>
                            <Ionicons name='search' size={24}/>
                            <View>
                                <Text style={{ fontFamily: 'mon-sb' }}>
                                    Where to?
                                </Text>
                                <Text style={{ fontFamily: 'mon-sb', color: Colors.grey }}>
                                    Anywhere - Any week
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </Link>
                    
                    <TouchableOpacity style={styles.filterBtn}>
                        <Ionicons name='options-outline' size={24}/>
                    </TouchableOpacity>

                </View>

                <ScrollView 
                    horizontal
                    ref={scrollRef}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        gap: 30,
                        alignItems: 'center',
                        paddingHorizontal: 16
                    }}
                >
                    {Categories.map((item, index) => (
                        <TouchableOpacity 
                            key={index}
                            onPress={() => selectCategory(index)}
                            ref={(el) => itemsRef.current[index] = el}
                            style={
                                activeItem === index 
                                    ? styles.categoriesBtnActive 
                                    : styles.categoriesBtn
                            }
                        >
                            <MaterialCommunityIcons 
                                size={24}
                                name={item.icon as any} 
                                color={activeItem === index ? '#000' : Colors.grey}
                            />
                            <Text
                                style={
                                    activeItem === index 
                                        ? styles.categoryTextActive 
                                        : styles.categoryText
                                }
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingBottom: 16,
        gap: 10
    },
    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 24,
        borderColor: Colors.grey
    },
    searchBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18,
        borderRadius: 30,
        borderColor: '#c2c2c2',
        borderWidth: StyleSheet.hairlineWidth,
        flex: 1,
        padding: 14,
        elevation: 2,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    categoryText: {
        fontSize: 14,
        fontFamily: 'mon-sb',
        color: Colors.grey
    },
    categoryTextActive: {
        fontSize: 14,
        fontFamily: 'mon-sb',
        color: '#000'
    },
    categoriesBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 8
    },
    categoriesBtnActive: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 8,
        borderBottomColor: '#000',
        borderBottomWidth: 2,
    }
})