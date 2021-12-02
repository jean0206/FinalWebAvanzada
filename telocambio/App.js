import React, {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/screens/home';
import InfoUser from './src/screens/infouser';
import HomeIcon from './src/assets/icons/home.png';
import HomeFocused from './src/assets/icons/homefocus.png';
import HearthIcon from './src/assets/icons/hearth.png';
import HearthFocused from './src/assets/icons/hearthfocus.png';
import AddIcon from './src/assets/icons/addselection.png';
import AddFocus from './src/assets/icons/addfocus.png';
import UserIcon from './src/assets/icons/user.png';
import NotiIcon from './src/assets/icons/notiicon.png';
import NotiFocus from './src/assets/icons/notifocus.png';
import UserFocus from './src/assets/icons/userfocus.png';
import Login from './src/screens/login';
import Upload from './src/screens/upload';
import ProductInfo from './src/screens/productInfo';
import InitialConfig from './src/screens/initialConfig';
import MyProductOffert from './src/screens/myProductOffert';
import ListChat from './src/screens/listChats';
import SeeOffert from './src/screens/seeOffert';
import MyOfferts from './src/screens/myofferts';
import MyProducts from './src/screens/myProducts';
import Notification from './src/screens/notification';
import Offer from './src/screens/offer';
import Chat from './src/screens/chat';
import Edit from './src/screens/editLocation';
import {createStackNavigator} from '@react-navigation/stack';
import Saved from './src/screens/saved';
import SplashScreen from 'react-native-splash-screen'

import {AuthContext, AuthProvider} from './src/context/authContext';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const App = () => {
  //
  useEffect(() => {
    return () => {
      SplashScreen.hide()
    };
  }, []);

  const UserStack = () => {
    const {user, setUser} = useContext(AuthContext);
    return (
      <Stack.Navigator>
        {user.auth ? (
          <Stack.Screen
            name="Info"
            options={{headerShown: false}}
            component={InfoUser}
          />
        ) : (
          <Stack.Screen
            name="Login"
            options={{headerShown: false}}
            component={Login}
          />
        )}
        <Stack.Screen
          name="configinital"
          options={{headerShown: false}}
          component={InitialConfig}
        />
        <Stack.Screen
          name="myproducts"
          options={{headerShown: false}}
          component={MyProducts}
        />
        <Stack.Screen
          name="myOfferProduct"
          options={{headerShown: false}}
          component={MyProductOffert}
        />
        <Stack.Screen
          name="seeOffert"
          options={{headerShown: false}}
          component={SeeOffert}
        />
        <Stack.Screen
          name="listchat"
          options={{headerShown: false}}
          component={ListChat}
        />
        <Stack.Screen
          name="chat"
          options={{headerShown: false, }}
          component={Chat}
        />
        <Stack.Screen
          name="edit"
          options={{headerShown: false, }}
          component={Edit}
        />
        <Stack.Screen
          name="myofferts"
          options={{headerShown: false, }}
          component={MyOfferts}
        />
      </Stack.Navigator>
    );
  };

  const ProductStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="homeInit"
          options={{headerShown: false}}
          component={Home}
        />
        <Stack.Screen
          name="productInfo"
          options={{headerShown: false}}
          component={ProductInfo}
        />
        <Stack.Screen
          name="offerProduct"
          options={{headerShown: false}}
          component={Offer}
        />
      </Stack.Navigator>
    );
  };

  return (
    <AuthProvider>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            showLabel: false,
            style: styles.navigator,
          }}>
          <Tab.Screen
            name="Inicio"
            component={ProductStack}
            options={{
              tabBarIcon: ({focused}) => (
                <View style={styles.buttonContainer}>
                  <Image
                    style={styles.imageIcon}
                    source={focused ? HomeFocused : HomeIcon}
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Likes"
            component={Saved}
            options={{
              tabBarIcon: ({focused}) => (
                <View style={styles.buttonContainer}>
                  <Image
                    style={styles.imageIcon}
                    source={focused ? HearthFocused : HearthIcon}
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Add"
            component={Upload}
            options={{
              tabBarIcon: ({focused}) => (
                <View style={styles.buttonContainer}>
                  <Image
                    style={styles.imageIcon}
                    source={focused ? AddFocus : AddIcon}
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Noti"
            component={Notification}
            options={{
              tabBarIcon: ({focused}) => (
                <View style={styles.buttonContainer}>
                  <Image
                    style={styles.imageIcon}
                    source={focused ? NotiFocus : NotiIcon}
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="User"
            component={UserStack}
            options={{
              tabBarIcon: ({focused}) => (
                <View style={styles.buttonContainer}>
                  <Image
                    style={styles.imageIcon}
                    source={focused ? UserFocus : UserIcon}
                  />
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flex: 1,
  },
  navigator: {
    backgroundColor: '#ffffff',
    elevation: 30,
    position: 'absolute',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    height: 86,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
  },
  imageIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});

export default App;
