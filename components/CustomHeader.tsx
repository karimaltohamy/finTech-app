import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { BlurView } from "expo-blur";

const CustomHeader = () => {
  const { top } = useSafeAreaInsets();

  return (
    <BlurView
      intensity={80}
      tint={"extraLight"}
      style={{
        paddingTop: top,
        paddingHorizontal: 20,
        backgroundColor: "transparent",
      }}
    >
      <View
        style={[
          styles.row,
          { paddingBottom: 12, backgroundColor: "transparent" },
        ]}
      >
        <View style={styles.circle}>
          <Text className="font-bold text-white">KA</Text>
        </View>
        <View style={styles.search}>
          <Ionicons name="search" size={24} />
          <TextInput placeholder="Search" />
        </View>
        <View style={[styles.circle, { backgroundColor: "#d8d8d8" }]}>
          <Ionicons name={"stats-chart"} size={20} color={Colors.dark} />
        </View>
        <View style={[styles.circle, { backgroundColor: "#d8d8d8" }]}>
          <Ionicons name={"card"} size={20} color={Colors.dark} />
        </View>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#a7a7a7",
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: Colors.lightGray,
    padding: 8,
    borderRadius: 30,
    flex: 1,
  },
});

export default CustomHeader;
