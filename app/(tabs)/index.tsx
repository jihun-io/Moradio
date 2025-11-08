import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  useColorScheme,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useActionSheet } from "@expo/react-native-action-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STATION_CATEGORIES } from "../../constants/categories";
import StationsList from "../../components/StationsList";
import { stationImages } from "../../constants/stationsLogo";
import { RadioStation } from "../../constants/stations";

export default function HomeScreen() {
  const { colors } = useTheme();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [recentStationList, setRecentStationList] = useState<RadioStation[]>(
    [],
  );
  const { showActionSheetWithOptions } = useActionSheet();
  const recentScrollView = useRef<ScrollView>(null);

  const longPress = (stationId: string) => {
    const options = ["삭제", "전체 삭제", "취소"];
    const destructiveButtonIndex = [0, 1];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        userInterfaceStyle: colorScheme === "dark" ? "dark" : "light",
      },
      async (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            const stationLists = await AsyncStorage.getItem("@recent_stations");
            if (!stationLists) {
              return;
            }
            const parsedStations: RadioStation[] = JSON.parse(stationLists);
            const updatedStations = parsedStations.filter(
              (station) => station.id !== stationId,
            );

            await AsyncStorage.setItem(
              "@recent_stations",
              JSON.stringify(updatedStations),
            );
            setRecentStationList(updatedStations);
            break;

          case 1:
            await AsyncStorage.setItem("@recent_stations", JSON.stringify([]));
            setRecentStationList([]);
            break;

          case 2:
            break;
        }
      },
    );
  };

  useEffect(() => {
    const loadRecentStations = async () => {
      try {
        const recentStations = await AsyncStorage.getItem("@recent_stations");
        if (!recentStations) {
          setRecentStationList([]);
          return;
        }
        const parsedStations = JSON.parse(recentStations) as RadioStation[];
        if (Array.isArray(parsedStations)) {
          setRecentStationList(parsedStations);
        }
      } catch (error) {
        console.error("최근 방송국 불러오기 실패:", error);
        setRecentStationList([]);
      }
    };
    loadRecentStations();
  }, []);

  const handleStationPress = async (station: RadioStation) => {
    try {
      const recentStations = await AsyncStorage.getItem("@recent_stations");
      const parsedStations: RadioStation[] = recentStations
        ? JSON.parse(recentStations)
        : [];

      const filteredStations = parsedStations.filter(
        (s) => s.id !== station.id,
      );
      const updatedStations = [...filteredStations, station].slice(0, 5);

      await AsyncStorage.setItem(
        "@recent_stations",
        JSON.stringify(updatedStations),
      );

      setRecentStationList(updatedStations);
      recentScrollView.current?.scrollTo({ x: 0 });

      router.push({
        pathname: "/player",
        params: {
          stationId: station.id,
          stationName: station.name,
          streamUrl: station.streamUrl,
          stationLogo: station.logo,
          stationColor: station.color,
        },
      });
    } catch (error) {
      console.error("최근 방송국 저장 실패:", error);
    }
  };

  return (
    <ScrollView
      style={{ ...styles.container, backgroundColor: colors.background }}
    >
      <View style={styles.section}>
        <Text style={{ ...styles.sectionTitle, color: colors.text }}>
          최근 재생한 방송국
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={recentScrollView}
        >
          {recentStationList.length === 0 ? (
            <Text style={{ color: colors.text }}>
              최근 재생한 방송국이 여기에 표시됩니다.
            </Text>
          ) : (
            recentStationList.reverse().map((station: RadioStation) => (
              <View key={station.id}>
                <TouchableOpacity
                  style={[
                    styles.card,
                    station.logo === null && station.color
                      ? { backgroundColor: station.color }
                      : null,
                  ]}
                  onPress={() => handleStationPress(station)}
                  onLongPress={() => longPress(station.id)}
                >
                  {station.logo && (
                    <Image
                      source={stationImages[station.id]}
                      style={{
                        width: CARD_WIDTH,
                        height: CARD_WIDTH,
                        borderRadius: 12,
                        resizeMode: "contain",
                      }}
                    />
                  )}
                </TouchableOpacity>
                <Text style={{ ...styles.stationName, color: colors.text }}>
                  {station.name}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
        <StationsList
          onStationSelect={handleStationPress}
          setRecentStationList={setRecentStationList}
          recentScrollViewRef={recentScrollView}
        />
      </View>
    </ScrollView>
  );
}

const CARD_WIDTH = Dimensions.get("window").width * 0.4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  cardContainer: {
    paddingRight: 20,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    marginRight: 15,
    marginBottom: 8,
    borderRadius: 8,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  stationName: {},
});
