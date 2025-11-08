import { Tabs } from "expo-router";
import { useTheme } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  const { colors } = useTheme();

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
