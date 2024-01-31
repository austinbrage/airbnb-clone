import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';  

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

  return <RootLayoutNav />;
}

function RootLayoutNav() {

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
          title: '',
          presentation: 'modal'
        }}
      />

    </Stack>
  );
}
