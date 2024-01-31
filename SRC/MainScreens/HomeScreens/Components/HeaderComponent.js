import {COLORS, FONTFAMILY} from '../../../Constants/DesignConstants';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../Context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import {getInitials} from '../../../HelperFunctions/Helper';
import {getUserLocationInfo} from '../../../ApiService/API/LocationApi';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';

// import Toast from "react-native-simple-toast";

// import { getUserInfoRemote, getUserLocationInfo } from "../../../Remote/UserRemote";

const notification = <Icon name="bell-badge" size={25} color="#fff" />;
const search = <Icon1 name="search" size={23} color="#fff" />;

const HeaderComponent = ({data}) => {
  const {Logout, GetUserInfo,locationData} = useContext(AuthContext);
  const totalnotification = 0;
  const navigation = useNavigation();
  const [userInfoData, setUserInfoData] = useState({});
  const [Locality, setLocality] = useState();
  const [city, setCity] = useState();
  const [mainTitle, setMainTitle] = useState('Get Care');
  const searchScreen = () => {
    navigation.navigate('Search');
  };

  useEffect(() => {
    getLocation();
  }, [locationData]);

  const getLocation = async () => {
    //   //To get location details
    const location = await getUserLocationInfo(locationData);
    console.log(location);
    if (location) {
      setLocality(location.locality);
      setCity(location.city);
    }
  };

  const profileScreen = () => {
    // Logout()
    navigation.openDrawer();
    // navigation.navigate("ProfileScreen");
    // navigation.replace("SubscriptionScreen");
  };

  const notificationScreen = () => {
    navigation.navigate('NotificationScreen');
  };
  const RequestCall = async () => {
    Toast.show('Under Construction...', Toast.LONG);
  };

  const RenderHeader = () => (
    <View style={[styles.card, styles.elevation]}>
      {/* Profile And Notification Flex Bar View Start*/}
      <View style={[styles.ProfileLayout]}>
        <TouchableOpacity
          onPress={() => profileScreen()}
          style={[styles.ProfileTouch]}>
          {data?.profile_photo ? (
            <Image
              style={[styles.ProfileImage]}
              source={{uri: data?.profile_photo}}
            />
          ) : (
            <View style={[styles.cardInner1]}>
              <Text style={[styles.emptyText]}>
                {data?.name ? getInitials(data.name) : null}
              </Text>
            </View>
          )}

          <View style={{flex: 1}}>
            <Text style={[styles.ProfileName]}>{data?.name}</Text>
            <Text style={[styles.ProfileStatic]}>
              {Locality != undefined
                ? Locality + ' ,' + city
                : 'Fetching Location...'}
            </Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => notificationScreen()}
          style={[styles.NotificationTouch]}
        >
          {notification}
          <View style={styles.tabBadge}>
            <Text style={styles.tabBadgeText}>
              {totalnotification > 99 ? 99 + "+" : totalnotification}
            </Text>
          </View>
        </TouchableOpacity> */}
      </View>
      {/* Profile And Notification Flex Bar View End */}

      {/* Search Bar View Start*/}
      <View style={[styles.SearchLayout]}>
        <TouchableOpacity
          onPress={() => searchScreen()}
          style={[styles.SearchTouch]}>
          <View style={[styles.SearchTextLayout]}>
            <Text style={[styles.SearchText]}>Search Hospitals & Explore More...</Text>
          </View>
          <View style={[styles.SearchIconLayout]}>
            {
              search /* <Image
              style={[styles.SearchIcon]}
              source={require("../../.././Assets/images/Vector.png")}
            ></Image> */
            }
          </View>
        </TouchableOpacity>
      </View>
      {/* Search Bar View End */}
    </View>
  );

  return <RenderHeader />;
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primary,
    width: wp('100'),
    height: hp('20'),
    marginBottom: 5,
    padding: 3,
    borderBottomLeftRadius: 70,
  },
  elevation: {
    elevation: 20,
    shadowColor: COLORS.shadowcolor,
  },
  ProfileLayout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 9,
  },
  ProfileTouch: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
  },
  ProfileImage: {
    width: responsiveWidth(13),
    height: responsiveWidth(13),
    borderRadius: responsiveWidth(13) / 2,
    resizeMode: 'contain',
    marginRight: 10,
    borderWidth:0.5,
    borderColor:'white'
  },
  ProfileName: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: FONTFAMILY.poppinssemibold,
  },
  ProfileStatic: {
    color: COLORS.white,
    fontSize: 12,
    marginLeft: 3,
    marginTop: 3,
  },
  NotificationTouch: {
    marginTop: 10,
    marginRight: 10,
  },

  NotificationIcon: {
    width: 40,
  },
  SearchLayout: {
    width: wp('85%'),
    height: 40,
    borderRadius: 15,
    backgroundColor: 'white',
    marginLeft: 25,
    marginBottom: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#52006A',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 20,
  },

  SearchTouch: {
    width: wp('90%'),
    height: 50,
    backgroundColor: COLORS.white,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
  SearchTextLayout: {
    width: wp('70%'),
  },
  SearchText: {
    color: '#8D8D8D',
    fontFamily: FONTFAMILY.poppinssemibold,
    fontSize: 12,
    marginLeft: 15,
  },
  SearchIcon: {
    width: 20,
    height: 17,
    resizeMode: 'contain',
  },
  SearchIconLayout: {
    width: 40,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    marginLeft: 20,
  },
  tabBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'red',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
  },
  tabBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  cardInner1: {
    backgroundColor: COLORS.white,
    width: 44,
    height: 44,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 5,
  },
  emptyText: {
    color: COLORS.secondary,
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 28,
  },
});

export default HeaderComponent;
