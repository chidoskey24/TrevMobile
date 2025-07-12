import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput as RNTextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/RootNavigator';
export default function PasswordResetScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const handleSend = () => {
    /* TODO: wire to backend → then maybe navigate back or show toast */
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Password Reset</Text>
      <Text style={styles.caption}>
        Enter the email associated with your account and we’ll send a reset link
        to you.
      </Text>

      <RNTextInput
        placeholder="Email"
        placeholderTextColor="#666"
        keyboardType="email-address"
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSend}
        style={styles.primaryBtn}
        contentStyle={styles.btnContent} >
      
        Send Reset Link
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
    color: '#111',
  },
  caption: {
    fontSize: 14,
    color: '#4E4E4E',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 20,
  },
  input: {
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#000',
    marginBottom: 24,
  },
  primaryBtn: {
    borderRadius: 32,
    backgroundColor: '#000000',
  },
  btnContent: { height: 56, color: '#fff', },
});
