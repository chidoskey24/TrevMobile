//  src/navigation/RootNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppStore } from '../store/useAppStore';

import OnboardingScreen   from '../screens/OnboardingScreen';
import SignInScreen       from '../screens/SignInScreen';
import SignUpScreen       from '../screens/SignUpScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen';
import BottomTabs         from './BottomTabs';
import ScanScreen         from '../screens/ScanScreen';
import ResultScreen       from '../screens/ResultScreen';
import SettingsScreen     from '../screens/SettingsScreen';
import { ActivityIndicator, View } from 'react-native';



/* ---------------- params ---------------- */
export type AuthStackParamList = {
  Onboarding    : undefined;
  SignIn        : undefined;
  SignUp        : undefined;
  PasswordReset : undefined;
};

export type AppStackParamList = {
  Dashboard : undefined;
  Scan      : undefined;
  Result    : { data: string };
  Settings  : undefined;
};

// Combined type for navigation across both stacks
export type RootStackParamList = AuthStackParamList & AppStackParamList;

/* ---------------- stacks ---------------- */
const Auth    = createNativeStackNavigator<AuthStackParamList>();
const AppNav  = createNativeStackNavigator<AppStackParamList>();

/* small helper components */
const AuthStack = () => (
  <Auth.Navigator screenOptions={{ headerShown: false }} initialRouteName="Onboarding">
    <Auth.Screen name="Onboarding"    component={OnboardingScreen} />
    <Auth.Screen name="SignIn"        component={SignInScreen} />
    <Auth.Screen name="SignUp"        component={SignUpScreen} />
    <Auth.Screen name="PasswordReset" component={PasswordResetScreen} />
  </Auth.Navigator>
);

const AppStack = () => (
  <AppNav.Navigator screenOptions={{ headerShown: false }}>
    <AppNav.Screen name="Dashboard" component={BottomTabs} />
    <AppNav.Screen name="Scan"      component={ScanScreen}    />
    <AppNav.Screen name="Result"    component={ResultScreen}  />
    <AppNav.Screen name="Settings"  component={SettingsScreen}/>
  </AppNav.Navigator>
);

/* ---------------- root navigator (no <NavigationContainer>) ---------------- */
export default function RootNavigator() {
  const hydrated = useAppStore((s) => s._hasHydrated);
  const user     = useAppStore((s) => s.user);

  /* show a tiny spinner while MMKV → Zustand restores the cache */
  if (!hydrated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return user ? <AppStack /> : <AuthStack />;
}
