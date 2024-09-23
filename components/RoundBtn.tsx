import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface Props {
  title: string;
  onPress: () => void;
  icon: typeof Ionicons.defaultProps;
}

const RoundBtn: React.FC<Props> = ({ title, onPress, icon }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <View style={styles.icon}>
        <Ionicons name={icon} size={22} color={Colors.dark} />
      </View>
      <Text className="font-semibold">{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
  },
  icon: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: Colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
});

export default RoundBtn;
