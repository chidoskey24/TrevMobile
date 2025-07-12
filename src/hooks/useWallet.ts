// src/hooks/useWallet.ts
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { useAppStore }      from '../store/useAppStore';

export function useWallet() {
  const connector = useWalletConnect();
  const setUser   = useAppStore(s => s.setUser);

  const connect = async () => {
    if (!connector.connected) await connector.connect();
    const addr = connector.accounts[0];

    // merge into any existing user object
    setUser((prev) => ({ ...(prev ?? {}), walletAddress: addr }));
  };

  const disconnect = async () => {
    if (connector.connected) await connector.killSession();
    setUser((prev) => ({ ...(prev ?? {}), walletAddress: undefined }));
  };

  return { connect, disconnect, connector };
}
