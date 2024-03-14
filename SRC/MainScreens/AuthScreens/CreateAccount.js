import { COLORS, FONTS } from "../../Constants/DesignConstants";
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
import React, { useContext } from 'react'

import { AuthContext } from "../../Context/AuthContext";
import CustomButton from "../../CustomComponents/CustomButton";
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP } from "react-native-responsive-screen";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const CreateAccount = () => {
    const navigation = useNavigation()
    const { a } = useContext(AuthContext)
    console.log(a)
    return (
        <SafeAreaView style={[styles.SafeAreaView]}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
            <View style={{
                width: responsiveWidth(40),
                height: responsiveWidth(40),
                borderRadius: responsiveWidth(40) / 2,
                alignItems: 'center',
                justifyContent: 'center',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.12,
                shadowRadius: 3.84,
                elevation: 5,
                shadowColor: COLORS.shadowcolor,
                marginBottom:responsiveHeight(1)
            }}>
                <Image
                    source={require("../../Resources/Images/logo.png")}
                    style={{
                        width: responsiveWidth(40),
                        height: responsiveWidth(40),
                    }}
                />
            </View>
            <View style={{ alignItems: "center" }} >
                <Text style={[styles.Freetext]}>{"Create your free account now"}</Text>
                <View style={{ alignItems: "center" ,marginBottom:responsiveHeight(0.5)}}>
                    <CustomButton
                        backgroundColor={COLORS.primary}
                        title="Create an account"
                        titleColor={COLORS.white}
                        size="60"
                        onPress={() => navigation.navigate('Register')}
                    />
                </View>
                <View style={{ alignItems: "center" }}>
                    <CustomButton
                        backgroundColor={COLORS.white}
                        title="Sign in"
                        titleColor={COLORS.primary}
                        size="60"
                        onPress={() => navigation.navigate('Login')}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};


export default CreateAccount

const styles = StyleSheet.create({
    SafeAreaView: {
        width: widthPercentageToDP('100'),
        flex: 1,
        backgroundColor: "#D9D9D9",
        alignItems: "center",
        justifyContent: "center",
    },
    MainContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 10,
    },
    Freetext: {
        fontSize: 17,
        lineHeight: 22,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: COLORS.textcolor,
        marginVertical:responsiveHeight(1)
    },
});