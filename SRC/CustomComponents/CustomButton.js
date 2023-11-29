import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import React from "react";

const CustomButton = ({
  backgroundColor,
  title,
  titleColor,
  size,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.Buttonback,
        width: wp(size),
        backgroundColor: backgroundColor,
      }}
      onPress={onPress}
    >
      <Text style={{ ...styles.Buttontext, color: titleColor }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  Buttonback: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 3,
  },
  Buttontext: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});
export default CustomButton;
