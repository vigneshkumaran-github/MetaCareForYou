import { COLORS, FONTFAMILY, FONTS } from "../../../../Constants/DesignConstants";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from "react-native-simple-toast";
import { useNavigation } from "@react-navigation/native";

//Specialist data
const DATA = [
  {
    id: 1,
    doctorName: "Madhan Kumar",
    desination: "Senior Therapist",
    avator: require("../../../../Resources/Images/logo.png"),
    date:'20-01-2023',
    time:'11.00 am'
  },
  {
    id: 2,
    doctorName: "David Philips",
    desination: "Senior Specialist",
    avator: require("../../../../Resources/Images/logo.png"),
     date:'28-02-2023',
    time:'10.30 am'
  },
  {
    id: 3,
    doctorName: "Smith Organ",
    desination: "Senior Therapist",
    avator: require("../../../../Resources/Images/logo.png"),
    date:'08-03-2023',
    time:'05.30 pm'
  },
  {
    id: 4,
    doctorName: "Swathi Ramya",
    desination: "Senior Therapist",
    avator: require("../../../../Resources/Images/logo.png"),
    date:'19-04-2023',
    time:'06.30 pm'
  },

];

const HistoryList = () => {
const navigation = useNavigation();
  const [historyData, sethistoryData] = useState(DATA);
  const [mainTitle, setMainTitle] = useState("Doctors online");
  const SpacialistClick = () => {
    Toast.show("Under Construction...", Toast.LONG);
  };


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

  const RenderSpalist = () => (

      <FlatList
        data={historyData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return RenderSpalistItem({ item, index });
        }}
        ItemSeparatorComponent={ItemSeparatorView}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 10,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      />
   
  );

  const RenderSpalistItem = ({ item, index }) => (
      <View style={[styles.card, styles.elevation]} >

            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:6,}}>
                <View>
                    <Text style={[styles.textName]}>Dr.{item.doctorName}</Text>
                    <Text  style={[styles.textNormal]}>{item.desination}</Text>
                </View> 

                     <View>
                         <TouchableOpacity >
                         <Image source={item.avator} style={[styles.cardImage]} />
                       </TouchableOpacity>
                     </View>
                </View>
                {/* Line Breack*/}

                 <View style={[styles.line]}>
            <View style={[styles.lineBreack]} />
            </View>
           {/* Line Breack End*/}

            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',padding:6,}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Icon  name="calendar-check-outline" size={20} color={COLORS.primary} style={{marginRight:7}}/>
                    <Text  style={[styles.textsmall]}>{item.date}</Text>
                </View> 

                 <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Icon  name="timer-outline" size={20} color={COLORS.secondary} style={{marginRight:7}}/>
                    <Text  style={[styles.textsmall]}>{item.time}</Text>
                </View> 

                 <View style={{flexDirection:'row',alignItems:'center',marginRight:10}}>
                    <Icon  name="star-circle-outline" size={20} color={'green'} style={{marginRight:7}}/>
                    <Text  style={[styles.textsmall]}>Confirmed</Text>
                </View> 

  
                </View>

                  {/* Line Breack*/}

                 <View style={[styles.line]}>
            <View style={[styles.lineBreack]} />
            </View>
           {/* Line Breack End*/}

           <TouchableOpacity style={{alignItems:'center'}} onPress={() => navigation.navigate("ReportsScreen")}>
            <Text style={[styles.linktext]}>view Reports</Text>
            </TouchableOpacity>


           </View>
  );
  return <RenderSpalist />;
};
const styles = StyleSheet.create({
  Main2: {
    width: wp("100%"),
    backgroundColor: COLORS.white,
    alignItems: "center",
    padding: 5,
    marginTop: 10,
  },
  Main3: {
    width: wp("90%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between"
  },
  mainHeading: {
    ...FONTS.mainHeading,
  },
   mainViewall: {
    ...FONTS.mainHeading,
    fontSize:13,
  },
 card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    width: wp("85"),
    marginTop: 2,
    marginLeft: 5,
    marginBottom: 10,
    padding: 5,
  },
  elevation: {
    shadowColor: 'gray',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  cardInner1: {
     marginLeft:10,
     width: 70,
    height: 70,
    borderColor: '#8BCF1D',
    borderWidth: 2.5,
    borderRadius: 35,
    alignItems: "center",
    justifyContent:"center",
  
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius:50/2,
    resizeMode: "contain",
  },

    textName:{
    marginBottom: 3,
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 24,
    color: COLORS.black,
  },
      textNormal:{
    fontFamily: FONTFAMILY.poppinsregular,
    fontSize: 12,
    lineHeight: 24,
    color: COLORS.textColor,
  },
  textsmall:{
    top:2,
    fontFamily: FONTFAMILY.poppinsregular,
    fontSize: 10,
    lineHeight: 20,
    color: COLORS.textColor,
  },
    line:{
    flexDirection: 'row', 
    alignItems: 'center',
    width:wp('75%'),
    margin:10,
  },
    lineBreack:{
     flex: 1,
     height: 1, 
     backgroundColor: '#e7e6e6'
    
  },
  linktext:{
    fontFamily: FONTFAMILY.poppinsregular,
    fontSize: 12,
    lineHeight: 22,
    color: COLORS.blue,
  }
});

export default HistoryList;
