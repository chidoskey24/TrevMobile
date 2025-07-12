// src/store/mmkvStorage.ts
import { MMKV } from 'react-native-mmkv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StateStorage } from 'zustand/middleware';

/** ------------------------------------------------------------------
 *  Helper – are we running on-device (JSI available)?
 *  ----------------------------------------------------------------- */
const canUseMMKV =
  // Hermes / JSC on-device exposes this sync hook
  // (undefined in remote-debug Chrome / Flipper JS-debugger).
  (global as any)?.nativeCallSyncHook != null;

/** ------------------------------------------------------------------
 *  Storage adapter used by Zustand persist()
 *  ----------------------------------------------------------------- */
export const mmkvStorage: StateStorage = canUseMMKV
  ? (() => {
      /* Safe to create MMKV instance */
      const mmkv = new MMKV();
      return {
        getItem   : key      => mmkv.getString(key) ?? null,
        setItem   : (k, v)   => mmkv.set(k, v),
        removeItem:  key     => mmkv.delete(key),
      };
    })()
  : {
      /* Fallback for remote-debug / no-JSI */
      getItem   : AsyncStorage.getItem,
      setItem   : AsyncStorage.setItem,
      removeItem: AsyncStorage.removeItem,
    };
