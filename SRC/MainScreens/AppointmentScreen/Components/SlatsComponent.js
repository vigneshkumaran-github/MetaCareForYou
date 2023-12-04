import { COLORS, FONTS } from '../../../Constants/DesignConstants';
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
import React,{useState} from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon1 from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/FontAwesome";

const rows = 2;
const cols = 3;
const marginHorizontal = 4;
const marginVertical = 4;

const width = (Dimensions.get('window').width / cols) - (marginHorizontal * (cols + 1));
const height = (Dimensions.get('window').height / rows) - (marginVertical * (rows + 1));

const SlatsComponent = ({ slatData }) => {

  const[slatSelected,setSlatSelected] = useState();
  
  return (
    <View style={stylesGrid.sectionContainer}>
       
   {slatData.map((item,index) =>
     <TouchableOpacity  key={index} onPress={() => setSlatSelected(item.slatId)}>
    <View style={slatSelected === item.slatId ? stylesGrid.boxContainer : stylesGrid.boxContainerInactive} >
                <Text  style={slatSelected === item.slatId ? stylesGrid.TextViewActive : stylesGrid.TextViewInActive} >{item.Slat}</Text>
    </View>
       </TouchableOpacity>
      )}
   </View>
  );
};

const stylesGrid = StyleSheet.create({

  sectionContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: wp("100%"),
    marginBottom:20,
    // backgroundColor:'red'
  },
  boxContainer: {
    marginTop: 4,
    marginBottom: 10,
    marginLeft: 4,
    marginRight: 4,
    width: wp(27),
    height: wp(12),
    borderRadius: 10,
     backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    
  },
   boxContainerInactive: {
    marginTop: 4,
    marginBottom: 10,
    marginLeft: 4,
    marginRight: 4,
    width: wp(27),
    height: wp(12),
    borderRadius: 10,
     backgroundColor:'#dfdfdf',
    justifyContent: "center",
    alignItems: "center",
    

    
  },

  TextViewActive: {
    
    fontSize: 13,
    fontWeight: "bold",
    color:COLORS.white,
  },
   TextViewInActive: {
    
    fontSize: 13,
    fontWeight: "bold",
    color:COLORS.black,
  },
});

export default SlatsComponent;
