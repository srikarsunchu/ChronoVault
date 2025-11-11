import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Dimensions } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  ChevronRight,
} from "lucide-react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

// Mock data for portfolio
const portfolioData = [
  {
    id: 1,
    brand: "Rolex",
    model: "Submariner Date",
    reference: "126610LN",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400",
    acquisitionPrice: 8500,
    currentValue: 12800,
    valueChange: 4300,
    changePercent: 50.59,
    isPositive: true,
  },
  {
    id: 2,
    brand: "Omega",
    model: "Speedmaster Professional",
    reference: "310.30.42.50.01.001",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400",
    acquisitionPrice: 5200,
    currentValue: 4800,
    valueChange: -400,
    changePercent: -7.69,
    isPositive: false,
  },
  {
    id: 3,
    brand: "Patek Philippe",
    model: "Calatrava",
    reference: "5196P-001",
    image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400",
    acquisitionPrice: 28000,
    currentValue: 32500,
    valueChange: 4500,
    changePercent: 16.07,
    isPositive: true,
  },
];

const totalValue = portfolioData.reduce(
  (sum, watch) => sum + watch.currentValue,
  0,
);
const totalGainLoss = portfolioData.reduce(
  (sum, watch) => sum + watch.valueChange,
  0,
);
const totalGainLossPercent =
  (totalGainLoss / (totalValue - totalGainLoss)) * 100;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const navigateToWatchDetail = (watchId) => {
    router.push(`/(tabs)/watch-detail/${watchId}`);
  };

  const openAddWatchModal = () => {
    // This would open the add watch modal/form
    console.log("Open add watch modal");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <View
        style={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 20,
          backgroundColor: "#FFFFFF",
        }}
      >
        {/* Header */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 32,
              fontFamily: "Inter_700Bold",
              color: "#1C1C1E",
              marginBottom: 4,
            }}
          >
            Portfolio
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Inter_400Regular",
              color: "#8E8E93",
            }}
          >
            Welcome back, Collector
          </Text>
        </View>

        {/* Total Collection Value Card */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 3,
            borderWidth: 1,
            borderColor: "#F0F0F0",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Inter_500Medium",
              color: "#8E8E93",
              marginBottom: 8,
            }}
          >
            Total Collection Value
          </Text>
          <Text
            style={{
              fontSize: 36,
              fontFamily: "Inter_700Bold",
              color: "#1C1C1E",
              marginBottom: 8,
            }}
          >
            ${totalValue.toLocaleString()}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {totalGainLoss >= 0 ? (
              <TrendingUp size={16} color="#34C759" strokeWidth={2} />
            ) : (
              <TrendingDown size={16} color="#FF3B30" strokeWidth={2} />
            )}
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Inter_600SemiBold",
                color: totalGainLoss >= 0 ? "#34C759" : "#FF3B30",
                marginLeft: 4,
              }}
            >
              {totalGainLoss >= 0 ? "+" : ""}${totalGainLoss.toLocaleString()} (
              {totalGainLossPercent.toFixed(2)}%)
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 20 }}>
          {/* Section Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Inter_600SemiBold",
                color: "#1C1C1E",
              }}
            >
              My Watches
            </Text>
            <Pressable
              onPress={openAddWatchModal}
              style={({ pressed }) => ({
                backgroundColor: pressed ? "#F0F0F0" : "#FFFFFF",
                borderRadius: 12,
                padding: 8,
                borderWidth: 1,
                borderColor: "#E0E0E0",
              })}
            >
              <Plus size={20} color="#1C1C1E" strokeWidth={1.5} />
            </Pressable>
          </View>

          {/* Watch Grid */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            {portfolioData.map((watch) => (
              <Pressable
                key={watch.id}
                onPress={() => navigateToWatchDetail(watch.id)}
                style={({ pressed }) => ({
                  backgroundColor: pressed ? "#F8F8F8" : "#FFFFFF",
                  borderRadius: 16,
                  width: cardWidth,
                  overflow: "hidden",
                  shadowColor: "#000000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.06,
                  shadowRadius: 8,
                  elevation: 3,
                  borderWidth: 1,
                  borderColor: "#F0F0F0",
                })}
              >
                <Image
                  source={{ uri: watch.image }}
                  style={{
                    width: "100%",
                    height: 140,
                    backgroundColor: "#F8F9FA",
                  }}
                  contentFit="cover"
                  transition={200}
                />
                <View style={{ padding: 16 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Inter_500Medium",
                      color: "#8E8E93",
                      marginBottom: 4,
                    }}
                  >
                    {watch.brand}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Inter_600SemiBold",
                      color: "#1C1C1E",
                      marginBottom: 8,
                      lineHeight: 18,
                    }}
                  >
                    {watch.model}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Inter_700Bold",
                      color: "#1C1C1E",
                      marginBottom: 4,
                    }}
                  >
                    ${watch.currentValue.toLocaleString()}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {watch.isPositive ? (
                      <TrendingUp size={12} color="#34C759" strokeWidth={2} />
                    ) : (
                      <TrendingDown size={12} color="#FF3B30" strokeWidth={2} />
                    )}
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Inter_600SemiBold",
                        color: watch.isPositive ? "#34C759" : "#FF3B30",
                        marginLeft: 4,
                      }}
                    >
                      {watch.isPositive ? "+" : ""}
                      {watch.changePercent.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
