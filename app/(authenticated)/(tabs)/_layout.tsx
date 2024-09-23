import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import CustomHeader from "@/components/CustomHeader";
import { BlurView } from "expo-blur";

const page = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarBackground: () => (
          <BlurView
            intensity={80}
            tint={"extraLight"}
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.04)",
            }}
          />
        ),
        tabBarStyle: {
          backgroundColor: "transparent",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
          header: () => <CustomHeader />,
        }}
      />
      <Tabs.Screen
        name="invest"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="finance" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transfers"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="exchange" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="crypto"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bitcoin" size={24} color={color} />
          ),
          header: () => <CustomHeader />,
        }}
      />
      <Tabs.Screen
        name="lifestyle"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="th" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default page;
