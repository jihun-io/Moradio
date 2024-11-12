import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import RadioPlayerScreen, {setupPlayer} from './screens/RadioPlayerScreen';
import {MiniPlayer} from './components/MiniPlayer';
import HomeScreen from './screens/HomeScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTrackPlayerEvents, Event} from 'react-native-track-player';
import {
  useSafeAreaInsets,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

import {PlayerProvider, usePlayer} from './contexts/RadioContext';

type RootStackParamList = {
  HomeMain: undefined;
  RadioPlayer: {
    stationName: string;
    streamUrl: string;
  };
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{headerTitle: 'Moradio'}}
      />
      {/* <Stack.Screen
        name="RadioPlayer"
        component={RadioPlayerScreen}
        options={{
          headerShown: true,
          headerTitle: '방송 듣기',
        }}
      /> */}
    </Stack.Navigator>
  );
}

// AppContent 컴포넌트로 분리하여 useSafeAreaInsets 사용
function AppContent() {
  const insets = useSafeAreaInsets();
  const TAB_BAR_HEIGHT = 49;

  const {showMiniPlayer} = usePlayer();

  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName = 'radio';
            if (route.name === 'Home') {
              iconName = focused ? 'radio' : 'radio-outlined';
            } else if (route.name === 'RadioPlayer') {
              iconName = focused ? 'play-circle-filled' : 'play-circle-outline';
            }
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: DefaultTheme.colors.primary,
        })}>
        <Tab.Screen
          name="Moradio"
          options={{
            headerShown: false,
          }}
          component={HomeStack}
        />
        <Tab.Screen
          name="RadioPlayer"
          component={RadioPlayerScreen}
          options={{
            headerShown: true,
            headerTitle: '재생 중',
            tabBarLabel: '재생 중',
          }}
        />
      </Tab.Navigator>
      {/* <MiniPlayer
        style={[
          styles.miniPlayer,
          {
            bottom: TAB_BAR_HEIGHT + insets.bottom,
          },
        ]}
      /> */}
    </View>
  );
}

function App(): JSX.Element {
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (
      event.type === Event.PlaybackTrackChanged &&
      event.nextTrack !== undefined
    ) {
      setShowMiniPlayer(true);
    }
  });

  useEffect(() => {
    setupPlayer();
  }, []);

  return (
    <ActionSheetProvider>
      <SafeAreaProvider>
        <PlayerProvider>
          <NavigationContainer>
            <AppContent />
          </NavigationContainer>
        </PlayerProvider>
      </SafeAreaProvider>
    </ActionSheetProvider>
  );
}

const styles = StyleSheet.create({
  miniPlayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 60, // 미니 플레이어 높이
    backgroundColor: '#333',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    zIndex: 1000, // 다른 요소들 위에 표시되도록
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});

export default App;
