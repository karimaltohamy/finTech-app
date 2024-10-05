import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const lock = () => {
  const { user } = useUser();
  const [code, setCode] = useState<number[]>([]);
  const codeLength = Array(6).fill(0);
  const offset = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offset.value,
        },
      ],
    };
  });

  const OFFSET = 20;
  const TIME = 80;

  const onNumberPress = (number: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode([...code, number]);
  };

  const onBackspacePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode(code.slice(0, -1));
  };

  const onBiometricsPress = async () => {
    const { success } = await LocalAuthentication.authenticateAsync();

    if (success) {
      router.push("/(authenticated)/(tabs)/home");
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  useEffect(() => {
    if (code.length === 6) {
      if (code.join("") === "111111") {
        router.push("/(authenticated)/(tabs)/home");
      } else {
        offset.value = withSequence(
          withTiming(-OFFSET, { duration: TIME / 2 }),
          withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
          withTiming(0, { duration: TIME / 2 })
        );
      }
    }
  }, [code]);

  return (
    <SafeAreaView style={defaultStyles.container}>
      <Text className="my-[100px] text-[22px] font-semibold text-center">
        Welcome back, {user?.firstName}
      </Text>
      <Animated.View
        className="flex-row items-center justify-center gap-4 mb-[100px]"
        style={style}
      >
        {codeLength.map((_, index) => (
          <View
            key={index}
            className={`w-[22px] h-[22px] rounded-full`}
            style={{
              backgroundColor: code[index] ? Colors.primary : "#e3e3e3",
            }}
          ></View>
        ))}
      </Animated.View>

      {/* number of attempts */}
      <View className="mx-[80px]">
        <View className="flex-row items-center justify-between mb-[50px]">
          {[1, 2, 3].map((number, index) => (
            <TouchableOpacity onPress={() => onNumberPress(number)}>
              <Text
                key={index}
                className={`text-[24px] font-semibold w-[25px] h-[25px]`}
              >
                {number}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex-row items-center justify-between mb-[50px]">
          {[4, 5, 6].map((number, index) => (
            <TouchableOpacity onPress={() => onNumberPress(number)}>
              <Text
                key={index}
                className={`text-[24px] font-semibold w-[25px] h-[25px]`}
              >
                {number}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex-row items-center justify-between mb-[50px]">
          {[7, 8, 9].map((number, index) => (
            <TouchableOpacity onPress={() => onNumberPress(number)}>
              <Text
                key={index}
                className={`text-[24px] font-semibold w-[35px] h-[35px]`}
              >
                {number}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex-row items-center justify-between mb-[50px]">
          <TouchableOpacity onPress={onBiometricsPress}>
            <Text className={`text-[24px] font-semibold w-[35px] h-[35px]`}>
              <MaterialCommunityIcons
                name="face-recognition"
                size={24}
                color="black"
              />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNumberPress(0)}>
            <Text className={`text-[24px] font-semibold w-[35px] h-[35px]`}>
              0
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onBackspacePress}>
            <Text className={`text-[24px] font-semibold w-[35px] h-[35px]`}>
              <MaterialIcons name="backspace" size={24} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default lock;
