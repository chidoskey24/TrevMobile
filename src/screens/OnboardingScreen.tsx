import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export default function OnboardingScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* top spacer – can be empty */}
      <View />

      {/* middle content */}
      <View style={styles.centerBlock}>
        <Text style={styles.welcome}>👋  Welcome to TrevMobile</Text>
      </View>

      {/* bottom button */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate('SignIn')}
        style={styles.cta}
        labelStyle={styles.ctaText}
      >
        Get Started
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'space-between',   // ← magic line
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  centerBlock: { alignItems: 'center' },
  welcome: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
    color: '#111',
  },
  cta: {
    alignSelf: 'stretch',
    borderRadius: 28,
    paddingVertical: 6,
    backgroundColor: '#000',
  },
  
  ctaText: { fontWeight: 'bold', fontSize: 16, color: '#FFF' },
});
