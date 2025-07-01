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
import type { RootStackParamList } from '../navigation/RootNavigator';

// ────────────────────────────────────────────
// Types & hooks
// ────────────────────────────────────────────
type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function SignInScreen() {
  const navigation = useNavigation<Nav>();

  // ─────── Handlers (stub) ───────
  const handleNext = () => {
    /** TODO: validate email, maybe hit API, etc.               **/
    /** If everything is OK, forward user to the dashboard tab. **/

    // 2️⃣  LANDING inside BottomTabs (“Dashboard” stack entry)
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],   // MUST match the <Stack.Screen name="Dashboard" …/>
    });
  };
  const handleGoogleLogin = () => console.log('TODO: Google OAuth');

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

      {/* OR divider */}
      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <Text style={styles.or}>or</Text>
        <View style={styles.line} />
      </View>

      {/* Google only */}
      <TouchableOpacity style={styles.oauthBtn} onPress={handleGoogleLogin}>
        <Image
          source={require('../../assets/icons/google.png')}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.oauthText}>Continue with Google</Text>
      </TouchableOpacity>

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
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28,
  },
  line: { flex: 1, height: 1, backgroundColor: '#ddd' },
  or:   { marginHorizontal: 8, color: '#666', fontSize: 13 },
  oauthBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 16,
    alignSelf: 'center',
    width: '60%',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  oauthText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
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
