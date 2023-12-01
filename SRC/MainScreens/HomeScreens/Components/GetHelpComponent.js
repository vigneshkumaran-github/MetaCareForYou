import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTFAMILY, FONTS } from "../../../Constants/DesignConstants";
import React, { useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Toast from "react-native-simple-toast";

//Specialist data

const GetHelpComponent = () => {
  const [mainTitle, setMainTitle] = useState("Get Care");

  const RequestCall = async () => {
    Toast.show("Under Construction...", Toast.LONG);
  };

  const RenderGetHelp = () => (
    <View style={[styles.Main2]}>
      <View style={[styles.InnerStyle]}>
        <TouchableOpacity >
          <Image
            source={require("../../../Resources/Images/logo.png")}
            style={[styles.HelpImage1]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.getHelp]}
          
        >
          <Text style={[styles.getcarebuttonText]}>
            Any quries ask us to find solutions
          </Text>
          <Text style={[styles.getcarebuttonText]}>24X7 helpline service</Text>
        </TouchableOpacity>

        <TouchableOpacity >
          <Image
            source={require("../../../Resources/Images/logo.png")}
            style={[styles.HelpImage2]}
          />
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center" }}>
        <Pressable
          style={styles.button}
          onPress={()=>{Linking.openURL(`tel:${'+60 163631793'}`)}}
        >
          <Text style={styles.Buttontext}>{"Get Help"}</Text>
        </Pressable>
      </View>
    </View>
  );

  return <RenderGetHelp />;
};
const styles = StyleSheet.create({
  Main2: {
    width: wp("100%"),
    backgroundColor: "white",
    alignItems: "center",
    padding: 5,
  },
  Main3: {
    width: wp("90%"),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  mainHeading: {
    ...FONTS.mainHeading,
  },

  InnerStyle: {
    width: wp("95%"),
    height: hp("11"),
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-evenly",
  },
  getHelp: {
    width: wp("70"),
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: COLORS.white,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3.84,
    elevation: 5,
    shadowColor: COLORS.shadowcolor,
  },

  HelpImage1: {
    bottom: 10,
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
  },
  HelpImage2: {
    top: 10,
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
  },
  getcarebuttonText: {
    ...FONTS.getcare,
    fontSize: 14,
    lineHeight:22,
    color: COLORS.textcolor,
  },
  button: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: COLORS.primary,
  },
  Buttontext: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default GetHelpComponent;
