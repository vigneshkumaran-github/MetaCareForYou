import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { FindDoctorComponent, GetCareComponent, GetHelpComponent, HeaderComponent, QuestionsComponent, TopDoctors } from "./Components";
import React, { useState } from 'react'

import { COLORS } from "../../Constants/DesignConstants";
import HospitalComponent from "./Components/HospitalComponent";
import SpecialistComponent from "./Components/SpecialistComponent";

const Home = () => {
  const [headerlocation, setHeaderLoaction] = useState({});
  return (
    <SafeAreaView style={[styles.SafeAreaView]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
      <ScrollView>
        <HeaderComponent location={headerlocation} />
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