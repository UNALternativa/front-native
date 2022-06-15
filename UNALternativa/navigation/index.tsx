/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useState, createRef} from 'react';
import { ColorSchemeName, Pressable, Button } from 'react-native';

import '../global/global.js'

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';



import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';




export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  
  
  
  
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      
    {global.id_user == null ? <DrawerItem
      label="Login"
      onPress={() => {
        props.navigation.navigate('Login');
      }}
    /> : null}
    {global.id_user == null ? <DrawerItem
      label="Register"
      onPress={() => {
        props.navigation.navigate('Register');
      }}
    /> : null}
    {global.id_user ? <DrawerItem
      label="Home"
      onPress={() => {
        props.navigation.navigate('Home');
      }}
    /> : null}
    {global.id_user ? <DrawerItem
      label="Cerrar Sesion"
      onPress={() => {
        global.id_user = null;
        props.navigation.navigate('Login');
      }}
    /> : null}
    
    </DrawerContentScrollView>
  );
}



function RootNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerShown: false
        }}
      />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color}  />,
          headerShown: false
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={Login}
        options={{
          title: 'Cerrar Sesion',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerShown: false
        }}
      />
      <Drawer.Screen
        name="Register"
        component={Register}
        options={{
          title: 'Register',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerShown: false
        }}
      />
      
    </Drawer.Navigator>
    
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();



  return (
    <BottomTab.Navigator
      initialRouteName="Login"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false
      }}>
      <BottomTab.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Register"
        component={Register}
        options={{
          title: 'Register',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
