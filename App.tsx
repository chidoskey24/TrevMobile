import 'react-native-quick-crypto';  // must come before WC code
import { Buffer } from 'buffer';
global.Buffer = Buffer;


import React from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import WalletConnectProvider from '@walletconnect/react-native-dapp';

import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <WalletConnectProvider
      /* v1 props */
      bridge="https://bridge.walletconnect.org"
      redirectUrl={
        Platform.OS === 'android' ? 'trevmobile://' : 'trevmobile://'
      }
      storageOptions={{ asyncStorage: AsyncStorage as any}}
    >
      <PaperProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </WalletConnectProvider>
  );
}
