import { Text, TouchableOpacity } from "react-native-gesture-handler";

import { COLORS } from "../../Constants/DesignConstants";
import History from "../../MainScreens/History/History";
import Home from "../../MainScreens/HomeScreens/Home";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Profile from "../../MainScreens/ProfileScreen/Profile";
import React from "react";
import Search from "../../MainScreens/SearchScreens/Search";
import TabBar from "./TabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { responsiveWidth } from "react-native-responsive-dimensions";

const Tab = createBottomTabNavigator();

const TabNavigation = ({ navigation }) => {
  return (
    <Tab.Navigator screenOptions={
      {
        tabBarStyle:{alignSelf:'center',width:responsiveWidth(100),justifyContent:'space-between'},
      }
    }>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size,focused }) => (
            <Icon name="home-outline" color={focused ?COLORS.primary : COLORS.black} size={22} />
          ),
          tabBarInactiveTintColor:COLORS.black,
          tabBarActiveTintColor:COLORS.primary,
          tabBarItemStyle:{marginHorizontal:responsiveWidth(4)}
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        initialParams={{ icon: "message-circle" }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size,focused }) => (
            <Icon name="head-check-outline" color={focused ?COLORS.primary :COLORS.black} size={22} />
          ),
          tabBarInactiveTintColor:COLORS.black,
          tabBarActiveTintColor:COLORS.primary,
          tabBarItemStyle:{marginHorizontal:responsiveWidth(4)}
        }}
      />
      {/* <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        initialParams={{ icon: "align-center" }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="bell-cancel-outline" color={COLORS.textColor} size={22} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="History"
        component={History}
        initialParams={{ icon: "user" }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size,focused }) => (
            <Icon name="history" color={focused ?COLORS.primary :COLORS.black} size={22} />
          ),
          tabBarInactiveTintColor:COLORS.black,
          tabBarActiveTintColor:COLORS.primary,
          tabBarItemStyle:{marginHorizontal:responsiveWidth(4)}
        
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{ icon: "user" }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size,focused }) => (
            <Icon name="account-check-outline" color={focused ?COLORS.primary :COLORS.black} size={22} />
          ),
          tabBarInactiveTintColor:COLORS.black,
          tabBarActiveTintColor:COLORS.primary,
          tabBarItemStyle:{marginHorizontal:responsiveWidth(4)}
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigation;
