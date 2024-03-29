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
} from 'react-native';
import React, {useContext, useState} from 'react';
import {emailValidator, showToastGreen} from '../../../HelperFunctions/Helper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {AuthContext} from '../../../Context/AuthContext';
import {BASE_URL} from '../../../ApiService/Config';
import {COLORS, FONTFAMILY} from '../../../Constants/DesignConstants';
import CustomButton from '../../../CustomComponents/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { RFValue } from 'react-native-responsive-fontsize';

// import Toast from "react-native-simple-toast";

const {width, height} = Dimensions.get('window');

// GoogleSignin.configure({
//   webClientId:
//     "540417514450-hte4s1ju8i32lj7hmcq0ce7ckn27d8da.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
//   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
// });

const ForgotPassword = ({navigation, route}) => {
  const user_type = route.params.user_type;
  console.log(user_type);
  const [userInfo, setuserinfon] = useState({});
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const {SendOtp} = useContext(AuthContext);
  const [loading,setLoading] = useState(false)

  const clickOnpress = async () => {
    var emailValid = false;

    //Email Validation
    const EmailValidation = await emailValidator(email);

    if (EmailValidation.status === true) {
      var emailValid = true;
      setEmailError('');
    } else {
      setEmailError(EmailValidation.msg);
    }

    //Once text box Validated
    if (emailValid) {
      setLoading(true)
      const response = await SendOtp(email);
      if (response?.status === true) {
        showToastGreen(response?.message);
        navigation.navigate('OtpScreen', {email: email});
        setLoading(false)
      }
      else{
        setLoading(false)
      }
    }
  };

  const nextStep = async () => {
    navigation.navigate('OtpScreen', {email: email, user_type: user_type});
  };

  return (
    <SafeAreaView style={[styles.SafeAreaView]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
      <ScrollView>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          style={{flex: 1}}
          behavior="padding">
          {/* <View style={[styles.MainContainer]}> */}
          <View style={[styles.card, styles.elevation]}></View>

          <View style={{alignItems: 'center', bottom: 60}}>
            <View
              style={{
                width: 100,
                height: 110,
                borderRadius: 100 / 2,
                backgroundColor: COLORS.shadowColor,
                alignItems: 'center',
                justifyContent: 'center',
                shadowOffset: {width: 0, height: 8},
                shadowOpacity: 0.12,
                shadowRadius: 3.84,
                elevation: 10,
                shadowColor: COLORS.black,
                marginBottom: 15,
              }}>
              <Image
                source={require('../../../Resources/Images/logo.png')}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100 / 2,
                }}
              />
            </View>
            <View style={{alignItems: 'center', marginBottom: 30}}>
              <Text style={[styles.Welcometext]}>Forgot Your Password</Text>
            </View>

            {/*Inputs*/}

            <View style={{padding: 15}}>
              <View style={{flexDirection: 'row'}}>
                <Icon name="email-variant" size={25} color={COLORS.primary} />
                <Text
                  style={{
                    marginTop: 3,
                    marginLeft: 10,
                    fontSize: 14,
                    fontWeight: 'bold',
                    color:COLORS.textcolor
                  }}>
                  Email I'd
                </Text>

                {emailError.length > 0 && (
                  <>
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 12,
                        fontSize: 12,
                        color: 'red',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                      }}>
                      {emailError}
                    </Text>

                    <Icon1
                      name="error"
                      size={18}
                      color={'red'}
                      style={{marginLeft: 10, top: 2}}
                    />
                  </>
                )}
              </View>

              <TextInput
                keyboardType="email-address"
                style={{
                  width: wp(80),
                  borderBottomWidth: 0.5,
                  height: 40,
                  borderBottomColor: 'gray',
                  marginBottom: 20,
                  color: COLORS.textcolor,
                  fontFamily: FONTFAMILY.HelveticaNeuMedium,
                  fontSize: RFValue(14),
                }}
                name="email"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => setEmail(text)}
                value={email}></TextInput>

              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: COLORS.secondary,
                }}>
                Note : Please enter registered mail address.{' '}
              </Text>
            </View>

            <CustomButton
              backgroundColor={COLORS.primary}
              title="Continue"
              titleColor={COLORS.white}
              size="60"
              onPress={() => clickOnpress()}
              loading={loading}
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
    alignItems: 'center',
  },

  card: {
    backgroundColor: COLORS.primary,
    width: wp('100'),
    height: hp('25'),
    transform: [{scaleX: 1.3}],
    borderBottomStartRadius: 250,
    borderBottomEndRadius: 250,
    overflow: 'hidden',
  },
  elevation: {
    shadowColor: '#000',
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
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: COLORS.cardDescription,
  },
  Welcometext: {
    marginTop: 10,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: COLORS.textcolor,
  },
  areYou: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: COLORS.primary,
    marginBottom: 10,
  },

  forgot: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: COLORS.secondary,
    textDecorationLine: 'underline',

    marginRight: 10,
  },

  register: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: COLORS.secondary,
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
  optionSelected: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
  },
  optionUnSelected: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: COLORS.primary,
    textAlign: 'center',
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

export default ForgotPassword;
