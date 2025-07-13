//  src/screens/SignInScreen.tsx
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput as RNTextInput,
} from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useAppStore } from '../store/useAppStore';

/* ------------------------------------------------------------------ */
/* Types & hooks                                                      */
/* ------------------------------------------------------------------ */
type Nav = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

export default function SignInScreen() {
  const navigation = useNavigation<Nav>();

  /* local input state ------------------------------------------------ */
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');

  /* store ------------------------------------------------------------ */
  const setUser = useAppStore(s => s.setUser);

  /* handlers --------------------------------------------------------- */
  const handleNext = () => {
    // TODO: validate credentials, call backend, etc.
    // For now we persist a dummy user and land in the dashboard.
    setUser({
      id:    '1',
      name:  'John Doe',
      email: 'john.doe@example.com',
    });
    navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
  };

  const goToSignUp = () => navigation.navigate('SignUp');
  const goToReset  = () => navigation.navigate('PasswordReset');

  /* ------------------------------------------------------------------ */
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Login to get started</Text>

      {/* E-mail -------------------------------------------------------- */}
      <RNTextInput
        placeholder="Email"
        placeholderTextColor="#666"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      {/* Password ------------------------------------------------------ */}
      <RNTextInput
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
        style={[styles.input, { marginTop: 12 }]}
      />

      {/* Forgot password ---------------------------------------------- */}
      <TouchableOpacity onPress={goToReset} style={styles.forgotWrap}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* CTA ----------------------------------------------------------- */}
      <Button
        mode="contained"
        contentStyle={{ height: 50 }}
        style={[
          styles.primaryBtn,
          (!email || !password) && { opacity: 0.4 },   // visual cue
        ]}
        labelStyle={styles.primaryLabel}
        onPress={handleNext}
        disabled={!email.trim() || !password.trim()}   // guard stays
      >
        Next
      </Button>

      {/* Footer link --------------------------------------------------- */}
      <TouchableOpacity style={styles.bottomWrap} onPress={goToSignUp}>
        <Text style={styles.bottomLink}>Create a TrevMobile Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 32,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
    marginBottom: 32,
  },
  input: {
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#000',
  },
  forgotWrap: {
    alignItems: 'flex-end',
    marginTop: 8,
    marginBottom: 16,
  },
  forgot: {
    fontSize: 13,
    color: '#0066CC',
    fontWeight: '600',
  },
  primaryBtn: {
    borderRadius: 28,
    backgroundColor: '#000',
  },
  primaryLabel: {
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
    color: '#fff',
  },
  bottomWrap: {
    marginTop: 'auto',
    marginBottom: 24,
    alignItems: 'center',
  },
  bottomLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
});
