import { COLORS, FONTS } from "../../../Constants/DesignConstants";
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

import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

//Specialist data
const DATA = [
  {
    id: 1,
    doctorName: "Dr. Ravi Verma",
    Designation: "senior psychiartist",
    avator: require("../../../Resources/Images/logo.png"),
  },
  {
    id: 2,
    doctorName: "Dr. Adam",
    Designation: "senior psychiartist",
    avator: require("../../../Resources/Images/logo.png"),
  },
  {
    id: 3,
    doctorName: "Dr. Ravi Verma",
    Designation: "senior psychiartist",
    avator: require("../../../Resources/Images/logo.png"),
  },
  {
    id: 4,
    doctorName: "Dr. Adam",
    Designation: "senior psychiartist",
    avator: require("../../../Resources/Images/logo.png"),
  },
];

const Lists = (props) => {
  console.log(props.data)
  const navigation = useNavigation();
  const [FindDoctorsData, setFindDoctorsData] = useState([]);
  const [mainTitle, setMainTitle] = useState("Find Your Best Therapist");
//    const getTherapist = async () => {

//       let url=Config.APIURL+'get_therapists';
//       try{
//      await axios
//       .get(url)
//       .then(function (response) {
//         setFindDoctorsData(response.data.data)
//       })
//       .catch(function (error) {
//         // handle error
//          console.log(error)
//       console.log("entered err")
//       })
//       .finally(function () {
       
//         console.log("Finally Called")
//       });
//     }
//     catch(error)
//     {
//       console.log("entered")
 
//     }
//   };

  useEffect(()=>{
    setFindDoctorsData(props.data)
 },[]);



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

  const FindDocters = () => {

    navigation.replace('AppointmentScreen');
    // Toast.show("Under Construction...", Toast.LONG);
  };
  const DoctorProfile = () => {

    navigation.replace('DoctorProfile');
    // Toast.show("Under Construction...", Toast.LONG);
  };

  const RenderSpalist = () => (
    <View style={[styles.Main2]}>

      <FlatList
        scrollEnabled={true}
        data={FindDoctorsData}
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
    </View>
  );

  const RenderSpalistItem = ({ item, index }) => (
    <View style={[styles.card, styles.elevation]}>
        <View style={[styles.cardInner1]}>
        <View>
      <TouchableOpacity   style={[styles.backroundLay]} onPress={() => DoctorProfile()}>
        <Image source={item.avator} style={[styles.cardImage]} />
       
      </TouchableOpacity>
      </View>

      {/* Consult Button Layout Start*/}
        <View>
       <Text style={[styles.cardTitle]}>{item.doctorName}</Text>
       </View>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.secondary,
          borderColor: COLORS.secondary,
          borderWidth: 0.5,
          borderRadius: 8,
          padding: 6,
          margin: 10,
        }}
        onPress={() => FindDocters()}
      >
        <Text
          style={{
            fontSize: 10,
            color: COLORS.white,
            marginLeft: 10,
            marginRight: 10,
            width: 35,
          }}
        >
          Consult
        </Text>
      </TouchableOpacity>
      
      </View>
      {/* Consult Button Layout End*/}
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
    marginTop: 1,
  },

  mainHeading: {
    ...FONTS.mainHeading,
  },
  card: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.secondary,
    borderWidth: 1,
    borderRadius: 8,
    width: wp("80"),
    // height: hp("20"),
    // alignItems: "center",
    marginTop: 2,
    marginLeft: 5,
    marginBottom: 10,
  },
  elevation: {
    // elevation: 3,
    // shadowColor: COLORS.shadowcolor,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  cardInner1: {
    
    flexDirection:'row',
    padding:10,
    alignItems: "center",
    justifyContent:'space-around',

  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius:50/2,
    resizeMode: "contain",
  },
  cardTitle: {
    ...FONTS.cardTitle,
  },
  cardDescription: {
    ...FONTS.cardDescription,
  },
  cancelButton: {
    position: "absolute",
    right: -6,
    top: -6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  backroundLay:{
        width: 60,
    height: 60,
    borderColor: COLORS.secondary,
    borderWidth: 2.5,
    borderRadius: 60/2,
    alignItems: "center",
    justifyContent:"center",
  
  }
});

export default Lists;
