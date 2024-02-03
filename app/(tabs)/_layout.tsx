import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Tabs } from 'expo-router';
import Color from '@/constants/Color';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Color.primary,
        headerTitleAlign: 'center',
        tabBarLabelStyle: {
          fontFamily: 'mon-sb'
        }
      }}
    >
      
      <Tabs.Screen
        name='index'
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='search' size={size} color={color}/>
          )
        }}
      />

      <Tabs.Screen
        name='wishlists'
        options={{
          tabBarLabel: 'Wishlists',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='heart-outline' size={size} color={color}/>
          )
        }}
      />

      <Tabs.Screen
        name='trips'
        options={{
          tabBarLabel: 'Trips',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name='airbnb' size={size} color={color}/>
          )
        }}
      />

      <Tabs.Screen
        name='inbox'
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='message-outline' size={size} color={color}/>
          )
        }}
      />

      <Tabs.Screen
        name='profile'
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='person-circle-outline' size={size} color={color}/>
          )
        }}
      />

    </Tabs>
  );
}
