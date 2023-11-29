import { StyleSheet, Text, View } from 'react-native'

import Lottie from "lottie-react-native";
import React from 'react'

const Loader = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Lottie
            source={require("../Resources/JSON/loader.json")}
            loader
            autoPlay
            loop
            style={{ width: 100, height: 100 }}
          />
      </View> 
  )
}

export default Loader

const styles = StyleSheet.create({})