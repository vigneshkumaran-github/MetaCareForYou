import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY} from '../Constants/DesignConstants';
import Lottie from 'lottie-react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { RFValue } from 'react-native-responsive-fontsize';

const NoData = ({text1, text2}) => {
  return (
    <View style={styles.container}>
      <Lottie
        source={require('../Resources/JSON/nodata.json')}
        loader
        autoPlay
        resizeMode='cover'
        loop
        style={{width: responsiveWidth(90), height: responsiveHeight(30)}}
      />
      {text1 && <Text style={styles.text1}>{text1}</Text>}
      {text2 && <Text style={styles.text2}>{text2}</Text>}
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'center',
    marginTop: responsiveHeight(15),
  },
  text1:{
    color:COLORS.black,
    fontWeight:'700',
    fontFamily:FONTFAMILY.HelveticaNeuMedium,
    fontSize:RFValue(16),
    marginTop:responsiveHeight(2)
  },
  text2:{
    color:COLORS.gray,
    fontWeight:'400',
    fontFamily:FONTFAMILY.HelveticaNeuMedium,
    width:responsiveWidth(70),
    textAlign:'center',
    lineHeight:20,
    marginTop:10
  }
});
