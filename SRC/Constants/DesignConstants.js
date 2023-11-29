import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary:"#F4740D",
  secondary:"#181065",
  onboardbackround:"#f1f3f4",
  onboardbackround:"#f1f3f4",
  lightGray:"#676a6c",//For Card Description
  textcolor:"#414146",
  titlecolor:"#000000",
  shadowcolor:"#6A6A6A",
  black: "#000000",
  white: "#fff",
  gray: "#6A6A6A",
  blue: "#0682FE",
  onboardbackroundExtra:"#e5fdca",
  //therapists Theme
  therapistsPrimary:'#181065',  
  therapistsSecondary:'#1778f1', 
  therapistsTextPrimary:'#fff',
  therapistsTextSecondary:'#000000',
  therapistsTextExtra:'#414146',
  therapistsShadow:'#0c0c0c33',
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 12,
  h5:12,
  h6:11,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,

  // app dimensions
  width,
  height
};
export const FONTS = {
  //Maxmimum Used Fonts Customized
  NavBarHeading:{fontFamily:"Poppins-SemiBold",fontSize:SIZES.h3 ,lineHeight: 22,color: COLORS.textcolor},
  mainHeading:{fontFamily:"Poppins-SemiBold",fontSize:SIZES.h3 ,lineHeight: 22,color: COLORS.textcolor},
  getcare:{fontFamily:"Poppins-SemiBold",fontSize:SIZES.h4 ,lineHeight: 22,color: COLORS.white},
  cardTitle:{fontFamily:"Poppins-Regular",fontSize:SIZES.h4 ,lineHeight: 22,color: COLORS.black},
  cardDescription:{fontFamily:"Poppins-Regular",fontSize:SIZES.h6 ,lineHeight: 20,color: COLORS.lightGray},
//If Any useages Default Packages
  h1: { fontFamily: "Poppins-Black", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Poppins-Bold", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Poppins-Bold", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "Poppins-Bold", fontSize: SIZES.h4, lineHeight: 22 },
  body1: { fontFamily: "Poppins-Regular", fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontFamily: "Poppins-Regular", fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontFamily: "Poppins-Regular", fontSize: SIZES.body3, lineHeight: 22 },
  body4: { fontFamily: "Poppins-Regular", fontSize: SIZES.body4, lineHeight: 22 },
  
};

export const FONTFAMILY = {
 cbold:'Arial',
    clight:'Arial',
    cmedium:'Arial',
    cregular:'Arial',
    csbold:'Arial',
    cthin:'Arial',

    nbold:'Arial',
    nlight:'Arial',
    nregular:'Arial',
    nsbold:'Arial',

    //nok nok
    HelveticaNeu: 'HelveticaNeue',
    HelveticaNeuBold: 'HelveticaNeue-Bold',
    HelveticaNeuMedium: 'HelveticaNeue-Medium',
    HelveticaNeuLight: 'HelveticaNeue-Light',
    HelveticaNeuThin: 'HelveticaNeue-Thin',
    

    poppinsmedium : 'Poppins-Medium',
    poppinslight:'Poppins-Bold',
    poppinsbold:'Poppins-Bold',
    poppinsregular:'Poppins-Regular',
    poppinsthin:'Poppins-Thin',
    poppinssemibold:'Poppins-SemiBold',
    LobsterRegular: 'Lobster-Regular',

};
