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
import { apptext, theme } from "../../.././Constants";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Toast from "react-native-simple-toast";

const { COLORS, FONTS, SIZES, FONTFAMILY } = theme;
//Specialist data
const DATA = [
  {
    id: 1,
    title: "Stress",
    totalDoctors: "30 doctors",
    avator: require("../../.././Assets/images/onboarding-4.png"),
  },
  {
    id: 2,
    title: "Anxiety",
    totalDoctors: "30 doctors",
    avator: require("../../.././Assets/images/onboarding-6.png"),
  },
  {
    id: 3,
    title: "Depression",
    totalDoctors: "30 doctors",
    avator: require("../../.././Assets/images/onboarding-7.png"),
  },
  {
    id: 4,
    title: "Bipolar",
    totalDoctors: "30 doctors",
    avator: require("../../.././Assets/images/onboarding-4.png"),
  },
  {
    id: 5,
    title: "Headache",
    totalDoctors: "30 doctors",
    avator: require("../../.././Assets/images/onboarding-7.png"),
  },
  {
    id: 6,
    title: "Cold",
    totalDoctors: "30 doctors",
    avator: require("../../.././Assets/images/onboarding-4.png"),
  },
];

const OnlineDoctorsComponent = () => {
  const [spacailistData, setSpecialistData] = useState(DATA);
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
    <View style={[styles.Main2]}>
      <View style={[styles.Main3]}>
        <Text style={[styles.mainHeading]}>{mainTitle}</Text>
        <TouchableOpacity onPress={() => SpacialistClick()}>
        <Text style={[styles.mainViewall]}>{"See all.."}</Text>
        </TouchableOpacity>
      </View>
      

      <FlatList
        horizontal
        scrollEnabled={true}
        data={spacailistData}
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
        <TouchableOpacity onPress={() => SpacialistClick()}>
          <Image source={item.avator} style={[styles.cardImage]} />
          {/* <Text style={[styles.cardTitle]}>{item.title}</Text>
          <Text style={[styles.cardDescription]}>{item.totalDoctors}</Text> */}
        </TouchableOpacity>
      </View>
     <TouchableOpacity onPress={() => SpacialistClick()}>
      <View style={[styles.buttonAppointment,styles.elevation]}>
        <Text style={[styles.buttonText]}>Appointment</Text>
        </View>
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
      marginBottom:15,
    // backgroundColor: COLORS.white,
    // borderColor: "green",
    // borderWidth: 1,
    // borderRadius: 8,
    // width: wp("10"),
    // alignItems: "center",
    // marginTop: 2,
    // marginLeft: 5,
    // marginBottom: 10,
    // padding: 5,
  },
  elevation: {
    // elevation: 3,
    // shadowColor: COLORS.shadowcolor,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
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
    margin:10,
    marginLeft:10,
     width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 30,
     resizeMode: "contain",
  },
  cardTitle: {
    marginTop: 5,
    ...FONTS.cardTitle,
  },
  buttonText: {
    fontSize:10,color:COLORS.white
},

  buttonAppointment:{
    alignItems:'center',
    marginTop:7,
    marginLeft:10,
     backgroundColor: COLORS.primary,
     padding:5,
     borderRadius:25
    }
});

export default OnlineDoctorsComponent;
