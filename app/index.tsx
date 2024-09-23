import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
import { Link } from "expo-router";
import { defaultStyles } from "@/constants/Styles";

const index = () => {
  const [assets] = useAssets(require("@/assets/videos/intro.mp4"));

  return (
    <>
      <View style={styles.container}>
        {assets && (
          <Video
            isLooping
            shouldPlay
            isMuted
            source={{
              uri: assets[0].uri,
            }}
            style={{ width: "100%", height: "100%", position: "absolute" }}
            resizeMode={ResizeMode.COVER}
          />
        )}
        <View style={{ marginTop: 80, padding: 20 }}>
          <Text
            style={{
              fontSize: 35,
              color: "white",
              fontWeight: "900",
              textTransform: "uppercase",
            }}
          >
            Ready to change the way you money?
          </Text>
        </View>

        <View style={styles.buttons}>
          <Link
            href="/login"
            asChild
            style={[defaultStyles.pillButton]}
            className="bg-dark flex-1"
          >
            <TouchableOpacity>
              <Text style={{ color: "white", fontSize: 22, fontWeight: "500" }}>
                Login
              </Text>
            </TouchableOpacity>
          </Link>
          <Link
            href="/signUp"
            asChild
            style={[defaultStyles.pillButton]}
            className="bg-lightGray flex-1"
          >
            <TouchableOpacity>
              <Text style={{ fontSize: 22, fontWeight: "500" }}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 60,
    padding: 20,
  },
});

export default index;
