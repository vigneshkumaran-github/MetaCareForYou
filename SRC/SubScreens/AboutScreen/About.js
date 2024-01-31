
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
import { RFValue } from 'react-native-responsive-fontsize';

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
                     <Text style={[styles.subTexts]}>Metacare4u welcomes you to a revolutionary healthcare experience with our free booking system. Simplifying the appointment process, our intuitive platform allows users to effortlessly schedule appointments at no cost. Select your desired service, choose a convenient date and time, and enjoy the ease of our seamless booking system.</Text>
                     <Text style={styles.subTexts}>We believe in providing accessibility to quality healthcare, and our free booking system is a testament to our commitment to ensuring a hassle-free and inclusive experience for all users. Your well-being starts with a simple and cost-free booking process at Metacare4u.More updates are coming soon such as Enhanced Communication, CareAi Mental Health Companion, Sharemind Platform , Sharable EHR and Medicine Delivery.</Text>
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
        fontSize: RFValue(13),
        lineHeight: 24,
        color: COLORS.black,
        textAlign:'center'
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
