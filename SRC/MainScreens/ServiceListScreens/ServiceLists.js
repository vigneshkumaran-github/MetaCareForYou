import {COLORS, FONTFAMILY} from '../../Constants/DesignConstants';
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

import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CustomNavbar from '../../CustomComponents/CustomNavbar';
import {RFValue} from 'react-native-responsive-fontsize';
import React from 'react';
import ResponsiveImage from 'react-native-responsive-image';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {verifiedsvg} from '../../Resources/Svg/Service';

const ServiceLists = ({route}) => {
  const navigation = useNavigation();
  const {hospitalData} = route.params;
  const data = [
    {
      id: 'ad39c77c9ba186f1c380fc3a1aab77d7d18ed0eda102c104e3d5b55a642bbdeef4ed1d2cfdec1bd1e200eb',
      name: 'Cardiology',
      about_us:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
    },
    {
      id: '1e52f0f58eb45672f3a3cf92e58a759447936ae56145a3485cbd242b48a2866a2dcb0d4b6eac6839b6e210',
      name: 'Dermatology',
      about_us:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
    },
    {
      id: '0bcd8011bd632e0f683fa74d19e1da7a8a7aa6f9f256062bb2c10908ef48261d3e534d2345634f679b5823',
      name: 'Orthopedics',
      about_us:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
    },
    {
      id: '5e128d68f12af7bb03a47a22e5bfbe7dd8544537add8632eaba0bc0a7277f17368071c545a049b7846ebf1',
      name: 'Neurology',
      about_us:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
    },
    {
      id: '22d621a34fbbb6e5aa306afb020c1e656afecc7fec4c3437935f604a6f83e3312e1d65aa338cb15e785369',
      name: 'Ophthalmology',
      about_us:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
    },
  ];
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={hospitalData?.name}
        onPress={() => navigation.goBack()}
      />
      {hospitalData?.is_verified && (
        <View
          style={{
            position: 'absolute',
            right: responsiveWidth(4),
            top: responsiveHeight(1.5),
          }}>
          <SvgXml
            xml={verifiedsvg}
            height={responsiveWidth(8)}
            width={responsiveWidth(8)}
          />
        </View>
      )}
      <ScrollView style={{marginTop: responsiveHeight(2)}}>
        <View
          style={{
            marginHorizontal: responsiveWidth(5),
            width: responsiveWidth(90),
          }}>
          <ResponsiveImage
            source={{
              uri: hospitalData?.profile_photo,
            }}
            style={{
              width: responsiveWidth(90),
              height: responsiveHeight(20),
            }}
          />

          <Text style={[styles.headtext, {marginTop: responsiveHeight(2)}]}>
            About Us{' '}
          </Text>
          <Text style={[styles.text2, {lineHeight: 20}]}>
            {hospitalData?.about_us}
          </Text>

          <Text style={[styles.headtext, {marginTop: responsiveHeight(1)}]}>
            Address{' '}
          </Text>
          <Text style={[styles.text2, {lineHeight: 20}]}>
            {hospitalData?.address}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: responsiveHeight(1),
            }}>
            <Text style={[styles.text1, {}]}>Phone : </Text>
            <Text style={styles.text2}>xxxx</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: responsiveHeight(1),
            }}>
            <Text style={[styles.text1, {}]}>Email : </Text>
            <Text style={styles.text2}>xxxx@gmail.com</Text>
          </View>
        </View>

        {/* Service section */}
        <Text
          style={[
            styles.headtext,
            {marginTop: responsiveHeight(2), marginStart: responsiveWidth(5)},
          ]}>
          Services
        </Text>
        <View style={styles.cardContainer}>
          {data?.map((item, index) => (
            <View key={index}>
              <TouchableOpacity style={styles.card} onPress={() => {}}>
                {/* <ResponsiveImage
                                        source={{ uri: 'https://th.bing.com/th/id/OIP.PpzvEJQj-fSERsMEC7nqbQHaG2?rs=1&pid=ImgDetMain' }}
                                        style={styles.image}
                                        resizeMode={'contain'} /> */}

                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={[
                    styles.text1,
                    {alignSelf: 'center', textAlign: 'center', width: '95%'},
                  ]}>
                  {item?.name}
                </Text>

                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={[
                    styles.text2,
                    {alignSelf: 'center', textAlign: 'center', width: '95%'},
                  ]}>
                  {item?.about_us}
                </Text>

                {hospitalData?.appointments_open ? (
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      navigation.navigate('DoctorList');
                    }}>
                    <Text style={styles.btntext}>Explore</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={[styles.btn, {opacity: 0.6}]}>
                    <Text style={styles.btntext}>Closed</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ServiceLists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  card: {
    width: responsiveWidth(40),
    height: responsiveHeight(17),
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    borderRadius: 15,
    marginVertical: responsiveHeight(1),
    elevation: 5,
    justifyContent: 'space-evenly',
  },
  cardContainer: {
    width: responsiveWidth(100),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
  },
  image: {
    width: responsiveWidth(20),
    height: responsiveHeight(10),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  btn: {
    width: responsiveWidth(22),
    height: responsiveHeight(5),
    alignSelf: 'center',
    borderRadius: responsiveWidth(7) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  btntext: {
    color: COLORS.white,
    fontSize: RFValue(12),
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
  },
  text1: {
    color: COLORS.black,
    fontSize: RFValue(14),
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
  },
  text2: {
    color: COLORS.gray,
    fontSize: RFValue(12),
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
  },
  headtext: {
    color: COLORS.black,
    fontSize: RFValue(16),
    fontFamily: FONTFAMILY.HelveticaNeuBold,
  },
});
