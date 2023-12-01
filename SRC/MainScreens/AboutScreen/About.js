
import React from 'react'
import { useNavigation } from "@react-navigation/native";
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
    View,
  } from "react-native";
import CustomNavbar from '../../CustomComponents/CustomNavbar';
import { COLORS, FONTFAMILY } from '../../Constants/DesignConstants';

const About = () => {
    const navigation = useNavigation();

    const handleBackButtonClick = () => {
      navigation.replace("HomeScreen");
    };
    const clickOnpress = () => {
      navigation.replace("HomeScreen");
    };
    return (
        <SafeAreaView style={[styles.SafeAreaView]}>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
          {/*Animated header */}
          <ScrollView>
            <CustomNavbar
              title="About Metacare4u"
              onPress={() => {
                navigation.goBack()
              }}
            />
            <View style={{margin:10,marginBottom:30}}>
                <View>
                    <Text style={[styles.textsmall]}>Our Story</Text>
                      
                      <Text style={[styles.textMinimum]}>" Happiness is like a plant: It must be watered daily with giving thoughts and actions. "</Text>
                      <View style={{alignItems:'center',marginTop:15}} >
                      <Image source={require('../../Resources/Images/ourstorynew.png')}  style={[styles.images]}/>
                     </View>
                     <Text style={[styles.subTexts]}>Metacare4u is an online platform for mental health care that offers consumers access to online counselling and mental health care services. LA DIGITAL HEALTH SDN BHD, which has its headquarters in Kuala Lumpur, is the company that owns Metacare4u. It was established on July 8, 2022, and over time it developed into a company that was owned by the founder's family. You can send text, audio, picture, and video messages from the comfort of your own device while simultaneously communicating with a licenced therapist through the use of Metacare4u, which is the most convenient and cost-effective way to do so. The range of customers served by Metacare4u now includes higher education institutions in addition to secondary schools. Memberships can be terminated up to 96 hours (or four days) before the next billing date, despite the fact that Metacare4u requires a monthly payment in order to maintain them."</Text>
                    </View>
    
    
    
    
    
                    
    
    
    
                </View>
       
          </ScrollView>
        </SafeAreaView>
      );
    };
    
    const styles = StyleSheet.create({
      SafeAreaView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.white,
      },
    
      subTexts: {
         marginTop: 10,
        marginLeft:10,
        marginBottom: 10,
        fontFamily: FONTFAMILY.poppinsregular,
        fontSize: 13,
        lineHeight: 28,
        color: COLORS.black,
      },
       VisionsubTexts: {
         
        marginLeft:10,
        fontFamily: FONTFAMILY.poppinsregular,
        fontSize: 13,
        lineHeight: 28,
        color: COLORS.black,
      },
      textMinimum: {
        marginLeft:10,
        fontFamily: FONTFAMILY.poppinsregular,
        fontWeight:'bold',
        fontSize: 14,
        lineHeight: 28,
        color: COLORS.black,
      },
      textsmall: {
        marginTop: 10,
        marginLeft:10,
        marginBottom: 5,
        fontFamily: FONTFAMILY.poppinsbold,
        fontSize: 16,
        lineHeight: 22,
        color: COLORS.secondary,
      },
      images:{
        width:200,
        height:200,
        resizeMode:'contain'    
      },
        imagesVision:{
        width:300,
        height:200,
      },
    });

export default About
