import React, { useEffect, useState } from "react";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
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
import { COLORS } from '../../Constants/DesignConstants';
import { useNavigation } from '@react-navigation/native';
import CustomNavbar from "../../CustomComponents/CustomNavbar";
import { BookingList, EmptyPage } from "./Components";

const Booking = () => {
    const navigation = useNavigation()
    const [st, setSt] = useState(true)

    return (
        <SafeAreaView style={[styles.SafeAreaView]}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
            {/*Animated header */}
            <ScrollView>
                <CustomNavbar title="My Bookings" onPress={() => navigation.goBack()} />
                <View style={{ alignItems: "center", justifyContent: "center", }}>

                    {/*Card View Started*/}

                    {st ? <BookingList /> : <EmptyPage />}
                    {/*Card View Ended*/}


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
    optionSelected: {
        fontSize: 14,
        lineHeight: 22,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: 'white',
        textAlign: 'center',
    },
    optionUnSelected: {
        fontSize: 14,
        lineHeight: 22,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: COLORS.primary,
        textAlign: 'center',
    },
    unselected: {
        width: wp(25),
        backgroundColor: '#FFEDDF',
        margin: 6,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFEDDF',
        marginLeft: 10,
        marginRight: 10
    },
    selected: {
        width: wp(25),
        backgroundColor: COLORS.primary,
        margin: 6,
        padding: 10,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: COLORS.white,
    },
    selectedCompleted: {
        width: wp(25),
        backgroundColor: 'green',
        margin: 6,
        padding: 10,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'green',
    },
    selectedCancel: {
        width: wp(25),
        backgroundColor: 'red',
        margin: 6,
        padding: 10,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'red',
    },


});

export default Booking
