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
import SpecialistComponent from "./Components/SpecialistComponent";

const Home = () => {
  const [headerlocation, setHeaderLoaction] = useState({});
  return (
    <SafeAreaView style={[styles.SafeAreaView]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
      <ScrollView>
        <HeaderComponent location={headerlocation} />
        <SpecialistComponent />
        <GetCareComponent />
        <TopDoctors />
        <FindDoctorComponent />
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