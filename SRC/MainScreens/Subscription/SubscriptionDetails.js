import {
    ActivityIndicator,
    Alert,
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
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {
    AppointmentMode,
    SessionsComponent,
    SlatsComponent,
} from "./Components/";
import { COLORS, FONTFAMILY } from "../../Constants/DesignConstants";
import React, { useContext, useEffect, useState } from "react";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from "../../ApiService/Config";
import CustomButton from "../../CustomComponents/CustomButton";
import CustomNavbar from "../../CustomComponents/CustomNavbar";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Loader from "../../CustomComponents/Loader";
import Lottie from "lottie-react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const data = [
    {
        subscriptionId: "userID12345667",
        subscriptionDate: "22 Jan 2023, 10.43 am",
        subscriptionExpiredDate: "22 Feb 2023, 10.43 am",
    },
];
const SubscriptionDetails = ({ route }) => {
    const navigation = useNavigation()
    const {GetUserInfo} = useContext(AuthContext)
    const packdetails = route.params.details;
    const [rate, setRate] = useState(packdetails.pack_rate);
    const [isLoading, setisLoading] = useState(false)
    const [coupen, setCoupenCode] = useState("")
    const [ApplyStatus, setApplyStatus] = useState(false)
    const Navigation = useNavigation();

    const handleBackButtonClick = () => {
        navigation.goBack()
    };

    const clickOnpress = () => {
        navigation.navigate("PaymentSuccess");
    };
    const [name, setName] = useState("");
    const stripe = useStripe();



    //After Payment Success 
    const AfterSuccessPayment = async (userID, paymentId) => {
        setisLoading(true)
        const data = {
            packId: packdetails.id,
            userId: userID,
            payableAmount: rate,
            paymentId: paymentId,
            chat_count: packdetails.chat,
            voice_count: packdetails.voice_call,
            video_count: packdetails.video_call,
            duration: packdetails.duration,
        };


        let url = Config.APIURL + 'after_store';
        try {
            await axios
                .post(url, data)
                .then(function (response) {

                    console.log(response.data.data)
                    // setSpecialistData(response.data.data)
                    navigation.navigate("PaymentSuccess", { packInfo: response.data.data });
                })
                .catch(function (error) {
                    // handle error
                    console.log(error)
                    navigation.navigate("PaymentSuccess");
                })
                .finally(function () {

                    navigation.navigate("PaymentSuccess", { packInfo: response.data.data });
                });
        }
        catch (error) {


        }


    };

    const AfterFailedPayment = async () => {

        navigation.navigate("PaymentFailed");




    };



    const subscribe = async () => {

        try {

            const userInfo = await GetUserInfo();

            if (!rate) {
                AfterSuccessPayment(userInfo.data?.id, "FreeRegister");
            }
            else {
                setisLoading(true)
                // sending request
                const response = await fetch("https://api.metacare4u.online/" + "pay", {
                    method: "POST",
                    body: JSON.stringify({ packId: packdetails.id, userId: userInfo.data.id, name: userInfo.data.first_name, payableAmount: rate, packname: packdetails.pack_name }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                setisLoading(false)

                const data = await response.json();

                console.log(data)

                if (!response.ok) return Alert.alert(data.message);
                const clientSecret = data.clientSecret;

                const initSheet = await stripe.initPaymentSheet({
                    paymentIntentClientSecret: clientSecret,
                    merchantDisplayName: 'Merchant Name',
                });

                if (initSheet.error) return Alert.alert(initSheet.error.message);
                const presentSheet = await stripe.presentPaymentSheet({
                    clientSecret,
                });
                if (presentSheet.error) {
                    // return Alert.alert(presentSheet.error.message)
                    AfterFailedPayment();
                }
                else {
                    console.log(presentSheet)
                    AfterSuccessPayment(userInfo.id, data.paymentId);
                }
                // Alert.alert("Payment complete, thank you!");

                //To store Pack details 

            }
        } catch (err) {
            console.error(err);
            Alert.alert("Something went wrong, try again later!");
        }


    };

    //Apply Coupen Code 
    const applyCoupen = async () => {

        if (coupen === "") {
            Alert.alert("Error", "Coupen Code Required");
        }
        else {
            let url = Config.APIURL + 'check_coupen';

            try {
                let payload = {
                    coupen_code: coupen
                }
                await axios
                    .post(url, payload)
                    .then(function (response) {
                        console.log(response.data.data)
                        // setSpecialistData(response.data.data)
                        if (response.data.data.length === 0) {
                            Alert.alert("Error", "Invalide Coupen Code");

                        }
                        else {
                            discoutPercentage(response.data.data[0].discount_percentage)
                            setApplyStatus(true)
                            Alert.alert("Success", "Coupon Code Applied");
                        }
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error)

                    })
                    .finally(function () {


                    });
            }
            catch (error) {


            }
        }

    }

    const discoutPercentage = async (percentage) => {

        let discount = percentage / 100;

        let total = rate - (rate * discount);
        setRate(Math.round(total));

    }

    const cancelCoupen = async () => {
        setRate(packdetails.pack_rate)
        setApplyStatus(false)
    }


    return (
        <>
            {isLoading ? <Loader /> :


                <SafeAreaView style={[styles.SafeAreaView]}>

                    <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
                    {/*Animated header */}
                    <ScrollView>
                        <CustomNavbar
                            title="Pack Details"
                            onPress={() => {
                                handleBackButtonClick();
                            }}
                        />




                        <StripeProvider publishableKey="pk_live_51MSxU3HhxC4ABZtcMwwisjFkf04TIRArP9bOEMZ6pIBdLnnA8rzxUJ2OLM93A9Jn1ulfTOMUk9RtU1U3oPllzYqc003Ds4eQE3">
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <View
                                    style={{
                                        width: wp("90%"),
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text style={[styles.Textheads]}> {packdetails.pack_name}</Text>
                                    <Text style={[styles.textMinimum]}>
                                        This pack details are given below
                                    </Text>
                                </View>


                                <Text style={[styles.textsmall]}>
                                    Details
                                </Text>
                            </View>

                            <View style={{ width: wp("100%") }}>
                                <View style={[styles.section]}>
                                    <Text style={[styles.LeftText]}>Packs Include</Text>
                                    <Text style={[styles.RightText]}>
                                        Daily Support Therapy + {packdetails.chat != 0 ? packdetails.chat + " Live Messages," : null}   {packdetails.voice_call != 0 ? packdetails.voice_call + " Voice Calls, " : null} {packdetails.video_call != 0 ? packdetails.video_call + " Video Calls, " : null}
                                    </Text>
                                </View>
                                <View style={[styles.line]}>
                                    <View style={[styles.lineBreack]} />
                                </View>

                                <View style={[styles.section]}>
                                    <Text style={[styles.LeftText]}>Packs Durations</Text>
                                    <Text style={[styles.RightText]}>
                                        {packdetails.pack_validity} mins (Each)
                                    </Text>
                                </View>
                                <View style={[styles.line]}>
                                    <View style={[styles.lineBreack]} />
                                </View>
                                <View style={[styles.section]}>
                                    <Text style={[styles.LeftText]}>Packs Rate</Text>
                                    <Text style={[styles.RightText]}>
                                        ${packdetails.pack_rate} USD /-
                                    </Text>
                                </View>
                                <View style={[styles.line]}>
                                    <View style={[styles.lineBreack]} />
                                </View>
                            </View>

                            <View style={{ width: wp("100%"), alignItems: 'center' }}>
                                <Text style={[styles.textMinimum]}>
                                    If you have Any Copen Code just Paste below!
                                </Text>
                            </View>

                            <View style={{ width: wp("100%"), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>

                                <TextInput
                                    keyboardType="default"
                                    style={{
                                        width: wp(60),
                                        borderWidth: 1,

                                        borderColor: "gray",
                                        marginBottom: 20,
                                        marginTop: 20,
                                    }}
                                    name="email"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    placeholder="Copen Code"
                                    value={coupen}
                                    onChangeText={(text) => setCoupenCode(text)}
                                ></TextInput>

                                {!ApplyStatus ? <TouchableOpacity onPress={() => applyCoupen()} style={{ backgroundColor: COLORS.secondary, padding: 10, paddingLeft: 15, paddingRight: 15, borderRadius: 10, }}>
                                    <Text style={[styles.coupenText]}>Apply</Text>
                                </TouchableOpacity> : null}
                                <TouchableOpacity onPress={() => cancelCoupen()} style={{ backgroundColor: "red", padding: 10, paddingLeft: 15, paddingRight: 15, borderRadius: 10, }}>
                                    <Text style={[styles.coupenText]}>X</Text>
                                </TouchableOpacity>


                            </View>


                            <View style={{ margin: 5, alignItems: "center", paddingBottom: 10 }}>
                                <CustomButton
                                    backgroundColor={COLORS.primary}
                                    title={"Pay $" + rate + " USD/-"}
                                    titleColor={COLORS.white}
                                    size="60"
                                    onPress={subscribe}
                                />
                            </View>
                        </StripeProvider>
                    </ScrollView>
                </SafeAreaView>}
        </>
    );
};

const styles = StyleSheet.create({
    SafeAreaView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.white,
    },

    Textheads: {
        marginTop: 5,
        fontFamily: FONTFAMILY.poppinsbold,
        fontSize: 22,
        fontWeight: "bold",
        lineHeight: 36,
        color: COLORS.secondary,
    },
    textMinimum: {
        marginTop: 10,
        marginBottom: 10,
        fontFamily: FONTFAMILY.poppinsregular,
        fontSize: 12,
        lineHeight: 24,
        color: COLORS.black,
    },
    textsmall: {
        marginTop: 10,
        marginBottom: 10,
        fontFamily: FONTFAMILY.poppinsbold,
        fontSize: 13,
        lineHeight: 26,
        color: COLORS.secondary,
    },
    LeftText: {
        marginTop: 10,
        fontFamily: FONTFAMILY.poppinsregular,
        fontSize: 12,
        lineHeight: 28,
        color: COLORS.black,
    },
    RightText: {
        width: wp('45%'),
        marginTop: 10,
        fontFamily: FONTFAMILY.poppinsbold,
        fontSize: 10.5,
        lineHeight: 24,
        color: COLORS.textcolor,
    },

    coupenText: {
        fontFamily: FONTFAMILY.poppinsbold,
        fontSize: 10.5,
        lineHeight: 24,
        color: COLORS.white,
    },
    section: {

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    line: {
        flexDirection: "row",
        alignItems: "center",
        width: wp("90%"),
        margin: 10,
    },
    lineBreack: {
        flex: 1,
        height: 1,
        backgroundColor: "#e7e6e6",
    },
});

export default SubscriptionDetails;
