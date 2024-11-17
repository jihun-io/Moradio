import React, {useEffect, useState} from 'react';
import {View, StyleSheet, useColorScheme} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import RadioPlayerScreen, {setupPlayer} from './screens/RadioPlayerScreen';
import HomeScreen from './screens/HomeScreen';
import Settings from './screens/SettingsScreen';
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
    </Stack.Navigator>
  );
}

// AppContent 컴포넌트로 분리하여 useSafeAreaInsets 사용
function AppContent() {
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
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings';
            }
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.colors.primary,
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
            headerTitle: '플레이어',
            tabBarLabel: '플레이어',
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: true,
            headerTitle: '설정',
            tabBarLabel: '설정',
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#DC2E2E',
  },
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#DC2E2E',
  },
};

function App(): JSX.Element {
  const scheme = useColorScheme();

  useEffect(() => {
    setupPlayer();
  }, []);

  return (
    <ActionSheetProvider>
      <SafeAreaProvider>
        <PlayerProvider>
          <NavigationContainer theme={scheme === 'dark' ? darkTheme : theme}>
            <AppContent />
          </NavigationContainer>
        </PlayerProvider>
      </SafeAreaProvider>
    </ActionSheetProvider>
  );
}

export default App;
