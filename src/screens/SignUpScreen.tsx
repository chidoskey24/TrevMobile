import React from 'react';
import { Image } from 'react-native';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput as RNTextInput,
} from 'react-native';
import { Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function SignUpScreen() {
  // stub handlers – replace later
  const handleCreate = () => console.log('TODO: create account');
  const handleGoogle = () => console.log('TODO: Google OAuth');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ─────────── Heading ─────────── */}
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      {/* ─────────── Form fields ─────────── */}
      <RNTextInput placeholder="Name"        style={styles.input} placeholderTextColor="#666" />
      <RNTextInput placeholder="Email"       style={styles.input} keyboardType="email-address" />
      <RNTextInput placeholder="Phone"       style={styles.input} keyboardType="phone-pad" />
      <RNTextInput placeholder="Password"    style={styles.input} secureTextEntry />

      {/* primary CTA */}
      <Button
        mode="contained"
        contentStyle={{ height: 50 }}
        style={styles.primaryBtn}
        labelStyle={styles.primaryLabel}
        onPress={handleCreate}
      >
        Create Account
      </Button>

      {/* OR divider */}
      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <Text style={styles.or}>or</Text>
        <View style={styles.line} />
      </View>

      {/* Google OAuth only */}
      <TouchableOpacity style={styles.oauthBtn} onPress={handleGoogle}>
        <Image
          source={require('../../assets/icons/google.png')}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.oauthText}>Continue with Google</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

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
  icon: {
    width: 24, height: 24, marginRight: 10 
  },
  input: {
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 15,
    color: '#000',
  },
  primaryBtn: {
    borderRadius: 28,
    backgroundColor: '#000',        // black like Sign-In’s “Next”
    marginTop: 8,
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
    textAlign: 'center',
    marginTop: 16,
    alignSelf: 'center',  // center horizontally
    width: '60%',  // full width like Sign-In
  },
  oauthText: {
    fontSize: 15,
    fontWeight: '600',              // bold – matches spec
    color: '#000',
  },
});
