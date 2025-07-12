import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Divider, List } from 'react-native-paper';
import { useAppStore } from '../store/useAppStore';
import { useWallet } from '../hooks/useWallet';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const user     = useAppStore((s) => s.user);
  const reset    = useAppStore((s) => s.resetUser);
  const { connect, disconnect, connector } = useWallet();

  const handleLogout = () => {
    reset();
    // optional: navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
  };

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader style={styles.subheader}>Account</List.Subheader>

        <List.Item
          title="Profile"
          description="Add your name & email"
          left={(props) => <List.Icon {...props} icon="account" />}
          onPress={() => navigation.navigate('Profile' as never)}
        />

        {/* ——— Move “Connect wallet” here later ——— */}
        <List.Item
          title="Link wallet"
          description="MetaMask, Rainbow …"
          left={(props) => <List.Icon {...props} icon="wallet" />}
          onPress={() => navigation.navigate('LinkWallet' as never)}
        />
      </List.Section>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutTxt}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  logoutBtn: {
    marginHorizontal: 24,
    marginTop: 'auto',
    marginBottom: 48,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 28,
    alignItems: 'center',
    paddingVertical: 14,
  },
  logoutTxt: { color: '#d00', fontWeight: '700', fontSize: 16 },
  subheader: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
});