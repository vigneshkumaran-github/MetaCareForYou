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

import axios from "axios";

//Specialist data
const DATA = [
  {
    id: 1,
    BannerUrl:
      "https://img.freepik.com/free-vector/gradient-mental-health-facebook-cover_52683-69907.jpg?w=1060&t=st=1671015450~exp=1671016050~hmac=9833336db5de284dc5ec5b9e3fec01759495635d544dc0d3ec725c6a1af744d6",
  },
  {
    id: 2,
    BannerUrl:
      "https://img.freepik.com/free-psd/medical-horizontal-banner-template_23-2148940482.jpg?w=2000",
  },
  {
    id: 3,
    BannerUrl:
      "https://img.freepik.com/free-psd/medical-healthcare-poster-template_23-2148940481.jpg?w=2000",
  },
];

const TopDoctors = () => {
  const [banners, setBanners] = useState(DATA);
  const [mainTitle, setMainTitle] = useState("Quotes for you");
  const [isLoading,setisLoading]=useState(true);


  const getBanners = async () => {
    let url=BASE_URL+'auth/banners';
    try{
   await axios
    .post(url)
    .then(function (response) {
      setBanners(response.data.data)
      setisLoading(false)
    })
    .catch(function (error) {
      // handle error
       console.log(error)
    });
  }
  catch(error)
  {

  }
};



  useEffect(()=>{
    getBanners()
    },[]);



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

  const RenderTopDocters = () => (
    <View style={[styles.Main2]}>
      <View style={[styles.Main3]}>
        <Text style={[styles.mainHeading]}>{mainTitle}</Text>
      </View>

      <FlatList
        horizontal
        scrollEnabled={true}
        data={banners}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return RenderDoctersItem({ item, index });
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

  const RenderDoctersItem = ({ item, index }) => (
    <View style={[styles.card, styles.elevation]}>

{isLoading ? <ActivityIndicator size="large" color={COLORS.primary} /> :
      <Image
        source={{ uri: IMAGE_BASE_URL+item.image }}
        style={[styles.cardImage, styles.elevation]}
      /> }
     
    </View>
  );
  return <RenderTopDocters />;
};
const styles = StyleSheet.create({
  Main2: {
    width: wp("100%"),
    backgroundColor: COLORS.white,
    alignItems: "center",

    padding: 5,
    marginTop: 0,
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
    paddingTop: 5,
    paddingBottom: 5,
    width: wp("90"),
    height: hp("20"),
    alignItems:'center',
    justifyContent:"center"
  },
  elevation: {
    elevation: 5,
    shadowColor: COLORS.shadowcolor,
  },

  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 20,
  },
});

export default TopDoctors;
