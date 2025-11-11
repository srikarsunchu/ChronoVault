import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Switch } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  User,
  Settings,
  DollarSign,
  Globe,
  Moon,
  Database,
  Bell,
  HelpCircle,
  ChevronRight,
  LogOut,
} from "lucide-react-native";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [currency, setCurrency] = useState("USD");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const portfolioStats = {
    totalValue: 49100,
    totalWatches: 3,
    totalGainLoss: 8300,
    bestPerformer: "Rolex Submariner Date",
  };

  const currencies = ["USD", "EUR", "CHF", "GBP"];
  const dataSources = ["Chrono24", "WatchCharts", "eBay"];

  const SettingItem = ({
    icon: Icon,
    title,
    subtitle,
    onPress,
    rightElement,
    noBorder,
  }) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: pressed ? "#F8F8F8" : "transparent",
        paddingVertical: 16,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: noBorder ? 0 : 1,
        borderBottomColor: "#F0F0F0",
      })}
    >
      <View
        style={{
          backgroundColor: "#F8F9FA",
          borderRadius: 8,
          padding: 8,
          marginRight: 12,
        }}
      >
        <Icon size={20} color="#8E8E93" strokeWidth={1.5} />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Inter_500Medium",
            color: "#1C1C1E",
            marginBottom: subtitle ? 2 : 0,
          }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Inter_400Regular",
              color: "#8E8E93",
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {rightElement || (
        <ChevronRight size={20} color="#C7C7CC" strokeWidth={1.5} />
      )}
    </Pressable>
  );

  const StatCard = ({ title, value, subtitle, color = "#1C1C1E" }) => (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        flex: 1,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
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
        {title}
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontFamily: "Inter_700Bold",
          color: color,
          marginBottom: subtitle ? 2 : 0,
        }}
      >
        {value}
      </Text>
      {subtitle && (
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Inter_400Regular",
            color: "#8E8E93",
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );

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
        <Text
          style={{
            fontSize: 32,
            fontFamily: "Inter_700Bold",
            color: "#1C1C1E",
            marginBottom: 24,
          }}
        >
          Profile
        </Text>

        {/* User Info */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <View
            style={{
              backgroundColor: "#F8F9FA",
              borderRadius: 32,
              width: 64,
              height: 64,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 16,
            }}
          >
            <User size={32} color="#8E8E93" strokeWidth={1.5} />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Inter_600SemiBold",
                color: "#1C1C1E",
                marginBottom: 4,
              }}
            >
              Watch Collector
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Inter_400Regular",
                color: "#8E8E93",
              }}
            >
              collector@chronovault.com
            </Text>
          </View>
        </View>

        {/* Portfolio Summary Stats */}
        <View
          style={{
            flexDirection: "row",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <StatCard
            title="Total Value"
            value={`$${portfolioStats.totalValue.toLocaleString()}`}
            subtitle={`+${portfolioStats.totalGainLoss.toLocaleString()}`}
            color="#34C759"
          />
          <StatCard
            title="Watches"
            value={portfolioStats.totalWatches.toString()}
            subtitle="In portfolio"
          />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Settings Sections */}
        <View style={{ marginTop: 8 }}>
          {/* App Preferences */}
          <View
            style={{
              backgroundColor: "#FFFFFF",
              marginBottom: 8,
            }}
          >
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: "#F0F0F0",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Inter_600SemiBold",
                  color: "#1C1C1E",
                }}
              >
                App Preferences
              </Text>
            </View>

            <SettingItem
              icon={DollarSign}
              title="Currency"
              subtitle={`Currently set to ${currency}`}
              onPress={() => console.log("Change currency")}
            />

            <SettingItem
              icon={Moon}
              title="Dark Mode"
              subtitle="Toggle dark mode appearance"
              rightElement={
                <Switch
                  value={isDarkMode}
                  onValueChange={setIsDarkMode}
                  trackColor={{ false: "#E5E7EB", true: "#34C759" }}
                  thumbColor={isDarkMode ? "#FFFFFF" : "#FFFFFF"}
                />
              }
            />

            <SettingItem
              icon={Bell}
              title="Notifications"
              subtitle="Price alerts and market updates"
              rightElement={
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: "#E5E7EB", true: "#34C759" }}
                  thumbColor={notifications ? "#FFFFFF" : "#FFFFFF"}
                />
              }
              noBorder
            />
          </View>

          {/* Data & Sync */}
          <View
            style={{
              backgroundColor: "#FFFFFF",
              marginBottom: 8,
            }}
          >
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: "#F0F0F0",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Inter_600SemiBold",
                  color: "#1C1C1E",
                }}
              >
                Data & Sync
              </Text>
            </View>

            <SettingItem
              icon={Database}
              title="Data Sources"
              subtitle="Chrono24, WatchCharts, eBay"
              onPress={() => console.log("Manage data sources")}
            />

            <SettingItem
              icon={Globe}
              title="Market Data Sync"
              subtitle="Last updated 2 hours ago"
              onPress={() => console.log("Sync market data")}
              noBorder
            />
          </View>

          {/* Account */}
          <View
            style={{
              backgroundColor: "#FFFFFF",
              marginBottom: 8,
            }}
          >
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: "#F0F0F0",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Inter_600SemiBold",
                  color: "#1C1C1E",
                }}
              >
                Account
              </Text>
            </View>

            <SettingItem
              icon={Settings}
              title="Account Settings"
              subtitle="Manage your account details"
              onPress={() => console.log("Account settings")}
            />

            <SettingItem
              icon={HelpCircle}
              title="Help & Support"
              subtitle="Get help or contact support"
              onPress={() => console.log("Help & support")}
            />

            <SettingItem
              icon={LogOut}
              title="Sign Out"
              onPress={() => console.log("Sign out")}
              rightElement={null}
              noBorder
            />
          </View>

          {/* App Info */}
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 24,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Inter_500Medium",
                color: "#1C1C1E",
                marginBottom: 4,
              }}
            >
              ChronoVault
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Inter_400Regular",
                color: "#8E8E93",
              }}
            >
              Version 1.0.0
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
