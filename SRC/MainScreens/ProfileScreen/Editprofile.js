import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {BASE_URL, IMAGE_BASE_URL} from '../../ApiService/Config';
import {COLORS, FONTFAMILY, FONTS} from '../../Constants/DesignConstants';
import React, {useContext, useEffect, useState} from 'react';
import {
  getInitials,
  showToastGreen,
  showToastRed,
} from '../../HelperFunctions/Helper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../Context/AuthContext';
import CustomNavbar from '../../CustomComponents/CustomNavbar';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../../CustomComponents/Loader';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const EditProfile = ({route}) => {
  const {data} = route?.params;
  const navigation = useNavigation();
  const {GetUserInfo} = useContext(AuthContext);
  const [firstName, setFirstName] = useState(data?.name);
  const [email, setEmail] = useState(data?.email);
  const [mobile, setMobile] = useState(data?.mobile_number);
  const [age, setAge] = useState(data?.age);
  const [gender, setGender] = useState(data?.gender);
  const [nationality, setNationality] = useState(data?.nationality);
  const [healthIsseue, setHealthIsseue] = useState(data?.health_issue);
  const [mentalHealthIsseue, setMentalHealthIsseue] = useState(
    data?.mental_health_issue_before ? data?.mental_health_issue_before : false,
  );
  const [suicide, setSuicide] = useState(
    data?.thought_of_suicide ? data?.thought_of_suicide : false,
  );
  const [UserInfo, setUserInfoData] = useState(data);
  const [isLoadig, setIsloading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(data?.profile_photo);

  const [singleFile, setSingleFile] = useState(null);

  useEffect(() => {}, []);

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.images],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        // alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const updateProfile = async () => {
    // Check if any file is selected or not
    // if (singleFile !== null) {
    // setIsloading(true);
    // If file selected then create FormData
    const fileToUpload = singleFile;
    console.log(fileToUpload);
    const data = new FormData();
    data.append('name', firstName);
    data.append('mobile_number', mobile);

    gender && data.append('gender', gender);
    data.append('age', age);
    data.append('nationality', nationality);
    data.append('health_issue', healthIsseue);
    data.append('mental_health_issue_before', mentalHealthIsseue);
    data.append('thought_of_suicide', suicide);
    data.append('email', email);
    data.append('profile_photo', singleFile ? fileToUpload[0] : '');
    console.log(data);

    // let url = BASE_URL + 'auth/update_profile';
    // response = await fetch(BASE_URL + '/profile/update', {
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     Accept: 'application/json',
    //     Authorization: 'Bearer ' + (await AsyncStorage.getItem('userToken')),
    //   },
    // });

    try {
      setIsloading(true);
      console.log('1');
      // const response = await fetch(BASE_URL + '/customer', {
      //   method: 'PUT',
      //   body: data,
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     "Accept": 'application/json',
      //     "Authorization": 'Bearer ' + (await AsyncStorage.getItem('userToken')),
      //   },
      //   timeout:15000,
      // });
      const response = await axios.putForm(BASE_URL + '/customer', data, {
        headers: {
          timeout: 15000,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('userToken')),
        },
      });
      console.log('2');
      let responseJson = await response.data;
      console.log(responseJson, 'responseJson');
      if (responseJson?.status === true) {
        navigation.goBack();
        showToastGreen(responseJson.message);
        setIsloading(false);
      } else {
        showToastRed(responseJson?.error?.message);
        setIsloading(false);
      }
    } catch (err) {
      setIsloading(false);
      console.log(err, 'from catch');
    }

    // if (response) {
    //   navigation.goBack();
    // }

    // } else {

    // }
  };
  return (
    <>
      {isLoadig ? (
        <Loader />
      ) : (
        <SafeAreaView style={[styles.SafeAreaView]}>
          <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
          <ScrollView>
            <CustomNavbar
              title="Edit Personal Info"
              onPress={() => navigation.goBack()}
            />

            <View style={{width: wp('100%')}}>
              <View style={[styles.profileHeader]}>
                <View style={[styles.imageCard]}>
                  {singleFile != null ? (
                    <Image
                      style={[styles.Image]}
                      source={{uri: singleFile[0].uri}}
                    />
                  ) : data?.profile_photo ? (
                    <Image
                      style={[styles.Image]}
                      source={{uri: data?.profile_photo}}
                    />
                  ) : (
                    <View style={[styles.cardInner1]}>
                      <Text style={[styles.emptyText]}>
                        {getInitials(data?.name)}
                      </Text>
                    </View>
                  )}
                </View>

                <TouchableOpacity
                  style={{
                    right: 20,
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: 30 / 2,
                    borderColor: 'black',
                    borderWidth: 0.5,
                  }}
                  onPress={selectFile}>
                  <Icon name="account-edit" size={25} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={[styles.Textheads]}>{data?.name}</Text>
              </View>

              <View style={{alignItems: 'center', padding: 25}}>
                <View>
                  <Text style={[styles.subTexts]}>Full Name</Text>
                  <TextInput
                    keyboardType="default"
                    style={styles.input}
                    name="email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={text => setFirstName(text)}
                    value={firstName}
                  />
                </View>

                {/* <View>
                  <Text style={[styles.subTexts]}>Last Name</Text>
                  <TextInput
                    keyboardType="default"
                    style={{
                      width: wp('85'),
                      borderWidth: 0.5,
                      height: 40,
                      borderColor: 'gray',
                      marginBottom: 10,
                      paddingHorizontal: 10,
                    }}
                    name="email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={text => setLastName(text)}
                    value={lastName}
                  />
                </View> */}

                <View>
                  <Text style={[styles.subTexts]}>Email Id</Text>
                  <TextInput
                    keyboardType="email-address"
                    placeholderTextColor={COLORS.lightGray}
                    style={styles.input}
                    name="email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={text => setEmail(text)}
                    value={email !== 'null' ? email : 'Not Updated'}
                  />
                </View>

                <View>
                  <Text style={[styles.subTexts]}>Mobile Number</Text>
                  <TextInput
                    keyboardType="default"
                    placeholderTextColor={COLORS.lightGray}
                    style={styles.input}
                    name="mobile"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={text => setMobile(text)}
                    value={mobile}
                  />
                </View>

                <View>
                  <Text style={[styles.subTexts]}>Gender</Text>

                  <View style={{flexDirection: 'row', width: wp('85')}}>
                    <TouchableOpacity
                      style={
                        gender === 'male' ? styles.selected : styles.unselected
                      }
                      onPress={() => setGender('male')}>
                      <Text
                        style={
                          gender === 'male'
                            ? styles.optionSelected
                            : styles.optionUnSelected
                        }>
                        {'Male'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={
                        gender === 'female'
                          ? styles.selected
                          : styles.unselected
                      }
                      onPress={() => setGender('female')}>
                      <Text
                        style={
                          gender === 'female'
                            ? styles.optionSelected
                            : styles.optionUnSelected
                        }>
                        {' '}
                        {'Female'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={
                        gender === 'others'
                          ? styles.selected
                          : styles.unselected
                      }
                      onPress={() => setGender('others')}>
                      <Text
                        style={
                          gender === 'others'
                            ? styles.optionSelected
                            : styles.optionUnSelected
                        }>
                        {' '}
                        {'Others'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <Text style={[styles.subTexts]}>Age</Text>
                  <TextInput
                    keyboardType="default"
                    placeholderTextColor={COLORS.lightGray}
                    style={styles.input}
                    name="email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={text => setAge(text)}
                    value={age === null ? 'Not Updated' : age?.toString()}
                    placeholder="Not updated"></TextInput>
                </View>

                <View>
                  <Text style={[styles.subTexts]}>Nationality</Text>
                  <TextInput
                    keyboardType="default"
                    placeholderTextColor={COLORS.lightGray}
                    style={styles.input}
                    name="bloodGroup"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={text => setNationality(text)}
                    value={nationality == 'null' ? 'Not Updated' : nationality}
                    placeholder="Not updated"></TextInput>
                </View>

                <View>
                  <Text style={[styles.subTexts]}>Health issues if any</Text>
                  <TextInput
                    keyboardType="default"
                    placeholderTextColor={COLORS.lightGray}
                    style={styles.input}
                    name="email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={text => setHealthIsseue(text)}
                    value={healthIsseue == 'null' ? '' : healthIsseue}
                    placeholder="Not updated"></TextInput>
                </View>

                <View>
                  <Text style={[styles.subTexts]}>
                    Had mental health issue before
                  </Text>

                  <View style={{flexDirection: 'row', width: wp('85')}}>
                    <TouchableOpacity
                      style={
                        mentalHealthIsseue === true
                          ? styles.selected
                          : styles.unselected
                      }
                      onPress={() => setMentalHealthIsseue(true)}>
                      <Text
                        style={
                          mentalHealthIsseue === true
                            ? styles.optionSelected
                            : styles.optionUnSelected
                        }>
                        {'Yes'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={
                        mentalHealthIsseue === false
                          ? styles.selected
                          : styles.unselected
                      }
                      onPress={() => setMentalHealthIsseue(false)}>
                      <Text
                        style={
                          mentalHealthIsseue === false
                            ? styles.optionSelected
                            : styles.optionUnSelected
                        }>
                        {' '}
                        {'No'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <Text style={[styles.subTexts]}>
                    Had a thought of suicide or harming yourself
                  </Text>

                  <View style={{flexDirection: 'row', width: wp('85')}}>
                    <TouchableOpacity
                      style={
                        suicide === true ? styles.selected : styles.unselected
                      }
                      onPress={() => setSuicide(true)}>
                      <Text
                        style={
                          suicide === true
                            ? styles.optionSelected
                            : styles.optionUnSelected
                        }>
                        {'Yes'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={
                        suicide === false ? styles.selected : styles.unselected
                      }
                      onPress={() => setSuicide(false)}>
                      <Text
                        style={
                          suicide === false
                            ? styles.optionSelected
                            : styles.optionUnSelected
                        }>
                        {' '}
                        {'No'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => updateProfile()}
                style={styles.Submitbutton}>
                <Text style={styles.Buttontext}>{'Update'}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  profileHeader: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  imageCard: {
    width: 100,
    height: 100,
    borderColor: COLORS.primary,
    borderWidth: 2.5,
    borderRadius: 100 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderRadius: 90 / 2,
    resizeMode: 'contain',
  },
  Textheads: {
    marginRight: 15,
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 22,
    color: COLORS.secondary,
  },
  subTexts: {
    marginTop: 5,
    marginBottom: 5,
    fontFamily: FONTFAMILY.poppinsregular,
    fontSize: RFValue(14),
    fontWeight: 'bold',
    lineHeight: 22,
    color: COLORS.black,
  },
  optionSelected: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
  },
  optionUnSelected: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: COLORS.primary,
    textAlign: 'center',
  },
  unselected: {
    width: wp(22),
    backgroundColor: '#FFEDDF',
    margin: 6,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFEDDF',
    marginLeft: 10,
    marginRight: 10,
  },
  selected: {
    width: wp(22),
    backgroundColor: COLORS.primary,
    margin: 6,
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  Submitbutton: {
    width: wp('70%'),
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: COLORS.primary,
  },
  Buttontext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: COLORS.white,
  },
  cardInner1: {
    backgroundColor: COLORS.white,
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: COLORS.secondary,
    fontWeight: 'bold',
    fontSize: 28,
    lineHeight: 32,
  },
  input:{
    width: wp('85'),
    borderWidth: 0.5,
    height: responsiveHeight(6),
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: responsiveWidth(4),
    color: COLORS.textcolor,
    fontSize: RFValue(14),
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
    borderRadius:7
  }
});

// #endregion

export default EditProfile;
