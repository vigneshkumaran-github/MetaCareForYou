import {
  Alert,
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
import {
  MobileValidator,
  emailValidator,
  fisrtnameValidator,
  passwordValidator,
  showToastGreen,
  showToastRed,
} from '../../HelperFunctions/Helper';
import React, {useContext, useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {AuthContext} from '../../Context/AuthContext';
import {COLORS, FONTFAMILY} from '../../Constants/DesignConstants';
import {Checkbox} from 'react-native-paper';
import CustomButton from '../../CustomComponents/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../CustomComponents/Loader';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {SelectList} from 'react-native-dropdown-select-list';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Register = () => {
  const {createAccount, GetCountries} = useContext(AuthContext);
  const navigation = useNavigation();

  const [firstName, setfirstName] = useState('');
  const [firstNameError, setfirstNameError] = useState('');

  // const [lastName, setlastName] = useState("");
  // const [lastNameError, setlastNameError] = useState("");

  const [mobileNumber, setmobileNumber] = useState('');
  const [mobileNumberError, setmobileNumberError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState('eye');

  const [userOption, setUserOption] = useState('Patient');

  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState();
  const [defop, setDefop] = useState({});
  const [dropData, setDropData] = useState([]);

  const handlePasswordVisibility = () => {
    if (passwordIcon === 'eye') {
      setPasswordIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (passwordIcon === 'eye-off') {
      setPasswordIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const clickOnpress = async () => {
    var firstNameValid = false;
    // var lastNameValid = false;
    var mobileValid = false;
    var emailValid = false;
    var passwordValid = false;
    if (!checked) {
      // Alert.alert("sjhhs")
    }
    //First Name Validation Area
    const FirstNameValidation = await fisrtnameValidator(
      firstName,
      'Full Name',
    );

    if (FirstNameValidation.status === true) {
      var firstNameValid = true;
      setfirstNameError('');
    } else {
      setfirstNameError(FirstNameValidation.msg);
    }

    //Last Name Validation Area
    // const LastNameValidation = await LastnameValidator(lastName, "Last Name");

    // if (LastNameValidation.status === true) {
    //     var lastNameValid = true;
    //     setlastNameError("");
    // } else {
    //     setlastNameError(LastNameValidation.msg);
    // }

    //Email Validation
    const EmailValidation = await emailValidator(email);

    if (EmailValidation.status === true) {
      var emailValid = true;
      setEmailError('');
    } else {
      setEmailError(EmailValidation.msg);
    }

    //Last Name Validation Area
    const MobileValidation = await MobileValidator(mobileNumber);

    if (MobileValidation.status === true) {
      var mobileValid = true;
      setmobileNumberError('');
    } else {
      setmobileNumberError(MobileValidation.msg);
    }

    //Password Validation Area
    const passwordValidation = await passwordValidator(password);

    if (passwordValidation.status === true) {
      var passwordValid = true;
      setPasswordError('');
    } else {
      setPasswordError(passwordValidation.msg);
    }

    if (!checked) {
      showToastRed('Please accept the terms & conditions');
    }

    if (
      emailValid &&
      passwordValid &&
      firstNameValid &&
      mobileValid &&
      checked
    ) {
      createUser();
    }
  };

  const createUser = async () => {
    setLoader(true);
    const result = await createAccount(
      firstName,
      mobileNumber,
      email,
      password,
      value,
    );
    console.log(result);
    if (result?.status === true) {
      showToastGreen(result?.message);
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  const getCountries = async () => {
    setLoader(true);
    const response = await GetCountries();
    // console.log(response?.data)
    if (response?.status === true) {
      let newArray = [];
      response?.data?.map((item, index) => {
        newArray.push({
          key: item?.id,
          value: item?.country_code + ' ' + item?.name.slice(0, 3),
        });
      });
      setDropData(newArray);
      console.log(response?.data);
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

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
              nestedScrollEnabled
              style={{flex: 1}}
              behavior="padding">
              {/* <View style={[styles.MainContainer]}> */}
              <View style={[styles.card, styles.elevation]}></View>

              <View style={{alignItems: 'center', bottom: 60}}>
                <View style={[styles.backContain]}>
                  <Image
                    source={require('../../Resources/Images/logo.png')}
                    style={[styles.Logostyle]}
                  />
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={[styles.Welcometext]}>Metacare4u</Text>
                </View>
                <View style={{alignItems: 'center', marginBottom: 10}}>
                  <Text style={[styles.WelcomeSignup]}>Sign up</Text>
                </View>

                {/*Inputs*/}

                <View style={{padding: 15}}>
                  <View style={{flexDirection: 'row'}}>
                    <Icon name="account" size={25} color={COLORS.primary} />
                    <Text style={[styles.Lable]}>Full Name</Text>
                    {firstNameError.length > 0 && (
                      <>
                        <Text style={[styles.Error]}>{firstNameError}</Text>
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
                    keyboardType="default"
                    style={[styles.keyBoardStyle]}
                    name="firstname"
                    maxLength={30}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={text => setfirstName(text)}
                    value={firstName}></TextInput>

                  {/*........................................Input End ............................................................*/}
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Icon
                      name="email-variant"
                      size={25}
                      color={COLORS.primary}
                    />
                    <Text style={[styles.Lable]}>Email I'd</Text>

                    {emailError.length > 0 && (
                      <>
                        <Text style={[styles.Error]}>{emailError}</Text>
                        <Icon1
                          name="error"
                          size={18}
                          color={'red'}
                          style={{marginLeft: 10}}
                        />
                      </>
                    )}
                  </View>

                  <TextInput
                    keyboardType="email-address"
                    style={styles.keyBoardStyle}
                    name="email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={text => setEmail(text)}
                    value={email}></TextInput>
                  {/*........................................Input End ............................................................*/}

                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Icon name="phone" size={25} color={COLORS.primary} />
                    <Text style={[styles.Lable]}>Mobile Number</Text>

                    {mobileNumberError.length > 0 && (
                      <>
                        <Text style={[styles.Error]}>{mobileNumberError}</Text>

                        <Icon1
                          name="error"
                          size={18}
                          color={'red'}
                          style={{marginLeft: 10}}
                        />
                      </>
                    )}
                  </View>

                  <View style={{flexDirection: 'row', zIndex: 2}}>
                    <SelectList
                      boxStyles={{
                        width: responsiveWidth(25),
                        borderWidth: 0,
                        borderBottomWidth: 0.5,
                        height: responsiveHeight(6),
                        borderColor: 'gray',
                        marginBottom: 10,
                        borderRadius: 7,
                        marginTop: responsiveHeight(1),
                      }}
                      dropdownStyles={{
                        width: responsiveWidth(25),
                        borderTopWidth: 0,
                        borderWidth: 0.5,
                        borderRadius: 0,
                        maxHeight: responsiveHeight(15),
                        backgroundColor: COLORS.white,
                        marginTop: -responsiveHeight(1),
                        marginStart: 2,
                      }}
                      inputStyles={{
                        color: COLORS.textcolor,
                        fontFamily: FONTFAMILY.poppinsbold,
                        fontSize: RFValue(13),
                      }}
                      dropdownTextStyles={{
                        color: COLORS.textcolor,
                        fontFamily: FONTFAMILY.poppinsbold,
                      }}
                      setSelected={val => {
                        setValue(val);
                      }}
                      defaultOption={dropData[0]}
                      data={dropData}
                      save="key"
                      placeholder="Select Country"
                      search={false}
                      key={'key'}
                    />

                    <TextInput
                      keyboardType="number-pad"
                      style={[styles.keyBoardStyle2]}
                      name="phone"
                      autoCapitalize="none"
                      autoCorrect={false}
                      maxLength={11}
                      onChangeText={text => setmobileNumber(text)}
                      value={mobileNumber}
                    />
                  </View>

                  {/*........................................Input End ............................................................*/}
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Icon
                      name="lock-open-variant"
                      size={25}
                      color={COLORS.primary}
                    />
                    <Text style={[styles.Lable]}>Password</Text>

                    {passwordError.length > 0 && (
                      <>
                        <Text style={[styles.Error]}>{passwordError}</Text>
                        <Icon1
                          name="error"
                          size={18}
                          color={'red'}
                          style={{marginLeft: 10}}
                        />
                      </>
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <TextInput
                      style={[styles.keyBoardStyle]}
                      name="password"
                      autoCapitalize="none"
                      autoCorrect={false}
                      textContentType="newPassword"
                      secureTextEntry={passwordVisibility}
                      value={password}
                      maxLength={16}
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

                  <View style={{flexDirection: 'row'}}>
                    <Checkbox
                      status={checked ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setChecked(!checked);
                      }}
                      color={COLORS.primary}
                      uncheckColor={'red'}
                    />
                    <Text style={[styles.LableCheck]}>I accept the </Text>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          'https://metacare4u.life/terms-and-conditions',
                        )
                      }>
                      <Text style={[styles.LableColor]}>
                        terms and conditions{' '}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <CustomButton
                  backgroundColor={COLORS.primary}
                  title="Sign Up"
                  titleColor={COLORS.white}
                  size="60"
                  onPress={() => clickOnpress()}
                />
                {/* <TouchableOpacity
              onPress={() => clickOnpress()}
              style={styles.button}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.white,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity> */}
                {/* <View >
          <Text style={[styles.HaveAccount]}>Have an account? </Text>
          <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("LoginScreen")
                  }}
                >
                  <Text style={[styles.HaveAccountLink]}>Sign in </Text>
                </TouchableOpacity>
          </View> */}
              </View>

              {/* <View style={{ marginTop: 10 }}>
            <Image
              style={{ width: wp(100), height: hp(28), resizeMode: "contain" }}
              source={require("../.././Assets/images/sign.png")}
            />
          </View> */}

              {/* </View> */}
            </KeyboardAwareScrollView>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default Register;

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
    height: hp('20'),
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
  WelcomeSignup: {
    lineHeight: 24,
    lineHeight: 28,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: COLORS.textcolor,
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
    fontSize: RFValue(14),
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
  backContain: {
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
  },
  keyBoardStyle: {
    width: wp(80),
    height: responsiveHeight(5),
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    color: COLORS.textcolor,
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
    fontSize: RFValue(14),
  },
  keyBoardStyle2: {
    width: wp(55),
    height: responsiveHeight(5),
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    color: COLORS.textcolor,
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
    fontSize: RFValue(14),
    marginTop: responsiveHeight(2),
  },
  Logostyle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  Lable: {
    marginTop: 3,
    marginLeft: 10,
    color: COLORS.textcolor,
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
    fontSize: RFValue(14),
    fontWeight: 'bold',
  },
  LableCheck: {
    marginTop: 8,
    marginLeft: 5,
    fontWeight: 'bold',
    color: COLORS.textcolor,
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
    fontSize: RFValue(14),
  },
  HaveAccount: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  HaveAccountLink: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.blue,
    textAlign: 'center',
  },
  LableColor: {
    marginTop: 8,
    marginLeft: 3,
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.blue,
  },
  Error: {
    marginTop: 5,
    marginLeft: 12,
    fontSize: 10,
    color: 'red',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  searchSection: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: wp('80%'),
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
    borderRadius: 10,
  },
  button: {
    width: wp('30'),
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
  },
});
