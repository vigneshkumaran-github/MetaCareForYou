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
  ScrollView
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import { BASE_URL, IMAGE_BASE_URL } from "../../../ApiService/Config";
import { getInitials } from "../../../HelperFunctions/Helper";
import { COLORS ,FONTS,FONTFAMILY} from "../../../Constants/DesignConstants";
import EmptyPage from "./EmptyPage";

//Specialist data
// const DATA = [
//   {
//     id: 1,
//     doctorName: "Madhan Kumar",
//     desination: "Senior Therapist",
//     avator: require("../../.././Assets/images/patient3.png"),
//     date:'20-01-2023',
//     time:'11.00 am'
//   },
//   {
//     id: 2,
//     doctorName: "David Philips",
//     desination: "Senior Specialist",
//     avator: require("../../.././Assets/images/patient1.png"),
//      date:'28-02-2023',
//     time:'10.30 am'
//   },
//   {
//     id: 3,
//     doctorName: "Smith Organ",
//     desination: "Senior Therapist",
//     avator: require("./../../../Assets/images/patient2.png"),
//     date:'08-03-2023',
//     time:'05.30 pm'
//   },
//   {
//     id: 4,
//     doctorName: "Swathi Ramya",
//     desination: "Senior Therapist",
//     avator: require("../../.././Assets/images/patient3.png"),
//     date:'19-04-2023',
//     time:'06.30 pm'
//   },
// ];

const BookingList = () => {
  const {GetUserInfo} = useContext(AuthContext)
const navigation = useNavigation();
  const [BookingData, setBookings] = useState([]);
  const [mainTitle, setMainTitle] = useState("Doctors online");
  const [data,setData]=useState(true);

  const redirectClick = async(mode,data)=>{
    //For Redirecting Chat 
    if(mode==="Messaging")
    {
      navigation.navigate('Chatscreen',{Details:data})
    }
    if(mode==="VideoCall")
    {
      navigation.navigate('CallPage',{Details:data,user_type:"user",call_type:"VideoCall"})
    }
    if(mode==="VoiceCall")
    {
      navigation.navigate('CallPage',{Details:data,user_type:"user",call_type:"VoiceCall"})
    }

  }

  useEffect(() => {
    
    async function fetchMyAPI() {
      const userIfo = await GetUserInfo(); 
      // setUserInfoData(userIfo);   
      //To get Booking Details location details
      const payload ={
        user_id:userIfo?.data?.id,
        appointment_status:"Pending"
      };
        let url=BASE_URL+'auth/user_appointments';
        try{
       await axios
        .post(url,payload)
        .then(function (response) {
          console.log(response?.data)
          if(response.data.data.length)
          {
            setData(false)
          }
          
          setBookings(response.data.data)
        })
        .catch(function (error) {
    
        })
        .finally(function () {
         
        });
      }
      catch(error)
      {
       
      }

     
     
    }

    fetchMyAPI()
  }, [])



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
<ScrollView horizontal={true} >
      <FlatList
        data={BookingData}
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
   </ScrollView>
  );

  const RenderSpalistItem = ({ item, index }) => (
      <View style={[styles.card, styles.elevation]} >
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:6,}}>
                <View>
                    <Text style={[styles.textName]}>Dr.{item.therapist.first_name+" "+item.therapist.last_name}</Text>
                    <Text  style={[styles.textNormal]}>Appointment Mode - {item.appointment_mode}</Text>
                </View> 
                     <View>
                         <TouchableOpacity >
                         {item.therapist.profile ? <Image style={[styles.ProfileImage]} source={{uri:IMAGE_BASE_URL+item.therapist.profile}}/>
                : 
                <View style={[styles.cardInner1]}>
    <Text style={[styles.emptyText]}>{item.therapist.first_name ? getInitials(item.therapist.first_name):null}</Text>
      </View> }
                       </TouchableOpacity>
                     </View>
                </View>
                {/* Line Breack*/}
           <View style={[styles.line]}>
            <View style={[styles.lineBreack]} />
            </View>
           {/* Line Breack End*/}
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',padding:6,}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Icon  name="calendar-check-outline" size={20} color={COLORS.primary} style={{marginRight:7}}/>
                    <Text  style={[styles.textsmall]}>{item.appointment_date}</Text>
                </View> 
                 <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Icon  name="timer-outline" size={20} color={COLORS.secondary} style={{marginRight:7}}/>
                    <Text  style={[styles.textsmall]}>{item.slot.slat_time +" "+item.slot.session}</Text>
                </View> 
                 <View style={{flexDirection:'row',alignItems:'center',marginRight:10}}>
                    <Icon  name="star-circle-outline" size={20} color={'green'} style={{marginRight:7}}/>
                    <Text  style={[styles.textsmall]}>{item.appointment_status}</Text>
                </View>   
                </View>
                  {/* Line Breack*/}
                 <View style={[styles.line]}>
                   <View style={[styles.lineBreack]} />
                  </View>
           {/* Line Breack End*/}
           <View style={{alignItems:'center'}}>
           <TouchableOpacity onPress={()=>{redirectClick(item.appointment_mode,item)}}style={{alignItems:'center',padding:5,paddingLeft:20,paddingRight:20,backgroundColor:COLORS.primary,borderRadius:25}} >
            <Text style={[styles.linktext]}>Start Consulting</Text>
            </TouchableOpacity>
           </View>
           </View>
  );
  return <>{data ? <EmptyPage /> :<RenderSpalist />}</>;
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
    justifyContent:"space-between"
  },
  mainHeading: {
    ...FONTS.mainHeading,
  },
   mainViewall: {
    ...FONTS.mainHeading,
    fontSize:13,
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
    shadowColor: 'gray',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  cardInner1: {
    
     width: 70,
    height: 70,
    borderColor: '#8BCF1D',
    borderWidth: 2.5,
    borderRadius: 35,
    alignItems: "center",
    justifyContent:"center",
  
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius:50/2,
    resizeMode: "contain",
  },

    textName:{
    marginBottom: 3,
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 24,
    color: COLORS.black,
  },
      textNormal:{
    fontFamily: FONTFAMILY.poppinsregular,
    fontSize: 11,
    lineHeight: 24,
    color: COLORS.secondary,
  },
  textsmall:{
    top:2,
    fontFamily: FONTFAMILY.poppinsregular,
    fontSize: 10,
    lineHeight: 20,
    color: COLORS.textColor,
  },
    line:{
    flexDirection: 'row', 
    alignItems: 'center',
    width:wp('75%'),
    margin:10,
  },
    lineBreack:{
     flex: 1,
     height: 1, 
     backgroundColor: '#e7e6e6'
    
  },
  linktext:{
    fontFamily: FONTFAMILY.poppinsmedium,
    fontSize: 12,
    lineHeight: 28,
    color: COLORS.white,
  },
  ProfileImage: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    resizeMode: "contain",
    marginRight:10
  },
  cardInner1: {
    backgroundColor:COLORS.white,
     width: 44,
    height: 44,
    borderColor:COLORS.black,
    borderWidth: 1,
    borderRadius: 22,
    alignItems: "center",
    justifyContent:"center",
    marginRight: 10,
    marginLeft: 5,
  },
  emptyText:
  {
   color:COLORS.secondary,
   fontWeight:"bold",
   fontSize: 18,
   lineHeight:28
 
  }
});

export default BookingList;
