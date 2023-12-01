
import {
  BackHandler,
  Button,
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
import React, { useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Lottie from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTFAMILY } from "../../../Constants/DesignConstants";
import CustomButton from "../../../CustomComponents/CustomButton";


const { width, height } = Dimensions.get("window");

const data = [
  {
    PaymentId: "userID12345667",
    PaymentFailedDate: "22 Jan 2023, 10.43 am",
  },
];

const EmptyPage = () => {

  const Navigation = useNavigation();

  const clickOnpress = () => {
    Navigation.navigate("Search");
  };

  return (

    <View style={styles.SafeAreaView}>
      <View style={{ }}>
        <Lottie
          source={require("../../../Resources/JSON/loader.json")}
          autoPlay
          loop
          style={{ width: 300, height: 320 }}
        />
      </View>
      <View
        style={{
          width: wp("90%"),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={[styles.Textheads]}> No Data Found!</Text>
        <Text style={[styles.textMinimum]}>
          We couldn't got any bookings from this account.
        </Text>
      </View>

      <View style={{ margin: 5, paddingBottom: 10 }}>
        <CustomButton
          backgroundColor={COLORS.primary}
          title="Book Appointment!"
          titleColor={COLORS.white}
          size="80"
          onPress={() => clickOnpress()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    alignSelf: 'center',
    alignItems:'center',
    width:wp('90%')
  },

  Textheads: {
    marginTop: 5,
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 36,
    color: "#d9534d",
  },
  textMinimum: {
    marginTop: 10,
    marginBottom: 10,
    fontFamily: FONTFAMILY.poppinsregular,
    fontSize: 12,
    lineHeight: 24,
    color: COLORS.black,
  },
  textsmall: {
    marginTop: 10,
    marginBottom: 10,
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: 13,
    lineHeight: 26,
    color: COLORS.secondary,
  },
  LeftText: {
    marginTop: 10,
    fontFamily: FONTFAMILY.poppinsregular,
    fontSize: 14,
    lineHeight: 28,
    color: COLORS.black,
  },
  RightText: {
    marginTop: 10,
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: 12,
    lineHeight: 24,
    color: COLORS.textcolor,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    width: wp("90%"),
    margin: 10,
  },
  lineBreack: {
    flex: 1,
    height: 1,
    backgroundColor: "#e7e6e6",
  },
});

export default EmptyPage;
