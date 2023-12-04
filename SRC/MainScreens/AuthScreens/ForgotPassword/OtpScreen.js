import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import React, { useState } from "react";
import { emailValidator, passwordValidator } from "./../../Helper/Helper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Config from "../../Config/Config";
import CustomButton from "./../../Components/CustomButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon1 from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-simple-toast";
import auth from "@react-native-firebase/auth";
import axios from "axios";
import { theme } from "../.././Constants";

const { COLORS, FONTS, SIZES, FONTFAMILY } = theme;
const { width, height } = Dimensions.get("window");

GoogleSignin.configure({
  webClientId:
    "540417514450-hte4s1ju8i32lj7hmcq0ce7ckn27d8da.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});

const OtpScreen = ({ navigation, route }) => {

  const [userInfo, setuserinfon] = useState({});
  const [email, setOtp] = useState("");
  
   const [countDown, setCountDown] = React.useState(0);
  const [runTimer, setRunTimer] = React.useState(false);

  React.useEffect (()=>{
    togglerTimer()
  },[])


   React.useEffect(() => {
    let timerId;

    if (runTimer) {
      setCountDown(60*15);
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer]);




  React.useEffect(() => {
    if (countDown < 0 && runTimer) {
      console.log("expired");
      setRunTimer(false);
      setCountDown(0);
    }
  }, [countDown, runTimer]);

 const togglerTimer = () => setRunTimer((t) => !t);

  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);



  const resendotp =async() =>
 {
     try {
        const payload = {
          email_id: route.params.email,
          user_type: route.params.user_type,
        };

        let url = Config.APIURL + "check_valide_mail";

        await axios
          .post(url, payload)
          .then(function (response) {
            console.log(response.data)
            if (response.data.success === true) {
              //Once valide mail send Mail verification Code
              Toast.show(response.data.message, Toast.LONG);
                 setRunTimer(true)
            } else {
              Toast.show(response.data.message, Toast.LONG);
            }
          })
          .catch(function (error) {
            // handle error
            return error;
          })
          .finally(function () {});
      } catch (error) {
        return error;
      }

 }



  const clickOnpress = async () => {

      try {
        const payload = {
          user_email: route.params.email,
          otp: email,
        };

        let url = Config.APIURL + "otp_verification";

        await axios
          .post(url, payload)
          .then(function (response) {
            console.log(response.data)
            if (response.data.redirect === true){
                Toast.show(response.data.msg, Toast.LONG);
                afterSuccess()
            }else{
                Toast.show(response.data.msg, Toast.LONG);
            }
            // if (response.data.success === true) {
            //   //Once valide mail send Mail verification Code
            //   afterSuccess();
            // } else {
            //   Toast.show(response.data.message, Toast.LONG);
            // }
          })
          .catch(function (error) {
            // handle error
            return error;
          })
          .finally(function () {});
      } catch (error) {
        return error;
      }
    
  };


  const afterSuccess=async()=>{


          navigation.navigate('ResetPassword',{email:route.params.email,user_type:route.params.user_type})

  }

  return (
    <SafeAreaView style={[styles.SafeAreaView]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
      <ScrollView>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          style={{ flex: 1 }}
          behavior="padding"
        >
          {/* <View style={[styles.MainContainer]}> */}
          <View style={[styles.card, styles.elevation]}></View>

          <View style={{ alignItems: "center", bottom: 60 }}>
            <View
              style={{
                width: 100,
                height: 110,
                borderRadius: 100 / 2,
                backgroundColor: COLORS.shadowColor,
                alignItems: "center",
                justifyContent: "center",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.12,
                shadowRadius: 3.84,
                elevation: 10,
                shadowColor: COLORS.black,
                marginBottom: 15,
              }}
            >
              <Image
                source={require("../.././Assets/images/logo.png")}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100 / 2,
                }}
              />
            </View>
            <View style={{ alignItems: "center", marginBottom: 30 }}>
              <Text style={[styles.Welcometext]}>Enter 6 digit Otp </Text>
            </View>

            {/*Inputs*/}

            <View style={{ padding: 15 }}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="keyboard-outline" size={25} color={COLORS.primary} />
                <Text
                  style={{
                    marginTop: 3,
                    marginLeft: 10,
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  OTP                </Text>

              </View>

              <TextInput
                keyboardType="numeric"
                style={{
                  width: wp(80),
                  borderBottomWidth: 0.5,
                  height: 40,
                  borderBottomColor: "gray",
                  marginBottom: 20,
                }}
                name="otp"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(text) => setOtp(text)}
                value={email}
              ></TextInput>

               <View style={{}}>

                   {runTimer ? <Text style={{
                      color: COLORS.secondary, fontSize: 14,
                      
                    }} >Resend OTP After {minutes}:{seconds} minutes
                    </Text>:null}

                  </View>
            </View>

            

          {runTimer ?  <CustomButton
              backgroundColor={COLORS.primary}
              title="Submit OTP"
              titleColor={COLORS.white}
              size="60"
              onPress={() => clickOnpress()}
            />:

             <CustomButton
              backgroundColor={COLORS.primary}
              title="Resend Otp"
              titleColor={COLORS.white}
              size="60"
              onPress={() => resendotp()}
            />}

            


          </View>

          {/* </View> */}
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    alignItems: "center",
  },

  card: {
    backgroundColor: COLORS.primary,
    width: wp("100"),
    height: hp("25"),
    transform: [{ scaleX: 1.3 }],
    borderBottomStartRadius: 250,
    borderBottomEndRadius: 250,
    overflow: "hidden",
  },
  elevation: {
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 12,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.22,

    elevation: 10,
  },
  Freetext: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: COLORS.cardDescription,
  },
  Welcometext: {
    marginTop: 10,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: COLORS.textcolor,
  },
  areYou: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: COLORS.primary,
    marginBottom: 10,
  },

  forgot: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: COLORS.secondary,
    textDecorationLine: "underline",

    marginRight: 10,
  },

  register: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: COLORS.secondary,
    textDecorationLine: "underline",
    marginLeft: 5,
  },
  optionSelected: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
  optionUnSelected: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: COLORS.primary,
    textAlign: "center",
  },
  unselected: {
    width: wp(30),
    backgroundColor: COLORS.white,
    margin: 6,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginLeft: 10,
    marginRight: 10,
  },
  selected: {
    width: wp(30),
    backgroundColor: COLORS.primary,
    margin: 6,
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
});

export default OtpScreen;
