import {
  View,
  Text,
  SectionList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import useCrypto from "@/hooks/useCrypto";
import { useQuery } from "@tanstack/react-query";
import { useHeaderHeight } from "@react-navigation/elements";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";
import { tickers } from "@/constants/tickers";
const categories = ["Overview", "News", "Orders", "Transactions"];
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, useFont } from "@shopify/react-native-skia";
import { format } from "date-fns";
import Animated, {
  SharedValue,
  useAnimatedProps,
} from "react-native-reanimated";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const page = () => {
  const { id } = useLocalSearchParams();
  const headerHieght = useHeaderHeight();
  const { getAllInfoCurrencies } = useCrypto();
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const { state, isActive } = useChartPressState({ x: "", y: { price: 0 } });
  const font = useFont(require("@/assets/fonts/SpaceMono-Regular.ttf"), 12);

  const { data: info, isLoading } = useQuery({
    queryKey: ["info", id],
    queryFn: async () => {
      const res = await getAllInfoCurrencies(String(id));
      return res[String(id)];
    },
  });

  const AnimatedText = useAnimatedProps(() => {
    return {
      text: `${state.y.price.value.value.toFixed(2)} €`,
      defaultValue: "11282738",
    };
  });

  const AnimatedDateText = useAnimatedProps(() => {
    const date = new Date(state.x.value.value);
    return {
      text: date.toLocaleDateString(),
      defaultValue: "",
    };
  });

  return isLoading ? (
    <ActivityIndicator size="small" color={Colors.primary} />
  ) : (
    <>
      <Stack.Screen options={{ title: info?.name || "" }} />
      <SectionList
        style={{ marginTop: headerHieght, paddingHorizontal: 20 }}
        sections={[{ data: [{ title: "Chart" }] }]}
        contentInsetAdjustmentBehavior="automatic"
        keyExtractor={(i) => i.title}
        ListHeaderComponent={() => (
          <View>
            <View className="flex-row justify-between gap-3">
              <Text className="font-semibold text-[18px]">{info?.symbol}</Text>
              <Image
                source={{ uri: info?.logo }}
                style={{ width: 50, height: 50 }}
              />
            </View>
            <View className="flex-row gap-3">
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  {
                    backgroundColor: Colors.primary,
                    flexDirection: "row",
                    gap: 5,
                  },
                ]}
              >
                <Ionicons name="add" size={24} color={"#fff"} />
                <Text style={[defaultStyles.buttonText, { color: "#fff" }]}>
                  Buy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  {
                    backgroundColor: Colors.primaryMuted,
                    flexDirection: "row",
                    gap: 5,
                  },
                ]}
              >
                <Ionicons name="arrow-back" size={24} color={Colors.primary} />
                <Text
                  style={[defaultStyles.buttonText, { color: Colors.primary }]}
                >
                  Receive
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        renderSectionHeader={() => {
          return (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 10,
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                paddingVertical: 10,
                backgroundColor: Colors.background,
                borderBottomColor: Colors.lightGray,
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            >
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setActiveCategory(index)}
                  style={{
                    padding: 10,
                    backgroundColor:
                      activeCategory === index ? "#fff" : "transparent",
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      color: activeCategory === index ? "#000" : "gray",
                      fontWeight: activeCategory === index ? "bold" : "normal",
                    }}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          );
        }}
        renderItem={({ item }) => (
          <>
            <View style={[defaultStyles.block, { height: 400 }]}>
              {!isActive && (
                <View>
                  <Text className="text-[20px] font-bold">
                    {tickers[tickers.length - 1].price.toFixed(2)} €
                  </Text>
                  <Text className="text-gray">Today</Text>
                </View>
              )}
              {isActive && (
                <View>
                  <AnimatedTextInput
                    editable={false}
                    underlineColorAndroid={"transparent"}
                    className="text-[20px] font-bold"
                    animatedProps={AnimatedText}
                  ></AnimatedTextInput>
                  <AnimatedTextInput
                    className="text-gray"
                    editable={false}
                    underlineColorAndroid={"transparent"}
                    animatedProps={AnimatedDateText}
                  ></AnimatedTextInput>
                </View>
              )}
              <CartesianChart
                data={tickers}
                xKey="timestamp"
                yKeys={["price"]}
                axisOptions={{ font, formatXLabel: (x) => format(x, "MM/yy") }}
                chartPressState={state}
              >
                {({ points }) => (
                  <>
                    <Line
                      points={points.price}
                      color={Colors.primary}
                      strokeWidth={3}
                    />
                    {isActive && (
                      <ToolTip
                        x={state.x.position}
                        y={state.y.price.position}
                      />
                    )}
                  </>
                )}
              </CartesianChart>
            </View>
            <View style={[defaultStyles.block]}>
              <Text className="text-[20px] font-bold">Overview</Text>
              <Text className="text-gray">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </Text>
            </View>
          </>
        )}
      />
    </>
  );
};

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color="black" />;
}

export default page;
