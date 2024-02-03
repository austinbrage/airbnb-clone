import Colors from '@/constants/Color'
import defaultStyles from '@/constants/Styles'
import * as ImagePicker from 'expo-image-picker'
import React, { useState, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { 
    Text, 
    View, 
    Image, 
    Button, 
    TextInput,
    StyleSheet, 
    SafeAreaView, 
    TouchableOpacity 
} from 'react-native'

export default function ProfileTab() {

    const { user } = useUser()
    const { signOut, isSignedIn } = useAuth()

    const [edit, setEdit] = useState(false)
    const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress)
    const [lastName, setLastName] = useState(user?.lastName)
    const [firstName, setFirstName] = useState(user?.firstName)

    useEffect(() => {
        if(!user) return

        setEmail(user.emailAddresses[0].emailAddress)
        setLastName(user.lastName)
        setFirstName(user.firstName)
    }, [user])

    const onSaveUser = async () => {
        try {
            if(!firstName || !lastName) return

            await user?.update({
                firstName,
                lastName
            })
        } catch(err) {
            console.error(err)
        } finally {
            setEdit(false)
        }
    }

    const onCaptureImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.75,
            base64: true
        })     
        
        if(!result.canceled) {
            const base64 = `data:image/png;base64,${result.assets[0].base64}`
            user?.setProfileImage({
                file: base64
            })
        }
    }

    return (
        <SafeAreaView style={defaultStyles.container}>
           
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Profile</Text>
                <Ionicons name='notifications-outline' size={26}/>
            </View>
           
            {user ? (
                <View style={styles.card}>

                    <TouchableOpacity onPress={onCaptureImage}>
                        <Image 
                            style={styles.avatar} 
                            source={{ uri: user?.imageUrl }}
                        />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', gap: 6 }}>
                        
                        {edit ? (
                            <View style={styles.editRow}>
                                <TextInput 
                                    placeholder='First name'
                                    value={firstName ?? ''}
                                    onChangeText={setFirstName}
                                    style={[defaultStyles.inputField, { width: 100 }]}
                                />
                                <TextInput 
                                    placeholder='Last name'
                                    value={lastName ?? ''}
                                    onChangeText={setLastName}
                                    style={[defaultStyles.inputField, { width: 100 }]}
                                />
                                <TouchableOpacity onPress={onSaveUser}>
                                    <Ionicons 
                                        name='checkmark-outline' 
                                        size={24} 
                                        color={Colors.dark}
                                    />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.editRow}>
                                <Text style={{ fontSize: 22, fontFamily: 'mon-sb' }}>
                                    {firstName} {lastName}
                                </Text>
                                <TouchableOpacity onPress={() => setEdit(true)}>
                                    <Ionicons 
                                        name='create-outline' 
                                        size={24} 
                                        color={Colors.dark}
                                    />
                                </TouchableOpacity>
                            </View>
                        )}

                    </View>

                    <Text>{email}</Text>
                    <Text>Since {user?.createdAt?.toLocaleDateString()}</Text>

                </View>
            ) : null}

            {isSignedIn ? (
                <Button 
                    title='Sign out'
                    color={Colors.dark}
                    onPress={() => signOut()}
                />
            ) : null}
           
            {!isSignedIn ? (
                <Link href='/(modals)/login' asChild>
                    <Button 
                        title='Log in'
                        color={Colors.dark}
                    />
                </Link>
            ) : null}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24
    },
    header: {
        fontFamily: 'mon-sb',
        fontSize: 24
    },
    card: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 16,
        marginHorizontal: 24, 
        marginTop: 24,
        elevation: 2,
        shadowColor: '#fff',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 1
        },
        alignItems: 'center',
        gap: 14,
        marginBottom: 24
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.grey
    },
    editRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        height: 50
    }
})