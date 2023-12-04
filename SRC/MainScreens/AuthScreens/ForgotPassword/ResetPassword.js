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

const ResetPassword = ({ navigation, route }) => {
  const user_type = route.params.user_type;
  const [userInfo, setuserinfon] = useState({});
  
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState("eye");


  const handlePasswordVisibility = () => {
    if (passwordIcon === "eye") {
      setPasswordIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (passwordIcon === "eye-off") {
      setPasswordIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const clickOnpress = async () => {
    var passwordValid = false;

    //Email Validation
       const passwordValidation = await passwordValidator(password);

    if (passwordValidation.status === true) {
      var passwordValid = true;
      setPasswordError("");
    } else {
      setPasswordError(passwordValidation.msg);
    }

    //Once text box Validated
    if (passwordValid) {
      try {
        console.log("email " + route.params.email+" Password"+password+ " Op"+user_type)
        const payload = {
            email_id: route.params.email,
          password: password,
          user_type: user_type,
        };

        let url = Config.APIURL + "update_password";

        await axios
          .post(url, payload)
          .then(function (response) {
            if (response.data.success === true) {
              //Once valide mail send Mail verification Code
              Toast.show(response.data.message, Toast.LONG);
              nextStep();
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
  };

  const nextStep=async()=>{

          navigation.navigate('LoginScreen')
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
              <Text style={[styles.Welcometext]}>Reset Your Password</Text>
            </View>

            {/*Inputs*/}

            <View style={{ padding: 15 }}>
            <View style={{ flexDirection: "row" }}>
                  <Icon
                    name="lock-open-variant"
                    size={25}
                    color={COLORS.primary}
                  />
                  <Text
                    style={{
                      marginTop: 5,
                      marginLeft: 10,
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    Password
                  </Text>

                  {passwordError.length > 0 && (
                    <>
                      <Text
                        style={{
                          marginTop: 5,
                          marginLeft: 12,
                          fontSize: 12,
                          color: "red",
                          alignItems: "flex-end",
                          justifyContent: "flex-end",
                        }}
                      >
                        {passwordError}
                      </Text>

                      <Icon1
                        name="error"
                        size={18}
                        color={"red"}
                        style={{ marginLeft: 10, top: 2 }}
                      />
                    </>
                  )}
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={{
                      width: wp(80),
                      borderBottomWidth: 0.5,
                      height: 40,
                      borderBottomColor: "gray",
                      marginBottom: 10,
                    }}
                    name="password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="newPassword"
                    secureTextEntry={passwordVisibility}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                  ></TextInput>

                  <TouchableOpacity onPress={() => handlePasswordVisibility()}>
                    <Icon
                      name={passwordIcon}
                      size={20}
                      color={COLORS.primary}
                      style={{ right: 20 }}
                    />
                  </TouchableOpacity>
                  {/* <Icon name="eye-off" size={20} color={COLORS.primary} style={{right:20}}/> */}
                </View>
            </View>

            <CustomButton
              backgroundColor={COLORS.primary}
              title="Reset Password"
              titleColor={COLORS.white}
              size="60"
              onPress={() => clickOnpress()}
            />
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

export default ResetPassword;
