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

const Banner2 = ({banner, data, isLoading}) => {
  // const data1 = [
  //   {
  //     image: 'https://source.unsplash.com/1024x768/?nature',
  //     link: 'https://www.google.com/',
  //   },
  //   {
  //     image: 'https://source.unsplash.com/1024x768/?tree',
  //     link: 'https://www.google.com/',
  //   },
  // ];

  return (
    <>
      {banner.length > 0 ? (
        <View
          style={{
            backgroundColor: COLORS.white,
            marginVertical: responsiveHeight(1),
          }}>
          {!isLoading ? (
            <SliderBox
              images={banner}
              sliderBoxHeight={responsiveHeight(20)}
              onCurrentImagePressed={index => {
                console.log(data);
                Linking.openURL(data[index]?.target_url);
              }}
              ImageComponentStyle={{
                borderRadius: 15,
                width: responsiveWidth(80),
                height: responsiveHeight(17),
                marginTop: 5,
              }}
              imageLoadingColor={COLORS.primary}
              autoplay
              circleLoop
              autoplayInterval={3000}
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
      ) : null}
    </>
  );
};

export default Banner2;

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
    height: hp('15'),
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
