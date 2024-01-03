import { COLORS, FONTFAMILY } from '../../Constants/DesignConstants'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import { BASE_URL } from '../../ApiService/Config';
import CustomNavbar from '../../CustomComponents/CustomNavbar'
import { RFValue } from 'react-native-responsive-fontsize';
import ResponsiveImage from 'react-native-responsive-image';
import { ScrollView } from 'react-native-gesture-handler';
import  axios  from 'axios';
import { useNavigation } from '@react-navigation/native';

const DoctorList = () => {
    const navigation = useNavigation()
    const [Loading, setIsloading] = useState(true)
    const [TherapistList, setTherapist] = useState([])
    const data = ['Cristiano Ronaldo', 'Lionel Messi', 'Cristiano Ronaldo', 'Lionel Messi', 'Cristiano Ronaldo', 'Lionel Messi', 'Cristiano Ronaldo', 'Lionel Messi', 'Cristiano Ronaldo', 'Lionel Messi', 'Cristiano Ronaldo', 'Lionel Messi',]

       //To COLLECT All DAta
       useEffect(() => {

        async function fetchMyAPI() {
            setIsloading(true)
            let url = BASE_URL + 'auth/special_therapist';
            try {
                let dataPayload = {
                    specialist_id: 40                                                                 
                }
                await axios
                    .post(url, dataPayload)
                    .then(function (response) {
                        setIsloading(false)
                        setTherapist(response.data.data)
                        console.log(response.data,'responseee')
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

    
    return (
        <View style={styles.container}>
            <CustomNavbar title="Our Doctors" onPress={() => navigation.goBack()} />

            <ScrollView>
                {
                    data?.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.card}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <ResponsiveImage
                                    source={require('../../Resources/Images/onboarding2.png')}
                                    style={styles.image}
                                    borderRadius={5}
                                    resizeMode={'contain'}
                                />

                                <View style={{ justifyContent: 'space-evenly', marginStart: responsiveWidth(2) }}>
                                    <Text style={styles.text1}>{item}</Text>
                                    <Text style={styles.text1}>Child Specialist(exp 2yrs)</Text>
                                </View>
                            </View>

                            <Text numberOfLines={3} ellipsizeMode='tail' style={[styles.text2,{marginTop:responsiveHeight(0.5)}]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque feugiat varius ante et elementum. Suspendisse fermentum placerat </Text>

                            <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate('AppointmentScreen')}}>
                                <Text style={styles.btntext}>View Details</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default DoctorList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    card: {
        width: responsiveWidth(90),
        height: responsiveHeight(25),
        alignSelf: 'center',
        elevation: 5,
        marginVertical: responsiveHeight(0.5),
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 10
    },
    image: {
        width: responsiveWidth(30),
        height: responsiveHeight(8),
    },
    text1: {
        color: COLORS.black,
        fontSize: RFValue(14),
        fontFamily: FONTFAMILY.HelveticaNeuMedium,
    },
    text2: {
        color: COLORS.gray,
        fontSize: RFValue(12),
        fontFamily: FONTFAMILY.HelveticaNeuMedium,
    },
    btn: {
        width: responsiveWidth(85),
        height: responsiveHeight(5),
        alignSelf: 'center',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        marginTop:responsiveHeight(1.5)
    },
    btntext: {
        color: COLORS.white,
        fontSize: RFValue(14),
        fontFamily: FONTFAMILY.HelveticaNeuMedium,
    },
})