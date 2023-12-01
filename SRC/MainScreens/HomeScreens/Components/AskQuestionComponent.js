import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
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

const AskQuestionComponent = () => {
  const [mainTitle, setMainTitle] = useState("Get Care");

  const RequestCall = async () => {
    Toast.show("Under Construction...", Toast.LONG);
  };

  const RenderGetHelp = () => (
    <View style={[styles.Main2]}>
      <TouchableOpacity style={{ alignItems: "center" ,}}>
        <Pressable
          style={styles.button}
          onPress={() => Alert.alert("OOPS..", "I'm In Under Construction...")}>
          <Text style={styles.Buttontext}>{"Ask your questions here !"}</Text>
        </Pressable>
      </TouchableOpacity>
    </View>
  );

  return <RenderGetHelp />;
};
const styles = StyleSheet.create({
  Main2: {
    width: wp("100%"),
    backgroundColor: "white",
    alignItems: "center",
    padding: 15,
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
    width: wp("80%"),
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
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default AskQuestionComponent;
