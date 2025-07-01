// ─── src/screens/DashboardScreen.tsx ─────────────────────────────
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HeaderCard from '../components/HeaderCard';
import TransactionItem from '../components/TransactionItem';

export default function DashboardScreen() {

    const onDeposit  = () => console.log('TODO: deposit');
    const onWithdraw = () => console.log('TODO: withdraw');

    const txData = [
        {
            id: '1',
            type: 'withdraw',          // 👈 determines icon + colour
            title: 'Sent to wallet',
            subtitle: '0.75 POL',
            amount: -480,
            currency: '₦', // optional, defaults to "₦"
        },
        {
            id: '2',
            type: 'deposit',
            title: 'Received from DEX',
            subtitle: '0.76 POL',
            amount: 18000,
            currency: '₦',
        },
    ] as const; // TypeScript type inference


  return (
    <SafeAreaView style={styles.root}>
      <HeaderCard
        userName="Trevor"
        nairaBalance="₦5,164.00"
        tokenBalance="19.34 POL"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.actionBtn, styles.leftBtn]} onPress={onDeposit}>
            <Text style={styles.actionLabel}>Deposit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtn, styles.rightBtn]} onPress={onWithdraw}>
            <Text style={styles.actionLabel}>Withdraw</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.txCard}>
        <Text style={styles.txHeader}>Transactions</Text>

        {txData.map(tx => (
            <TransactionItem key={tx.id} {...tx} />
        ))}
      </View>
      {/*  TODO: Deposit / Withdraw buttons and Tx list  */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8F9FA' },
  buttonRow: {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  marginTop: 24,
  paddingHorizontal: 24,
},

actionBtn: {
  flex: 1,
  height: 48,
  borderRadius: 24,
  backgroundColor: '#000',
  justifyContent: 'center',
  alignItems: 'center',
},

leftBtn:  { marginRight: 8 },
rightBtn: { marginLeft: 8 },

actionLabel: {
  color: '#FFF',
  fontWeight: '700',
  fontSize: 16,
},

txCard: {
  margin: 24,
  backgroundColor: '#FFF',
  borderRadius: 24,
  paddingBottom: 8,
  elevation: 3,               // Android shadow
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 8,
},
txHeader: {
  fontSize: 17,
  fontWeight: '700',
  margin: 18,
},
});
