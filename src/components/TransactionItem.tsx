// src/components/TransactionItem.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';

interface Props {
  type: 'deposit' | 'withdraw';
  title: string;        // e.g. “Deposit from wallet”
  subtitle: string;     // e.g. “0.75 POL”
  amount: number;       // +200 or -150
  currency?: string;    // default “₦”
}

export default function TransactionItem({
  type,
  title,
  subtitle,
  amount,
  currency = '₦',
}: Props) {
  const isDeposit   = type === 'deposit';
  const amountColor = isDeposit ? '#0066FF' : '#D60000';
  const iconName    = isDeposit ? 'arrow-down-left' : 'arrow-up-right';

  return (
    <View style={s.row}>
      <Feather name={iconName} size={24} color="#000" style={s.icon} />

      <View style={s.textBlock}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.subtitle}>{subtitle}</Text>
      </View>

      <Text style={[s.amount, { color: amountColor }]}>
        {isDeposit ? '+' : '-'}
        {currency}
        {Math.abs(amount).toLocaleString()}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  row:        { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 18 },
  icon:       { marginRight: 16 },
  textBlock:  { flex: 1 },
  title:      { fontSize: 15, fontWeight: '700', color: '#000' },
  subtitle:   { fontSize: 13,  color: '#888', marginTop: 2, fontWeight: '700' },
  amount:     { fontSize: 15,  fontFamily: 'Poppins-SemiBold', fontWeight: '700' },
});
