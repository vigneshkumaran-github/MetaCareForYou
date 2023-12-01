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

const Tab = createBottomTabNavigator();

const TabNavigation = ({ navigation }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={COLORS.textColor} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        initialParams={{ icon: "message-circle" }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="head-check-outline" color={COLORS.textColor} size={22} />
          ),
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
          tabBarIcon: ({ color, size }) => (
            <Icon name="history" color={COLORS.textColor} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{ icon: "user" }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-check-outline" color={"black"} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigation;
