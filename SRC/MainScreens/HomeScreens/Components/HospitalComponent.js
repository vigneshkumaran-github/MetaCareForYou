import {COLORS, FONTFAMILY, FONTS} from '../../../Constants/DesignConstants';
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

import ActivityLoader from '../../../CustomComponents/ActivityLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../Context/AuthContext';
import {RFValue} from 'react-native-responsive-fontsize';
import ResponsiveImage from 'react-native-responsive-image';
import {SvgXml} from 'react-native-svg';
import {getLocations} from '../../../HelperFunctions/Helper';
import {useNavigation} from '@react-navigation/native';
import {verifiedsvg} from '../../../Resources/Svg/Service';

const HospitalComponent = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const {GetHospitals} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState();

  const getData = async () => {
    const loc = await AsyncStorage.getItem('location_details');
    const response = await GetHospitals(loc?.latitude, loc?.longitude, 1);
    if (response?.status === true) {
      setLoading(false);
      setData(response?.data);
      setPageCount(response?.data?.length);
    } else {
      setLoading(false);
      console.log(response, 'eee');
    }
  };

  const getData2 = async pagenum => {
    setLoading2(true);
    const response = await GetHospitals(lat, lang, pagenum);
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
    console.log(page);
    console.log(pageCount);
    if (pageCount === 10 && !loading2) {
      getData2(page + 1);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.headtext, {marginStart: responsiveWidth(5)}]}>
        Nearby Healthcare Provider
      </Text>

      {!loading ? (
        <ScrollView
          onScroll={loadMore}
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
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.text1}>
                  {item.name}
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.text2}>
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
      ) : (
        <ActivityLoader size={'large'} style={{height: responsiveHeight(20)}} />
      )}
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
