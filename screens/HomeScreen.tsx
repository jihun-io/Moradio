// screens/HomeScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {STATION_CATEGORIES} from '../constants/categories';

type RadioStation = {
  id: string;
  name: string;
  streamUrl: string;
  color: string;
};

type RootStackParamList = {
  HomeMain: undefined;
  RadioPlayer: {
    stationName: string;
    streamUrl: string;
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
  const handleStationPress = (station: RadioStation) => {
    navigation.navigate('RadioPlayer', {
      stationName: station.name,
      streamUrl: station.streamUrl,
    });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>최근 재생한 방송국</Text>
        <Text>최근 재생한 방송국이 여기에 표시됩니다.</Text>
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
                  style={[styles.card, {backgroundColor: station.color}]}
                  onPress={() =>
                    navigation.navigate('RadioPlayer', {
                      stationName: station.name,
                      streamUrl: station.streamUrl,
                    })
                  }></TouchableOpacity>
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
    marginBottom: 60,
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
  },
  stationName: {
    // color: '#FFF',
    // fontSize: 16,
    // fontWeight: '600',
  },
});

export default HomeScreen;
