import {COLORS, FONTFAMILY} from '../../Constants/DesignConstants';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {BASE_URL} from '../../ApiService/Config';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CustomNavbar from '../../CustomComponents/CustomNavbar';
import DateTimePicker from '@react-native-community/datetimepicker';
import {RFValue} from 'react-native-responsive-fontsize';
import ResponsiveImage from 'react-native-responsive-image';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const DoctorList = () => {
  const navigation = useNavigation();
  const [Loading, setIsloading] = useState(true);
  const [TherapistList, setTherapist] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState('');
  const data = [
    {
      id: 'a817769409a08f0644be58da650fa2d6eab474092a9ba044436f8ec5ce3a576b41c437e323c95b3db6f95a',
      name: 'Cena',
      mobile_number: '8787372828',
      gender: 'male',
      experience: 2,
      profile_photo:
        'https://ui-avatars.com/api/?background=F4740D&color=fff&name=Cena',
      specialists: [
        'Coronary Artery Disease Specialist',
        'Hypertension Specialist',
      ],
    },
    {
      id: '085e12b827a31e77ddeb3c33eabd208529978acfe4b4d5dc55d79dd97ef32080309f125b4d50bc8349f7bb',
      name: 'Rock',
      mobile_number: '8737372828',
      gender: 'male',
      experience: 2,
      profile_photo:
        'https://ui-avatars.com/api/?background=F4740D&color=fff&name=Rock',
      specialists: ['Cognitive Specialist', 'Behavioral Specialist'],
    },
  ];

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
    setDate(value);
    setDatePicker(false);
    checkDateAvailable();
  }

  return (
    <View style={styles.container}>
      <CustomNavbar title="Our Doctors" onPress={() => navigation.goBack()} />

      <ScrollView>
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
                    <Text style={styles.text3}>{item}</Text>
                  ))}
                </>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.text3}>Gender : {item?.gender}</Text>
                  <Text style={styles.text3}>exp : {item?.experience}yrs</Text>
                </View>
              </View>
            </View>

            {/* <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              style={[
                styles.text2,
                {
                  marginTop: responsiveHeight(0.5),
                  width: responsiveWidth(80),
                  alignSelf: 'center',
                },
              ]}>
              {item?.}
            </Text> */}

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                // navigation.navigate('AppointmentScreen')
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
            // style={styleSheet.datePicker}
          />
        )}
      </ScrollView>
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
            <Text style={styles.text1}>Choose Slot</Text>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignSelf: 'center',
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setSelected(1);
                }}
                style={[
                  styles.modalbtn,
                  {
                    backgroundColor:
                      selected === 1 ? COLORS.primary : COLORS.white,
                  },
                ]}>
                <Text
                  style={[
                    styles.modalbtntext,
                    {color: selected === 1 ? COLORS.white : COLORS.textcolor},
                  ]}>
                  10:00 AM-12:00 PM
                </Text>
                <Text
                  style={[
                    styles.modalbtntext2,
                    {color: selected === 1 ? COLORS.white : COLORS.gray},
                  ]}>
                  23-05-2024
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelected(2);
                }}
                style={[
                  styles.modalbtn,
                  {
                    backgroundColor:
                      selected === 2 ? COLORS.primary : COLORS.white,
                  },
                ]}>
                <Text
                  style={[
                    styles.modalbtntext,
                    {color: selected === 2 ? COLORS.white : COLORS.textcolor},
                  ]}>
                  10:00 AM-12:00 PM
                </Text>
                <Text
                  style={[
                    styles.modalbtntext2,
                    {color: selected === 2 ? COLORS.white : COLORS.gray},
                  ]}>
                  23-05-2024
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelected(3);
                }}
                style={[
                  styles.modalbtn,
                  {
                    backgroundColor:
                      selected === 3 ? COLORS.primary : COLORS.white,
                  },
                ]}>
                <Text
                  style={[
                    styles.modalbtntext,
                    {color: selected === 3 ? COLORS.white : COLORS.textcolor},
                  ]}>
                  10:00 AM-12:00 PM
                </Text>
                <Text
                  style={[
                    styles.modalbtntext2,
                    {color: selected === 3 ? COLORS.white : COLORS.gray},
                  ]}>
                  23-05-2024
                </Text>
              </TouchableOpacity>

              {selected !== '' && (
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setSelected('');
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
    fontSize: RFValue(12),
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
  },
  modalbtntext2: {
    fontSize: RFValue(11),
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
  },
});
