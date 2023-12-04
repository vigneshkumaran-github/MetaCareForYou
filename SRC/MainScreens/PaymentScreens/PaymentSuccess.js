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
import { COLORS, FONTFAMILY } from "../../Constants/DesignConstants";
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

const data = [
  {
    subscriptionId: "userID12345667",
    subscriptionDate: "22 Jan 2023, 10.43 am",
    subscriptionExpiredDate: "22 Feb 2023, 10.43 am",
  },
];
const PaymentSuccess = ({ route,navigation }) => {
  const [subscriptionData, setSubscription] = useState(data[0]);
 const packInfo=route.params.packInfo;
 console.log(route.params);
 console.log(packInfo)
  const Navigation = useNavigation();
  const handleBackButtonClick = () => {
    navigation.popToTop()
  };

  const clickOnpress = () => {
    navigation.popToTop()
  };

  return (
    <SafeAreaView style={[styles.SafeAreaView]}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      {/*Animated header */}
      <ScrollView>
        <CustomNavbar
          title="Payment Success"
          onPress={() => {
            handleBackButtonClick();
          }}
        />
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Lottie
            source={require("../../Resources/JSON/success1.json")}
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
            <Text style={[styles.Textheads]}> Payment Successful!</Text>
            <Text style={[styles.textMinimum]}>
              Your Meta Subscription Pack Activated Successfuly .
            </Text>
          </View>
          <View style={[styles.line]}>
            <View style={[styles.lineBreack]} />
          </View>

          <Text style={[styles.textsmall]}>
            Payment Id : {packInfo.payment_id}
          </Text>
        </View>

        <View style={{ width: wp("100%") }}>
          <View style={[styles.section]}>
            <Text style={[styles.LeftText]}>Pack Activated Date</Text>
            <Text style={[styles.RightText]}>
              {packInfo.createdAt}
            </Text>
          </View>
          <View style={[styles.line]}>
            <View style={[styles.lineBreack]} />
          </View>

          <View style={[styles.section]}>
            <Text style={[styles.LeftText]}>Plan Rate</Text>
            <Text style={[styles.RightText]}>
              ${packInfo.payable_amount}USD/
            </Text>
          </View>
          <View style={[styles.line]}>
            <View style={[styles.lineBreack]} />
          </View>
        </View>

        <View style={{ margin: 5, alignItems: "center", paddingBottom: 10 }}>
          <CustomButton
            backgroundColor={COLORS.primary}
            title="Ok Got it!"
            titleColor={COLORS.white}
            size="60"
            onPress={() => clickOnpress()}
          />
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
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 36,
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
});

export default PaymentSuccess;
