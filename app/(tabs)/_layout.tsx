import { Tabs } from "expo-router";
import { useTheme } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";

export default function TabLayout() {
  const { colors } = useTheme();

  // iOS 26, iPadOS 26, macOS 26에서만 NativeTabs 사용
  const isLiquidGlassSupported =
    (Platform.OS === "ios" || Platform.OS === "macos") &&
    Platform.Version >= "26.0";

  if (isLiquidGlassSupported) {
    return (
      <NativeTabs tintColor={colors.primary}>
        <NativeTabs.Trigger name="index">
          <Label>홈</Label>
          <Icon sf="radio" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="player">
          <Label>플레이어</Label>
          <Icon sf="play.circle" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="settings">
          <Label>설정</Label>
          <Icon sf="gearshape" />
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  } else {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          headerShown: true,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Moradio",
            headerTitle: "Moradio",
            tabBarLabel: "홈",
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialIcons
                name={focused ? "radio" : "radio"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="player"
          options={{
            title: "플레이어",
            headerTitle: "플레이어",
            tabBarLabel: "플레이어",
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialIcons
                name={focused ? "play-circle-filled" : "play-circle-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "설정",
            headerTitle: "설정",
            tabBarLabel: "설정",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    );
  }
}
