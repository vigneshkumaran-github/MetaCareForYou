import {COLORS, FONTS} from '../../Constants/DesignConstants';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const COLORS = {primary: '#f7f7f7', white: '#000'};

const {width, height} = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('../../Resources/Images/onboarding2.png'),
    title: ' What We Do? ',
    subtitle:
      'Unlimited consultations with Top doctors for your entire family.',
  },
  {
    id: '2',
    image: require('../../Resources/Images/onboarding-7.png'),
    title: 'Video Consultations',
    subtitle: 'Consult Doctors from Top Hospitals with Video Consultations',
  },
  {
    id: '3',
    image: require('../../Resources/Images/onboarding2.png'),
    title: ' Book your Appointment',
    subtitle:
      'Unlimited consultations with Top doctors for your entire family.',
  },
];

const Slide = ({item}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image
        source={item?.image}
        style={{height: '70%', width, resizeMode: 'contain'}}
      />
      <View style={[styles.card, styles.elevation]}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const OnBoarding = () => {
  const navigation = useNavigation();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const onStartBtn = async () => {
    try {
      await AsyncStorage.setItem('alreadyLaunched', 'true');
      navigation.navigate('CreateAccount');
    } catch (e) {
      console.log(e);
    }
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.2,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.primary,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{marginBottom: 20}}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{height: 50}}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  onStartBtn()
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: COLORS.secondary,
                    textDecorationLine: 'underline',
                  }}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={skip}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: COLORS.secondary,
                    textDecorationLine: 'underline',
                  }}>
                  SKIP
                </Text>
              </TouchableOpacity>
              <View style={{width: 15}} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 16,
                    color: COLORS.secondary,
                    textDecorationLine: 'underline',
                  }}>
                  NEXT
                </Text>
                {/* <Icon
                            name="forward"
                            size={20}
                            color={COLORS.secondary}
                            style={{ marginLeft: 2, }}
                          /> */}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.onboardbackround}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.onboardbackround}
      />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: height * 0.8}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.white,
    fontSize: 14,
    maxWidth: '80%',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    ...FONTS.h2,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'black',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    // backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  elevation: {
    elevation: 20,
    shadowColor: COLORS.shadowcolor,
  },
  btnGet: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
