import {
  AppointmentMode,
  SessionsComponent,
  SlatsComponent,
} from './Components/';
import {
  BackHandler,
  Button,
  Dimensions,
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTFAMILY} from '../../Constants/DesignConstants';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import CustomNavbar from '../../CustomComponents/CustomNavbar';
import Lottie from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    subscriptionId: 'userID12345667',
    subscriptionDate: '22 Jan 2023, 10.43 am',
    subscriptionExpiredDate: '22 Feb 2023, 10.43 am',
  },
];

const Help = () => {
  const [subscriptionData, setSubscription] = useState(data[0]);

  const navigation = useNavigation();
  const handleBackButtonClick = () => {
    navigation.goBack();
  };

  const clickOnpress = () => {
    navigation.replace('HomeScreen');
  };

  return (
    <SafeAreaView style={[styles.SafeAreaView]}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      {/*Animated header */}
      <ScrollView>
        <CustomNavbar
          title="Help & Support"
          onPress={() => {
            handleBackButtonClick();
          }}
        />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Lottie
            source={require('../../Resources/JSON/help.json')}
            autoPlay
            loop
            style={{width: 250, height: 250}}
          />
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              width: wp('90%'),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={[styles.Textheads]}> How can we help you?</Text>
            <Text style={[styles.textMinimum]}>
              It looks like you are experiencing problems with our services
              through this platform.We are here to help so please get in touch
              with us.
            </Text>
          </View>

          <Text style={[styles.textsmall]}>Meta care Support</Text>

          <Text style={[styles.textMinimum]}>Get instant support 24/7.</Text>
        </View>

        <View style={{width: wp('100%'), marginTop: 20}}>
          <View style={[styles.section]}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`sms:${'+60 163631793'}`);
              }}
              style={[styles.card]}>
              <Lottie
                source={require('../../Resources/JSON/chat.json')}
                autoPlay
                loop
                style={{width: 80, height: 80}}
              />
              <Text style={[styles.LeftText]}>Chat to us</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${'+60 163631793'}`);
              }}
              style={[styles.card]}>
              <Lottie
                source={require('../../Resources/JSON/phone.json')}
                autoPlay
                loop
                style={{width: 80, height: 80}}
              />
              <Text style={[styles.LeftText]}>Call to us</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`mailto:${'metacare4u@gmail.com '}`);
              }}
              style={[styles.card]}>
              <Lottie
                source={require('../../Resources/JSON/mail.json')}
                autoPlay
                loop
                style={{width: 80, height: 80}}
              />
              <Text style={[styles.LeftText]}>Mail to us</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  Textheads: {
    marginTop: 5,
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 22,
    color: COLORS.black,
  },
  textMinimum: {
    marginTop: 5,
    marginBottom: 5,
    fontFamily: FONTFAMILY.poppinsregular,
    fontSize: 12,
    lineHeight: 24,
    color: COLORS.black,
  },
  textsmall: {
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: 16,
    lineHeight: 28,
    color: COLORS.secondary,
  },
  LeftText: {
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: 12,
    lineHeight: 28,
    color: COLORS.secondary,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: wp('25'),
    marginTop: 2,
    marginLeft: 5,
    marginBottom: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 2.5,
  },
});

export default Help;
