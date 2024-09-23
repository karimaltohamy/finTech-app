import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import useCrypto from "@/hooks/useCrypto";
import { useQuery } from "@tanstack/react-query";
import { Currency } from "@/interfaces/crypto";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const crypto = () => {
  const { getAllCurrencies, getAllInfoCurrencies } = useCrypto();

  const { data: listings, isLoading } = useQuery({
    queryKey: ["listings"],
    queryFn: getAllCurrencies,
  });

  const ids = listings?.map((currency: Currency) => currency.id).join(",");

  const { data: info } = useQuery({
    queryKey: ["info", ids],
    queryFn: () => getAllInfoCurrencies(ids),
    enabled: !!ids,
  });

  return (
    <ScrollView style={defaultStyles.container}>
      <Text style={styles.headTitle}>Lasted Crypot</Text>
      <View className="bg-white rounded-lg p-2">
        {listings.map((item: Currency) => {
          return (
            <Link href={`/(authenticated)/crypto/${item.id}`} asChild>
              <TouchableOpacity className="flex items-center justify-between flex-row gap-4 mb-3">
                <View className="flex items-center flex-row gap-2">
                  <Image
                    source={{ uri: info?.[item.id]?.logo }}
                    style={{ width: 40, height: 40 }}
                  />
                  <View>
                    <Text className="font-semibold text-[17px] mb-1">
                      {item.name}
                    </Text>
                    <Text className="text-[14px] text-gray">{item.symbol}</Text>
                  </View>
                </View>
                <View>
                  <Text className="font-semibold text-[14px] mb-1">
                    {item.quote.EUR.price.toFixed(2)}€
                  </Text>
                  <View className="items-center justify-end flex-row gap-1">
                    <Ionicons
                      name="arrow-up-circle-outline"
                      size={15}
                      color={
                        item.quote.EUR.percent_change_1h > 0 ? "green" : "red"
                      }
                    />
                    <Text
                      className={`text-[11px] text-gray ${
                        item.quote.EUR.percent_change_1h > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.quote.EUR.percent_change_1h.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default crypto;
