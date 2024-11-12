// screens/HomeScreen.tsx
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {STATION_CATEGORIES} from '../constants/categories';

type RadioStation = {
  id: string;
  name: string;
  streamUrl: string;
  color: string;
  logo: any;
};

type RootStackParamList = {
  HomeMain: undefined;
  RadioPlayer: {
    stationId: string;
    stationName: string;
    streamUrl: string;
    stationLogo: any;
    stationColor: string;
  };
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeMain'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

// 카드 컴포넌트
type RadioCardProps = {
  title: string;
  color: string;
  onPress: () => void;
};

const RadioCard = ({title, color, onPress}: RadioCardProps): JSX.Element => (
  <View>
    <TouchableOpacity
      style={[styles.card, {backgroundColor: color}]}
      onPress={onPress}></TouchableOpacity>
    <Text style={styles.stationName}>{title}</Text>
  </View>
);

function HomeScreen({navigation}: Props): JSX.Element {
  const [recentStationList, setRecentStationList] = useState<RadioStation[]>(
    [],
  );

  const recentScrollView = useRef<ScrollView>(null);

  useEffect(() => {
    const loadRecentStations = async () => {
      try {
        // 디버그용 초기화 코드
        // await AsyncStorage.removeItem('@recent_stations');
        const recentStations = await AsyncStorage.getItem('@recent_stations');
        if (!recentStations) {
          setRecentStationList([]);
          return;
        }
        const parsedStations = JSON.parse(recentStations) as RadioStation[];
        if (Array.isArray(parsedStations)) {
          setRecentStationList(parsedStations);
        }
      } catch (error) {
        console.error('최근 방송국 불러오기 실패:', error);
        setRecentStationList([]);
      }
    };
    loadRecentStations();
  }, [recentStationList]);

  const handleStationPress = async (station: RadioStation) => {
    try {
      const recentStations = await AsyncStorage.getItem('@recent_stations');
      const parsedStations: RadioStation[] = recentStations
        ? JSON.parse(recentStations)
        : [];

      const filteredStations = parsedStations.filter(s => s.id !== station.id);
      const updatedStations = [...filteredStations, station].slice(0, 5);

      await AsyncStorage.setItem(
        '@recent_stations',
        JSON.stringify(updatedStations),
      );

      // 상태 즉시 반영을 위해 직접 업데이트
      setRecentStationList(updatedStations);

      // 최근 재생 목록의 스크롤을 맨 앞으로 이동
      recentScrollView.current?.scrollTo({x: 0});

      navigation.navigate('RadioPlayer', {
        stationId: station.id,
        stationName: station.name,
        streamUrl: station.streamUrl,
        stationLogo: station.logo,
        stationColor: station.color,
      });
    } catch (error) {
      console.error('최근 방송국 저장 실패:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>최근 재생한 방송국</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={recentScrollView}>
          {recentStationList.length === 0 ? (
            <Text>최근 재생한 방송국이 여기에 표시됩니다.</Text>
          ) : (
            recentStationList.reverse().map((station: RadioStation) => (
              <View key={station.id}>
                <TouchableOpacity
                  style={[
                    styles.card,
                    station.logo === null && station.color
                      ? {backgroundColor: station.color}
                      : null,
                  ]}
                  onPress={() => handleStationPress(station)}>
                  {/* logo prop이 유효한 컴포넌트인지 확인 */}
                  {station.logo && (
                    <Image
                      source={station.logo}
                      style={{
                        width: CARD_WIDTH,
                        height: CARD_WIDTH,
                        borderRadius: 12,
                        resizeMode: 'contain',
                      }}
                    />
                  )}
                </TouchableOpacity>
                <Text style={styles.stationName}>{station.name}</Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
      {STATION_CATEGORIES.map(category => (
        // 각 카테고리 섹션
        <View key={category.id} style={styles.section}>
          <Text style={styles.sectionTitle}>{category.name}</Text>

          {/* 방송국 카드들을 가로 스크롤로 표시 */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {category.stations.map(station => (
              <View key={station.id}>
                <TouchableOpacity
                  style={[
                    styles.card,
                    !station.logo && station.color
                      ? {backgroundColor: station.color}
                      : null,
                  ]}
                  onPress={async () => {
                    const recentStations = await AsyncStorage.getItem(
                      '@recent_stations',
                    );

                    const recentStationsJSON = recentStations
                      ? JSON.parse(recentStations)
                      : [];
                    const uniqueRecentStations = recentStationsJSON.filter(
                      (s: RadioStation) => s.id !== station.id,
                    );

                    await AsyncStorage.setItem(
                      '@recent_stations',
                      JSON.stringify([
                        ...uniqueRecentStations,
                        {
                          id: station.id,
                          name: station.name,
                          streamUrl: station.streamUrl,
                          color: station.color,
                          logo: station.logo,
                        },
                      ]),
                    );
                    navigation.navigate('RadioPlayer', {
                      stationId: station.id,
                      stationName: station.name,
                      streamUrl: station.streamUrl,
                      stationLogo: station.logo,
                      stationColor: station.color || '#333',
                    });
                  }}>
                  {/* logo prop이 유효한 컴포넌트인지 확인 */}
                  {station.logo && (
                    <Image
                      source={station.logo}
                      style={{
                        width: CARD_WIDTH,
                        height: CARD_WIDTH,
                        borderRadius: 12,
                        resizeMode: 'contain',
                      }}
                    />
                  )}
                </TouchableOpacity>
                <Text style={styles.stationName}>{station.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
}

const CARD_WIDTH = Dimensions.get('window').width * 0.4; // 화면 너비의 40%

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000', // 다크 테마
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    // color: '#FFF',
    marginBottom: 15,
  },
  cardContainer: {
    paddingRight: 20, // 마지막 카드 오른쪽 여백
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    marginRight: 15,
    marginBottom: 8,
    borderRadius: 8,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stationName: {
    // color: '#FFF',
    // fontSize: 16,
    // fontWeight: '600',
  },
});

export default HomeScreen;
