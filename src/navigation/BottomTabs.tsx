//  src/navigation/BottomTabs.tsx
import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from './RootNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DashboardScreen from '../screens/DashboardScreen';
import Dummy           from '../screens/Placeholder';    // still used for the hidden Scan tab
import SettingsScreen  from '../screens/SettingsScreen'; // ✅ real settings
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#000',
          tabBarStyle: { height: 72, paddingBottom: 8 },
        }}>
        {/* Home */}
        <Tab.Screen
          name="Home"
          component={DashboardScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                source={require('../../assets/icons/home.png')}
                style={[styles.icon, { tintColor: color }]}
              />
            ),
          }}
        />

        {/* Scan – hidden, launch via FAB */}
        <Tab.Screen
          name="Scan"
          component={Dummy}
          options={{ tabBarButton: () => null }}
        />

        {/* Settings – ↩︎ was Dummy, now real screen */}
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}      
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                source={require('../../assets/icons/settings.png')}
                style={[styles.icon, { tintColor: color }]}
              />
            ),
          }}
        />
      </Tab.Navigator>

      {/* floating Scan FAB */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.fab}
        onPress={() => navigation.navigate('Scan')}>
        <Image
          source={require('../../assets/icons/scan.png')}
          style={{ width: 40, height: 40, tintColor: '#000' }}
        />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
});
