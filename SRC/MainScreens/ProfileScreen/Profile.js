import {COLORS, FONTFAMILY} from '../../Constants/DesignConstants';
import {
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
import React, {useContext, useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {AuthContext} from '../../Context/AuthContext';
import CustomNavbar from '../../CustomComponents/CustomNavbar';
import {IMAGE_BASE_URL} from '../../ApiService/Config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ResponsiveImage from 'react-native-responsive-image';
import {getInitials} from '../../HelperFunctions/Helper';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  const {GetUserInfo, GetProfile, profileData, setProfileData} =
    useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // const profileData = {
  //   name: 'mahendran',
  //   mobile_number: '9876543211',
  //   email: 'mahendran13nov@gmail.com',
  //   profile_photo: 'http://localhost:3000/uploads/user/1705606396501.jpeg',
  //   age: 22,
  //   gender: 'male',
  //   nationality: 'indian',
  //   health_issue: 'fever',
  //   mental_health_issue_before: false,
  //   thought_of_suicide: false,
  // };

  const SetbasicDetails = async () => {
    //to get profile Details
    const response = await GetProfile();
    if (response?.status === true) {
      setProfileData(response?.data);
      setLoading(false);
    } else {
      console.log(response, 'eee');
      setLoading(false);
    }
    //To get location details
  };

  useEffect(() => {
    navigation.addListener('focus', SetbasicDetails);
    return () => {
      navigation.removeListener('focus', SetbasicDetails);
    };
  }, [navigation]);

  return (
    <>
      <SafeAreaView style={[styles.SafeAreaView]}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
        <ScrollView>
          <CustomNavbar
            title="Personal Info"
            onPress={() => navigation.goBack()}
          />

          <View style={{width: wp('100%')}}>
            <View style={[styles.profileHeader]}>
              <View style={[styles.imageCard]}>
                {profileData?.profile_photo ? (
                  <ResponsiveImage
                    style={[styles.Image]}
                    source={{uri: profileData?.profile_photo}}
                    borderRadius={responsiveWidth(20/2)}
                  />
                ) : (
                  <View style={[styles.cardInner1]}>
                    <Text style={[styles.emptyText]}>
                      {getInitials(
                        profileData?.name ? profileData?.name : 'mmm',
                      )}
                    </Text>
                  </View>
                )}
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={[styles.Textheads]}>{profileData?.name}</Text>
                <Icon
                  name="account-edit"
                  size={25}
                  color={COLORS.primary}
                  style={{marginLeft: 10}}
                  onPress={() =>
                    navigation.navigate('EditProfile', {
                      profileData: profileData,
                    })
                  }
                />
              </View>
              <Text style={[styles.subTexts]}>{profileData?.email}</Text>
            </View>

            <View style={{alignItems: 'center', padding: 25}}>
              <View>
                <Text style={[styles.subTexts]}>Email Id</Text>
                <TextInput
                  keyboardType="email-address"
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
                  onChangeText={text => setEmail(text)}
                  value={profileData?.email}
                  editable={false}></TextInput>
              </View>

              <View>
                <Text style={[styles.subTexts]}>Mobile Number</Text>
                <TextInput
                  editable={false}
                  keyboardType="default"
                  style={{
                    width: wp('85'),
                    borderWidth: 0.5,
                    height: 40,
                    borderColor: 'gray',
                    marginBottom: 10,
                    paddingHorizontal: 10,
                  }}
                  name="mobile"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={text => setMobile(text)}
                  value={profileData?.mobile_number}></TextInput>
              </View>

              <View>
                <Text style={[styles.subTexts]}>Gender</Text>
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
                  onChangeText={text => setage(text)}
                  value={
                    profileData?.gender === 'null'
                      ? 'Not Updated'
                      : profileData?.gender
                  }
                  editable={false}
                  placeholder="Not updated"></TextInput>
              </View>

              <View>
                <Text style={[styles.subTexts]}>Age</Text>
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
                  onChangeText={text => setage(text)}
                  value={profileData?.age?.toString()}
                  editable={false}
                  placeholder="Not updated"></TextInput>
              </View>

              <View>
                <Text style={[styles.subTexts]}>Nationality</Text>
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
                  name="bloodGroup"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={text => setbloodGroup(text)}
                  value={
                    profileData?.nationality === 'null'
                      ? 'Not Updated'
                      : profileData?.nationality
                  }
                  editable={false}
                  placeholder="Not updated"></TextInput>
              </View>

              <View>
                <Text style={[styles.subTexts]}>Health issues if any</Text>
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
                  onChangeText={text => setHeight(text)}
                  value={
                    profileData?.health_issue === 'null'
                      ? 'Not Updated'
                      : profileData?.health_issue
                  }
                  editable={false}
                  placeholder="Not updated"></TextInput>
              </View>

              <View>
                <Text style={[styles.subTexts]}>
                  Had mental health issue before
                </Text>
                <TextInput
                  keyboardType="email-address"
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
                  onChangeText={text => setWeight(text)}
                  value={
                    profileData?.mental_health_issue_before === 'null'
                      ? 'Not Updated'
                      : profileData?.mental_health_issue_before
                  }
                  editable={false}
                  placeholder="Not updated"></TextInput>
              </View>

              <View>
                <Text style={[styles.subTexts]}>
                  Had a thought of suicide or harming yourself
                </Text>
                <TextInput
                  keyboardType="email-address"
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
                  onChangeText={text => setWeignt(text)}
                  value={
                    profileData?.thought_of_suicide === 'null'
                      ? 'Not Updated'
                      : profileData?.thought_of_suicide
                  }
                  editable={false}
                  placeholder="Not updated"></TextInput>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Profile;

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
  },
  imageCard: {
    width: 110,
    height: 110,
    borderColor: COLORS.primary,
    borderWidth: 2.5,
    borderRadius: 110 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    borderWidth: 1,
    resizeMode: 'contain',
    borderColor:COLORS.white
  },
  Textheads: {
    marginTop: 4,
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
    fontSize: 14,
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
});
