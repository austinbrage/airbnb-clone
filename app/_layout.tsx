import Colors from '@/constants/Color';
import Ionicons from '@expo/vector-icons/Ionicons';
import ModalHeaderText from '@/components/ModalHeaderText';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';  
import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { StyleSheet } from 'react-native';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key)
    } catch(err) {
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch(err) {
      return
    }
  },
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'mon': require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider 
      tokenCache={tokenCache} 
      publishableKey={CLERK_PUBLISHABLE_KEY!}
    >
      <RootLayoutNav />
    </ClerkProvider>
  )
}

function RootLayoutNav() {

  const { isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    if(isLoaded && !isSignedIn) {
      return router.push('/(modals)/login')
    }
  }, [isLoaded, isSignedIn])

  return (
    <Stack>
      
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
      />

      <Stack.Screen 
        name='(modals)/login' 
        options={{
          headerTitleStyle: {
            fontFamily: 'mon-sb'
          },
          title: 'Log in or Sign up',
          presentation: 'modal',
        }}
      />

      <Stack.Screen 
        name='(modals)/booking' 
        options={{
          animation: 'fade',
          presentation: 'transparentModal'
        }}
      />

      <Stack.Screen 
        name='listing/[id]' 
        options={{
          animation: 'fade',
          headerTransparent: true,
          presentation: 'transparentModal',
          headerTitle: () => <ModalHeaderText/>,
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => router.back()}
              style={styles.clostBtn}  
            >
              <Ionicons name='close-outline' size={22}/>
            </TouchableOpacity>
          )
        }}
      />

    </Stack>
  );
}

const styles = StyleSheet.create({
  clostBtn: {
    backgroundColor: '#fff', 
    borderColor: Colors.grey,
    borderRadius: 20,
    borderWidth: 1,
    padding: 4
  }
})