import { COLORS, FONTFAMILY, FONTS } from "../Constants/DesignConstants";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Icon from 'react-native-vector-icons/Ionicons';
import React from "react";

const CustomNavbar = ({
  title,
  onPress,
}) => {
  return (
        <View style={styles.navBar} >
          <TouchableOpacity style={[styles.NavbarLeftTop]} onPress={onPress}> 
            <View style={[styles.NavbarIcon]}>
            <Icon name="md-arrow-undo-sharp"   size={25} color={COLORS.primary} />
            </View>

          </TouchableOpacity>

          <View style={styles.navBarTitleStyle}>
            <Text style={styles.NavbarText}>{title}</Text>
          </View>

          <View style={styles.navBarItemStyle}>
          </View>

        </View>
  );
};

const styles = StyleSheet.create({

navBar: {
    width: wp('100%'),
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  navBarTitleStyle: {
    flex: 2,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBarItemStyle: {
    flex: 1,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  NavbarLeftTop:{
flex: 1, 
height: 55, 
justifyContent: 'center', 
marginLeft: 20 
  },
 NavbarIcon:{
    backgroundColor:'white',width:40,height:40,borderRadius:20,alignItems:'center',justifyContent: 'center', shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    elevation: 5,},
    NavbarText:{
        ...FONTS.NavBarHeading
    }
  

});
export default CustomNavbar;
