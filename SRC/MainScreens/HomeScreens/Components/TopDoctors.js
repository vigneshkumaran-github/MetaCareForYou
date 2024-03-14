import {
  ActivityIndicator,
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
import {BASE_URL, IMAGE_BASE_URL} from '../../../ApiService/Config';
import {COLORS, FONTS} from '../../../Constants/DesignConstants';
import React, {useContext, useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {AuthContext} from '../../../Context/AuthContext';
import {SliderBox} from 'react-native-image-slider-box';
import axios from 'axios';

//Specialist data
const DATA = [
  {
    id: 1,
    BannerUrl:
      'https://img.freepik.com/free-vector/gradient-mental-health-facebook-cover_52683-69907.jpg?w=1060&t=st=1671015450~exp=1671016050~hmac=9833336db5de284dc5ec5b9e3fec01759495635d544dc0d3ec725c6a1af744d6',
  },
  {
    id: 2,
    BannerUrl:
      'https://img.freepik.com/free-psd/medical-horizontal-banner-template_23-2148940482.jpg?w=2000',
  },
  {
    id: 3,
    BannerUrl:
      'https://img.freepik.com/free-psd/medical-healthcare-poster-template_23-2148940481.jpg?w=2000',
  },
];

const TopDoctors = ({banner, data, isLoading}) => {
  // const data = [
  //   {
  //     image: 'https://source.unsplash.com/1024x768/?nature',
  //     link: 'https://www.google.com/',
  //   },
  //   {
  //     image: 'https://source.unsplash.com/1024x768/?tree',
  //     link: 'https://www.google.com/',
  //   },
  // ];

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          width: 6,
        }}></View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        marginVertical: responsiveHeight(1.5),
      }}>
      {!isLoading ? (
        <SliderBox
          images={banner}
          sliderBoxHeight={responsiveHeight(20)}
          onCurrentImagePressed={index =>
            // console.log(`image ${data[index]?.link} pressed`)
            Linking.openURL(data[index]?.target_url)
          }
          ImageComponentStyle={{
            borderRadius: 15,
            width: responsiveWidth(90),
            marginTop: 5,
          }}
          imageLoadingColor={COLORS.primary}
          autoplay
          circleLoop
          autoplayInterval={5000}
        />
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: responsiveHeight(20),
          }}>
          <ActivityIndicator size={'small'} color={COLORS.primary} />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  Main2: {
    width: wp('100%'),
    backgroundColor: COLORS.white,
    alignItems: 'center',

    padding: 5,
    marginTop: 0,
  },
  Main3: {
    width: wp('90%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainHeading: {
    ...FONTS.mainHeading,
  },
  card: {
    paddingTop: 5,
    paddingBottom: 5,
    width: wp('90'),
    height: hp('20'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  elevation: {
    elevation: 5,
    shadowColor: COLORS.shadowcolor,
  },

  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 20,
  },
});

export default TopDoctors;
