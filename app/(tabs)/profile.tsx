import React from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View, Button } from 'react-native'

export default function ProfileTab() {

    const { signOut, isSignedIn } = useAuth()

    return (
        <View>
            <Button 
                title='Sign out'
                onPress={() => signOut()}
            />
            {isSignedIn ? (
                <Link href='/(modals)/login'>
                    <Text>Sign In</Text>
                </Link>
            ) : null}
        </View>
    )
}