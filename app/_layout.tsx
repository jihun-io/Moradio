import { Stack } from "expo-router";
import { useEffect } from "react";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { PlayerProvider } from "../contexts/RadioContext";
import { setupPlayer } from "../services/trackPlayer";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#DC2E2E",
    systemGray: "#8e8e93",
    border: "#aeaeb2",
  },
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#DC2E2E",
    systemGray: "#8e8e93",
    card: "rgb(26,26,28)",
    border: "#636366",
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    setupPlayer();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? darkTheme : lightTheme}>
      <ActionSheetProvider>
        <PlayerProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </PlayerProvider>
      </ActionSheetProvider>
    </ThemeProvider>
  );
}
