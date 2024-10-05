import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Feather, Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { set } from "date-fns";

const account = () => {
  const headerHieght = useHeaderHeight();
  const { user } = useUser();
  const { signOut } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [edit, setEdit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSave = async () => {
    try {
      await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      });

      setEdit(false);
    } catch (error) {
      console.log(error);
    } finally {
      setEdit(false);
    }
  };

  const onChangeImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    setIsLoading(true);

    if (!result?.canceled) {
      const base64Image = `data:image/png;base64,${result.assets[0].base64}`;
      await user?.setProfileImage({
        file: base64Image,
      });
    }

    setIsLoading(false);
  };

  return (
    <BlurView
      intensity={60}
      tint={"dark"}
      style={{
        backgroundColor: "rgba(0,0,0,0.1)",
        flex: 1,
        paddingTop: headerHieght,
      }}
    >
      <TouchableOpacity onPress={onChangeImage}>
        {isLoading ? (
          <View
            className="flex-1 justify-center items-center"
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              margin: "auto",
              marginBottom: 10,
              backgroundColor: "rgba(0,0,0,0.1)",
            }}
          >
            <ActivityIndicator size="small" color={Colors.primary} />
          </View>
        ) : (
          <Image
            source={{ uri: user?.imageUrl }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              margin: "auto",
              marginBottom: 10,
            }}
          />
        )}
      </TouchableOpacity>
      {!edit && (
        <View className={"flex-row items-center justify-center gap-2"}>
          <Text className="text-white text-[22px] font-semibold">
            {firstName}
          </Text>
          <Text className="text-white text-[22px] font-semibold">
            {lastName}
          </Text>
          <TouchableOpacity onPress={() => setEdit(true)}>
            <Ionicons name="ellipsis-horizontal" size={24} color={"#fff"} />
          </TouchableOpacity>
        </View>
      )}

      {edit && (
        <View className={"flex-row items-center justify-center gap-2"}>
          <TextInput
            value={firstName!}
            onChangeText={(text) => setFirstName(text)}
            placeholder="First Name"
            className="bg-white w-[100px] p-1 px-2 rounded-md"
          />
          <TextInput
            value={lastName!}
            onChangeText={(text) => setLastName(text)}
            placeholder="Last Name"
            className="bg-white w-[100px] p-1 px-2 rounded-md"
          />
          <TouchableOpacity onPress={handleSave}>
            <Feather name="check" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.btn} onPress={() => signOut()}>
          <Ionicons name="log-out" size={24} color={"#fff"} />
          <Text style={{ color: "#fff", fontSize: 18 }}>Log out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="person" size={24} color={"#fff"} />
          <Text style={{ color: "#fff", fontSize: 18 }}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="bulb" size={24} color={"#fff"} />
          <Text style={{ color: "#fff", fontSize: 18 }}>Learn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="megaphone" size={24} color={"#fff"} />
          <Text style={{ color: "#fff", fontSize: 18, flex: 1 }}>Inbox</Text>
          <View
            style={{
              backgroundColor: Colors.primary,
              paddingHorizontal: 10,
              borderRadius: 10,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 12 }}>14</Text>
          </View>
        </TouchableOpacity>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  actions: {
    backgroundColor: "rgba(256, 256, 256, 0.2)",
    borderRadius: 16,
    gap: 0,
    margin: 20,
  },
  btn: {
    padding: 14,
    flexDirection: "row",
    gap: 20,
  },
});

export default account;
