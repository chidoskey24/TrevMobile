// src/screens/ScanScreen.tsx
import React, { useState, useCallback } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { View, StyleSheet, Alert } from 'react-native';
import { Camera } from 'react-native-camera-kit';

type Props = NativeStackScreenProps<RootStackParamList, 'Scan'>;
type BarcodeReadEvent = {nativeEvent: { codeStringValue: string }};

export default function ScanScreen({ navigation }: Props) {
  const [scanned, setScanned] = useState(false);

const onReadCode = useCallback(                         // ✅ no TS error
  ({ nativeEvent }: { nativeEvent: { codeStringValue: string } }) => {
    if (scanned) return;
    setScanned(true);

    navigation.replace('Result', {
      data: nativeEvent.codeStringValue,                // what you display next
    });
  },
  [scanned, navigation],
);

// --------------- change starts here ---------------------------
return (
  <View style={styles.container}>
    <Camera
      scanBarcode={true}
      barcodeScannerEnabledTypes={['QR_CODE']} //only scan QR codes
      onReadCode={onReadCode}
      showFrame
      laserColor="#f00"
      frameColor="#0f0"
      style={{ flex: 1 }}
    />
  </View>
);

}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
});
