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
  View,
} from "react-native";
import { BASE_URL, IMAGE_BASE_URL } from "../../../ApiService/Config";
import { COLORS, FONTS } from "../../../Constants/DesignConstants";
import React, { useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

//Specialist data
const DATA = [
  {
    id: 1,
    title: "Stress",
    totalDoctors: "30 doctors",
    avator: require("../../../Resources/Images/onboarding2.png"),
  },
  {
    id: 2,
    title: "Anxiety",
    totalDoctors: "30 doctors",
    avator: require("../../../Resources/Images/logo.png"),
  },
  {
    id: 3,
    title: "Depression",
    totalDoctors: "30 doctors",
    avator: require("../../../Resources/Images/logo.png"),
  },
  {
    id: 4,
    title: "Bipolar",
    totalDoctors: "30 doctors",
    avator: require("../../../Resources/Images/logo.png"),
  },

];

const SpecialistComponent = ({}) => {

  const navigation = useNavigation();

  const [spacailistData, setSpecialistData] = useState(DATA);
  const [mainTitle, setMainTitle] = useState("Find your suitable services");
  const [Loading,setIsloading]=useState(true)


  //To COLLECT All DAta
  useEffect(()=>{

    async function fetchMyAPI() {
      setIsloading(true)
      
      let url=BASE_URL+'get_specialist';
      try{
     await axios
      .get(url)
      .then(function (response) {
        setSpecialistData(response.data.data)
      })
      .catch(function (error) {
        // handle error
         console.log(error)
      });
    }
    catch(error)
    {
 
    }
    setIsloading(false)
    }
  
    fetchMyAPI()
  
  
   },[]);


  const SpacialistClick = (id,title) => {
     navigation.replace("SpecialistList",{CategoryId:id,CategoryName: title});
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
    <View style={[styles.Main2]}>
      <View style={[styles.Main3]}>
        <Text style={[styles.mainHeading]}>{mainTitle}</Text>
      </View>

      <FlatList
        horizontal
        scrollEnabled={true}
        data={spacailistData}
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
      <View style={[styles.cardInner1]}>
        <TouchableOpacity style={{alignItems:'center'}} onPress={() => SpacialistClick(item.id,item.specialist_title)}>
          <Image source={{uri: IMAGE_BASE_URL+item.specialist_image}} style={[styles.cardImage]} />
          <Text style={[styles.cardTitle]}>{item.specialist_title}</Text>
          {/* <Text style={[styles.cardDescription]}>{"22 Doctors"}</Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
  return <>{Loading ? <ActivityIndicator style={{marginTop:20,marginBottom:15}} size={"large"} color={COLORS.primary}/>: <RenderSpalist />}</> ;
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
    borderWidth: 0.5,
    borderRadius: 8,
    width: wp("35"),
    marginTop: 2,
    marginLeft: 5,
    marginBottom: 10,
    padding: 5,
  },
  elevation: {
    // elevation: 3,
    // shadowColor: COLORS.shadowcolor,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  cardInner1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  cardTitle: {
    marginTop: 5,
    ...FONTS.cardTitle,
  },
  cardDescription: {
    ...FONTS.cardDescription,
  },
});

export default SpecialistComponent;
