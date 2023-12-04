import {
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTS } from '../../../Constants/DesignConstants';
import React, { useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Icon from "react-native-vector-icons/Feather";
import Icon1 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");



const SessionsComponent = ({sessionsData}) => {
 const[sessionSelected,setSessionSelected] = useState();
    const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          width: 6,
        }}
      ></View>
    );
  };


    const RenderSessiosItem = ({ item, index }) => (

    <TouchableOpacity style={sessionSelected ===item.SesID ? styles.buttonActive:styles.buttonInActive} onPress={() => setSessionSelected(item.SesID)}>
             <Icon1 name={item.vector} size={25} color={ sessionSelected ===item.SesID ? COLORS.white :COLORS.primary} />    
          <Text style={sessionSelected ===item.SesID ? styles.ButtonActivetext: styles.ButtonInActivetext}>{item.Session}</Text>
        </TouchableOpacity>
        
  );
  return (
    <View style={{ width: wp("100%") }}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          padding: 10,
        }}
      >
   <FlatList
        horizontal
        scrollEnabled={true}
        data={sessionsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return RenderSessiosItem({ item, index });
        }}
        ItemSeparatorComponent={ItemSeparatorView}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 10,
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom:10
        }}
      /> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  buttonActive: {
    alignItems: "center",
    marginTop: 5,
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: COLORS.primary,
  },
  buttonInActive: {
    alignItems: "center",
    marginTop: 5,
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: COLORS.white,
  },
  ButtonActivetext: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    marginLeft: 10,
  },
  ButtonInActivetext: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: COLORS.parimary,
    marginLeft: 10,
  },
});

export default SessionsComponent;
