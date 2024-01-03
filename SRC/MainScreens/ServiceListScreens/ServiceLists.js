import { COLORS, FONTFAMILY } from '../../Constants/DesignConstants'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomNavbar from '../../CustomComponents/CustomNavbar'
import { RFValue } from 'react-native-responsive-fontsize';
import React from 'react'
import ResponsiveImage from 'react-native-responsive-image';
import { useNavigation } from '@react-navigation/native';

const ServiceLists = () => {
    const navigation = useNavigation()
    const data = ['Pshycology', 'Cardiology','Pshycology', 'Cardiology','Pshycology', 'Cardiology',]
    return (
        <View style={styles.container}>
            <CustomNavbar title="Multicare Hospitals" onPress={() => navigation.goBack()} />

            <ScrollView style={{ marginTop: responsiveHeight(2) }}>

                <View style={{ marginHorizontal: responsiveWidth(5), width: responsiveWidth(90) }}>

                    <ResponsiveImage
                        source={{ uri: 'https://th.bing.com/th/id/OIP.l572CIPwXvGnMUGbCvhDnQHaE8?rs=1&pid=ImgDetMain' }}
                        style={{
                            width: responsiveWidth(90),
                            height: responsiveHeight(20),
                        }}
                    />

                    <Text style={[styles.headtext, { marginTop: responsiveHeight(2) }]}>About Us </Text>
                    <Text style={[styles.text2, { lineHeight: 20 }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque feugiat varius ante et elementum. Suspendisse fermentum placerat arcu. Praesent quam massa, semper placerat magna eu</Text>

                    <Text style={[styles.headtext, { marginTop: responsiveHeight(1) }]}>Address </Text>
                    <Text style={[styles.text2, { lineHeight: 20 }]}>Lorem ipsum dolor sit amet,</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: responsiveHeight(1) }}>
                        <Text style={[styles.text1, {}]}>Phone : </Text>
                        <Text style={styles.text2}>xxxx</Text>
                        <Text style={styles.text2}>(Subscribe to see the details)</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: responsiveHeight(1) }}>
                        <Text style={[styles.text1, {}]}>Email : </Text>
                        <Text style={styles.text2}>xxxx@gmail.com</Text>
                        <Text style={styles.text2}>(Subscribe to see the details)</Text>
                    </View>
                </View>

                {/* Service section */}
                <Text style={[styles.headtext, { marginTop: responsiveHeight(2), marginStart: responsiveWidth(5) }]}>DepartMents</Text>
                <View style={styles.cardContainer}>
                    {
                        data?.map((item, index) => (
                            <View key={index}>
                                <TouchableOpacity style={styles.card}
                                    onPress={() => { navigation.navigate('DoctorList') }} >
                                    {/* <ResponsiveImage
                                        source={{ uri: 'https://th.bing.com/th/id/OIP.PpzvEJQj-fSERsMEC7nqbQHaG2?rs=1&pid=ImgDetMain' }}
                                        style={styles.image}
                                        resizeMode={'contain'} /> */}

                                    <Text
                                        numberOfLines={2} ellipsizeMode='tail'
                                        style={[styles.text1, { alignSelf: 'center', textAlign: 'center', width: '95%' }]}>{item}</Text>

                                    <Text
                                        numberOfLines={2} ellipsizeMode='tail'
                                        style={[styles.text2, { alignSelf: 'center', textAlign: 'center', width: '95%' }]}>10 therapists available</Text>

                                    <TouchableOpacity style={styles.btn}>
                                        <Text style={styles.btntext}>Explore</Text>
                                    </TouchableOpacity>

                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default ServiceLists

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    card: {
        width: responsiveWidth(40),
        height: responsiveHeight(17),
        backgroundColor: COLORS.white,
        alignSelf: 'center',
        borderRadius: 15,
        marginVertical: responsiveHeight(1),
        elevation: 5,
        justifyContent: 'space-evenly',
    },
    cardContainer: {
        width: responsiveWidth(100),
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
    },
    image: {
        width: responsiveWidth(20),
        height: responsiveHeight(10),
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    btn: {
        width: responsiveWidth(22),
        height: responsiveHeight(5),
        alignSelf: 'center',
        borderRadius: responsiveWidth(7) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
    },
    btntext: {           
        color: COLORS.white,
        fontSize: RFValue(12),
        fontFamily: FONTFAMILY.HelveticaNeuMedium,                         
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
    headtext: {
        color: COLORS.black,
        fontSize: RFValue(16),
        fontFamily: FONTFAMILY.HelveticaNeuBold,
    }
})