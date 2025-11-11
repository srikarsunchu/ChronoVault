import React, { useState, useRef } from "react";
import { View, Text, ScrollView, Pressable, Dimensions } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Heart,
  Plus,
  FileText,
  Calendar,
  TrendingUp,
  TrendingDown,
} from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const { width } = Dimensions.get("window");

// Mock watch data (in a real app, this would come from an API)
const watchData = {
  1: {
    id: 1,
    brand: "Rolex",
    model: "Submariner Date",
    reference: "126610LN",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800",
      "https://images.unsplash.com/photo-1594576722512-582bcd46fba3?w=800",
      "https://images.unsplash.com/photo-1548169874-53e85f753041?w=800",
    ],
    currentValue: 12800,
    acquisitionPrice: 8500,
    movement: "Automatic (Caliber 3235)",
    caseMaterial: "Oystersteel",
    diameter: "41mm",
    waterResistance: "300m",
    purchaseDate: "2021-06-15",
    notes: "Perfect condition, box and papers included.",
    priceHistory: [
      { date: "2024-01", value: 11200 },
      { date: "2024-02", value: 11800 },
      { date: "2024-03", value: 12100 },
      { date: "2024-04", value: 12400 },
      { date: "2024-05", value: 12800 },
    ],
  },
  "rolex-sub": {
    id: "rolex-sub",
    brand: "Rolex",
    model: "Submariner Date 41mm",
    reference: "126610LN",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800",
      "https://images.unsplash.com/photo-1594576722512-582bcd46fba3?w=800",
      "https://images.unsplash.com/photo-1548169874-53e85f753041?w=800",
    ],
    currentValue: 12800,
    movement: "Automatic (Caliber 3235)",
    caseMaterial: "Oystersteel",
    diameter: "41mm",
    waterResistance: "300m",
    isInPortfolio: false,
    isInWatchlist: false,
    priceHistory: [
      { date: "2024-01", value: 11200 },
      { date: "2024-02", value: 11800 },
      { date: "2024-03", value: 12100 },
      { date: "2024-04", value: 12400 },
      { date: "2024-05", value: 12800 },
    ],
  },
};

export default function WatchDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const scrollViewRef = useRef(null);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1Y");

  const watch = watchData[id];

  if (!watch) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Watch not found</Text>
      </View>
    );
  }

  const valueChange = watch.acquisitionPrice
    ? watch.currentValue - watch.acquisitionPrice
    : 0;
  const changePercent = watch.acquisitionPrice
    ? (valueChange / watch.acquisitionPrice) * 100
    : 0;
  const isPositive = valueChange >= 0;

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveImageIndex(index);
  };

  const addToPortfolio = () => {
    console.log("Add to portfolio:", watch.id);
  };

  const addToWatchlist = () => {
    console.log("Add to watchlist:", watch.id);
  };

  const addNote = () => {
    console.log("Add note for watch:", watch.id);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 20,
          paddingBottom: 12,
          backgroundColor: "#FFFFFF",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor: "#F0F0F0",
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => ({
            backgroundColor: pressed ? "#F0F0F0" : "transparent",
            borderRadius: 12,
            padding: 8,
          })}
        >
          <ArrowLeft size={24} color="#1C1C1E" strokeWidth={1.5} />
        </Pressable>

        <Text
          style={{
            fontSize: 18,
            fontFamily: "Inter_600SemiBold",
            color: "#1C1C1E",
            flex: 1,
            textAlign: "center",
            marginHorizontal: 16,
          }}
        >
          Watch Details
        </Text>

        <Pressable
          onPress={addToWatchlist}
          style={({ pressed }) => ({
            backgroundColor: pressed ? "#F0F0F0" : "transparent",
            borderRadius: 12,
            padding: 8,
          })}
        >
          <Heart size={24} color="#8E8E93" strokeWidth={1.5} />
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Carousel */}
        <View style={{ backgroundColor: "#FFFFFF", marginBottom: 8 }}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {watch.images.map((imageUri, index) => (
              <View key={index} style={{ width }}>
                <Image
                  source={{ uri: imageUri }}
                  style={{
                    width: "100%",
                    height: 300,
                    backgroundColor: "#F8F9FA",
                  }}
                  contentFit="cover"
                  transition={200}
                />
              </View>
            ))}
          </ScrollView>

          {/* Image Indicators */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingVertical: 16,
              gap: 8,
            }}
          >
            {watch.images.map((_, index) => (
              <View
                key={index}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor:
                    index === activeImageIndex ? "#1C1C1E" : "#E5E7EB",
                }}
              />
            ))}
          </View>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          {/* Watch Info */}
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              padding: 20,
              marginBottom: 16,
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
                marginBottom: 4,
              }}
            >
              {watch.brand}
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontFamily: "Inter_700Bold",
                color: "#1C1C1E",
                marginBottom: 8,
                lineHeight: 32,
              }}
            >
              {watch.model}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Inter_500Medium",
                color: "#8E8E93",
                marginBottom: 16,
              }}
            >
              Ref. {watch.reference}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 32,
                    fontFamily: "Inter_700Bold",
                    color: "#1C1C1E",
                    marginBottom: 4,
                  }}
                >
                  ${watch.currentValue.toLocaleString()}
                </Text>
                {watch.acquisitionPrice && (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {isPositive ? (
                      <TrendingUp size={16} color="#34C759" strokeWidth={2} />
                    ) : (
                      <TrendingDown size={16} color="#FF3B30" strokeWidth={2} />
                    )}
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "Inter_600SemiBold",
                        color: isPositive ? "#34C759" : "#FF3B30",
                        marginLeft: 4,
                      }}
                    >
                      {isPositive ? "+" : ""}${valueChange.toLocaleString()} (
                      {changePercent.toFixed(2)}%)
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Specifications */}
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              padding: 20,
              marginBottom: 16,
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
                fontSize: 18,
                fontFamily: "Inter_600SemiBold",
                color: "#1C1C1E",
                marginBottom: 16,
              }}
            >
              Specifications
            </Text>

            <View style={{ gap: 12 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Inter_400Regular",
                    color: "#8E8E93",
                  }}
                >
                  Movement
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Inter_500Medium",
                    color: "#1C1C1E",
                  }}
                >
                  {watch.movement}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Inter_400Regular",
                    color: "#8E8E93",
                  }}
                >
                  Case Material
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Inter_500Medium",
                    color: "#1C1C1E",
                  }}
                >
                  {watch.caseMaterial}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Inter_400Regular",
                    color: "#8E8E93",
                  }}
                >
                  Diameter
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Inter_500Medium",
                    color: "#1C1C1E",
                  }}
                >
                  {watch.diameter}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Inter_400Regular",
                    color: "#8E8E93",
                  }}
                >
                  Water Resistance
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Inter_500Medium",
                    color: "#1C1C1E",
                  }}
                >
                  {watch.waterResistance}
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              marginBottom: 16,
            }}
          >
            {!watch.isInPortfolio && (
              <Pressable
                onPress={addToPortfolio}
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: pressed ? "#E8F5E8" : "#34C759",
                  borderRadius: 16,
                  paddingVertical: 16,
                  paddingHorizontal: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                })}
              >
                <Plus size={20} color="#FFFFFF" strokeWidth={1.5} />
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Inter_600SemiBold",
                    color: "#FFFFFF",
                  }}
                >
                  Add to Portfolio
                </Text>
              </Pressable>
            )}

            <Pressable
              onPress={addNote}
              style={({ pressed }) => ({
                backgroundColor: pressed ? "#F0F0F0" : "#FFFFFF",
                borderRadius: 16,
                paddingVertical: 16,
                paddingHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                borderWidth: 1,
                borderColor: "#E0E0E0",
                flex: watch.isInPortfolio ? 1 : 0,
              })}
            >
              <FileText size={20} color="#1C1C1E" strokeWidth={1.5} />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Inter_600SemiBold",
                  color: "#1C1C1E",
                }}
              >
                Add Note
              </Text>
            </Pressable>
          </View>

          {/* Purchase Info (if owned) */}
          {watch.acquisitionPrice && (
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
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
                  fontSize: 18,
                  fontFamily: "Inter_600SemiBold",
                  color: "#1C1C1E",
                  marginBottom: 16,
                }}
              >
                Purchase Information
              </Text>

              <View style={{ gap: 12 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Inter_400Regular",
                      color: "#8E8E93",
                    }}
                  >
                    Purchase Price
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Inter_500Medium",
                      color: "#1C1C1E",
                    }}
                  >
                    ${watch.acquisitionPrice.toLocaleString()}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Inter_400Regular",
                      color: "#8E8E93",
                    }}
                  >
                    Purchase Date
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Inter_500Medium",
                      color: "#1C1C1E",
                    }}
                  >
                    {new Date(watch.purchaseDate).toLocaleDateString()}
                  </Text>
                </View>
                {watch.notes && (
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Inter_400Regular",
                        color: "#8E8E93",
                        marginBottom: 4,
                      }}
                    >
                      Notes
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Inter_400Regular",
                        color: "#1C1C1E",
                      }}
                    >
                      {watch.notes}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
