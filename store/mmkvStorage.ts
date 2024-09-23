// import { MMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

class MMKVFaker {
  private data: any = {};

  getString(key: string) {
    return this.data[key];
  }

  set(key: string, value: string) {
    this.data[key] = value;
  }

  delete(key: string) {
    if (this.data[key]) this.data[key] = undefined;
  }

  clearAll() {
    this.data = {};
  }
}

const storage = new MMKVFaker();

export const zustandStorage: StateStorage = {
  getItem: (key: string) => {
    let value = storage.getString(key);
    return value ?? null;
  },
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => storage.delete(key),
};
