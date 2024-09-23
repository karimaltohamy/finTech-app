import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "@/store/mmkvStorage";

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  title: string;
}

interface BalanceStore {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  clearTransactions: () => void;
  balance: () => number;
}

export const useBalanceStore = create<BalanceStore>()(
  persist(
    (set, get) => ({
      transactions: [],
      addTransaction: (transaction: Transaction) => {
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        }));
      },
      clearTransactions: () => {
        set({ transactions: [] });
      },
      balance: () => {
        return get().transactions.reduce((acc, transaction) => {
          return acc + transaction.amount;
        }, 0);
      },
    }),
    {
      name: "balance",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
