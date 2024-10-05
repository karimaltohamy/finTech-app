import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";

const signUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const { signUp } = useSignUp();
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const res = await signUp?.create({
        emailAddress: email,
        password,
      });

      await signUp?.prepareEmailAddressVerification({ strategy: "email_code" });

      router.push({
        pathname: "/verify/[email]",
        params: { email: email, signin: "false" },
      });
    } catch (error) {
      console.error("Error signing up:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
      }
      if (error && typeof error === "object") {
        console.error("Detailed error:", JSON.stringify(error));
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <View style={defaultStyles.container}>
          <Text style={defaultStyles.header}>Let's get started!</Text>
          <Text style={defaultStyles.descriptionText}>
            Enter your email and password. We will send you a confirmation code
            there
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
          {/* <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                placeholder="Phone number"
                style={[styles.input]}
                placeholderTextColor={Colors.gray}
                keyboardType="numeric"
                value={phone}
                onChangeText={(text) => setPhone(text)}
              />
            </View> */}
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
          <Link href={"/login"} asChild replace>
            <TouchableOpacity style={{ marginVertical: 10 }}>
              <Text style={defaultStyles.textLink}>
                Already have an account? Log in
              </Text>
            </TouchableOpacity>
          </Link>

          <View style={{ flex: 1 }}></View>

          <TouchableOpacity
            style={[
              defaultStyles.pillButton,
              email.length > 0 ? styles.enable : styles.disable,
              { marginBottom: 30 },
            ]}
            onPress={handleSignUp}
            disabled={email.length === 0}
          >
            <Text style={defaultStyles.buttonText}>
              {isLoading ? "Loading..." : "Sign up"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default signUp;

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
