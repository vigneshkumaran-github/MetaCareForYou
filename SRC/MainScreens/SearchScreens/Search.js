import { ActivityIndicator, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { BASE_URL, IMAGE_BASE_URL } from '../../ApiService/Config';
import { COLORS, FONTFAMILY } from '../../Constants/DesignConstants'
import React, { useEffect, useState } from 'react'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import CustomNavbar from '../../CustomComponents/CustomNavbar';
import Icon from "react-native-vector-icons/Octicons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { getInitials } from '../../HelperFunctions/Helper';
import { useNavigation } from '@react-navigation/native';

const Search = () => {
  const [searchKey, setSearchKey] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);


  const [Loading, setIsloading] = useState(true)
  const navigates = useNavigation();


  //To COLLECT All DAta
  useEffect(() => {

    async function fetchMyAPI() {
      let url = BASE_URL + 'auth/get_therapists';
      try {
        await axios
          .get(url)
          .then(function (response) {

            setFilteredDataSource(response.data.data)
            setMasterDataSource(response.data.data)
            setIsloading(false)
          })
          .catch(function (error) {

          })
          .finally(function () {

          });
      }
      catch (error) {

      }

      setIsloading(false)
    }

    fetchMyAPI()


  }, []);


  const clickOnpress = (items) => {
    navigation.navigate('AppointmentScreen', { therapistsDetails: items });
  };

  const filterList = (list) => {
    return list.filter((listItem) =>
      listItem.therapistName
        .toLowerCase()
        .includes(allData.toLowerCase()) ||
      listItem.therapistDisgnation.toLowerCase().includes(allData.toLowerCase()),
    );
  }


  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(
        function (item) {

          var special = item.Specialists ? item.Specialists.map(x => x.specialist_title).join(", ") : "";

          const itemData = item.first_name
            ? item.first_name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();

          const itemDatalast = item.last_name
            ? item.last_name.toUpperCase()
            : ''.toUpperCase();
          const textDatalast = text.toUpperCase();

          const itemData1 = special
            ? special.toUpperCase()
            : ''.toUpperCase();

          const textData1 = text.toUpperCase();

          const itemData2 = item.experience
            ? item.experience.toUpperCase()
            : ''.toUpperCase();
          const textData2 = text.toUpperCase();

          return itemDatalast.indexOf(textDatalast) > -1 || itemData.indexOf(textData) > -1 || itemData1.indexOf(textData1) > -1 || itemData2.indexOf(textData2) > -1;
        });
      setFilteredDataSource(newData);
      setSearchKey(text);

    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearchKey(text);
    }
  };
  return (
    <>
      <SafeAreaView
        style={[styles.container]}>
        <StatusBar barStyle="dark-light" backgroundColor={COLORS.primary} />
        <CustomNavbar title="Find For More" onPress={() => navigates.goBack()} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            style={{ flex: 1 }}
            behavior="padding"
          >
            {/* Search lay*/}
            <View style={[styles.SearchLayout]}>
              <View style={[styles.subLayout]}>
                <TextInput
                  style={[styles.textBox]}
                  value={searchKey}
                  placeholderTextColor={COLORS.textcolor}
                  keyboardType='default'
                  placeholder={'Search for Therapist,Spacialist,Experience...'}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => searchFilterFunction(text)}
                  // onClear={(text) => searchFilterFunction('')}
                  returnKeyType="done"
                />
                <TouchableOpacity style={[styles.TouchSearch]} >
                  <Icon name="search" size={14} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            </View>
            {/* Search lay */}


            {Loading ? <ActivityIndicator style={{ marginTop: 20, marginBottom: 20 }} size="large" color={COLORS.primary} /> :
              <View style={{ width: wp('90%') }}>
                {filteredDataSource.length ? filteredDataSource.map((listItem, index) => (
                  <View key={index} style={[styles.card]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={[styles.imageCard]}>
                          {listItem.profile ? <Image source={{ uri: IMAGE_BASE_URL + listItem.profile }} style={[styles.Image]} /> :
                            <View style={[styles.cardInneremp]}>
                              <Text style={[styles.emptyText]}>{listItem.first_name ? getInitials(listItem.first_name) : null}</Text>
                            </View>}
                        </TouchableOpacity>
                        <View style={{ marginLeft: 10, marginTop: 3 }}>
                          <Text style={[styles.Name]}>{listItem.first_name + " " + listItem.last_name}</Text>
                          <Text style={[styles.Designation]}>{listItem.Specialists ? listItem.Specialists.map(x => x.specialist_title).join(", ") : "No data Found"}</Text>
                          <View style={{ flexDirection: 'row' }}>
                            <Icon name="history" size={13} color={'blue'} style={{ marginTop: 8, marginRight: 5 }} />
                            <Text style={[styles.Location]}>{listItem.experience && listItem.experience != "0" ? listItem.experience + " Years Experienced" : "Non Experienced"} </Text>
                          </View>
                        </View>
                      </View>
                      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => { clickOnpress(listItem) }} style={{ backgroundColor: COLORS.primary, padding: 10, borderRadius: 10 }}>
                          <Icon name="plus" size={18} color={COLORS.white} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )) : <View style={{ alignItems: 'center' }}><Text style={[styles.Designation]}>Your Search "{searchKey}" didn't match any results...</Text></View>}
              </View>}
          </KeyboardAwareScrollView>

        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default Search

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    flex: 1
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
    alignItems: 'center'
  },
  textBox:
  {
    borderRadius: 25,
    width: wp('72%'),
    height: 45,
    color: COLORS.black,
    fontSize: 14,
    marginTop: 0,
    marginLeft: 10,
    backgroundColor: '#D9D9D9',
  },
  TouchSearch:
  {
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
    width: wp("87%"),
    marginTop: 2,
    marginLeft: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 2.5,
  },
  imageCard: {
    width: 70,
    height: 70,
    borderColor: COLORS.primary,
    borderWidth: 1.5,
    borderRadius: 70 / 2,
    alignItems: "center",
    justifyContent: "center",

  },
  Image: {
    width: 65,
    height: 65,
    borderWidth: 2,
    borderRadius: 65 / 2,
    resizeMode: "contain",
  },
  Name: {
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 22,
    color: COLORS.secondary,
  },
  Designation: {
    marginTop: 3,
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: 11,
    fontWeight: "bold",
    lineHeight: 22,
    color: COLORS.black,
    width: wp(50)
  },
  Location: {
    marginTop: 3,
    fontFamily: FONTFAMILY.poppinsbold,
    fontSize: 12,
    fontWeight: "bold",
    lineHeight: 22,
    color: COLORS.textColor,
  },
  cardInneremp: {
    backgroundColor: COLORS.white,
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: "center",
    justifyContent: "center",

  },
  emptyText:
  {
    color: COLORS.secondary,
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 28
  }

});
