import {
    Alert,
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
    View,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import DocumentPicker from 'react-native-document-picker';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import Loader from "../../CustomComponents/Loader";
import CustomNavbar from "../../CustomComponents/CustomNavbar";
import { AuthContext } from "../../Context/AuthContext";
import { getInitials } from "../../HelperFunctions/Helper";
import { BASE_URL, IMAGE_BASE_URL } from "../../ApiService/Config";
import { COLORS, FONTFAMILY, FONTS } from "../../Constants/DesignConstants";


const EditProfile = ({ route }) => {
    const { data } = route?.params
    const navigation = useNavigation()
    const { GetUserInfo } = useContext(AuthContext)
    const [firstName, setFirstName] = useState(data?.first_name);
    const [lastName, setLastName] = useState(data?.last_name);
    const [email, setEmail] = useState(data?.email_id);
    const [mobile, setMobile] = useState(data?.mobile_number);
    const [age, setAge] = useState(data?.age);
    const [gender, setGender] = useState(data?.gender);
    const [nationality, setNationality] = useState(data?.nationality);
    const [healthIsseue, setHealthIsseue] = useState(data?.health_issue);
    const [mentalHealthIsseue, setMentalHealthIsseue] = useState(data?.mental_health_issue_before);
    const [suicide, setSuicide] = useState(data?.thought_of_suicide);
    const [UserInfo, setUserInfoData] = useState(data);
    const [isLoadig, setIsloading] = useState(false)

    const [singleFile, setSingleFile] = useState(null);



    useEffect(() => {

    }, [])




    const selectFile = async () => {
        // Opening Document Picker to select one file
        try {
            const res = await DocumentPicker.pick({
                // Provide which type of file you want user to pick
                type: [DocumentPicker.types.images],
                // There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });
            // Printing the log realted to the file
            console.log('res : ' + JSON.stringify(res));
            // Setting the state to show single file attributes
            setSingleFile(res);
        } catch (err) {
            setSingleFile(null);
            // Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                // If user canceled the document selection
                alert('Canceled');
            } else {
                // For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };


    const updateProfile = async () => {

        // Check if any file is selected or not
        // if (singleFile !== null) {
            setIsloading(true)
            // If file selected then create FormData
            const fileToUpload = singleFile;
            const data = new FormData();
            data.append('user_id', UserInfo.id);
            data.append('first_name', firstName);
            data.append('last_name', lastName);
            data.append('mobile_number', mobile);
            data.append('gender', gender);
            data.append('age', age);
            data.append('nationality', nationality);
            data.append('health_issues', healthIsseue);
            data.append('mental_health', mentalHealthIsseue);
            data.append('suicide', suicide);
            data.append('email', email);
            data.append('profile', fileToUpload);


            let url = BASE_URL + 'auth/update_profile';

            const response = await axios({
                method: "POST",
                url: url,
                data: data,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response) {
                navigation.goBack();
            }

        // } else {

        // }


    }
    return (
        <>
            {isLoadig ?
                <Loader /> :
                <SafeAreaView style={[styles.SafeAreaView]}>
                    <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
                    <ScrollView>
                        <CustomNavbar
                            title="Edit Personal Info"
                            onPress={() => navigation.goBack()}
                        />

                        <View style={{ width: wp("100%") }}>
                            <View style={[styles.profileHeader]}>
                                <View style={[styles.imageCard]}>
                                    {singleFile != null ? <Image
                                        style={[styles.Image]}
                                        source={{ uri: singleFile[0].uri }}
                                    /> :
                                        UserInfo.profile ? <Image style={[styles.Image]} source={{ uri: IMAGE_BASE_URL + UserInfo.profile }} />
                                            :
                                            <View style={[styles.cardInner1]}>
                                                <Text style={[styles.emptyText]}>{getInitials(firstName)}</Text>
                                            </View>}
                                </View>

                                <TouchableOpacity
                                    style={{
                                        right: 20,
                                        width: 30,
                                        height: 30,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "white",
                                        borderRadius: 30 / 2,
                                        borderColor: "black",
                                        borderWidth: 0.5,
                                    }}
                                    onPress={selectFile}
                                >
                                    <Icon name="account-edit" size={25} color={COLORS.primary} />
                                </TouchableOpacity>
                                <Text style={[styles.Textheads]}>
                                    {UserInfo.first_name + " " + UserInfo.last_name}{" "}
                                </Text>


                            </View>

                            <View style={{ alignItems: "center", padding: 25 }}>

                                <View>
                                    <Text style={[styles.subTexts]}>First Name</Text>
                                    <TextInput
                                        keyboardType="default"
                                        style={{
                                            width: wp("85"),
                                            borderWidth: 0.5,
                                            height: 40,
                                            borderColor: "gray",
                                            marginBottom: 10,
                                            paddingHorizontal: 10,
                                        }}
                                        name="email"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onChangeText={(text) => setFirstName(text)}
                                        value={firstName}
                                    />
                                </View>


                                <View>
                                    <Text style={[styles.subTexts]}>Last Name</Text>
                                    <TextInput
                                        keyboardType="default"
                                        style={{
                                            width: wp("85"),
                                            borderWidth: 0.5,
                                            height: 40,
                                            borderColor: "gray",
                                            marginBottom: 10,
                                            paddingHorizontal: 10,
                                        }}
                                        name="email"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onChangeText={(text) => setLastName(text)}
                                        value={lastName}
                                    />
                                </View>


                                <View>
                                    <Text style={[styles.subTexts]}>Email Id</Text>
                                    <TextInput
                                        keyboardType="email-address"
                                        placeholderTextColor={COLORS.lightGray}
                                        style={{
                                            width: wp("85"),
                                            borderWidth: 0.5,
                                            height: 40,
                                            borderColor: "gray",
                                            marginBottom: 10,
                                            paddingHorizontal: 10,
                                        }}
                                        name="email"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onChangeText={(text) => setEmail(text)}
                                        value={email !== 'null' ? email : 'Not Updated'}
                                    />
                                </View>

                                <View>
                                    <Text style={[styles.subTexts]}>Mobile Number</Text>
                                    <TextInput
                                        keyboardType="default"
                                        placeholderTextColor={COLORS.lightGray}
                                        style={{
                                            width: wp("85"),
                                            borderWidth: 0.5,
                                            height: 40,
                                            borderColor: "gray",
                                            marginBottom: 10,
                                            paddingHorizontal: 10,
                                        }}
                                        name="mobile"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onChangeText={(text) => setMobile(text)}
                                        value={mobile}
                                    />
                                </View>

                                <View>
                                    <Text style={[styles.subTexts]}>Gender</Text>

                                    <View style={{ flexDirection: "row", width: wp("85") }}>
                                        <TouchableOpacity
                                            style={
                                                gender === "Male" ? styles.selected : styles.unselected
                                            }
                                            onPress={() => setGender("Male")}
                                        >
                                            <Text
                                                style={
                                                    gender === "Male"
                                                        ? styles.optionSelected
                                                        : styles.optionUnSelected
                                                }
                                            >
                                                {"Male"}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={
                                                gender === "Female" ? styles.selected : styles.unselected
                                            }
                                            onPress={() => setGender("Female")}
                                        >
                                            <Text
                                                style={
                                                    gender === "Female"
                                                        ? styles.optionSelected
                                                        : styles.optionUnSelected
                                                }
                                            >
                                                {" "}
                                                {"Female"}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={
                                                gender === "Others" ? styles.selected : styles.unselected
                                            }
                                            onPress={() => setGender("Others")}
                                        >
                                            <Text
                                                style={
                                                    gender === "Others"
                                                        ? styles.optionSelected
                                                        : styles.optionUnSelected
                                                }
                                            >
                                                {" "}
                                                {"Others"}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View>
                                    <Text style={[styles.subTexts]}>Age</Text>
                                    <TextInput
                                        keyboardType="default"
                                        placeholderTextColor={COLORS.lightGray}
                                        style={{
                                            width: wp("85"),
                                            borderWidth: 0.5,
                                            height: 40,
                                            borderColor: "gray",
                                            marginBottom: 10,
                                            paddingHorizontal: 10,
                                        }}
                                        name="email"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onChangeText={(text) => setAge(text)}
                                        value={age === 'null' ? "" : age}
                                        placeholder="Not updated"
                                    ></TextInput>
                                </View>

                                <View>
                                    <Text style={[styles.subTexts]}>Nationality</Text>
                                    <TextInput
                                        keyboardType="default"
                                        placeholderTextColor={COLORS.lightGray}
                                        style={{
                                            width: wp("85"),
                                            borderWidth: 0.5,
                                            height: 40,
                                            borderColor: "gray",
                                            marginBottom: 10,
                                            paddingHorizontal: 10,
                                        }}
                                        name="bloodGroup"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onChangeText={(text) => setNationality(text)}
                                        value={nationality == 'null' ? "" : nationality}
                                        placeholder="Not updated"
                                    ></TextInput>
                                </View>

                                <View>
                                    <Text style={[styles.subTexts]}>Health issues if any</Text>
                                    <TextInput
                                        keyboardType="default"
                                        placeholderTextColor={COLORS.lightGray}
                                        style={{
                                            width: wp("85"),
                                            borderWidth: 0.5,
                                            height: 40,
                                            borderColor: "gray",
                                            marginBottom: 10,
                                            paddingHorizontal: 10,
                                        }}
                                        name="email"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onChangeText={(text) => setHealthIsseue(text)}
                                        value={healthIsseue == 'null' ? "" : healthIsseue}
                                        placeholder="Not updated"
                                    ></TextInput>
                                </View>

                                <View>
                                    <Text style={[styles.subTexts]}>
                                        Had mental health issue before
                                    </Text>

                                    <View style={{ flexDirection: "row", width: wp("85") }}>
                                        <TouchableOpacity
                                            style={
                                                mentalHealthIsseue === "Yes" ? styles.selected : styles.unselected
                                            }
                                            onPress={() => setMentalHealthIsseue("Yes")}
                                        >
                                            <Text
                                                style={
                                                    mentalHealthIsseue === "Yes"
                                                        ? styles.optionSelected
                                                        : styles.optionUnSelected
                                                }
                                            >
                                                {"Yes"}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={
                                                mentalHealthIsseue === "No" ? styles.selected : styles.unselected
                                            }
                                            onPress={() => setMentalHealthIsseue("No")}
                                        >
                                            <Text
                                                style={
                                                    mentalHealthIsseue === "No"
                                                        ? styles.optionSelected
                                                        : styles.optionUnSelected
                                                }
                                            >
                                                {" "}
                                                {"No"}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>



                                <View>
                                    <Text style={[styles.subTexts]}>
                                        Had a thought of suicide or harming yourself
                                    </Text>

                                    <View style={{ flexDirection: "row", width: wp("85") }}>
                                        <TouchableOpacity
                                            style={
                                                suicide === "Yes" ? styles.selected : styles.unselected
                                            }
                                            onPress={() => setSuicide("Yes")}
                                        >
                                            <Text
                                                style={
                                                    suicide === "Yes"
                                                        ? styles.optionSelected
                                                        : styles.optionUnSelected
                                                }
                                            >
                                                {"Yes"}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={
                                                suicide === "No" ? styles.selected : styles.unselected
                                            }
                                            onPress={() => setSuicide("No")}
                                        >
                                            <Text
                                                style={
                                                    suicide === "No"
                                                        ? styles.optionSelected
                                                        : styles.optionUnSelected
                                                }
                                            >
                                                {" "}
                                                {"No"}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ alignItems: "center" }}>
                            <TouchableOpacity
                                onPress={() => updateProfile()}
                                style={styles.Submitbutton}
                            >
                                <Text style={styles.Buttontext}>{"Update"}</Text>
                            </TouchableOpacity>
                        </View>
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
    profileHeader: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    imageCard: {
        width: 100,
        height: 100,
        borderColor: COLORS.primary,
        borderWidth: 2.5,
        borderRadius: 100 / 2,
        alignItems: "center",
        justifyContent: "center",
    },
    Image: {
        width: 90,
        height: 90,
        borderWidth: 2,
        borderRadius: 90 / 2,
        resizeMode: "contain",
    },
    Textheads: {
        marginRight: 15,
        fontFamily: FONTFAMILY.poppinsbold,
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 22,
        color: COLORS.secondary,
    },
    subTexts: {
        marginTop: 5,
        marginBottom: 5,
        fontFamily: FONTFAMILY.poppinsregular,
        fontSize: 14,
        fontWeight: "bold",
        lineHeight: 22,
        color: COLORS.black,
    },
    optionSelected: {
        fontSize: 14,
        lineHeight: 22,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
        textAlign: "center",
    },
    optionUnSelected: {
        fontSize: 14,
        lineHeight: 22,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: COLORS.primary,
        textAlign: "center",
    },
    unselected: {
        width: wp(22),
        backgroundColor: "#FFEDDF",
        margin: 6,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#FFEDDF",
        marginLeft: 10,
        marginRight: 10,
    },
    selected: {
        width: wp(22),
        backgroundColor: COLORS.primary,
        margin: 6,
        padding: 10,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: COLORS.white,
    },
    Submitbutton: {
        width: wp("70%"),
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 25,
        elevation: 3,
        backgroundColor: COLORS.primary,
    },
    Buttontext: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: COLORS.white,
    },
    cardInner1: {
        backgroundColor: COLORS.white,
        width: 90,
        height: 90,
        borderRadius: 90 / 2,
        alignItems: "center",
        justifyContent: "center"
    },
    emptyText:
    {
        color: COLORS.secondary,
        fontWeight: "bold",
        fontSize: 28,
        lineHeight: 32

    }
});

// #endregion

export default EditProfile;
