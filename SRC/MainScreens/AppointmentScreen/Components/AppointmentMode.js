import * as Progress from 'react-native-progress';

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

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");



const AppointmentMode = ({}) => {
  const navigation = useNavigation()

 const[mode,setMode] = useState();

  return (
    <>
<Text style={{margin:10, ...FONTS.mainHeading,marginBottom:20}}>Appointment Mode</Text>
     <View style={{
        width:wp('100%'),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    }}>
        
            <TouchableOpacity
          style={mode==="video" ? styles.button: styles.buttonInActive} onPress={() => setMode("video")}
            >
            <View style={{alignItems:'center',justifyContent:'center',marginRight:10}}> 
                <Icon name="message-video" size={35} color={mode==="video" ?COLORS.white :COLORS.primary} />
                </View>
            <View>
          <Text style={mode==="video" ? styles.ButtontextActive: styles.ButtontextInActive}>{"Video call "}</Text>
          <Text style={styles.Buttonsubtext}>{"You can make 5 calls per month in a Subsciption "}</Text>

          <View style={{flexDirection:'row'}}>
          <Progress.Bar progress={0.4} width={200} height={10} color="green" />
          <Text style={{fontSize:9,marginLeft:5}}>2/5</Text>
           </View>
          </View>

          
        </TouchableOpacity>

        <TouchableOpacity
           style={mode==="message" ? styles.button: styles.buttonInActive} onPress={() => setMode("message")}
        >
          <View  style={{alignItems:'center',justifyContent:'center',marginRight:10}}>
           <Icon name="message-processing" size={35} color={mode==="message" ?COLORS.white :COLORS.primary} />
           </View>
          <View style={{flexDirection:'column'}}>
          <Text style={mode==="message" ? styles.ButtontextActive: styles.ButtontextInActive}>{"Messaging"}</Text>
          <Text style={styles.Buttonsubtext}>{"You can make 5 calls per month in a Subsciption "}</Text>
          <View style={{flexDirection:'row'}}>
          <Progress.Bar  progress={0.8} width={200} height={10} color={'green'}  />
          <Text style={{fontSize:9,marginLeft:5,color:COLORS.secondary}}>4/5</Text>
           </View>
           </View>
        </TouchableOpacity>
        </View>
        </>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  button: {
    width:wp('90%'),
    flexDirection:'row',
    marginBottom: 20,
    // alignItems: "center",
    // justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: COLORS.primary,
  },
    buttonInActive: {
    width:wp('90%'),
    flexDirection:'row',
    marginBottom: 20,
    // alignItems: "center",
    // justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: '#dfdfdf',
  },
  ButtontextActive: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: COLORS.white,
  },
   ButtontextInActive: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: COLORS.black,
  },
    Buttonsubtext: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: "500",
    letterSpacing: 0.25,
    color: COLORS.cardDescription,
    marginBottom:10
  },
});

export default AppointmentMode;
