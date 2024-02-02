import {COLORS, FONTS} from '../../../Constants/DesignConstants';
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {useNavigation} from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { whatsappsvg } from '../../../Resources/Svg/Service';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { RFValue } from 'react-native-responsive-fontsize';
import { showToastGreen } from '../../../HelperFunctions/Helper';

//Specialist data

const GetCareComponent = () => {
  const [mainTitle, setMainTitle] = useState('Get Care');
  const navigation = useNavigation();
  const RequestCall = async text => {
    let url = 'whatsapp://send?text=Hi Metacare4u&phone=60163631793';
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened successfully ' + data); //<---Success
      })
      .catch(() => {
        alert('Make sure WhatsApp installed on your device'); //<---Error
      });
  };

  const RenderGetcare = () => (
    <View style={[styles.Main2]}>
      {/* <View style={[styles.Main3]}>
        <Text style={[styles.mainHeading]}>{mainTitle}</Text>
      </View> */}

      <View style={[styles.InnerStyle]}>
        <TouchableOpacity
          style={[styles.getCare]}
          onPress={() => RequestCall()}>
            <SvgXml xml={whatsappsvg} width={responsiveWidth(10)} height={responsiveHeight(3)} />
          <Text style={[styles.getcarebuttonText]}>Get in touch with us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.callLayout]}
          // onPress={() => {showToastGreen('hiiiii')}}
          >
          <Image
            source={require('../../../Resources/Images/logo.png')}
            style={[styles.callImage]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return <RenderGetcare />;
};
const styles = StyleSheet.create({
  Main2: {
    width: wp('100%'),
    backgroundColor: 'white',
    alignItems: 'center',
  },
  Main3: {
    width: wp('90%'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  mainHeading: {
    ...FONTS.mainHeading,
  },

  InnerStyle: {
    width: wp('95%'),
    height: hp('6'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom:responsiveHeight(1.5)
  },
  getCare: {
    width: wp('70'),
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.12,
    shadowRadius: 3.84,
    elevation: 5,
    shadowColor: COLORS.shadowcolor,
  },

  callImage: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  callLayout: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.12,
    shadowRadius: 3.84,
    elevation: 6,
    shadowColor: COLORS.black,
  },
  getcarebuttonText: {
    fontSize: RFValue(12),
    color:COLORS.white,
    fontWeight:'500'
  },
});

export default GetCareComponent;
