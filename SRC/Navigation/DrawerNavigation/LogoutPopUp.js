import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useContext} from 'react';
import {Modal} from 'react-native-paper';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {COLORS, FONTFAMILY} from '../../Constants/DesignConstants';
import {RFValue} from 'react-native-responsive-fontsize';
import {AuthContext} from '../../Context/AuthContext';

const LogoutPopUp = ({modalVisible, setModalVisible}) => {
  const {Logout} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Are you sure want to logout ?</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          width: responsiveWidth(75),
          marginTop: responsiveHeight(2),
        }}>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: COLORS.primary}]}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <Text style={[styles.btntxt, {color: COLORS.white}]}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, {borderColor: COLORS.primary, borderWidth: 0.8}]}
          onPress={() => {
            Logout();
            setModalVisible(!modalVisible);
          }}>
          <Text style={[styles.btntxt, {color: COLORS.black}]}>Yes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogoutPopUp;

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(80),
    height: responsiveHeight(20),
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
  },
  text1: {
    color: COLORS.black,
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
    fontSize: RFValue(14),
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(27),
    height: responsiveHeight(6),
    borderRadius: 5,
  },
  btntxt: {
    fontFamily: FONTFAMILY.HelveticaNeuMedium,
    fontSize: RFValue(15),
    fontWeight: '500',
  },
});
