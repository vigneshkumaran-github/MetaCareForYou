import {
  BackHandler,
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
  CardField,
  CardFieldInput,
  useStripe,
} from '@stripe/stripe-react-native';
import React, { useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import { BASE_URL, IMAGE_BASE_URL } from "../../../ApiService/Config";
import { COLORS,FONTFAMILY,FONTS } from "../../../Constants/DesignConstants";

const { width, height } = Dimensions.get("window");
const packdata = [{
  id: 1,
  packName: 'Meta Premium pack',
  packDetails: '5 Video Calls and 5 Messagings',
  validity: '30 days',
  rate: '290'
}, {
  id: 2,
  packName: 'Meta Pro pack',
  packDetails: '3 Video Calls and 3 Messagings',
  validity: '30 days',
  rate: '200'
},
{
  id: 3,
  packName: 'Meta Normal pack',
  packDetails: '1 Video Calls and 1 Messagings',
  validity: '30 days',
  rate: '110'
},]




const SubscriptionCard = ({ }) => {


  const navigation = useNavigation();
  const [Subscriptions, setSubscriptions] = useState([]);


  const getSubscriptions = async () => {

    let url = BASE_URL + 'auth/subscription_packs';
    try {
      await axios
        .post(url)
        .then(function (response) {
          // setSpecialistData(response.data.data)
          console.log(response.data.data)
          setSubscriptions(response.data.data)
        })
        .catch(function (error) {
          // handle error
          console.log(error)

        })
        .finally(function () {


        });
    }
    catch (error) {


    }
  };


  useEffect(() => {
    getSubscriptions()
  }, []);



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


  const RenderSpalistItem = ({ item, index }) => (
    <View style={[styles.card, styles.elevation]}>

      <View style={[styles.cardHeading]}>
        <Text style={[styles.cardHeadingText]}>{item.pack_name}</Text>
        <Image source={require("../../../Resources/Images/logo.png")} style={[styles.cardImage]} />
      </View>

      <View>

        <Image source={{ uri: IMAGE_BASE_URL + item.pack_image }} style={[styles.cardMainImage]} />
      </View>

      <View style={[styles.InnerCard]}>
        <Text style={[styles.cardHeadingText]}>Pack Details</Text>

        <Text style={[styles.cardTextservice]}>Daily Support Therapy available + </Text>
        {item.chat != 0 ? <Text style={[styles.cardTextservice]}>{item.chat} Live Message  available</Text> : null}
        {item.voice_call != 0 ? <Text style={[styles.cardTextservice]}>{item.voice_call} Live Voice calls available</Text> : null}
        {item.video_call != 0 ? <Text style={[styles.cardTextservice]}>{item.video_call} Live Video calls available</Text> : null}
        <Text style={[styles.cardText]}>Durations - {item.pack_validity} mins (Each)</Text>
        <Text style={[styles.Rate]}> ${item.pack_rate} USD/- Only</Text>

      </View>

      <View style={{ alignItems: "center", margin: 10, marginBottom: 20 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SubscriptionDetails", { details: item })}
        >
          <Text style={styles.Buttontext}>{"Subscribe"}</Text>
        </TouchableOpacity>
      </View>



    </View>
  );

  return (
    <>
      <FlatList
        horizontal
        scrollEnabled={true}
        data={Subscriptions}
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



    </>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    width: wp("80"),
    marginTop: 2,
    marginLeft: 5,
    marginBottom: 20,
  },
  elevation: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },

  cardHeading: {
    flexDirection: 'row',
    margin: 10

  },
  cardHeadingText: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 17,
    color: COLORS.secondary,
    fontWeight: 'bold',

  },
  cardImage: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    marginLeft: 15

  },
  cardMainImage:
  {
    width: 100,
    height: 100,
    resizeMode: "contain",

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

  cardText: {
    margin: 3,
    color: COLORS.blue,
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: 12,
  },
  cardTextservice: {
    margin: 3,
    color: COLORS.textColor,
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: 12,
    lineHeight: 24
  },
  Rate: {
    margin: 5,
    color: COLORS.secondary,
    fontSize: 15,
    fontWeight: 'bold'
  },
  InnerCard: {
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    elevation: 5,
    backgroundColor: COLORS.white,
    borderRadius: 8,
  }
});

export default SubscriptionCard;
