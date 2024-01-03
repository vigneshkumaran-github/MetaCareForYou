import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { BASE_URL, IMAGE_BASE_URL } from "../../../ApiService/Config";
import { COLORS, FONTS } from "../../../Constants/DesignConstants";
import React, { useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import axios from 'axios';
import { getInitials } from "../../../HelperFunctions/Helper";
import { useNavigation } from "@react-navigation/native";

//Specialist data
const DATA = [
  {
    id: 1,
    doctorName: "Dr. Ravi Verma",
    Designation: "senior psychiartist",
    avator: require("../../../Resources/Images/onboarding-7.png"),
  },
  {
    id: 2,
    doctorName: "Dr. Adam",
    Designation: "senior psychiartist",
    avator: require("../../../Resources/Images/onboarding-7.png"),
  },
  {
    id: 3,
    doctorName: "Dr. Ravi Verma",
    Designation: "senior psychiartist",
    avator: require("../../../Resources/Images/onboarding-7.png"),
  },
  {
    id: 4,
    doctorName: "Dr. Adam",
    Designation: "senior psychiartist",
    avator: require("../../../Resources/Images/onboarding-7.png"),
  },
];


const FindDoctorComponent = ({ }) => {
  const navigation = useNavigation();
  const [FindDoctorsData, setFindDoctorsData] = useState([]);
  const [mainTitle, setMainTitle] = useState("Find Your Best Therapist");

  const [Loading, setIsloading] = useState(true)
  const [data, setData] = useState()


  //To COLLECT All DAta                                                                                                                                                                                                                                                                                                                                                        
  useEffect(() => {                                

    async function fetchMyAPI() {
      setIsloading(true)
      let url = BASE_URL + 'auth/get_therapists';
      try {
        await axios
          .get(url)
          .then(function (response) {
            setFindDoctorsData(response.data.data)
          })
          .catch(function (error) {

          })                                                                                                     
          .finally(function () {
          });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
      }
      catch (error) {  

      }
      setIsloading(false)
    }

    fetchMyAPI()


  }, []);

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          width: 6,
        }}
      >
      </View>
    );
  };

  const FindDocters = (items) => {

    navigation.navigate('AppointmentScreen', { therapistsDetails: items });
    // Toast.show("Under Construction...", Toast.LONG);
  };
  const DoctorProfile = (items) => {

    navigation.navigate('DoctorProfile', { item: items });
    // Toast.show("Under Construction...", Toast.LONG);
  };

  const RenderSpalist = () => (
    <View style={[styles.Main2]}>
      <View style={[styles.Main3]}>
        <Text style={[styles.mainHeading]}>{mainTitle}</Text>
      </View>

      <FlatList
        horizontal
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
      <TouchableOpacity style={[styles.cardInner1]} onPress={() => DoctorProfile(item)}>
        {item.profile ? <Image source={{ uri: IMAGE_BASE_URL + item.profile }} style={[styles.cardImage]} /> :
          <View style={[styles.cardInneremp]}>
            <Text style={[styles.emptyText]}>{item.first_name ? getInitials(item.first_name) : null}</Text>
          </View>}

        <Text style={[styles.cardTitle]}>{item.first_name + " " + item.last_name}</Text>
        <Text style={[styles.cardDescription]}>{item.experience && item.experience != "0" ? item.experience + " Years Experienced" : "Non Experienced"} </Text>
      </TouchableOpacity>

      {/* Consult Button Layout Start*/}
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.primary,
          borderColor: COLORS.primary,
          borderWidth: 0.5,
          borderRadius: 8,
          padding: 6,
          margin: 10,
        }}
        onPress={() => FindDocters(item)}
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
      {/* Consult Button Layout End*/}
    </View>
  );
  return <>{Loading ? <ActivityIndicator style={{ marginTop: 20, marginBottom: 20 }} size="large" color={COLORS.primary} /> : <RenderSpalist />}</>;
};
const styles = StyleSheet.create({
  Main2: {
    width: wp("100%"),
    backgroundColor: COLORS.white,
    alignItems: "center",
    padding: 5,
    marginTop: 1,
  },
  Main3: {
    width: wp("90%"),
    flexDirection: "row",
    alignItems: "center",
  },
  mainHeading: {
    ...FONTS.mainHeading,
  },
  card: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
    width: wp("35"),
    // height: hp("20"),
    alignItems: "center",
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
    padding: 7,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  cardTitle: {
    ...FONTS.cardTitle,
  },
  cardDescription: {
    ...FONTS.cardDescription,
    fontSize: 10
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

  cardInneremp: {
    marginBottom: 5,
    backgroundColor: COLORS.white,
    width: 70,
    height: 70,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 70 / 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginLeft: 5,
  },
  emptyText:
  {
    color: COLORS.secondary,
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 28

  }

});

export default FindDoctorComponent;
