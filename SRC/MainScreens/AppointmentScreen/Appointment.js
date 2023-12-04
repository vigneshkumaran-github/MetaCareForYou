import * as Progress from "react-native-progress";

import {
  Alert,
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
  View,
} from "react-native";
import { BASE_URL, IMAGE_BASE_URL } from "../../ApiService/Config";
import { COLORS, FONTS } from "../../Constants/DesignConstants";
import React, { useContext, useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { AuthContext } from "../../Context/AuthContext";
import CustomNavbar from "../../CustomComponents/CustomNavbar";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Feather";
import Icon1 from "react-native-vector-icons/FontAwesome5";
import Iconm from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-simple-toast";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const TimingData = [
  {
    id: 1,
    date: "22-12-2022",
    availableSessions: [
      {
        SesID: 1,
        Session: "Am",
        vector: "cloud-sun",
        avilableSlats: [
          {
            slatId: 1,
            Slat: "8.00 AM",
          },
          {
            slatId: 2,
            Slat: "9.30 AM",
          },
          {
            slatId: 3,
            Slat: "10.00 AM",
          },
          {
            slatId: 4,
            Slat: "11.30 AM",
          },
          {
            slatId: 5,
            Slat: "12.15 PM",
          },
          {
            slatId: 6,
            Slat: "1.00 PM",
          },
        ],
      },

      {
        SesID: 2,
        Session: "Pm",
        vector: "cloud-moon",
        avilableSlats: [
          {
            slatId: 1,
            Slat: "1 PM",
          },
          {
            slatId: 2,
            Slat: "2 PM",
          },
          {
            slatId: 3,
            Slat: "3 PM",
          },
          {
            slatId: 4,
            Slat: "4 PM",
          },
        ],
      },
    ],
  },
];

const Appointment = ({route}) => {
  const {GetUserInfo} = useContext(AuthContext)
  const navigation = useNavigation()
  const TherapistDetails=route.params.therapistsDetails;
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [sessionSelected, setSessionSelected] = useState("");
  const [slatSelected, setSlatSelected] = useState("");
  const [mode, setMode] = useState("");
  const [Data, setData] = useState(TimingData);
  const [Slats,setSlats]=useState([])
  const [SlatsMaster,setSlatsMaster]=useState([])
  const [Status,setStatus]= useState(true);
  const [userId,setUserID]=useState('');
  const [chat,setChat] =useState("");
  const [voice,setVoice] =useState("");
  const [video,setVideo] =useState("");

  function showDatePicker() {
    setDatePicker(true);
  }
  function onDateSelected(event, value) {
    
    setDate(value);
    setDatePicker(false);
    checkDateAvailable()

  }

  const checkDateAvailable = async() =>{
   
    try{
      let DateSelected=date.toISOString().slice(0, 10);
      let therapist_id=TherapistDetails.id;
      let url=BASE_URL+'auth/get_slats';

      let payload={
        date:DateSelected,
        therapist_id:therapist_id
      }
      await axios
      .post(url,payload)
      .then(function (response) {
        
        if(response.data.data.length===0)
        {
          setStatus(true)
        }
        else
        {
          setStatus(false)
          getSlats(response.data.data[0].id)
        }
      })
      .catch(function (error) {
        // handle error
         console.log(error)
     
      })
      .finally(function () {
       
       
      });
    }catch(error)
    {

    }
  
  }
  
  function handleBackButtonClick() {
    navigation.goBack()
  }

  const filterSession =async(val)=> {
    setSessionSelected(val)
    console.log(val)
    const sessionsFilter = Slats.filter(item => item.session=== val)
    console.log(sessionsFilter)
    setSlats(sessionsFilter)
  }




  const getSlats= async (id) =>{
    try{
      let url=BASE_URL+'auth/get_date_baseSlats';
      let payloadData={
        date_id:id,
      };
      await axios
      .post(url,payloadData)
      .then(function (response) {
        if(response.data.data.length===0)
        {
          setStatus(true)
        }
        else
        {
          setStatus(false)
          setSlats(response.data.data)
        }
      })
      .catch(function (error) {
        // handle error
         console.log(error)
      })
      .finally(function () {
      });
    }catch(error)
    {

    }
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);


  useEffect(()=>{
    checkDateAvailable();
    checkMode();
  },[])

  const checkMode = async ()=>{
     
    //To check Available Subscriptions 
    try{
    const userIfo = await GetUserInfo();
    setUserID(userIfo.data?.id)
    let url=BASE_URL+'auth/check_available_mode';
     const payload={
      user_id:userIfo?.dat?.id
     }
      await axios
      .post(url,payload)
      .then(function (response) {
        setChat(response.data.data[0].chat);
        setVoice(response.data.data[0].voice);
        setVideo(response.data.data[0].video);
      })
      .catch(function (error) {
        // handle error
         console.log(error)
      })
      .finally(function () {
      });
    }catch(err){
      
    }



  }

  const bookAppointment = async() => {

    if( slatSelected == '' || mode == '')
{
    Toast.show("All Fields are Required", Toast.LONG);
}
else{

  const payload={
            user_id:userId,
            therapist_id: TherapistDetails.id,
            appointment_date: date.toISOString().split('T')[0] ,
            appointment_time: slatSelected,
            appointment_session:null,
            appointment_mode: mode,
            appointment_status: "Pending",
  };

       let url=BASE_URL+auth/'book_appointment';
      try{
     await axios
      .post(url,payload)
      .then(function (response) {
         navigation.navigate('BookingSuccess',{appid:response.data.appid,bookingData: response.data.data})
      })
      .catch(function (error) {
        // handle error
         console.log(error)
     
      })
      .finally(function () {
      });
    }
    catch(error)
    {
      console.log("entered")
 
    }
}
  }

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

  const DoctorProfile = (items) => {

    navigation.navigate('DoctorProfile',{item:items});
    // Toast.show("Under Construction...", Toast.LONG);
  };


  const RenderSessiosItem = ({ item, index }) => (
    <TouchableOpacity
      style={
        sessionSelected === item.Session
          ? styles.buttonActive
          : styles.buttonInActive
      }
      onPress={() => setSessionSelected(item.Session)}
    >
      <Icon1
        name={"cloud-sun"}
        size={25}
        color={sessionSelected === "Am" ? COLORS.white : COLORS.primary}
      />
      <Text
        style={
          sessionSelected === "Am"
            ? styles.ButtonActivetext
            : styles.ButtonInActivetext
        }
      >
        {"Am"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.SafeAreaView]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
      {/*Animated header */}
      <ScrollView>
        <CustomNavbar
          title="Appointment"
          onPress={() => {
            handleBackButtonClick();
          }}
        />


<View style={[styles.cardInner1]}>

<View>
      <TouchableOpacity   style={[styles.backroundLay]} onPress={() => DoctorProfile(TherapistDetails)}>
        {TherapistDetails.profile ? <Image source={{uri: IMAGE_BASE_URL+TherapistDetails.profile}} style={[styles.cardImage]} />:
        <View style={[styles.cardInneremp]}>
    <Text style={[styles.emptyText]}>{TherapistDetails.first_name ? getInitials(TherapistDetails.first_name):null}</Text>
      </View>}
      </TouchableOpacity>
      </View>

      <View>
       <Text style={[styles.cardTitle]}>{TherapistDetails.first_name ? TherapistDetails.first_name+" "+TherapistDetails.last_name:null}</Text>
       </View>

  </View>


 {/* View For Date picker Started*/}
        {!datePicker && (
          <TouchableOpacity
            style={{ padding:10,flexDirection: "row", alignItems: "center",borderRadius:25,justifyContent:"center", margin: 10 ,backgroundColor:COLORS.secondary }}
            onPress={showDatePicker}
          >
            <Iconm name="calendar-plus" size={25} color={COLORS.white} />
            <Text style={styles.text}>{date.toDateString()}</Text>
            <Iconm name="chevron-down" size={25} color={COLORS.white} />
          </TouchableOpacity>
        )}

        {datePicker && (
          <DateTimePicker
            minimumDate={new Date()}
            value={date}
            mode={"date"}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={true}
            onChange={onDateSelected}
            // style={styleSheet.datePicker}
          />
        )}

 {/* View For Date picker end */}




        {/* View For Session AM PM started  */}
        {/* <Text style={{ margin: 10, ...FONTS.mainHeading, marginBottom: 20 }}>
          Available Sessions
        </Text>
        <View style={{ width: wp("100%") }}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              padding: 10,
              justifyContent:"space-around",
              alignItems:"center"
            }}
          >
            <TouchableOpacity
      style={
        sessionSelected === "AM"
          ? styles.buttonActive
          : styles.buttonInActive
      }
      onPress={() => filterSession("AM")}
    >
      <Icon1
        name={"cloud-sun"}
        size={25}
        color={sessionSelected === "AM" ? COLORS.white : COLORS.primary}
      />
      <Text
        style={
          sessionSelected === "AM"
            ? styles.ButtonActivetext
            : styles.ButtonInActivetext
        }
      >
        {"AM"}
      </Text>
    </TouchableOpacity>




    <TouchableOpacity
      style={
        sessionSelected === "PM"
          ? styles.buttonActive
          : styles.buttonInActive
      }
      onPress={() => filterSession("PM")}
    >
      <Icon1
        name={"cloud-moon"}
        size={25}
        color={sessionSelected === "PM" ? COLORS.white : COLORS.primary}
      />
      <Text
        style={
          sessionSelected === "PM"
            ? styles.ButtonActivetext
            : styles.ButtonInActivetext
        }
      >
        {"PM"}
      </Text>
    </TouchableOpacity>


  
          </View>
        </View> */}

        {/* View For Session Morning Evevning End */}


        {/* Timing Slat For Start */}
        <Text style={{ margin: 10, ...FONTS.mainHeading, marginBottom: 20 }}>
          Available Slats
        </Text>
        <View style={styles.sectionContainer}>
          {Status ? <View style={{margin:10}} ><Text style={{fontSize:14,color:COLORS.secondary,fontWeight:"bold",lineHeight:22}}>No slats available on this Date.</Text></View> :
         Slats.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSlatSelected(item.id)}
            >
              <View
                style={
                  slatSelected === item.id
                    ? styles.boxContainer
                    : styles.boxContainerInactive
                }
              >
                <Text
                  style={
                    slatSelected === item.id
                      ? styles.TextViewActive
                      : styles.TextViewInActive
                  }
                >
                  {item.slat_time+" "+item.session}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Timing Slat For End */}

        {/* Mode For Appointment Area Start  */}

        <Text style={{ margin: 10, ...FONTS.mainHeading, marginBottom: 20 }}>
          Available  Mode
        </Text>
        <View
          style={{
            width: wp("100%"),
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {video!="0" ? <TouchableOpacity
            style={
              mode === "VideoCall" ? styles.buttonMode : styles.buttonInActiveMode
            }
            onPress={() => setMode("VideoCall")}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
              }}
            >
              <Iconm
                name="message-video"
                size={35}
                color={mode === "VideoCall" ? COLORS.white : COLORS.primary}
              />
            </View>
            <View>
              <Text
                style={
                  mode === "VideoCall"
                    ? styles.ButtontextActiveMode
                    : styles.ButtontextInActiveMode
                }
              >
                {"Video Call Therapy "}
              </Text>
               <Text style={styles.ButtonsubtextMode}>
                {"You have "+video+" Video call therapy on this pack" }
              </Text>
            </View>
          </TouchableOpacity>:null}


          {chat!="0" ?  <TouchableOpacity
            style={
              mode === "Messaging" ? styles.buttonMode : styles.buttonInActiveMode
            }
            onPress={() => setMode("Messaging")}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
              }}
            >
              <Iconm
                name="message-processing"
                size={35}
                color={mode === "Messaging" ? COLORS.white : COLORS.primary}
              />
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text
                style={
                  mode === "Messaging"
                    ? styles.ButtontextActiveMode
                    : styles.ButtontextInActiveMode
                }
              >
                {"Live Messaging Therapy"}
              </Text>
              <Text style={styles.ButtonsubtextMode}>
              {"You have "+chat+" Live Message therapy on this pack" }
              </Text>
          
            </View>
          </TouchableOpacity>:null}


          {voice!="0" ?  <TouchableOpacity
            style={
              mode === "VoiceCall" ? styles.buttonMode : styles.buttonInActiveMode
            }
            onPress={() => setMode("VoiceCall")}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
              }}
            >
              <Iconm
                name="phone-sync"
                size={35}
                color={mode === "VoiceCall" ? COLORS.white : COLORS.primary}
              />
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text
                style={
                  mode === "VoiceCall"
                    ? styles.ButtontextActiveMode
                    : styles.ButtontextInActiveMode
                }
              >
                {"Voice Call Therapy"}
              </Text>
              <Text style={styles.ButtonsubtextMode}>
              {"You have "+voice+" Voice Call  therapy on this pack" }
              </Text>
          
            </View>
          </TouchableOpacity>:null}

          {chat==="0"&&voice==="0"&&video==="0"?<Text style={{fontSize:14,color:COLORS.secondary,fontWeight:"bold",lineHeight:22,margin:10}}> Please Subscribe First.</Text>:null}
          {chat==="0"&&voice==="0"&&video==="0"? <View
          style={{
            width: wp("100%"),
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 20,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SubscriptionScreen')}
            style={styles.SubscribeButton}>
            <Text style={styles.Buttontext}>{"Subscribe"}</Text>
          </TouchableOpacity>
        </View>:null}


        </View>
        {/* Mode For Appointment Area End  */}

        {/* Book Apointmnet Button Area Start */}
        {chat==="0"&&voice==="0"&&video==="0" ? null : <View
          style={{
            width: wp("100%"),
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 20,
          }}>
          <TouchableOpacity
            onPress={() => bookAppointment()}
            style={styles.Submitbutton}>
            <Text style={styles.Buttontext}>{"Book Appointment"}</Text>
          </TouchableOpacity>
        </View>}
        {/* Book Apointmnet Button Area End */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },

  Submitbutton: {
    width: wp("80%"),
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: COLORS.primary,
  },
  SubscribeButton: {
    width: wp("80%"),
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: COLORS.secondary,
  },
  Buttontext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: COLORS.white,
  },
  text: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: "bold",
    marginLeft: 5,
  },

  buttonActive: {
    alignItems: "center",
    marginTop: 5,
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: COLORS.primary,
  },
  buttonInActive: {
    alignItems: "center",
    marginTop: 5,
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: COLORS.white,
  },
  ButtonActivetext: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    marginLeft: 10,
  },
  ButtonInActivetext: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: COLORS.parimary,
    marginLeft: 10,
  },

  sectionContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: wp("100%"),
    marginBottom: 20,
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
    backgroundColor: "#dfdfdf",
    justifyContent: "center",
    alignItems: "center",
  },

  TextViewActive: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.white,
  },
  TextViewInActive: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.black,
  },
  buttonMode: {
    width: wp("90%"),
    flexDirection: "row",
    marginBottom: 20,
    // alignItems: "center",
    // justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: COLORS.primary,
  },
  buttonInActiveMode: {
    width: wp("90%"),
    flexDirection: "row",
    marginBottom: 20,
    // alignItems: "center",
    // justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: "#dfdfdf",
  },
  ButtontextActiveMode: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: COLORS.white,
  },
  ButtontextInActiveMode: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: COLORS.black,
  },
  ButtonsubtextMode: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: "500",
    letterSpacing: 0.25,
    color: COLORS.cardDescription,
    marginBottom: 10,
  },

  cardInner1: {
    flexDirection:'row',
    padding:10,
    alignItems: "center",
    justifyContent:"center",
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius:50/2,
    resizeMode: "contain",
  },
  cardTitle: {
    ...FONTS.cardTitle,
    fontSize:15,
    marginLeft:20
  },

  backroundLay:{
    width: 60,
height: 60,
borderColor: COLORS.secondary,
borderWidth: 2.5,
borderRadius: 60/2,
alignItems: "center",
justifyContent:"center",

},
cardInneremp: {
width: 60,
height: 60,
borderColor: COLORS.secondary,
borderWidth: 2.5,
borderRadius: 60/2,
alignItems: "center",
justifyContent:"center",
},
emptyText:
{
color:COLORS.secondary,
fontSize: 22,
lineHeight:28

}
});

export default Appointment
