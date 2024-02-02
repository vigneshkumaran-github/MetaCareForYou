import {COLORS, FONTFAMILY} from '../../Constants/DesignConstants';
import React, {useContext, useEffect, useState} from 'react';
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
import Lottie from 'lottie-react-native';

import ActivityLoader from '../../CustomComponents/ActivityLoader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AuthContext} from '../../Context/AuthContext';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CustomNavbar from '../../CustomComponents/CustomNavbar';
import {RFValue} from 'react-native-responsive-fontsize';
import ResponsiveImage from 'react-native-responsive-image';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {verifiedsvg} from '../../Resources/Svg/Service';

const ServiceLists = ({route}) => {
  const navigation = useNavigation();
  const {hospitalData} = route.params;
  const [data, setData] = useState([]);
  const {GetServices} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [pageCount, setPageCount] = useState();

  const getData = async () => {
    const response = await GetServices(hospitalData?.id,1);
    if (response?.status === true) {
      setData(response?.data);
      setLoading(false);
      setPageCount(response?.data?.length);
    } else {
      console.log(response, 'eee');
      setLoading(false);
    }
  };

  const getData2 = async pagenum => {
    setLoading2(true);
    const response = await GetServices(hospitalData?.id,pagenum);
    if (response?.status === true) {
      setLoading2(false);
      setData([...data, ...response?.data]);
      setPageCount(response?.data?.length);
    } else {
      setLoading2(false);
      console.log(response, 'eee');
    }
  };

  const loadMore = async () => {
    // console.log(page);
    // console.log(pageCount);
    if (pageCount === 10 && !loading2) {
      getData2(page + 1);
      setPage(page + 1);
    }
  };


  useEffect(() => {
    getData();
    setPage(1)
  }, []);

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
      {!loading ? (
        <ScrollView onScroll={loadMore} style={{marginTop: responsiveHeight(2)}}>
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
          </View>

          {/* Service section */}
          <Text
            style={[
              styles.headtext,
              {marginTop: responsiveHeight(2), marginStart: responsiveWidth(5)},
            ]}>
            Services
          </Text>
          {data?.length && data?.length > 0 ? (
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
                        {
                          alignSelf: 'center',
                          textAlign: 'center',
                          width: '95%',
                        },
                      ]}>
                      {item?.name}
                    </Text>

                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={[
                        styles.text2,
                        {
                          alignSelf: 'center',
                          textAlign: 'center',
                          width: '95%',
                        },
                      ]}>
                      {item?.about_us}
                    </Text>

                    {hospitalData?.appointments_open ? (
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                          navigation.navigate('DoctorList', {
                            serviceData: item,
                          });
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
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: responsiveHeight(1),
              }}>
              
              <Lottie
                source={require('../../Resources/JSON/help.json')}
                loader
                autoPlay
                resizeMode="cover"
                loop
                style={{
                  width: responsiveWidth(50),
                  height: responsiveHeight(18),
                }}
              />
              <Text style={styles.text1}>Services will be provided soon... !</Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <ActivityLoader size={'large'} style={{flex: 1}} />
      )}
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
