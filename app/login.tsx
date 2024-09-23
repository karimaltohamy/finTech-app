import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const { signIn, isLoaded, setActive } = useSignIn();

  const onSignIn = async (type: SignInType) => {
    if (!isLoaded) {
      return;
    }

    setIsLoading(true);

    try {
      const completeSignIn = await signIn?.create({
        identifier: email,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your email and password.
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            placeholder="Email address"
            style={[styles.input]}
            placeholderTextColor={Colors.gray}
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password"
            style={[styles.input]}
            placeholderTextColor={Colors.gray}
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            email.length > 0 ? styles.enable : styles.disable,
            { marginVertical: 30 },
          ]}
          onPress={() => onSignIn(SignInType.Phone)}
        >
          <Text style={defaultStyles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        <View className="flex-row items-center gap-3">
          <View className="h-[1px] flex-1 bg-[#e3e3e3]"></View>
          <Text className="text-gray font-semibold">Or</Text>
          <View className="h-[1px] flex-1 bg-[#e3e3e3]"></View>
        </View>

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              gap: 10,
              marginTop: 20,
            },
          ]}
        >
          <Ionicons name="mail" size={24} />
          <Text className="font-semibold">Countinue with email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              gap: 10,
              marginTop: 20,
            },
          ]}
        >
          <Ionicons name="logo-google" size={24} />
          <Text className="font-semibold">Countinue with google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              gap: 10,
              marginTop: 20,
            },
          ]}
        >
          <Ionicons name="logo-apple" size={24} />
          <Text className="font-semibold">Countinue with apple</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default login;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: "semibold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 15,
    borderRadius: 10,
  },
  enable: {
    backgroundColor: Colors.primary,
  },
  disable: {
    backgroundColor: Colors.primaryMuted,
  },
});
