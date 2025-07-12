import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput as RNTextInput,
  Image,
} from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/RootNavigator';
import { useAppStore } from '../store/useAppStore';
// ────────────────────────────────────────────
// Types & hooks
// ────────────────────────────────────────────
type Nav = NativeStackNavigationProp<AuthStackParamList>;

export default function SignInScreen() {
  const navigation = useNavigation<Nav>();
  const { setUser } = useAppStore();
  // ─────── Handlers (stub) ───────
  const handleNext = () => {
    /** TODO: validate email, maybe hit API, etc.               **/
    /** If everything is OK, forward user to the dashboard tab. **/

    // // 2️⃣  LANDING inside BottomTabs (“Dashboard” stack entry)
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Dashboard' }],   // MUST match the <Stack.Screen name="Dashboard" …/>
    // });
    setUser({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
  };

  // Nav helpers
  const goToSignUp      = () => navigation.navigate('SignUp');
  const goToReset       = () => navigation.navigate('PasswordReset');

  return (
    <ScrollView contentContainerStyle={styles.container}>      
      {/* ───────── Heading ───────── */}
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Login to get started</Text>

      {/* ───────── Email field ───────── */}
      <RNTextInput
        placeholder="Email"
        placeholderTextColor="#666"
        keyboardType="email-address"
        style={styles.input}
      />

      {/* Forgot password link */}
      <TouchableOpacity onPress={goToReset} style={styles.forgotWrap}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Primary CTA */}
      <Button
        mode="contained"
        contentStyle={{ height: 50 }}
        style={styles.primaryBtn}
        labelStyle={styles.primaryLabel}
        onPress={handleNext}
      >
        Next
      </Button>

      {/* Bottom link */}
      <TouchableOpacity style={styles.bottomWrap} onPress={goToSignUp}>
        <Text style={styles.bottomLink}>Create a TrevMobile Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ────────────────────────────────────────────
// Styles – mirrors SignUpScreen.tsx theme
// ────────────────────────────────────────────
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
