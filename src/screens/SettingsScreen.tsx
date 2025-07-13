//  src/screens/SettingsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Text, IconButton } from 'react-native-paper';

import { useAppStore } from '../store/useAppStore';
import { useWallet }   from '../hooks/useWallet';

/* ──────────────────────────────────────────
   Screen
   ─────────────────────────────────────── */
export default function SettingsScreen() {
  /* Zustand */
  const user            = useAppStore(s => s.user);
  const resetUser       = useAppStore(s => s.resetUser);

  /* WalletConnect */
  const { connect, disconnect, connector } = useWallet();
  const [busy, setBusy]  = useState(false);

  const handleWalletPress = async () => {
    try {
      setBusy(true);
      if (connector.connected) {
        await disconnect();
      } else {
        await connect();
      }
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = () => resetUser();

  /* Derived state */
  const connected = Boolean(user?.walletAddress);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Account</Text>

      {/* Profile row — just a stub for now */}
      <TouchableOpacity style={styles.row}>
        <IconButton icon="account" size={20} />
        <View>
          <Text style={styles.rowTitle}>Profile</Text>
          <Text style={styles.rowSub}>Add your name &amp; email</Text>
        </View>
      </TouchableOpacity>

      {/* Wallet row */}
      <TouchableOpacity style={styles.row} onPress={handleWalletPress}>
        <IconButton icon="qrcode-scan" size={20} />
        <View>
          <Text style={styles.rowTitle}>
            {connected ? 'Disconnect wallet' : 'Link wallet'}
          </Text>
          <Text style={styles.rowSub}>
            {connected
              ? user!.walletAddress!.slice(0, 6) + '…' + user!.walletAddress!.slice(-4)
              : 'MetaMask, Rainbow …'}
          </Text>
        </View>

        {busy && <ActivityIndicator style={{ marginLeft: 'auto' }} />}
      </TouchableOpacity>

      {/* Log-out button */}
      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={styles.logoutLabel}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ──────────────────────────────────────────
   Styles
   ─────────────────────────────────────── */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24 },
  header:    { fontSize: 18, fontWeight: '700', marginBottom: 12 },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  rowTitle: { fontSize: 15, fontWeight: '600', color: '#000' },
  rowSub:   { fontSize: 12, color: '#666' },

  logout: {
    marginTop: 'auto',
    borderWidth: 1,
    borderColor: '#d33',
    borderRadius: 28,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutLabel: { color: '#d33', fontWeight: '700', fontSize: 15 },
});
