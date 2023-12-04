import { COLORS, FONTFAMILY, FONTS } from '../../Constants/DesignConstants';
import {
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

import CustomNavbar from "../../CustomComponents/CustomNavbar";
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react'
import { SubscriptionCard } from "./Components";
import { useNavigation } from '@react-navigation/native';

const Subscription = () => {
  const navigation = useNavigation()
    return (
        <SafeAreaView style={[styles.SafeAreaView]}>
          <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
          <ScrollView showsVerticalScrollIndicator={false}>
            
              <CustomNavbar title="Meta Packs"  onPress={() => navigation.goBack()} />
    
              
              <View style={styles.container}>
                    <View style={styles.HeaderContent}>
                        <Text style={styles.HeaderText}>To unlock better Experience</Text>
                        <View style={styles.Subarea}>
                        <Text style={styles.subscribeText}>Subscribe</Text>
                        <Icon name="crown" size={18} color={"gold"} />
                        </View>
                        <Text style={styles.HeaderText}>Meta Pack!</Text>
                    </View>
    
                 
             
             <SubscriptionCard />
    
    
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
    container:{
     alignItems: "center",
        justifyContent: "center",
        
    },
    HeaderContent:{
       alignItems: "center",
        justifyContent: "center",
        margin:10,
        paddingBottom:10
    },
    HeaderText:{
      margin:10,
       fontSize: 18,
        color: COLORS.textColor,
        fontWeight:'bold',
        
    },
    subscribeText:{
         fontSize: 20,
        color: COLORS.primary,
        fontWeight:'bold',
        marginRight:5
    },
    Subarea:{
      flexDirection:'row'
    },
     
    });

export default Subscription
