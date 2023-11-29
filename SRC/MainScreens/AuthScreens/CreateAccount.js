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

const CreateAccount = () => {
    const navigation = useNavigation()
    const { a } = useContext(AuthContext)
    console.log(a)
    return (
        <SafeAreaView style={[styles.SafeAreaView]}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
            <View style={{
                width: 140,
                height: 140,
                borderRadius: 140 / 2,
                backgroundColor: COLORS.white,
                alignItems: 'center',
                justifyContent: 'center',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.12,
                shadowRadius: 3.84,
                elevation: 5,
                shadowColor: COLORS.shadowcolor,
            }}>
                <Image
                    source={require("../../Resources/Images/logo.png")}
                    style={{
                        width: 140,
                        height: 140,
                        borderRadius: 140 / 2,

                    }}
                />
            </View>
            <View style={{ alignItems: "center" }} >
                <Text style={[styles.Freetext]}>{"Create your free account now"}</Text>
                <View style={{ alignItems: "center" }}>
                    <CustomButton
                        backgroundColor={COLORS.primary}
                        title="Create an account"
                        titleColor={COLORS.white}
                        size="60"
                        onPress={() => navigation.navigate('RegisterScreen')}
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
        justifyContent: "space-evenly",
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
        color: COLORS.textcolor
    },
});