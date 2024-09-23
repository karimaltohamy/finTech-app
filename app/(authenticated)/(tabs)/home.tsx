import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import RoundBtn from "@/components/RoundBtn";
import Dropdown from "@/components/Dropdown";
import { Transaction, useBalanceStore } from "@/store/balanceStore";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import WidgetList from "@/components/sortableList/WidgetList";

const home = () => {
  const { balance, addTransaction, clearTransactions, transactions } =
    useBalanceStore();

  const addMoney = () => {
    addTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 100),
      date: new Date(),
      title: "Deposit",
    });
  };

  const exchange = () => {
    clearTransactions();
  };

  return (
    <ScrollView>
      <View style={styles.account}>
        <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 2 }}>
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>{balance()}</Text>
          <Text style={{ fontSize: 17, fontWeight: "semibold" }}>€</Text>
        </View>
      </View>
      <View style={styles.actionsRow}>
        <RoundBtn title="Add money" onPress={addMoney} icon={"add"} />
        <RoundBtn title="Exchange" onPress={exchange} icon={"reload-outline"} />
        <RoundBtn title="Details" onPress={() => {}} icon={"list"} />
        <Dropdown />
      </View>

      <View style={{ padding: 20 }}>
        <Text className="text-[22px] font-semibold">Transactions</Text>
        <View style={styles.transactions}>
          {transactions.length === 0 && (
            <Text style={{ fontWeight: "bold" }}>No transactions yet</Text>
          )}
          {transactions.map((item: Transaction, index: number) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: index === transactions.length - 1 ? 0 : 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View style={styles.icon}>
                    {item.amount > 0 ? (
                      <Ionicons name="add-outline" size={22} color="#000" />
                    ) : (
                      <Ionicons name="remove" size={22} color="#000" />
                    )}
                  </View>
                  <View>
                    <Text className="font-semibold text-[18px]">
                      {item.title}
                    </Text>
                    <Text
                      className="text-[12px]"
                      style={{ color: Colors.gray }}
                    >
                      {item.date.toLocaleString()}
                    </Text>
                  </View>
                </View>
                <Text className="font-semibold"> {item.amount}€</Text>
              </View>
            );
          })}
        </View>
      </View>

      <Text className="text-[22px] font-semibold mb-3 px-[20px]">Widgets</Text>
      <WidgetList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  account: {
    margin: 80,
    flexDirection: "row",
    justifyContent: "center",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    padding: 20,
  },
  transactions: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 15,
    borderRadius: 10,
  },
  icon: {
    width: 35,
    height: 35,
    borderRadius: 25,
    backgroundColor: Colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default home;
