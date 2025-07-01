// ─── src/components/HeaderCard.tsx ────────────────────────────────
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper';
import BellIcon   from 'react-native-vector-icons/Feather';
import AvatarIcon from 'react-native-vector-icons/FontAwesome';

interface Props {
  userName: string;
  nairaBalance: string;   // e.g. “₦5,164.00”
  tokenBalance: string;   // e.g. “19.34 POL”
}

export default function HeaderCard({
  userName,
  nairaBalance,
  tokenBalance,
}: Props) {
  return (
    <View style={s.card}>
      {/* top row */}
      <View style={s.row}>
        <AvatarIcon name="user-circle-o" size={56} color="#FFF" />
        <View style={{ marginLeft: 12 }}>
          <Text style={s.hello}>Hello</Text>
          <Text style={s.name}>{userName}</Text>
        </View>
        <View style={{ flex: 1 }} />
        <BellIcon name="bell" size={26} color="#FFF" />
      </View>

      {/* balance row */}
      <View style={s.balanceRow}>
        <Text style={[s.balance, { fontFamily: 'Poppins-SemiBold' }]}> {nairaBalance} </Text>
        <Text style={[s.token, { fontFamily: 'Poppins-SemiBold' }]}> {tokenBalance} </Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: '#000',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 27,
    // paddingTop: 32,
    // paddingHorizontal: 24,
    // paddingBottom: 28,
  },
  row:      { flexDirection: 'row', alignItems: 'center' },
  hello:    { color: '#FFF', fontSize: 16, opacity: 0.7 },
  name:     { color: '#FFF', fontSize: 20, fontWeight: '700' },
  balanceLabel: { color: '#FFF', marginTop: 28, fontSize: 14, opacity: 0.7 },
  balanceRow:   {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 16,
  },
  naira: { color: '#FFF', fontSize: 34, fontWeight: '700' },
  token:   { color: '#FFF', fontSize: 23, fontWeight: '600' },
  balance: {fontSize: 40, color: '#FFF', fontWeight: '700' },
});
