import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import {COLORS} from '../Constants/DesignConstants';
import React from 'react';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const ActivityLoader = ({size,style}) => {
  return (
    <View style={[styles.container,style]}>
      <ActivityIndicator size={size} color={COLORS.primary} />
    </View>
  );
};

export default ActivityLoader;

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
