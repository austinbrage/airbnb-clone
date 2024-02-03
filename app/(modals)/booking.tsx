// @ts-ignore
import DatePicker from 'react-native-modern-datepicker'
import Colors from '@/constants/Color'
import defaultStyles from '@/constants/Styles'
import Ionicons from '@expo/vector-icons/Ionicons'
import { guestsGroups } from '@/assets/data/groups'
import Animated, { FadeIn, FadeOut, SlideInDown } from 'react-native-reanimated'
import { useState } from 'react' 
import { BlurView } from "expo-blur"
import { useRouter } from 'expo-router'
import { places } from '@/assets/data/places'
import { 
    Text, 
    View, 
    Image,
    TextInput, 
    ScrollView, 
    StyleSheet, 
    TouchableOpacity, 
} from 'react-native'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

export default function BookingModal() {

    const router = useRouter()

    const [openCard, setOpenCard] = useState(0)
    const [groups, setGroups] = useState(guestsGroups)
    const [selectedPlace, setSelectedPlace] = useState(0)

    const today = new Date().toISOString().substring(0, 10)

    const onClearAll = () => {
        setOpenCard(0)
        setSelectedPlace(0)
        setGroups(guestsGroups)
    }

    return (
        <BlurView intensity={70} tint='light' style={styles.container}>

            {/* Where */}
            <View style={styles.card}>
                {openCard !== 0 ? (
                    <AnimatedTouchableOpacity
                        style={styles.cardPreview}
                        onPress={() => setOpenCard(0)}
                        entering={FadeIn.duration(200)}
                        exiting={FadeOut.duration(200)}
                    >
                        <Text style={styles.previewText}>
                            Where
                        </Text>
                        <Text style={styles.previewDate}>
                            I'm flexible
                        </Text>
                    </AnimatedTouchableOpacity>
                ) : null}

                {openCard === 0 ? (
                    <>
                        <Animated.Text entering={FadeIn} style={styles.cardHeader}>
                            Where
                        </Animated.Text>
                        <Animated.View style={styles.cardBody}>
                            <View style={styles.searchSection}>
                                <Ionicons 
                                    style={styles.searchIcon} 
                                    name='search' 
                                    size={20}
                                />
                                <TextInput 
                                    style={styles.inputField}
                                    placeholder='Search destinations'
                                    placeholderTextColor={Colors.grey}    
                                />
                            </View>
                        </Animated.View>
                        
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ 
                                gap: 25, 
                                paddingLeft: 20,
                                marginBottom: 30
                            }}
                        >
                            {places.map((item, index) => (
                                <TouchableOpacity 
                                    key={index}
                                    onPress={() => setSelectedPlace(index)}
                                >
                                    <Image 
                                        source={item.img}
                                        style={
                                            selectedPlace === index 
                                                ? styles.placeSelected
                                                : styles.place    
                                        }
                                    />
                                    <Text 
                                        style={[{ paddingTop: 6, fontFamily: 'mon' }, 
                                            selectedPlace === index 
                                                ? { fontFamily: 'mon-sb' }
                                                : null
                                        ]}
                                    >
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </>
                ) : null}
            </View>

            {/* When */}
            <View style={styles.card}>
                {openCard !== 1 ? (
                    <AnimatedTouchableOpacity
                        style={styles.cardPreview} 
                        onPress={() => setOpenCard(1)}
                        entering={FadeIn.duration(200)}
                        exiting={FadeOut.duration(200)}
                    >
                        <Text style={styles.previewText}>
                            When
                        </Text>
                        <Text style={styles.previewDate}>
                            Any week
                        </Text>
                    </AnimatedTouchableOpacity>
                ) : null}

                {openCard === 1 ? (
                    <>
                        <Animated.Text entering={FadeIn} style={styles.cardHeader}>
                            When's your trip?
                        </Animated.Text>
                        <Animated.View style={styles.cardBody}>
                            <DatePicker
                                current={today}
                                selected={today}
                                mode={'calendar'}
                                options={{
                                    defaultFont: 'mon',
                                    headerFront: 'mon-sb',
                                    borderColor: 'transparent',
                                    mainColor: Colors.primary
                                }}
                            />
                        </Animated.View>
                    </>
                ) : null}
            </View>

            {/* Who */}
            <View style={styles.card}>
                {openCard !== 2 ? (
                    <AnimatedTouchableOpacity
                        style={styles.cardPreview}
                        onPress={() => setOpenCard(2)}
                        entering={FadeIn.duration(200)}
                        exiting={FadeOut.duration(200)}
                    >
                        <Text style={styles.previewText}>
                            Who
                        </Text>
                        <Text style={styles.previewDate}>
                            Add guests
                        </Text>
                    </AnimatedTouchableOpacity>
                ) : null}

                {openCard === 2 ? (
                    <>
                        <Animated.Text entering={FadeIn} style={styles.cardHeader}>
                            Who's coming?
                        </Animated.Text>
                        <Animated.View style={styles.cardBody}>
                            {groups.map((item, index) => (
                                <View 
                                    key={index} 
                                    style={[styles.guestItem,
                                        index + 1 < guestsGroups.length 
                                            ? styles.itemBorder
                                            : null
                                    ]}
                                >
                                    <View>
                                        <Text style={styles.guestName}>{item.name}</Text>
                                        <Text style={styles.guestText}>{item.text}</Text>
                                    </View>
                                    <View style={styles.guestIcons}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                const newGroups = [...groups]
                                                newGroups[index].count = newGroups[index].count > 0
                                                    ? newGroups[index].count - 1
                                                    : 0
                                                setGroups(newGroups)
                                            }}
                                        >
                                            <Ionicons 
                                                size={26}
                                                name='remove-circle-outline'
                                                color={
                                                    groups[index].count > 0
                                                        ? Colors.grey
                                                        : '#cdcdcd'
                                                }   
                                            />
                                        </TouchableOpacity>
                                        
                                        <Text style={styles.guestCount}>
                                            {groups[index].count}
                                        </Text>
                                        
                                        <TouchableOpacity
                                            onPress={() => {
                                                const newGroups = [...groups]
                                                newGroups[index].count++
                                                setGroups(newGroups)
                                            }}
                                        >
                                            <Ionicons 
                                                size={26}
                                                name='add-circle-outline'
                                                color={Colors.grey}   
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </Animated.View>
                    </>
                ) : null}
            </View>
            
            {/* Footer */}
            <Animated.View 
                entering={SlideInDown.delay(200)}
                style={defaultStyles.footer}
            >
                <View style={styles.footerContainer}>
                    
                    <TouchableOpacity onPress={onClearAll}>
                        <Text style={styles.btnText}>
                            Clear all
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        onPress={() => router.back()} 
                        style={[defaultStyles.btn, { padding: 20, paddingLeft: 50 }]}
                    >
                        <Ionicons 
                            name='search-outline' 
                            size={24} 
                            color={'#fff'}
                            style={defaultStyles.btnIcon}
                        />
                        <Text style={defaultStyles.btnText}>
                            Search
                        </Text>
                    </TouchableOpacity>
                    
                </View>
            </Animated.View>

        </BlurView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        fontSize: 18,
        fontFamily: 'mon-sb',
        textDecorationLine: 'underline'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        margin: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 2,
            height: 2
        },
        gap: 20
    },
    cardPreview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    cardHeader: {
        padding: 20,
        fontSize: 24,
        fontFamily: 'mon-sb'
    },
    cardBody: {
        paddingHorizontal: 20,
    },
    previewText: {
        color: Colors.grey,
        fontSize: 14,
        fontFamily: 'mon-sb'
    },
    previewDate: {
        color: Colors.dark,
        fontSize: 14,
        fontFamily: 'mon-sb' 
    },
    searchSection: {
        height: 50,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ABABAB',
        backgroundColor: '#fff',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 4
    },
    searchIcon: {
        padding: 10
    },
    inputField: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    place: {
        width: 120,
        height: 120,
        borderRadius: 10
    },
    placeSelected: {
        width: 120,
        height: 120,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.grey
    },
    guestItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16
    },
    guestCount: {
        fontSize: 16,
        fontFamily: 'mon',
        textAlign: 'center',
        minWidth: 18
    },
    guestName: {
        fontSize: 14,
        fontFamily: 'mon-sb'
    },
    guestText: {
        fontSize: 14,
        fontFamily: 'mon-sb',
        color: Colors.grey
    },
    guestIcons: { 
        gap: 10, 
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.grey
    }
})