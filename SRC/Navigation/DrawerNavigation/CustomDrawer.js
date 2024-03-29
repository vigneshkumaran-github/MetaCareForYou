import {COLORS, FONTFAMILY} from '../../Constants/DesignConstants';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  Image,
  ImageBackground,
  Linking,
  Modal,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../Context/AuthContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {IMAGE_BASE_URL} from '../../ApiService/Config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getInitials} from '../../HelperFunctions/Helper';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import LogoutPopUp from './LogoutPopUp';

const CustomDrawer = props => {
  const {GetUserInfo, Logout, profileData} = useContext(AuthContext);
  const navigation = useNavigation();

  const [name, setName] = React.useState();
  const [profile, setProfile] = React.useState();
  const [modalVisible, setModalVisible] = useState(false);
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'App link',
        message:
          'Hi, I just invited you to use the Metacare4U app! Step1: Use my link to download the app Step2: Register using your Email Address to register your Acoount. Step3: Start using  24x7 online  Healthcare service  & more . 40+ Crore users consult with Metacare4u. It`s 100% safe & secure Download the app now.  https://play.google.com/store/apps/details?id=com.metacareforyou',
        url: 'https://play.google.com/store/apps/details?id=com.metacareforyou',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const remove = async () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: COLORS.primary}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={{padding: 10, flexDirection: 'row', margin: 10}}>
          <View>
            {/* <Image
            source={require('./../../Assets/images/profile.png')}
            style={{height: 50, width: 50, borderRadius: 25, marginBottom: 10}}
          /> */}
            {profileData?.profile_photo ? (
              <Image
                style={[styles.ProfileImage]}
                source={{uri: profileData?.profile_photo}}
              />
            ) : (
              <View style={[styles.cardInner1]}>
                <Text style={[styles.emptyText]}>
                  {name ? getInitials(profileData?.name) : null}
                </Text>
              </View>
            )}
          </View>
          <View style={{marginLeft: 10, marginTop: 5}}>
            <Text
              style={{
                color: COLORS.white,
                fontSize: 13.5,
                fontFamily: FONTFAMILY.poppinsbold,
              }}>
              {profileData?.name}
            </Text>
            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONTFAMILY.poppinsmedium,
                fontSize: 12,
              }}>
              View Your Profile & Edit
            </Text>
          </View>
          <View style={{alignItems: 'center', marginLeft: 30, marginTop: 13}}>
            <FontAwesome5 name="angle-right" size={20} color={COLORS.white} />
          </View>
        </TouchableOpacity>

        <View style={{width: wp('78%'), backgroundColor: 'white'}}>
          {/* <DrawerItemList {...props} /> */}
          <DrawerItem
            icon={({color, size}) => (
              <FontAwesome5
                name="file-medical"
                color={COLORS.textcolor}
                size={20}
              />
            )}
            label={() => (
              <Text
                style={{
                  color: COLORS.textcolor,
                  fontFamily: FONTFAMILY.poppinsmedium,
                  fontSize: 14,
                  lineHeight: 28,
                }}>
                Appointments
              </Text>
            )}
            onPress={() => navigation.navigate('History')}
          />

          {/* <DrawerItem
             icon={({ color, size }) => (
                <FontAwesome5
                  name="crown"
                  color={COLORS.textcolor}
                  size={18}
                />
              )}
              label={() => <Text style={{ color: COLORS.textcolor, fontFamily:FONTFAMILY.poppinsmedium, fontSize: 14,lineHeight:28}}>Subscription</Text>}
             onPress={() => navigation.navigate("Subscription")}
            /> */}
          <DrawerItem
            icon={({color, size}) => (
              <FontAwesome5 name="headset" color={COLORS.textcolor} size={20} />
            )}
            label={() => (
              <Text
                style={{
                  color: COLORS.textcolor,
                  fontFamily: FONTFAMILY.poppinsmedium,
                  fontSize: 14,
                  lineHeight: 28,
                }}>
                Help & Support
              </Text>
            )}
            onPress={() => navigation.navigate('Help')}
          />

          <DrawerItem
            icon={({color, size}) => (
              <Ionicons
                name="information-circle-outline"
                color={COLORS.textcolor}
                size={22}
              />
            )}
            label={() => (
              <Text
                style={{
                  color: COLORS.textcolor,
                  fontFamily: FONTFAMILY.poppinsmedium,
                  fontSize: 14,
                  lineHeight: 28,
                }}>
                About
              </Text>
            )}
            onPress={() => navigation.navigate('About')}
          />

          <DrawerItem
            icon={({color, size}) => (
              <MaterialIcons
                name="privacy-tip"
                color={COLORS.textcolor}
                size={22}
              />
            )}
            label={() => (
              <Text
                style={{
                  color: COLORS.textcolor,
                  fontFamily: FONTFAMILY.poppinsmedium,
                  fontSize: 14,
                  lineHeight: 28,
                }}>
                Privacy policy
              </Text>
            )}
            onPress={() =>
              Linking.openURL('https://metacare4u.life/privacy-policy')
            }
          />

          <DrawerItem
            icon={({color, size}) => (
              <MaterialIcons
                name="file-present"
                color={COLORS.textcolor}
                size={22}
              />
            )}
            label={() => (
              <Text
                style={{
                  color: COLORS.textcolor,
                  fontFamily: FONTFAMILY.poppinsmedium,
                  fontSize: 14,
                  lineHeight: 28,
                }}>
                Terms of Service
              </Text>
            )}
            onPress={() =>
              Linking.openURL('https://metacare4u.life/terms-and-conditions')
            }
          />
          <DrawerItem
            icon={({color, size}) => (
              <Ionicons
                name="share-social-outline"
                color={COLORS.textcolor}
                size={22}
              />
            )}
            label={() => (
              <Text
                style={{
                  color: COLORS.textcolor,
                  fontFamily: FONTFAMILY.poppinsmedium,
                  fontSize: 14,
                  lineHeight: 28,
                }}>
                Tell a Friend
              </Text>
            )}
            onPress={onShare}
          />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        {/* <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Share App
            </Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => remove()}
          style={{paddingVertical: 15}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.primary,
              padding: 10,
              borderRadius: 25,
            }}>
            <Ionicons name="exit-outline" size={20} color={COLORS.white} />
            <Text
              style={{
                fontSize: 14,
                fontFamily: FONTFAMILY.poppinsmedium,
                marginLeft: 10,
                lineHeight: 28,
                color: COLORS.white,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <LogoutPopUp
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardInner1: {
    backgroundColor: COLORS.white,
    width: 44,
    height: 44,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 5,
  },
  emptyText: {
    color: COLORS.secondary,
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 28,
  },
  ProfileImage: {
    width: responsiveWidth(13),
    height: responsiveWidth(13),
    borderRadius: responsiveWidth(13) / 2,
    resizeMode: 'contain',
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: 'white',
  },
});

export default CustomDrawer;
