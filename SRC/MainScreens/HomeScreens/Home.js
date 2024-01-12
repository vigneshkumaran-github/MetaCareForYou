import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { FindDoctorComponent, GetCareComponent, GetHelpComponent, HeaderComponent, QuestionsComponent, TopDoctors } from "./Components";
import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from "../../Context/AuthContext";
import { COLORS } from "../../Constants/DesignConstants";
import HospitalComponent from "./Components/HospitalComponent";
import SpecialistComponent from "./Components/SpecialistComponent";

const Home = () => {
  const [headerlocation, setHeaderLoaction] = useState({});
  const {profileData,setProfileData,GetProfile} = useContext(AuthContext)


  const getProfiledata=async()=>{
    const response = await GetProfile();
    if (response?.status === true) {
      setProfileData(response?.data);
    } else {
      console.log(response, 'eee');
    }
  }

  useEffect(() => {
    getProfiledata()
  }, [])

  
  return (
    <SafeAreaView style={[styles.SafeAreaView]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
      <ScrollView>
        <HeaderComponent data={profileData} location={headerlocation} />
        {/* <SpecialistComponent /> */}
        <TopDoctors />
        <HospitalComponent />
        {/* <FindDoctorComponent /> */}
        <GetCareComponent />                                                                                                                                                                  
        {/*  */}
        {/* <IssuesComponent /> */}
        <GetHelpComponent />
        {/*  */}
        {/* <OnlineDoctorsComponent /> */}
        <QuestionsComponent />



      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})