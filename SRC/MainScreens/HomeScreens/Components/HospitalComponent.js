import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTS } from '../../../Constants/DesignConstants'
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import { RFValue } from 'react-native-responsive-fontsize'
import ResponsiveImage from 'react-native-responsive-image'
import { useNavigation } from '@react-navigation/native';

const HospitalComponent = () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Text style={[styles.headtext, { marginStart: responsiveWidth(5) }]}>Top Hospitals</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 5 }}>
                {
                    data?.map((item, index) => (
                        <TouchableOpacity onPress={() => { navigation.navigate('ServiceLists') }}
                            key={index} activeOpacity={0.8} style={styles.card}>
                            <ResponsiveImage
                                style={styles.image}
                                source={{ uri: 'https://th.bing.com/th/id/OIP.l572CIPwXvGnMUGbCvhDnQHaE8?rs=1&pid=ImgDetMain' }} />

                            <View style={styles.bottomview}>
                                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.text1}>Multicare Hospital</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.text2}>Gandhipuram,Coimbatore </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default HospitalComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingVertical: 10
    },
    card: {
        backgroundColor: COLORS.white,
        width: responsiveWidth(48),
        height: responsiveHeight(19),
        alignSelf: 'center',
        elevation: 5,
        marginVertical: responsiveHeight(1),
        borderRadius: 10,
        borderColor: COLORS.primary,
        marginHorizontal: responsiveWidth(2),
        overflow: 'hidden'
    },
    headtext: {
        fontSize: RFValue(15),
        fontFamily: FONTFAMILY.HelveticaNeuMedium,
        color: COLORS.black,
    },
    image: {
        width: responsiveWidth(48),
        height: responsiveHeight(10)
    },
    bottomview: {
        paddingHorizontal: 10,
        justifyContent: 'space-evenly',
        height: responsiveHeight(9),
    },
    text1: {
        color: COLORS.black,
        fontSize: RFValue(14),
        fontFamily: FONTFAMILY.HelveticaNeuMedium,
        textAlign: 'center'
    },
    text2: {
        color: COLORS.gray,
        fontSize: RFValue(12),
        fontFamily: FONTFAMILY.HelveticaNeuMedium,
        width: responsiveWidth(43),
        alignSelf: 'center'
    }
})