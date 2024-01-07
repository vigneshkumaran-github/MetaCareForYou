import { COLORS, FONTFAMILY } from '../../Constants/DesignConstants';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  Image,
  ImageBackground,
  Linking,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useContext } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../Context/AuthContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { IMAGE_BASE_URL } from '../../ApiService/Config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getInitials } from '../../HelperFunctions/Helper';
import { useNavigation } from '@react-navigation/native';

const CustomDrawer = props => {
  const {GetUserInfo,Logout} = useContext(AuthContext)
  const navigation=useNavigation();

  const [name,setName]=React.useState();
  const [profile,setProfile]=React.useState();

  React.useEffect(() => {
    
    async function fetchMyAPI() {
      const userIfo = await GetUserInfo(); 
       setName(userIfo.data?.first_name)
       setProfile(userIfo?.data?.profile)
    }

    fetchMyAPI()
  }, [])





  const onShare = async () => {
    try {
      const result = await Share.share({
       title: 'App link',
  message: 'Hi, I just invited you to use the Metacare4U app! Step1: Use my link to download the app Step2: Register using your Email Address to register your Acoount. Step3: Start using  24x7 online  Consulting  & more . 40+ Crore Indians consult with Metacare4u. It`s 100% safe & secure Download the app now.',
  url: "https://play.google.com/store/apps/details?id=com.metacareforyou",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

const remove = async()=> {
    Logout()
}

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: COLORS.primary}}>
        <TouchableOpacity
         onPress={() => navigation.navigate("Profile")}
          style={{padding: 10,flexDirection:'row',margin:10}}>
            <View>
          {/* <Image
            source={require('./../../Assets/images/profile.png')}
            style={{height: 50, width: 50, borderRadius: 25, marginBottom: 10}}
          /> */}
          {profile ? <Image style={[styles.ProfileImage]} source={{uri:IMAGE_BASE_URL+profile.profile}}/>
                : 
                <View style={[styles.cardInner1]}>
    <Text style={[styles.emptyText]}>{name ? getInitials(name):null}</Text>
      </View> }

          </View>
          <View style={{marginLeft:10,marginTop:5}}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 13.5,
              fontFamily:FONTFAMILY.poppinsbold ,
            }}>
            {name ? name:null}
          </Text>
            <Text
              style={{
                color: COLORS.white,
                fontFamily:FONTFAMILY.poppinsmedium,
                fontSize: 12,
              }}>
              View Your Profile & Edit
            </Text>
            </View>
            <View style={{alignItems:'center',marginLeft:30,marginTop:13}}>
            <FontAwesome5 name="angle-right" size={20} color={COLORS.white} />
            </View>
          </TouchableOpacity>


      
        <View style={{width:wp('78%'),backgroundColor: 'white',}}>
          {/* <DrawerItemList {...props} /> */}
          <DrawerItem
          icon={({ color, size }) => (
                <FontAwesome5
                  name="file-medical"
                  color={COLORS.textcolor}
                  size={20}
                />
              )}
              label={() => <Text style={{ color: COLORS.textcolor, fontFamily:FONTFAMILY.poppinsmedium, fontSize: 14,lineHeight:28}}>Appointments</Text>}
             onPress={() => navigation.navigate("Booking")}
            />

            {/* <DrawerItem
             icon={({ color, size }) => (
                <FontAwesome5
                  name="crown"
                  color={COLORS.textcolor}
                  size={18}
                />
              )}
              label={() => <Text style={{ color: COLORS.textcolor, fontFamily:FONTFAMILY.poppinsmedium, fontSize: 14,lineHeight:28}}>Subscription</Text>}
             onPress={() => navigation.navigate("Subscription")}
            /> */}
            <DrawerItem
             icon={({ color, size }) => (
                <FontAwesome5
                  name="headset"
                  color={COLORS.textcolor}
                  size={20}
                />
              )}
              label={() => <Text style={{ color: COLORS.textcolor, fontFamily:FONTFAMILY.poppinsmedium, fontSize: 14,lineHeight:28}}>Help & Support</Text>}
               onPress={() => navigation.navigate("Help")}
            />

            <DrawerItem
             icon={({ color, size }) => (
                <Ionicons
                  name="information-circle-outline"
                  color={COLORS.textcolor}
                  size={22}
                />
              )}
              label={() => <Text style={{ color: COLORS.textcolor, fontFamily:FONTFAMILY.poppinsmedium, fontSize: 14,lineHeight:28}}>About</Text>}
               onPress={() => navigation.navigate("About")}
            />

              <DrawerItem
             icon={({ color, size }) => (
                <MaterialIcons
                  name="privacy-tip"
                  color={COLORS.textcolor}
                  size={22}
                />
              )}
              label={() => <Text style={{ color: COLORS.textcolor, fontFamily:FONTFAMILY.poppinsmedium, fontSize: 14,lineHeight:28}}>Privacy policy</Text>}
             onPress={() => Linking.openURL('https://metacare4u.com/privacy-policy-1')}
            />




               <DrawerItem
             icon={({ color, size }) => (
                <MaterialIcons
                  name="file-present"
                  color={COLORS.textcolor}
                  size={22}
                />
              )}
              label={() => <Text style={{ color: COLORS.textcolor, fontFamily:FONTFAMILY.poppinsmedium, fontSize: 14,lineHeight:28}}>Terms of Service</Text>}
               onPress={() => Linking.openURL('https://metacare4u.com/terms-%26-conditions')}
            />
              <DrawerItem
             icon={({ color, size }) => (
                <Ionicons
                  name="share-social-outline"
                  color={COLORS.textcolor}
                  size={22}
                />
              )}
              label={() => <Text style={{ color: COLORS.textcolor, fontFamily:FONTFAMILY.poppinsmedium, fontSize: 14,lineHeight:28}}>Tell a Friend</Text>}
             onPress={onShare}
            />


        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        {/* <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Share App
            </Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => remove()} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center',justifyContent:'center',backgroundColor:COLORS.primary,padding:10,borderRadius:25}}>
            <Ionicons name="exit-outline" size={20} color={COLORS.white} />
            <Text
              style={{
                fontSize: 14,
               fontFamily:FONTFAMILY.poppinsmedium,
                marginLeft: 10,
                lineHeight:28,
                color:COLORS.white
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
cardInner1: {
  backgroundColor:COLORS.white,
   width: 44,
  height: 44,
  borderColor:COLORS.black,
  borderWidth: 1,
  borderRadius: 22,
  alignItems: "center",
  justifyContent:"center",
  marginRight: 10,
  marginLeft: 5,
},
emptyText:
{
 color:COLORS.secondary,
 fontWeight:"bold",
 fontSize: 18,
 lineHeight:28

},
ProfileImage: {
 width: 45,
 height: 45,
 borderRadius: 45 / 2,
 resizeMode: "contain",
 marginRight:10
},
});

export default CustomDrawer;