import {
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
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Icon from "react-native-vector-icons/Octicons";
import React from "react";
import { COLORS, FONTS, FONTFAMILY } from "../../Constants/DesignConstants";
import CustomNavbar from "../../CustomComponents/CustomNavbar";
import { useNavigation } from '@react-navigation/native';
import { Colors } from "react-native/Libraries/NewAppScreen";


const data = [
  {
    id: 1,
    Notification: "Your Appointment Hasbeen Booked Successfully.",
    status: true,
    dateTime: "jan 24,2023 at 09.45 am",
  },
  {
    id: 2,
    Notification:
      "Remainder! Tommorrow Your Slat is there so please Availble Apointment Timing!.",
    status: false,
    dateTime: "jan 24,2023 at 09.45 am",
  },
  {
    id: 3,
    Notification:
      "Remainder! Tommorrow Your Slat is there so please Availble Apointment Timing!.",
    status: true,
    dateTime: "jan 24,2023 at 09.45 am",
  },
  {
    id: 4,
    Notification:
      "Remainder! Tommorrow Your Slat is there so please Availble Apointment Timing!.",
    status: false,
    dateTime: "jan 24,2023 at 09.45 am",
  },
  {
    id: 5,
    Notification:
      "Remainder! Tommorrow Your Slat is there so please Availble Apointment Timing!.",
    status: false,
    dateTime: "jan 24,2023 at 09.45 am",
  },
  {
    id: 6,
    Notification:
      "Remainder! Tommorrow Your Slat is there so please Availble Apointment Timing!.",
    status: true,
    dateTime: "jan 24,2023 at 09.45 am",
  },
  {
    id: 7,
    Notification:
      "Remainder! Tommorrow Your Slat is there so please Availble Apointment Timing!.",
    status: false,
    dateTime: "jan 24,2023 at 09.45 am",
  },
  {
    id: 8,
    Notification:
      "Remainder! Tommorrow Your Slat is there so please Availble Apointment Timing!.",
    status: false,
    dateTime: "jan 24,2023 at 09.45 am",
  },
  {
    id: 9,
    Notification:
      "Remainder! Tommorrow Your Slat is there so please Availble Apointment Timing!.",
    status: true,
    dateTime: "jan 24,2023 at 09.45 am",
  },
  {
    id: 10,
    Notification:
      "Remainder! Tommorrow Your Slat is there so please Availble Apointment Timing!.",
    status: false,
    dateTime: "jan 24,2023 at 09.45 am",
  },
  {
    id: 11,
    Notification:
      "Remainder! Tommorrow Your Slat is there so please Availble Apointment Timing!.",
    status: true,
    dateTime: "jan 24,2023 at 09.45 am",
  },
];

const NotificationScreen = ({ }) => {
  const navigation = useNavigation()
  const [dataState, setDatastate] = React.useState(true);
  const [notificationData, setnotificationData] = React.useState(data);

  const dataUpdate = () => {
    data.map((datas) => (datas.status = false));
    setnotificationData(data);
    console.log(data);
  };

  React.useEffect(() => { }, [notificationData]);

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

  const renderNotifcation = ({ item, index }) => (
    <TouchableOpacity style={[styles.card, styles.elevation]}>
      <View style={{ flexDirection: "row", padding: 6 }}>
        <View style={{}}>
          {item.status ? (
            <Icon
              name="dot-fill"
              color={COLORS.primary}
              size={18}
              style={{ marginTop: 2 }}
            />
          ) : null}
        </View>

        <View style={{ width: wp("75") }}>
          <Text style={[styles.textName]}>{item.Notification}</Text>
          <Text style={[styles.textNormal]}>{item.dateTime}</Text>
        </View>
        <View>
          <TouchableOpacity>
            <Icon
              name="bell-fill"
              color={COLORS.primary}
              size={15}
              style={{ marginTop: 5, marginLeft: 5 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Line Breack*/}

      <View style={[styles.line]}>
        <View style={[styles.lineBreack]} />
      </View>
      {/* Line Breack End*/}
    </TouchableOpacity>
  );

  return (
    <>

      {dataState ?
        <>
          <CustomNavbar
            title="Notifications"
            onPress={() => {
              navigation.goBack()
            }}
          />
          <View style={{ flex: 1, alignItems: 'center', justifyContent: "center",backgroundColor:COLORS.white }}>

            <Text style={[styles.textsmall]}>No Notifications Yet</Text>
          </View>
        </> :

        <SafeAreaView style={{ alignItems: "center", justifyContent: "center" }}>
          <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
          <CustomNavbar
            title="Booking Confirmation"
            onPress={() => {
              navigation.goBack()
            }}
          />

          <ScrollView>
            {/* <Text style={{fontSize:19,color:'black'}}>Notification  Screen</Text>
      <Text style={{color:'blue',marginTop:20}} onPress={() => navigation.replace('HomeScreen')}>Back To Home </Text> */}
            <View
              style={{
                flex: 1,
                width: wp("90%"),
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                margin: 10,
                marginBottom: 20,
                marginTop: 20,
              }}
            >
              <View>
                <Text style={[styles.textsmall]}>Notifcations</Text>
              </View>
              <TouchableOpacity>
                <Text
                  style={[styles.linktext]}
                  onPress={() => {
                    dataUpdate();
                  }}
                >
                  Mark as read
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <FlatList
                data={notificationData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  return renderNotifcation({ item, index });
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
          </ScrollView>
        </SafeAreaView>}
    </>
  );
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
    width: wp("85%"),
    // backgroundColor: COLORS.white,
    // borderRadius: 8,
    // // width: wp("85"),
    // marginTop: 2,
    // marginLeft: 5,
    // marginBottom: 10,
    // padding: 5,
  },
  elevation: {
    // shadowColor: 'gray',
    // shadowOffset: {
    //   width: 2,
    //   height: 3,
    // },
    // shadowOpacity: 0.4,
    // shadowRadius: 3,
    // elevation: 3,
  },

  textName: {
    marginLeft: 5,
    marginBottom: 1,
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: 12,
    fontWeight: "bold",
    lineHeight: 26,
    color: COLORS.black,
  },
  textNormal: {
    marginLeft: 5,
    fontFamily: FONTFAMILY.poppinsregular,
    fontSize: 10,
    lineHeight: 24,
    color: COLORS.textColor,
  },
  textsmall: {
    top: 2,
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.black,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    width: wp("86%"),
    margin: 10,
  },
  lineBreack: {
    flex: 1,
    height: 1,
    backgroundColor: "#e7e6e6",
  },
  linktext: {
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: 13,
    lineHeight: 22,
    color: COLORS.primary,
  },
});

// #endregion

export default NotificationScreen;
