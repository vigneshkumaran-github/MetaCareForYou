import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TabNavigation from '../TabNavigation/TabNavigation';
import CustomDrawer from './CustomDrawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { COLORS } from '../../Constants/DesignConstants';
import { HomeStackScreen } from '../StackNav';

const Drawer = () => {
    const Drawerc = createDrawerNavigator();

    return (
        <Drawerc.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                drawerActiveTintColor: COLORS.black,
                drawerInactiveTintColor: COLORS.black,
                drawerItemStyle: { marginLeft: 10, marginRight: 10 },
                drawerLabelStyle: { color: COLORS.black, fontSize: 10 },
            }}>
            <Drawerc.Screen name="HomeScreen" component={HomeStackScreen} options={{ headerShown: false }} />
        </Drawerc.Navigator>
    );
}

export default Drawer

const styles = StyleSheet.create({})