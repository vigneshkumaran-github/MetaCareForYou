import {COLORS, FONTFAMILY} from '../../Constants/DesignConstants';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import ActivityLoader from '../../CustomComponents/ActivityLoader';
import {AuthContext} from '../../Context/AuthContext';
import {BASE_URL} from '../../ApiService/Config';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CustomNavbar from '../../CustomComponents/CustomNavbar';
import DateTimePicker from '@react-native-community/datetimepicker';
import {RFValue} from 'react-native-responsive-fontsize';
import ResponsiveImage from 'react-native-responsive-image';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import moment from 'moment';
import {showToastGreen} from '../../HelperFunctions/Helper';
import {useNavigation} from '@react-navigation/native';
import NoData from '../../CustomComponents/NoData';

const DoctorList = ({route}) => {
  const navigation = useNavigation();
  const [loading, setIsloading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [TherapistList, setTherapist] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState('');
  const [data, setData] = useState([]);
  const {serviceData} = route.params;
  const {GetTherapists, CheckDate, BookAppointment} = useContext(AuthContext);
  const [id, setId] = useState('');
  const [loading3, setLoading3] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [pageCount, setPageCount] = useState();
  const [slotData, setSlotData] = useState([]);

  //To COLLECT All DAta
  // useEffect(() => {
  //   async function fetchMyAPI() {
  //     setIsloading(true);
  //     let url = BASE_URL + 'auth/special_therapist';
  //     try {
  //       let dataPayload = {
  //         specialist_id: 40,
  //       };
  //       await axios
  //         .post(url, dataPayload)
  //         .then(function (response) {
  //           setIsloading(false);
  //           setTherapist(response.data.data);
  //           console.log(response.data, 'responseee');
  //         })
  //         .catch(function (error) {})
  //         .finally(function () {});
  //     } catch (error) {}
  //     setIsloading(false);
  //   }

  //   fetchMyAPI();
  // }, []);

  const onBookPress = async () => {
    setDatePicker(true);
  };

  function showDatePicker() {
    setDatePicker(true);
  }

  function onDateSelected(event, value) {
    if (event.type === 'dismissed') {
      console.log(value);
      setDate(new Date());
      setDatePicker(false);
    } else {
      console.log(value);
      setDate(value);
      setDatePicker(false);
      const formatedDate = moment(value).format('YYYY-MM-DD');
      checkDateAvailable(formatedDate);
    }
  }

  const checkDateAvailable = async date => {
    setLoading2(true);
    const response = await CheckDate(id, date);
    console.log(response);
    if (response?.status === true) {
      // showToastGreen(response?.message);
      // bookAppointment(date);
      setModalVisible(true);
    } else {
      console.log(response, 'eee');
      setLoading2(false);
    }
  };

  const bookAppointment = async () => {
    const result = await BookAppointment(
      id,
      moment(date).format('YYYY-MM-DD'),
      selected,
    );
    if (result?.status === true) {
      console.log(result);
      setLoading2(false);
      showToastGreen(result?.message);
      setSelected('');
    } else {
      console.log(result, 'eee');
      setLoading2(false);
    }
  };

  const getData = async () => {
    const response = await GetTherapists(serviceData?.hospital_service_id, 1);
    if (response?.status === true) {
      setData(response?.data);
      setIsloading(false);
      console.log(response);
    } else {
      setIsloading(false);
    }
  };

  const getData2 = async pagenum => {
    setLoading2(true);
    const response = await GetTherapists(
      serviceData?.hospital_service_id,
      pagenum,
    );
    if (response?.status === true) {
      setLoading3(false);
      setData([...data, ...response?.data]);
      setPageCount(response?.data?.length);
    } else {
      setLoading3(false);
      console.log(response, 'eee');
    }
  };

  const loadMore = async () => {
    console.log(page);
    console.log(pageCount);
    if (pageCount === 10 && !loading3) {
      getData2(page + 1);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <CustomNavbar title="Our Doctors" onPress={() => navigation.goBack()} />

      {!loading ? (
        <>
          {data?.length > 0 ? (
            <ScrollView
              onScroll={loadMore}
              showsVerticalScrollIndicator={false}>
              {data?.map((item, index) => (
                <TouchableOpacity key={index} style={styles.card}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <ResponsiveImage
                      source={{uri: item?.profile_photo}}
                      style={styles.image}
                      borderRadius={responsiveWidth(20) / 2}
                      resizeMode={'contain'}
                    />

                    <View
                      style={{
                        justifyContent: 'space-evenly',
                        marginStart: responsiveWidth(2),
                        width: responsiveWidth(60),
                      }}>
                      <Text style={styles.text1}>{item?.name}</Text>
                      <>
                        {item?.specialists?.map((item, index) => (
                          <Text key={index} style={styles.text3}>
                            {item}
                          </Text>
                        ))}
                      </>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.text3}>
                          Gender : {item?.gender}
                        </Text>
                        <Text style={styles.text3}>
                          exp : {item?.experience}yrs
                        </Text>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      // navigation.navigate('AppointmentScreen')
                      setSlotData(item?.slots);
                      setId(item.id);
                      console.log(item?.slots);
                      onBookPress();
                    }}>
                    <Text style={styles.btntext}>Book Appointment</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}

              {datePicker && (
                <DateTimePicker
                  minimumDate={new Date()}
                  value={date}
                  mode={'date'}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  is24Hour={true}
                  onChange={onDateSelected}
                  onTouchCancel={() => {
                    console.log('cancelled');
                  }}
                  // style={styleSheet.datePicker}
                />
              )}
            </ScrollView>
          ) : (
            <NoData
              text1={'Service Currently Unavailable!'}
              text2={
                'Service is unavailable at the moment please try after some time... !'
              }
            />
          )}
        </>
      ) : (
        <ActivityLoader
          style={{marginTop: responsiveHeight(30)}}
          size={'large'}
        />
      )}

      {}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setSelected('');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                width: responsiveWidth(80),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: responsiveHeight(1),
              }}>
              <Text style={styles.text1}>Choose Slot</Text>
              <TouchableOpacity
                style={styles.xbtn}
                onPress={() => {
                  setModalVisible(false);
                  setSelected('');
                }}>
                <Text style={styles.text1}>X</Text>
              </TouchableOpacity>
            </View>

            <View>
              <ScrollView style={{maxHeight:responsiveHeight(40)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignSelf: 'center',
                    justifyContent: 'space-evenly',
                  }}>
                  {slotData?.map((itm, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelected(itm?.id);
                      }}
                      style={[
                        styles.modalbtn,
                        {
                          backgroundColor:
                            selected === itm?.id
                              ? COLORS.primary
                              : COLORS.white,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.modalbtntext,
                          {
                            color:
                              selected === itm?.id
                                ? COLORS.white
                                : COLORS.textcolor,
                          },
                        ]}>
                        {itm?.from_time}-{itm?.to_time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
              {selected !== '' && (
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(!modalVisible);
                        bookAppointment();
                      }}
                      style={[styles.btn, {}]}>
                      <Text style={styles.btntext}>Book</Text>
                    </TouchableOpacity>
                  )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DoctorList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  card: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    elevation: 5,
    marginVertical: responsiveHeight(1),
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 10,
    marginTop: responsiveHeight(3),
  },
  image: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    borderWidth: 1,
  },
  text1: {
    color: COLORS.black,
    fontSize: RFValue(14),
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
    fontWeight: '700',
  },
  text3: {
    color: COLORS.black,
    fontSize: RFValue(12),
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
  },
  text2: {
    color: COLORS.gray,
    fontSize: RFValue(11),
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
  },
  btn: {
    width: responsiveWidth(80),
    height: responsiveHeight(5),
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    marginTop: responsiveHeight(1.5),
  },
  btntext: {
    color: COLORS.white,
    fontSize: RFValue(14),
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: responsiveWidth(90),
  },
  modalbtn: {
    width: responsiveWidth(37),
    height: responsiveHeight(6),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginRight: responsiveWidth(1),
    marginVertical: responsiveHeight(1),
    borderRadius: 5,
    padding: 5,
    borderColor: COLORS.primary,
    borderWidth: 0.7,
  },
  modalbtntext: {
    fontSize: RFValue(11),
    fontFamily: FONTFAMILY.HelveticaNeuBold,
    fontWeight: '700',
  },
  modalbtntext2: {
    fontSize: RFValue(11),
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
  },
  xbtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: COLORS.textcolor,
    height: responsiveHeight(3),
    width: responsiveHeight(3),
    borderRadius: responsiveHeight(3) / 2,
  },
});
