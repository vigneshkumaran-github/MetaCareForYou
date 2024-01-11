import {COLORS, FONTFAMILY, FONTS} from '../../../Constants/DesignConstants';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {RFValue} from 'react-native-responsive-fontsize';
import React from 'react';
import ResponsiveImage from 'react-native-responsive-image';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {verifiedsvg} from '../../../Resources/Svg/Service';

const HospitalComponent = () => {
  const data = [
    {
      id: '5dd384c718ebe5a9a415d33086935ea2ccb7f59c8b7c6c0b5d9730f2824e633656da2c0d6c0f16837fea10',
      name: 'Mayo Hospital',
      mobile_number: '8098629612',
      email: 'mayo@gmail.com',
      address:
        'Welcome to Greenwood General Hospital, where compassionate care meets cutting-edge medicine. Nestled in the heart of the city, Greenwood General is a leading healthcare institution dedicated to providing exceptional medical services to our community.Level 5, Menara MyIPO. PJ Sentral, Lot 12, Persiaran Barat, Seksyen 52 46200 Petaling Jaya Selangor.Welcome to General Hospital, where compassionate care meets cutting-edge medicine. Nestled in the heart of the city, Greenwood General is a leading healthcare institution dedicated to providing exceptional medical services to our community.Level 5, Menara MyIPO. PJ Sentral, Lot 12, Persiaran Barat, Seksyen 52 46200 Petaling Jaya Selangor.',
      about_us:
        'Welcome to General Hospital, where compassionate care meets cutting-edge medicine. Nestled in the heart of the city, Greenwood General is a leading healthcare institution dedicated to providing exceptional medical services to our community.',
      appointments_open: false,
      is_verified: false,
      profile_photo: 'http://localhost:3000/uploads/user/2.jpg',
      distance: '0.65 Km',
    },
    {
      id: '26792a89a226f6bb728f948f2957ee085b785c307e6574a02eb60ff34a1eceafe6807376b88ff0714000fa',
      name: 'Johns Hopkins Hospital',
      mobile_number: '8098629614',
      email: 'john@gmail.com',
      address:
        'Level 5, Menara MyIPO. PJ Sentral, Lot 12, Persiaran Barat, Seksyen 52 46200 Petaling Jaya Selangor.',
      about_us:
        'Welcome to General Hospital, where compassionate care meets cutting-edge medicine. Nestled in the heart of the city, Greenwood General is a leading healthcare institution dedicated to providing exceptional medical services to our community.',
      appointments_open: false,
      is_verified: false,
      profile_photo: 'http://localhost:3000/uploads/user/4.jpg',
      distance: '0.65 Km',
    },
    {
      id: '7ad5a291fbafb7d4fac23e3fc7ba37dcd0df6ad91a51a5e7c983aa105a87735f4d2ba2f9267770c3a3e5d6',
      name: 'Greenwood Hospital',
      mobile_number: '8098629611',
      email: 'green@gmail.com',
      address:
        'Level 5, Menara MyIPO. PJ Sentral, Lot 12, Persiaran Barat, Seksyen 52 46200 Petaling Jaya Selangor.',
      about_us:
        'Welcome to General Hospital, where compassionate care meets cutting-edge medicine. Nestled in the heart of the city, Greenwood General is a leading healthcare institution dedicated to providing exceptional medical services to our community.',
      appointments_open: true,
      is_verified: true,
      profile_photo: 'http://localhost:3000/uploads/user/1.jpg',
      distance: '0.65 Km',
    },
    {
      id: 'be0065b5c6062f1ad573fe48d862de5f73ed3e00e8ba06f8ed89e0b5363890805464fdd6a070200d1fa73d',
      name: 'Toronto Hospital',
      mobile_number: '8098629613',
      email: 'toronto@gmail.com',
      address:
        'Level 5, Menara MyIPO. PJ Sentral, Lot 12, Persiaran Barat, Seksyen 52 46200 Petaling Jaya Selangor.',
      about_us:
        'Welcome to Greenwood General Hospital, where compassionate care meets cutting-edge medicine. Nestled in the heart of the city, Greenwood General is a leading healthcare institution dedicated to providing exceptional medical services to our community.Welcome to General Hospital, where compassionate care meets cutting-edge medicine. Nestled in the heart of the city, Greenwood General is a leading healthcare institution dedicated to providing exceptional medical services to our community.',
      appointments_open: true,
      is_verified: true,
      profile_photo: 'http://localhost:3000/uploads/user/3.jpg',
      distance: '0.65 Km',
    },
  ];
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={[styles.headtext, {marginStart: responsiveWidth(5)}]}>
        Nearby Healthcare Provider
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{padding: 5}}>
        {data?.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ServiceLists', {hospitalData: item});
            }}
            key={index}
            activeOpacity={0.8}
            style={styles.card}>
            <ResponsiveImage
              style={styles.image}
              source={{uri: item?.profile_photo}}
            />

            <View style={styles.bottomview}>
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.text1}>
                {item.name}
              </Text>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text2}>
                {item?.address}
              </Text>
            </View>
            {item?.is_verified && (
              <View
                style={{
                  position: 'absolute',
                  right: responsiveWidth(1),
                  top: responsiveHeight(0.5),
                }}>
                <SvgXml
                  xml={verifiedsvg}
                  height={responsiveWidth(8)}
                  width={responsiveWidth(8)}
                />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HospitalComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: COLORS.white,
    width: responsiveWidth(48),
    height: responsiveHeight(19),
    alignSelf: 'center',
    elevation: 5,
    marginVertical: responsiveHeight(1),
    borderRadius: 10,
    borderColor: COLORS.primary,
    marginHorizontal: responsiveWidth(2),
    overflow: 'hidden',
  },
  headtext: {
    fontSize: RFValue(15),
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
    color: COLORS.black,
  },
  image: {
    width: responsiveWidth(48),
    height: responsiveHeight(10),
  },
  bottomview: {
    paddingHorizontal: 10,
    justifyContent: 'space-evenly',
    height: responsiveHeight(9),
  },
  text1: {
    color: COLORS.black,
    fontSize: RFValue(14),
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
    textAlign: 'center',
  },
  text2: {
    color: COLORS.gray,
    fontSize: RFValue(12),
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
    width: responsiveWidth(43),
    alignSelf: 'center',
  },
});
