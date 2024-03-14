import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {BASE_URL, IMAGE_BASE_URL} from '../../ApiService/Config';
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

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../Context/AuthContext';
import CustomNavbar from '../../CustomComponents/CustomNavbar';
import Icon from 'react-native-vector-icons/Octicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RFValue} from 'react-native-responsive-fontsize';
import ResponsiveImage from 'react-native-responsive-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {getInitials} from '../../HelperFunctions/Helper';
import {useNavigation} from '@react-navigation/native';
import Lottie from 'lottie-react-native';

const Search = () => {
  const [searchKey, setSearchKey] = useState('');
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const {SearchHospitals, locationData} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState();
  const [refreshing, setRefreshing] = useState(false);
  console.log(locationData)


  const searchText = text => {
    setSearchKey(text);
    if (text?.length > 3) {
      getData(text);
    }
    if (text?.length === 0) {
      getData('');
    }
  };

  const getData = async text => {
    setLoading(true);
    if(locationData){
      const response = await SearchHospitals(
        locationData?.latitude,
        locationData?.longitude,
        1,
        text,
      );
      if (response?.status === true) {
        setLoading(false);
        setData(response?.data);
        setPageCount(response?.data?.length);
        console.log(response);
        setRefreshing(false);
      } else {
        setLoading(false);
        console.log(response, 'eee');
        setRefreshing(false);
      }
    }
  };

  const getData2 = async pagenum => {
    setLoading2(true);
    const response = await SearchHospitals(lat, lang, pagenum, searchKey);
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
    setSearchKey('');
    setRefreshing(true);
    getData('');
    setPage(1);
  };

  useEffect(() => {
    setPage(1);
    getData('');
  }, [locationData]);

  useEffect(() => {
    navigation.addListener('blur', () => setSearchKey(''));
    navigation.addListener('focus', () => getData(searchKey));
    return () => {
      navigation.removeListener('blur', () => setSearchKey(''));
    };
  }, [navigation]);

  //  let url = BASE_URL + 'auth/get_therapists';

  const clickOnpress = items => {
    navigation.navigate('AppointmentScreen', {therapistsDetails: items});
  };

  return (
    <>
      <SafeAreaView style={[styles.container]}>
        <StatusBar barStyle="dark-light" backgroundColor={COLORS.primary} />
        <CustomNavbar
          title="Find For More"
          onPress={() => navigation.goBack()}
        />
        <ScrollView
          onScroll={loadMore}
          refreshControl={
            <RefreshControl
              colors={[COLORS.primary]}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            style={{flex: 1}}
            behavior="padding">
            {/* Search lay*/}
            <View style={[styles.SearchLayout]}>
              <View style={[styles.subLayout]}>
                <TextInput
                  style={[styles.textBox]}
                  value={searchKey}
                  placeholderTextColor={COLORS.textcolor}
                  keyboardType="default"
                  placeholder={'Search for Hospitals...'}
                  underlineColorAndroid="transparent"
                  onChangeText={text => searchText(text)}
                  // onClear={text => setSearchKey('')}
                  returnKeyType="done"
                />
                <TouchableOpacity
                  style={[styles.TouchSearch]}
                  onPress={() => {
                    searchText(searchKey);
                  }}>
                  <Icon name="search" size={14} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            </View>
            {/* Search lay */}

            {loading ? (
              <ActivityIndicator
                style={{marginTop: 20, marginBottom: 20}}
                size="large"
                color={COLORS.primary}
              />
            ) : (
              <View style={{width: wp('90%')}}>
                {data.length ? (
                  data.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.card}
                      onPress={() => {
                        navigation.navigate('ServiceLists', {
                          hospitalData: item,
                        });
                      }}>
                      <ResponsiveImage
                        source={{
                          uri: item?.profile_photo,
                        }}
                        style={styles.Image}
                        borderRadius={responsiveWidth(15) / 2}
                      />

                      <View
                        style={{
                          justifyContent: 'space-between',
                          height: 'auto',
                          marginStart: responsiveWidth(2),
                          width: responsiveWidth(60),
                        }}>
                        <Text
                          numberOfLines={2}
                          ellipsizeMode="tail"
                          style={styles.Name}>
                          {item?.name}
                        </Text>
                        <Text
                          numberOfLines={2}
                          ellipsizeMode="tail"
                          style={styles.Designation}>
                          {item?.address} 
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={{alignItems: 'center'}}>
                    <Lottie
                      source={require('../../Resources/JSON/empty.json')}
                      loader
                      autoPlay
                      resizeMode="cover"
                      loop
                      style={{
                        width: responsiveWidth(90),
                        height: responsiveHeight(30),
                        marginVertical:responsiveHeight(7)
                      }}
                    />
                     {searchKey?.length > 3 ? (
                      <Text style={[styles.Designation]}>
                        Your Search "{searchKey}" didn't match any results...
                      </Text>
                    ) : (
                      <Text style={[styles.Designation]}>
                        No nearby healthcare available...!
                      </Text>
                    )}
                  </View>
                )}
              </View>
            )}
          </KeyboardAwareScrollView>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    flex: 1,
  },
  SearchLayout: {
    width: wp('90%'),
    backgroundColor: 'white',
    marginTop: 20,
    marginBottom: 20,
  },
  subLayout: {
    width: wp('90%'),
    borderRadius: 25,
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    borderRadius: 25,
    width: wp('72%'),
    height: 45,
    color: COLORS.black,
    fontSize: 14,
    marginTop: 0,
    marginLeft: 10,
    backgroundColor: '#D9D9D9',
  },
  TouchSearch: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 25,
  },

  card: {
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: responsiveWidth(90),
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 2.5,
    alignSelf: 'center',
    height: responsiveHeight(13),
    marginVertical: responsiveHeight(1),
    marginHorizontal: responsiveWidth(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageCard: {
    width: 70,
    height: 70,
    borderColor: COLORS.primary,
    borderWidth: 1.5,
    borderRadius: 70 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
  },
  Name: {
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 22,
    color: COLORS.secondary,
  },
  Designation: {
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: RFValue(11),
    fontWeight: '500',
    color: COLORS.black,
  },
  Location: {
    marginTop: 3,
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 22,
    color: COLORS.textColor,
  },
  cardInneremp: {
    backgroundColor: COLORS.white,
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: COLORS.secondary,
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 28,
  },
});
