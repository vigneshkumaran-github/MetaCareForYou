import {
  Dimensions,
  FlatList,
  Image,
  Linking,
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
import React, {useContext, useEffect, useState} from 'react';
import {emailValidator, passwordValidator, showToastGreen, showToastRed} from '../../HelperFunctions/Helper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {AuthContext} from '../../Context/AuthContext';
import {COLORS, FONTFAMILY} from '../../Constants/DesignConstants';
import CustomButton from '../../CustomComponents/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../CustomComponents/Loader';
import {useNavigation} from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

const Login = () => {
  const navigation = useNavigation();
  const {LoginApi, setUserDetails} = useContext(AuthContext);
  const [userInfo, setuserinfon] = useState({});
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState('eye');
  const [userOption, setUserOption] = useState('Patient');
  const [loader, setLoader] = useState(false);

  const handlePasswordVisibility = () => {
    if (passwordIcon === 'eye') {
      setPasswordIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (passwordIcon === 'eye-off') {
      setPasswordIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onLoginPress = async () => {
    var emailValid = false;
    var passwordValid = false;
    //Email Validation
    const EmailValidation = await emailValidator(email);

    if (EmailValidation.status === true) {
      var emailValid = true;
      setEmailError('');
    } else {
      setEmailError(EmailValidation.msg);
    }
    //Password Validation Area
    const passwordValidation = await passwordValidator(password);

    if (passwordValidation.status === true) {
      var passwordValid = true;
      setPasswordError('');
    } else {
      setPasswordError(passwordValidation.msg);
    }
    if (emailValid && passwordValid) {
      setLoader(true);
      const result = await LoginApi(email, password, userOption);
      if (result?.status === true) {
        console.log(result, 'RESULT');
        setUserDetails(result?.data);
        setLoader(false);
        showToastGreen(result?.message);
      } else {
        // showToastRed(result?.message);
        setLoader(false);
      }
    }
  };

  const getCollegelist = async () => {
    const result = await getColleges();
    if (result?.status === true) {
      let newArray = []
      result?.data?.map((item, index) => {
        newArray.push(
          {
            key: item?.id,
            value: item?.name
          }
        )
      })
      setDropData(newArray)
    }
  }

  // useEffect(() => {
  //   getCollegelist()
  // }, [])


  return (
    <>
      {loader ? (
        <Loader />
      ) : (
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
                    source={require('../../Resources/Images/logo.png')}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  />
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={[styles.Welcometext]}>Metacare4u</Text>
                </View>

                {/*Inputs*/}

                <View style={{padding: 15}}>
                 

                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="email-variant"
                      size={25}
                      color={COLORS.primary}
                    />
                    <Text
                      style={styles.labeltext}>
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
                    style={styles.input}
                    name="email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={text => setEmail(text)}
                    value={email}></TextInput>

                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="lock-open-variant"
                      size={25}
                      color={COLORS.primary}
                    />
                    <Text
                      style={styles.labeltext}>
                      Password
                    </Text>

                    {passwordError.length > 0 && (
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
                          {passwordError}
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
                  <View style={{flexDirection: 'row'}}>
                    <TextInput
                      style={styles.input}
                      name="password"
                      autoCapitalize="none"
                      autoCorrect={false}
                      textContentType="newPassword"
                      maxLength={16}
                      secureTextEntry={passwordVisibility}
                      value={password}
                      onChangeText={text => setPassword(text)}></TextInput>

                    <TouchableOpacity
                      onPress={() => handlePasswordVisibility()}>
                      <Icon
                        name={passwordIcon}
                        size={20}
                        color={COLORS.primary}
                        style={{right: 20}}
                      />
                    </TouchableOpacity>
                    {/* <Icon name="eye-off" size={20} color={COLORS.primary} style={{right:20}}/> */}
                  </View>

                  <View style={{marginLeft: 'auto'}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('ForgotPassword', {
                          user_type: userOption,
                        })
                      }>
                      <Text style={[styles.forgot]}>Forgot password?</Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      paddingTop: 10,
                      marginTop: 10,
                    }}>
                    <Text style={[styles.areYou]}>Don't have an Account?</Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Register');
                      }}>
                      <Text style={[styles.register]}>Register here!</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <CustomButton
                  backgroundColor={COLORS.primary}
                  title="Sign in"
                  loading={loader}
                  titleColor={COLORS.white}
                  size="60"
                  onPress={() => onLoginPress()}
                />
                {/* {userOption === "Patient" ? (<Text style={{ marginTop: 5, fontColor: COLORS.textColor, fontWeight: 'bold' }}>Or</Text>) : null}
                            {userOption === "Patient" ? (
                                <GoogleSigninButton
                                    style={{ width: 192, height: 48, marginTop: 10 }}
                                    size={GoogleSigninButton.Size.Wide}
                                    color={GoogleSigninButton.Color.Dark}
                                    onPress={() => signIn()}
                                />)
                                : null} */}
              </View>

              {/* </View> */}
            </KeyboardAwareScrollView>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default Login;

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
  input:{
    width: wp(80),
    borderBottomWidth: 0.5,
    height: 40,
    borderBottomColor: 'gray',
    marginBottom: 20,
    color:COLORS.textcolor,
    fontFamily:FONTFAMILY.HelveticaNeuMedium,
    fontSize:RFValue(14)
  },
  labeltext:{
    marginTop: 5,
    marginLeft: 10,
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color:COLORS.textcolor
  }
});
