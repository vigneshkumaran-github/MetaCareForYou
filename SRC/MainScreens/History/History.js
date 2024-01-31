import {
  BackHandler,
  Button,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTFAMILY} from '../../Constants/DesignConstants';
import React, {useContext, useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import ActivityLoader from '../../CustomComponents/ActivityLoader';
import {AuthContext} from '../../Context/AuthContext';
import CustomNavbar from '../../CustomComponents/CustomNavbar';
import {HistoryList} from './Components/Components';
import {RFValue} from 'react-native-responsive-fontsize';
import ResponsiveImage from 'react-native-responsive-image';
import {useNavigation} from '@react-navigation/native';
import NoData from '../../CustomComponents/NoData';

const History = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const {GetHistory} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [pageCount, setPageCount] = useState();

  const getData = async () => {
    console.log('called')
    const response = await GetHistory(1);
    if (response?.status === true) {
      setLoading(false);
      setData(response?.data);
      setPageCount(response?.data?.length);
      setRefreshing(false);
      console.log(response?.data)
    } else {
      setLoading(false);
      setRefreshing(false);
      console.log(response, 'eee');
    }
  };

  const getData2 = async pagenum => {
    setLoading2(true);
    const response = await GetHistory(pagenum);
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

  const onRefresh = () => {
    setRefreshing(true);
    getData();
    setPage(1)
  };

  useEffect(() => {
    setPage(1);
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.headtext,
          {alignSelf: 'center', marginTop: responsiveHeight(2)},
        ]}>
        Booking History
      </Text>

      {!loading ? (
        <View>
          {data?.length ? (
            <FlatList
              onScroll={loadMore}
              data={data}
              style={{
                marginTop: responsiveHeight(2),
                marginBottom: responsiveHeight(6),
              }}
              keyExtractor={(item, index) => index}
              refreshControl={
                <RefreshControl
                  colors={[COLORS.primary]}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              renderItem={({item, index}) => (
                <View style={styles.card}>
                  {/* Section 1 */}
                  <View style={styles.rowView}>
                    <ResponsiveImage
                      source={{
                        uri: item?.hospital?.profile_photo,
                      }}
                      style={styles.image1}
                      borderRadius={15}
                    />

                    <View
                      style={{
                        height: responsiveHeight(6),
                        justifyContent: 'space-between',
                        marginStart: 7,
                      }}>
                      <Text style={styles.text1}>{item?.hospital?.name}</Text>
                      <Text style={styles.text2}>{item?.appointment_date}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 0.7,
                      backgroundColor: COLORS.primary,
                      marginVertical: responsiveHeight(1),
                    }}
                  />
                  {/* Section2 */}

                  <View style={[styles.rowView, {}]}>
                    <ResponsiveImage
                      source={{
                        uri: item?.therapist?.profile_photo,
                      }}
                      style={styles.image2}
                      borderRadius={responsiveWidth(11) / 2}
                    />
                    <Text
                      style={[
                        styles.text1,
                        {width: responsiveWidth(40), marginStart: 2},
                      ]}>
                      {item?.therapist?.name}
                    </Text>
                    <Text style={[styles.text2, {width: responsiveWidth(40)}]}>
                      {item?.service?.name}
                    </Text>
                  </View>
                  <Text style={styles.statustext}>{item?.status}</Text>
                </View>
              )}
            />
          ) : (
            <NoData text1={'No Bookings Yet !'} />
          )}
        </View>
      ) : (
        <ActivityLoader style={{flex: 1}} size={'large'} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.onboardbackround,
  },
  headtext: {
    color: COLORS.textcolor,
    fontSize: RFValue(18),
    fontFamily: FONTFAMILY.HelveticaNeuBold,
    fontWeight: '700',
  },
  image1: {
    width: responsiveWidth(16),
    height: responsiveWidth(16),
  },
  image2: {
    width: responsiveWidth(7),
    height: responsiveWidth(7),
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: responsiveWidth(90),
    alignSelf: 'center',
    marginVertical: responsiveHeight(0.5),
    padding: 10,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text1: {
    color: COLORS.textcolor,
    fontSize: RFValue(15),
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
    fontWeight: '500',
  },
  text2: {
    color: COLORS.lightGray,
    fontSize: RFValue(13),
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
    fontWeight: '500',
  },
  statustext: {
    color: COLORS.primary,
    fontSize: RFValue(13),
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
    fontWeight: '500',
    position: 'absolute',
    right: responsiveWidth(2),
    top: responsiveHeight(0.5),
  },
});

export default History;
