import {
  AppointmentMode,
  SessionsComponent,
  SlatsComponent,
} from "./Components/";
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
import { COLORS, FONTFAMILY, FONTS } from '../../Constants/DesignConstants';
import React, { useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import CustomButton from "../../CustomComponents/CustomButton";
import CustomNavbar from "../../CustomComponents/CustomNavbar";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Lottie from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const BookingSuccess = ({ route}) => {


  const bookingData=route.params.bookingData;
  const navigation = useNavigation();
  const handleBackButtonClick = () => {
    navigation.goBack()
  };
  const clickOnpress = () => {
    navigation.replace("HomeScreen");
  };

  return (
    
    <SafeAreaView style={[styles.SafeAreaView]}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      {/*Animated header */}
      <ScrollView>
        <CustomNavbar
          title="Booking Confirmation"
          onPress={() => {
            handleBackButtonClick();
          }}
        />
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Lottie
            source={require("../../Resources/JSON/success.json")}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View
            style={{
              width: wp("90%"),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={[styles.Textheads]}>
              Appointment Booked Successful!
            </Text>

            <Text style={[styles.textMinimum]}>
              Your Appointment hasbeen booked Successfuly Please Check Further
              details has Given blow.
            </Text>
          </View>

          <View style={[styles.line]}>
            <View style={[styles.lineBreack]} />
          </View>

          <Text style={[styles.textsmall]}>
            Appointment Id : {route.params.appid}
          </Text>
        </View>

        <View style={{ width: wp("100%") }}>
          <View style={[styles.section]}>
            <Text style={[styles.LeftText]}>Appointment Date</Text>
            <Text style={[styles.RightText]}>{bookingData.appointment_date }</Text>
          </View>
          <View style={[styles.line]}>
            <View style={[styles.lineBreack]} />
          </View>

          <View style={[styles.section]}>
            <Text style={[styles.LeftText]}>Appointment Mode</Text>
            <Text style={[styles.RightText]}>{bookingData.appointment_mode}</Text>
          </View>
          <View style={[styles.line]}>
            <View style={[styles.lineBreack]} />
          </View>

          {/* <View style={[styles.section]}>
            <Text style={[styles.LeftText]}>Appointmented Therapist</Text>
            <Text style={[styles.RightText]}>@Tr.David salmon</Text>
          </View>
          <View style={[styles.line]}>
            <View style={[styles.lineBreack]} />
          </View> */}
        </View>

        <View style={{ margin: 5, alignItems: "center" }}>
          <View style={{ margin: 5, alignItems: "center", paddingBottom: 10 }}>
            <CustomButton
              backgroundColor={COLORS.primary}
              title="Ok Got it!"
              titleColor={COLORS.white}
              size="60"
              onPress={() => clickOnpress()}
            />
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

  Textheads: {
    marginTop: 5,
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 32,
    color: "#51cc96",
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
    color: COLORS.textColor,
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

export default BookingSuccess;
