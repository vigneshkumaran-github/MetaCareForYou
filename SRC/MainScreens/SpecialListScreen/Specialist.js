import {
    ActivityIndicator,
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
import { BASE_URL, IMAGE_BASE_URL } from "../../ApiService/Config";
import { COLORS, FONTS } from "../../Constants/DesignConstants";
import React, { useEffect, useState } from "react";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import CustomNavbar from "../../CustomComponents/CustomNavbar";
import Lists from './Component/Lists';
import Lottie from "lottie-react-native";
import axios from 'axios';
import { getInitials } from "../../HelperFunctions/Helper";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");


const Specialist = ({ route }) => {
    const [Loading, setIsloading] = useState(true)
    const [TherapistList, setTherapist] = useState([])

    const navigation = useNavigation();


    function handleBackButtonClick() {
        navigation.navigate('HomeScreen');
    }

    const DoctorProfile = (items) => {

        navigation.replace('DoctorProfile', { item: items });
        // Toast.show("Under Construction...", Toast.LONG);
    };

    const FindDocters = (items) => {

        navigation.replace('AppointmentScreen', { therapistsDetails: items });
        // Toast.show("Under Construction...", Toast.LONG);
    };


    //To COLLECT All DAta
    useEffect(() => {

        async function fetchMyAPI() {
            setIsloading(true)
            let url = BASE_URL + 'auth/special_therapist';
            try {
                let dataPayload = {
                    specialist_id: route.params.CategoryId
                }
                await axios
                    .post(url, dataPayload)
                    .then(function (response) {
                        setIsloading(false)
                        setTherapist(response.data.data)
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



    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    width: 6,
                }}
            ></View>
        );
    };



    const RenderSpalist = () => (
        <View style={[styles.Main2]}>

            <FlatList
                scrollEnabled={true}
                data={TherapistList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return RenderSpalistItem({ item, index });
                }}
                ItemSeparatorComponent={ItemSeparatorView}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                }}
            />
        </View>
    );

    const RenderSpalistItem = ({ item, index }) => (
        <View style={[styles.card, styles.elevation]}>
            <View style={[styles.cardInner1]}>
                <View>
                    <TouchableOpacity style={[styles.backroundLay]} onPress={() => DoctorProfile(item.Therapist)}>
                        {item.Therapist.profile ? <Image source={{ uri: IMAGE_BASE_URL + item.Therapist.profile }} style={[styles.cardImage]} /> :
                            <View style={[styles.cardInneremp]}>
                                <Text style={[styles.emptyText]}>{item.Therapist.first_name ? getInitials(item.Therapist.first_name) : null}</Text>
                            </View>}
                    </TouchableOpacity>
                </View>

                {/* Consult Button Layout Start*/}
                <View>
                    <Text style={[styles.cardTitle]}>{item.Therapist.first_name ? item.Therapist.first_name + " " + item.Therapist.last_name : null}</Text>
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.secondary,
                        borderColor: COLORS.secondary,
                        borderWidth: 0.5,
                        borderRadius: 8,
                        padding: 6,
                        margin: 10,
                    }}
                    onPress={() => FindDocters(item.Therapist)}
                >
                    <Text
                        style={{
                            fontSize: 10,
                            color: COLORS.white,
                            marginLeft: 10,
                            marginRight: 10,
                            width: 35,
                        }}
                    >
                        Consult
                    </Text>
                </TouchableOpacity>

            </View>
            {/* Consult Button Layout End*/}
        </View>
    );



    const EmptyData = () => (

        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Lottie
                source={require("../../Resources/JSON/newbook.json")}
                autoPlay
                loop
                style={{ width: 300, height: 320 }}
            />
            <Text style={[styles.cardTitle]}>No Therapist Found!</Text>
        </View>
    );



    return (
        <>
            {Loading ? <ActivityIndicator style={{ flex: 1 }} size={"large"} color={COLORS.primary} /> :
                <SafeAreaView style={[styles.SafeAreaView]}>
                    <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />

                    <CustomNavbar title={route.params.CategoryName} onPress={() => { handleBackButtonClick() }} />

                    {TherapistList.length === 0 ? <EmptyData /> : <RenderSpalist />}

                </SafeAreaView>}
        </>
    );
};

const styles = StyleSheet.create({
    SafeAreaView: {
        flex: 1,
        alignItems: "center",
        backgroundColor: COLORS.white,
    },
    Main2: {
        width: wp("100%"),
        backgroundColor: COLORS.white,
        alignItems: "center",
        padding: 5,
        marginTop: 1,
    },

    mainHeading: {
        ...FONTS.mainHeading,
    },
    card: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.secondary,
        borderWidth: 1,
        borderRadius: 8,
        width: wp("80"),
        // height: hp("20"),
        // alignItems: "center",
        marginTop: 2,
        marginLeft: 5,
        marginBottom: 10,
    },
    elevation: {
        // elevation: 3,
        // shadowColor: COLORS.shadowcolor,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },

    cardInner1: {

        flexDirection: 'row',
        padding: 10,
        alignItems: "center",
        justifyContent: 'space-around',

    },
    cardImage: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        resizeMode: "contain",
    },
    cardTitle: {
        ...FONTS.cardTitle,
    },
    cardDescription: {
        ...FONTS.cardDescription,
    },
    cancelButton: {
        position: "absolute",
        right: -6,
        top: -6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    backroundLay: {
        width: 60,
        height: 60,
        borderColor: COLORS.secondary,
        borderWidth: 2.5,
        borderRadius: 60 / 2,
        alignItems: "center",
        justifyContent: "center",

    },
    cardInneremp: {
        width: 60,
        height: 60,
        borderColor: COLORS.secondary,
        borderWidth: 2.5,
        borderRadius: 60 / 2,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyText:
    {
        color: COLORS.secondary,
        fontSize: 22,
        lineHeight: 28

    }

});
export default Specialist
