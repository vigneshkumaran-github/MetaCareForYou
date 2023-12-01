import {
  BackHandler,
  Button,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React ,{useEffect, useState}from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { COLORS } from '../../Constants/DesignConstants';
import CustomNavbar from "../../CustomComponents/CustomNavbar";
import { HistoryList } from "./Components/Components";
import { useNavigation } from '@react-navigation/native';

const History = () => {
  const navigation=useNavigation()
  const [dataState,setDatastate]=useState(true);
  const [optionSelected, setoptionSelected] = useState("Upcoming");
  return (
    <>
    {dataState ? <View style={{flex:1,alignItems:'center',justifyContent:"center"}}>
    <Text style={[styles.textsmall]}>No Histories Yet</Text>
    </View> : <SafeAreaView style={[styles.SafeAreaView]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
      {/*Animated header */}
      <ScrollView>
      <CustomNavbar title="Histories & Reports" onPress={() => navigation.navigate("HomeScreen")}/>
      <View style={{alignItems: "center",justifyContent: "center",}}>
           <View style={{flexDirection:'row',margin:10}}>
                <TouchableOpacity style={optionSelected === "Upcoming" ? styles.selected : styles.unselected}  onPress={() => setoptionSelected("Upcoming")}><Text style={optionSelected === "Upcoming" ? styles.optionSelected : styles.optionUnSelected}>{"Upcoming"}</Text></TouchableOpacity>
                <TouchableOpacity style={optionSelected === "Completed" ? styles.selectedCompleted : styles.unselected} onPress={() => setoptionSelected("Completed")}><Text style={optionSelected === "Completed" ? styles.optionSelected : styles.optionUnSelected}> {"Completed"}</Text></TouchableOpacity>
                <TouchableOpacity style={optionSelected === "Canceled" ? styles.selectedCancel : styles.unselected} onPress={() => setoptionSelected("Canceled")}><Text style={optionSelected === "Canceled" ? styles.optionSelected : styles.optionUnSelected}> {"Canceled"}</Text></TouchableOpacity>
            </View>

           {/*Card View Started*/}

       <HistoryList />
           {/*Card View Ended*/}

           
        </View>
      </ScrollView>
    </SafeAreaView>}
    </>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
    optionSelected: {
     fontSize: 14,
    lineHeight: 22,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
  },
  optionUnSelected: {
     fontSize: 14,
    lineHeight: 22,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color:  COLORS.primary,
    textAlign: 'center',
  },
  unselected: {
    width:wp(25),
    backgroundColor:'#FFEDDF',
    margin: 6,
    padding: 10,
    borderRadius: 10,
    borderWidth:1,
    borderColor:'#FFEDDF',
    marginLeft:10,
    marginRight:10
  },
  selected: {
    width:wp(25),
    backgroundColor: COLORS.primary,
    margin: 6,
    padding: 10,
    borderRadius: 10,
    marginLeft:10,
    marginRight:10,
    borderWidth:1,
    borderColor:COLORS.white,
  },
selectedCompleted: {
    width:wp(25),
    backgroundColor: 'green',
    margin: 6,
    padding: 10,
    borderRadius: 10,
    marginLeft:10,
    marginRight:10,
    borderWidth:1,
    borderColor:'green',
  },
selectedCancel: {
    width:wp(25),
    backgroundColor: 'red',
    margin: 6,
    padding: 10,
    borderRadius: 10,
    marginLeft:10,
    marginRight:10,
    borderWidth:1,
    borderColor:'red',
  },

 
});

export default History
