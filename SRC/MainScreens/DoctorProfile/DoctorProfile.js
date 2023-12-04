import {
    Alert,
    BackHandler,
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
import { COLORS, FONTFAMILY } from "../../Constants/DesignConstants";
import React, { useEffect, useState } from "react";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import CustomNavbar from "../../CustomComponents/CustomNavbar";
import { IMAGE_BASE_URL } from "../../ApiService/Config";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';

const data=[{
      drName:"Emma Watson",
      aboutDoctor:"Varun orchestrates a drama, in which he has Mahaali and Killi  and Padmini act as if the duo were kidnapping her and simultaneously has Padmini's family urge Terry to find her.",
      workingTime:"Mon - Fri 09.00 AM - 04.00 PM",
      totalPatients:"15",
      experience:"5",
      designation:'Senior Pshychiartist',
      clinic:" Sara Medical College Hospital"
  }]
  
  const DoctorProfile = ({route}) => {
  const navigation = useNavigation()
   const basicInfo =route.params.item;
   console.log()
   
      const[profileData,setProfileData]=useState(data[0]);
  
  
    return (
      <SafeAreaView style={[styles.SafeAreaView]}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
        <ScrollView>
          <CustomNavbar
            title="Doctor Details"
           onPress={() => navigation.popToTop()}
          />
          {/*For Empty Profile Section*/}
          <View style={[styles.ProfileImageMain]}>
           
          
          {basicInfo.profile ?  <Image
              source={{uri: IMAGE_BASE_URL+basicInfo.profile}}
              style={[styles.cardImage]}
            />:
             <View style={[styles.EmptyProfileLayout]}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 44,
                  
                  
                }}
              >
                {basicInfo.first_name ? getInitials(basicInfo.first_name):"Dr"}
              </Text>
            </View> }
          </View>
          {/*For Empty Profile Section End*/}
  
          <View style={[styles.BottomlayoutMain]}>
            <View style={[styles.subCard]}>
              
              <View style={{ flexDirection: "row" }}>
                <Icon name="check-decagram" color={COLORS.primary} size={25} />
                <Text style={[styles.subCardText]}>{basicInfo.experience +" Years experienced Therapist"}  </Text>
              </View>
            </View>
  
            <View style={{ width: wp("90%"), margin: 10 }}>
              <View style={{ margin: 5 }}>
                <Text style={[styles.Textheads]}> {basicInfo.first_name+" "+basicInfo.last_name}</Text>
                <Text style={[styles.subTexts]}>
                 {basicInfo.gender+" Therapist"}
                </Text> 
              </View>
  
              <View style={{ margin: 5 }}>
                <Text style={[styles.Textheads]}>About Therapist</Text>
                <Text style={[styles.subTexts]}>Specialist In :  
                {basicInfo.Specialists ? basicInfo.Specialists.map(x => x.specialist_title).join(", "):""}
                </Text>
              </View>
  
               <View style={{ margin: 5 }}>
                <Text style={[styles.Textheads]}>More Contact</Text>
                <Text style={[styles.subTexts]}>
                 {basicInfo.email}
                </Text>
              </View> 
  
              <View style={{ margin: 5, alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.Submitbutton} >
                  <Text style={styles.Buttontext}>{"Consult"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    SafeAreaView: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.white,
    },
    cardImage: {
      width: wp("50%"),
      height: hp("50%"),
      resizeMode: "contain",
    },
  
    ProfileImageMain: {
      width: wp("100%"),
      // height: hp("30%"),
      alignItems: "center",
      // justifyContent: "center",
      // backgroundColor: "#daebf9",
      position: "absolute",
    },
    EmptyProfileLayout: {
      width: 150,
      height: 150,
      borderRadius: 150 / 2,
      borderWidth: 1,
      borderColor: COLORS.white,
      backgroundColor: COLORS.secondary,
      alignItems: "center",
      justifyContent: "center",
      top:100
    },
    BottomlayoutMain: {
      width: wp("100%"),
      height: hp("100%"),
      alignItems: "center",
      backgroundColor: COLORS.white,
      top: "30%",
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35,
    },
  
    subCard: {
      width: wp("79%"),
      height: hp("8.5%"),
      backgroundColor: "#FFE5D0",
      borderRadius: 38,
      top: -20,
      flexDirection: "row",
      padding: 10,
      alignItems: "center",
      justifyContent: "space-around",
      elevation: 3,
    },
    subCardText: {
      marginTop: 4,
      marginLeft: 5,
      fontFamily: FONTFAMILY.poppinsregular,
      fontSize: 12,
      fontWeight: "bold",
      lineHeight: 22,
      color: COLORS.secondary,
    },
    Textheads: {
      marginTop: 4,
      fontFamily: FONTFAMILY.poppinsbold,
      fontSize: 16,
      fontWeight: "bold",
      lineHeight: 22,
      color: COLORS.primary,
    },
    subTexts: {
      marginTop: 15,
      fontFamily: FONTFAMILY.poppinsregular,
      fontSize: 14,
      fontWeight: "bold",
      lineHeight: 22,
      color: COLORS.textcolor,
    },
    Submitbutton: {
      width: wp("70%"),
      marginTop: 15,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 15,
      paddingHorizontal: 15,
      borderRadius: 25,
      elevation: 3,
      backgroundColor: COLORS.primary,
    },
    Buttontext: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: COLORS.white,
    },
  });
  
  export default DoctorProfile;
  