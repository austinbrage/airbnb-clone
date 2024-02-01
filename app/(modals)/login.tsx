import Colors from '@/constants/Color'
import defaultStyles from '@/constants/Styles'
import Ionicons from '@expo/vector-icons/Ionicons'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { useOAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

enum Strategy {
    Apple = 'oauth_apple',
    Google = 'oauth_google',
    Facebook = 'oauth_facebook'
}

export default function LoginModal() {

    useWarmUpBrowser()

    const router = useRouter()

    const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' })
    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' })
    const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' })

    const onSelectAuth = async (strategy: Strategy) => {
        const selectedAuth = {
            [Strategy.Apple]: appleAuth,
            [Strategy.Google]: googleAuth,
            [Strategy.Facebook]: facebookAuth,
        }[strategy]

        try {
            const { createdSessionId, setActive } = await selectedAuth()

            createdSessionId && setActive!({ session: createdSessionId })
            createdSessionId && router.back()
        } catch(err) {
            console.error('OAuth error: ', err)
        }
    }

    return (
        <View style={styles.container}>

            <TextInput
                placeholder='Email'
                autoCapitalize='none'
                style={[ defaultStyles.inputField, {
                    marginBottom: 30
                } ]}
            />

            <TouchableOpacity style={defaultStyles.btn}>
                <Text style={defaultStyles.btnText}>
                    Continue
                </Text>
            </TouchableOpacity>

            <View style={styles.separatorView}>
                <View style={styles.separatorLine}/>
                <Text style={styles.separator}>Or</Text>
                <View style={styles.separatorLine}/>
            </View>

            <View style={{ gap: 20 }}>
               
                <TouchableOpacity style={styles.btnOutline}>   
                    <Ionicons name='call-outline' size={24} style={defaultStyles.btnIcon}/>
                    <Text style={styles.btnOutlineText}>
                        Continue with Phone
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.btnOutline}
                    onPress={() => onSelectAuth(Strategy.Apple)}
                >
                    <Ionicons name='logo-apple' size={24} style={defaultStyles.btnIcon}/>
                    <Text style={styles.btnOutlineText}>
                        Continue with Apple
                    </Text>
                </TouchableOpacity>
              
                <TouchableOpacity 
                    style={styles.btnOutline}
                    onPress={() => onSelectAuth(Strategy.Google)}
                >
                    <Ionicons name='logo-google' size={24} style={defaultStyles.btnIcon}/>
                    <Text style={styles.btnOutlineText}>
                        Continue with Google
                    </Text>
                </TouchableOpacity>
              
                <TouchableOpacity 
                    style={styles.btnOutline}
                    onPress={() => onSelectAuth(Strategy.Facebook)}
                >
                    <Ionicons name='logo-facebook' size={24} style={defaultStyles.btnIcon}/>
                    <Text style={styles.btnOutlineText}>
                        Continue with Facebook
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 26,
        backgroundColor: '#fff'
    },
    separatorView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
        gap: 10
    },
    separatorLine: {
        flex: 1,
        borderBottomColor: '#000',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    separator: {
        fontFamily: 'mon-sb',
        color: Colors.grey
    },
    btnOutline: {
        backgroundColor: '#fff',
        borderColor: Colors.grey,
        borderRadius: 8,
        borderWidth: 1,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    btnOutlineText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'mon-sb'
    }
})