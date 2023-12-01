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

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-simple-toast";
import { useNavigation } from "@react-navigation/native";

const { COLORS, FONTS, SIZES, FONTFAMILY } = theme;
//Specialist data
const DATA = [
  {
    id: 1,
    doctorName: "Madhan Kumar",
    desination: "Senior Therapist",
    avator: require("../../.././Assets/images/patient3.png"),
    date: "20-01-2023",
    time: "11.00 am",
    appointmentId:'Metacare4u1234567',
    appointmentMode:'Video Consulting',
    appointmentStatus:'completed',
  },
];

const Reports = () => {
  const navigation = useNavigation();
  const [historyData, sethistoryData] = useState(DATA);
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
    <FlatList
      data={historyData}
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
  );
  const RenderSpalistItem = () => (
    <View style={[styles.card, styles.elevation]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          padding: 6,
        }}
      >
        <View>
          <TouchableOpacity>
            <Image source={DATA[0].avator} style={[styles.cardImage]} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 5 }}>
          <Text style={[styles.textName]}>Dr.{DATA[0].doctorName}</Text>
          <Text style={[styles.textNormal]}>{DATA[0].desination}</Text>
        </View>

        <View style={{ marginLeft: 15 }}>
          <Icon
            name="head-check"
            size={30}
            color={"green"}
            style={{ marginRight: 7 }}
          />
        </View>
      </View>
      {/* Line Breack*/}
      <View style={[styles.line]}>
        <View style={[styles.lineBreack]} />
      </View>
      {/* Line Breack End*/}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          padding: 6,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name="calendar-check-outline"
            size={20}
            color={COLORS.primary}
            style={{ marginRight: 7 }}
          />
          <Text style={[styles.textsmall]}>{DATA[0].date}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name="timer-outline"
            size={20}
            color={COLORS.secondary}
            style={{ marginRight: 7 }}
          />
          <Text style={[styles.textsmall]}>{DATA[0].time}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <Icon
            name="star-circle-outline"
            size={20}
            color={"green"}
            style={{ marginRight: 7 }}
          />
          <Text style={[styles.textsmall]}>Completed</Text>
        </View>
      </View>
      {/* Line Breack*/}
      <View style={[styles.line]}>
        <View style={[styles.lineBreack]} />
      </View>
      <View style={{ padding: 6 }}>
        <View style={{ flexDirection: "row", alignItems: "center", margin: 5 }}>
          <Text style={[styles.NormalText]}>Apointment Id : </Text>
          <Text style={[styles.linktext]}>{"Metacare4u1234567"}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", margin: 5 }}>
          <Text style={[styles.NormalText]}>Apointment Mode : </Text>
          <Text style={[styles.linktext]}>{"Video Consulting"}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", margin: 5 }}>
          <Text style={[styles.NormalText]}>Apointment Status : </Text>
          <Text style={[styles.lable]}>{"Completed"}</Text>
        </View>
      </View>
      <View style={[styles.line]}>
        <View style={[styles.lineBreack]} />
      </View>
      <View style={{ padding: 6, alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.textName]}>Metting Summary</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", margin: 5 }}>
          <Icon
            name="checkbox-multiple-marked-circle-outline"
            size={20}
            color={"green"}
            style={{ marginRight: 7 }}
          />
          <Text style={[styles.NormalText]}>
            Typically, you should present the most important or compelling
            information first.{" "}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", margin: 5 }}>
          <Icon
            name="checkbox-multiple-marked-circle-outline"
            size={20}
            color={"green"}
            style={{ marginRight: 7 }}
          />
          <Text style={[styles.NormalText]}>
            Typically, you should present the most important or compelling
            information first.{" "}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", margin: 5 }}>
          <Icon
            name="checkbox-multiple-marked-circle-outline"
            size={20}
            color={"green"}
            style={{ marginRight: 7 }}
          />
          <Text style={[styles.NormalText]}>
            Typically, you should present the most important or compelling
            information first.{" "}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", margin: 5 }}>
          <Icon
            name="checkbox-multiple-marked-circle-outline"
            size={20}
            color={"green"}
            style={{ marginRight: 7 }}
          />
          <Text style={[styles.NormalText]}>
            Typically, you should present the most important or compelling
            information first.{" "}
          </Text>
        </View>
      </View>
      <View style={{ margin: 5, alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => navigation.replace("HomeScreen")}
          style={styles.Submitbutton}
        >
          <Text style={styles.Buttontext}>{"Ok Got it!"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return <RenderSpalistItem />;
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
    justifyContent: "space-between",
  },
  mainHeading: {
    ...FONTS.mainHeading,
  },
  mainViewall: {
    ...FONTS.mainHeading,
    fontSize: 13,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    width: wp("85"),
    marginTop: 2,
    marginLeft: 5,
    marginBottom: 10,
    padding: 5,
  },
  elevation: {
    shadowColor: "gray",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  cardInner1: {
    marginLeft: 10,
    width: 70,
    height: 70,
    borderColor: "#8BCF1D",
    borderWidth: 2.5,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    resizeMode: "contain",
  },

  textName: {
    marginBottom: 3,
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 24,
    color: COLORS.black,
  },
  textNormal: {
    fontFamily: FONTFAMILY.poppinsregular,
    fontSize: 12,
    lineHeight: 24,
    color: COLORS.textColor,
  },
  textsmall: {
    top: 2,
    fontFamily: FONTFAMILY.poppinsregular,
    fontSize: 10,
    lineHeight: 20,
    color: COLORS.textColor,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    width: wp("75%"),
    margin: 10,
  },
  lineBreack: {
    flex: 1,
    height: 1,
    backgroundColor: "#e7e6e6",
  },
  linktext: {
    top: 2,
    left: 5,
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: 12,
    lineHeight: 22,
    color: COLORS.secondary,
  },
  NormalText: {
    top: 2,
    left: 5,
    fontFamily: FONTFAMILY.poppinsregular,
    fontSize: 13,
    lineHeight: 26,
    color: COLORS.textColor,
  },
  lable: {
    left: 8,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 25,
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: 10,
    lineHeight: 22,
    color: COLORS.white,
    backgroundColor: "green",
  },

  Submitbutton: {
    width: wp("50%"),
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
export default Reports;
