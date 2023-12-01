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
import { COLORS, FONTFAMILY, FONTS } from "../../../Constants/DesignConstants";
import React, { useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { BASE_URL } from "../../../ApiService/Config";
import Icon from "react-native-vector-icons/AntDesign";
import Toast from "react-native-simple-toast";
import axios from "axios";

//Specialist data
const DATA = [
  {
    id: 1,
    issuesName: "Anxiety Issues?",
    question: "If you could see a measuring scale above people’s heads what would you want this scale to measure?Their status in society their level of happiness, their wealth, etc.?",
  },
  {
    id: 2,
    issuesName: "Stress Issues?",
      question: "If you could see a measuring scale above people’s heads what would you want this scale to measure?Their status in society their level of happiness, their wealth, etc.?",

  },
  {
    id: 3,
    issuesName: "Anxiety Issues?",
    question: "If you could see a measuring scale above people’s heads what would you want this scale to measure?Their status in society their level of happiness, their wealth, etc.?",

  },
  {
    id: 4,
    issuesName: "Anxiety Issues?",
       question: "If you could see a measuring scale above people’s heads what would you want this scale to measure?Their status in society their level of happiness, their wealth, etc.?",

  },
];

const QuestionsComponent = () => {
  const [Testimonials, setTestimonials] = useState(DATA);
  const [mainTitle, setMainTitle] = useState("Find Your Best Doctor");
  const [isLoading,setisLoading]=useState(false);

  const testimonials = async () => {
    setisLoading(true)
    let url=BASE_URL+'auth/testimonials';
    try{
   await axios
    .post(url)
    .then(function (response) {
      setTestimonials(response.data.data)
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
    testimonials()
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
  const SpacialistClick = () => {
    Toast.show("Under Construction...", Toast.LONG);
  };

  const RenderIssues = () => (
    <View style={[styles.Main2]}>
      <FlatList
        horizontal
        scrollEnabled={true}
        data={Testimonials}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return RenderIssuesItem({ item, index });
        }}
        ItemSeparatorComponent={ItemSeparatorView}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 4,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      />
    </View>
  );

  const RenderIssuesItem = ({ item, index }) => (
    <View style={[styles.card, styles.elevation]}>

{isLoading ? <ActivityIndicator size="large" color={COLORS.primary} /> :


      <View style={[styles.cardInner1]}>
        
        <View style={[styles.flexbox]} >
        <View style={[styles.line]}></View>
        <Text style={[styles.cardDescription]}>{"“ "+item.testimonial_content+" ”"}</Text>
      
      </View>
       <TouchableOpacity onPress={() => SpacialistClick()}>
        <View style={{flexDirection:'row',alignItems:"center",padding:10,marginTop:10,JustifyContent:"center"}}>
    {/* <View style={[styles.cardImageLay]}> */}


    
        <TouchableOpacity onPress={() => SpacialistClick()}>
          <Icon style={{marginLeft:15}} name="wechat" size={24} />
        </TouchableOpacity>
      {/* </View> */}
            <Text style={{color:COLORS.secondary,fontSize:12,marginLeft:16,lineHeight: 28,fontFamily: FONTFAMILY.poppinsbold,}}>- {item.author}  </Text>


            </View>
    </TouchableOpacity>
      </View>}
    </View>
  );
  return <RenderIssues />;
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
    borderColor: COLORS.secondary,
    borderWidth: 1.5,
    borderRadius: 8,
    width: wp("70"),
    // height: hp("20"),
    alignItems: "flex-start",
    marginTop: 2,
    marginLeft: 5,
    marginBottom: 10,
    alignItems:"center",
    justifyContent:"center"
  },
  elevation: {
    // elevation: 3,
    // shadowColor: COLORS.shadowcolor,

    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },

  cardInner1: {
    margin: 10,
    padding: 10,
  },
//     cardImageLay: {
//     marginLeft:10,
//      width: 40,
//     height: 40,
//     borderColor: 'black',
//     borderWidth: 2.5,
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent:"center",
//   },
  cardImage: {
    marginLeft:10,
     width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 15,
     resizeMode: "contain",
  },
  cardTitle: {
    ...FONTS.cardTitle,
  },
  cardDescription: {
    marginTop: 7,
    marginLeft: 10,
    ...FONTS.cardDescription,
  },
  line: {
  
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  flexbox:{
    padding: 5,
    flexDirection:'row'
  }
});

export default QuestionsComponent;
