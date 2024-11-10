// App.tsx로 다시 변경하고
import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import RadioPlayerScreen from './screens/RadioPlayerScreen';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
      <Stack.Screen
        name="RadioPlayer"
        component={RadioPlayerScreen}
        options={{
          headerShown: true,
          headerTitle: '방송 듣기',
        }}
      />
    </Stack.Navigator>
  );
}

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName = 'radio';

            if (route.name === 'Home') {
              iconName = focused ? 'radio' : 'radio-outlined';
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: DefaultTheme.colors.primary,
        })}>
        <Tab.Screen
          name="Moradio"
          options={{headerShown: false}}
          component={HomeStack}
        />
        {/* <Tab.Screen name="Library" component={LibraryScreen} /> */}
        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
