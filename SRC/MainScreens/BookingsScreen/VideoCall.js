import {
  BackHandler,
  Button,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React ,{useEffect, useState}from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { COLORS } from "../../Constants/DesignConstants";
import ZegoUIKitPrebuiltVideoConference from '@zegocloud/zego-uikit-prebuilt-video-conference-rn'
import { useNavigation } from "@react-navigation/native";

export default function VideoCall({route}) {
 
const navigation =useNavigation()

const userId=String(Math.floor(Math.random() * 100000));
const confiranceId=String(Math.floor(Math.random() * 10000));

const user_type=route.params.user_type;
const appointment_id=route.params.Details.appointment_id;

const details = user_type==="therapist" ?route.params.Details.therapist:route.params.Details.user;

const callRedirect =()=>{
if(user_type==="therapist"){
  navigation.navigate('TherapistHome')
}
else{
  navigation.navigate('HomeScreen')
}
}

alert(appointment_id,"User Details")

  return (
      <View style={styles.container}>
        <Text>{String(details.id)}</Text>
          <ZegoUIKitPrebuiltVideoConference
              appID={945170719}
              appSign="6179a19997d5e0b3533a637b1cf78ea7633e21ac158ee401bb6bd251b1a4ceb0"
              userID={String(details.id)}
              userName={details.first_name+" "+details.last_name}
              conferenceID={confiranceId}
              config={{
                  onLeave: () => { callRedirect() },
              }}
          />
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
});


