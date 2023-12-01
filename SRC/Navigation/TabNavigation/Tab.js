import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native'

import Icon from 'react-native-vector-icons/Feather';
import React from 'react'

const Tab = ({ color, tab, Handler, icon ,color1,radius}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={Handler}>
            <View style={{ alignItems: 'center', justifyContent: 'center',backgroundColor:color1, borderRadius: radius, width: 74, height: 48,  }}>
           <Icon name={icon} color={color} />
            </View>   
        </TouchableOpacity>
    )
}

export default Tab
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        height: 60,
        elevation: 2,
       
    },
    Icon1: {
        width: 24,
        height: 24,
        color: 'white',
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

})