import AsyncStorage from '@react-native-async-storage/async-storage';
import  Toast  from 'react-native-toast-message';

export const showToastGreen = (msg) => {
    Toast.show({
        type: 'success',
        text1: 'Success',
        text2: msg,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
    });
}

export const showToastRed = (msg) => {
    Toast.show({
        type: 'error',
        text1: 'Error',
        text2: msg,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
    });
}

export function emailValidator(email) {
    try {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (email.length == 0) {
            return {
                status: false,
                msg: "Email is Required!",
            };
        } else if (reg.test(email) === false) {
            return {
                status: false,
                msg: "Check Your Email Address!",
            };
        } else {
            return {
                status: true,
                msg: "Email Address Valid!",
            };
        }
    } catch (err) {
        return {
            status: false,
            msg: err,
        };
    }
}

export function passwordValidator(password) {
    try {
        if (password.length == 0) {
            return {
                status: false,
                msg: "Password is required!",
            };
        } else if (password.length < 6) {
            return {
                status: false,
                msg: "Minimum 6 characters!",
            };
        } else if (password.indexOf(" ") >= 0) {
            return {
                status: false,
                msg: "Can't contain spaces!",
            };
        } else {
            return {
                status: true,
                msg: "Password Valid!",
            };
        }
    } catch (err) {
        return {
            status: false,
            msg: err,
        };
    }
}

export function fisrtnameValidator(name,type){

    try {
    let reg = /^[A-Za-z]+$/;
    console.log(reg.test(name))
    if (name.length == 0) {
      return {
        status: false,
        msg: type +" is Required! ",
      };
    } else if (reg.test(name) === false) {
      return {
        status: false,
        msg: "Enter valid name or remove spaces!",
      };
    } else {
      return {
        status: true,
        msg: "First Name Valid!",
      };
    }
  } catch (err) {
    return {
      status: false,
      msg: err,
    };
  }
}

export function LastnameValidator(name,type){

    try {
    let reg = /^[A-Za-z]+$/;
    console.log(reg.test(name))
    if (name.length == 0) {
      return {
        status: false,
        msg: type +" is Required! ",
      };
    } else if (reg.test(name) === false) {
      return {
        status: false,
        msg: "Enter valid name or remove spaces!",
      };
    } else {
      return {
        status: true,
        msg: "Last Name Valid!",
      };
    }
  } catch (err) {
    return {
      status: false,
      msg: err,
    };
  }
}


export function MobileValidator(mobile) {
  try {
    if (mobile.length == 0) {
      return {
        status: false,
        msg: "Mobile Number is required!",
      };
    } else if (mobile.length <= 9) {
      return {
        status: false,
        msg: "Check Your Mobile!",
      };
    } else if (mobile.indexOf(" ") >= 0) {
      return {
        status: false,
        msg: "Can't contain spaces!",
      };
    } else {
      return {
        status: true,
        msg: "Mobile Valid!",
      };
    }
  } catch (err) {
    return {
      status: false,
      msg: err,
    };
  }
}


export function ExperienceValidator(experience) {
  try {
    if (experience.length == 0) {
      return {
        status: false,
        msg: "Experience is required!",
      };
    } 
    else if (experience.indexOf(" ") >= 0) {
      return {
        status: false,
        msg: "Can't contain spaces!",
      };
    } else {
      return {
        status: true,
        msg: "Experience Valid!",
      };
    }
  } catch (err) {
    return {
      status: false,
      msg: err,
    };
  }
}

export const getInitials = (string) => {
    var names = string.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();
    return initials;
};

  export const getUserdetails = async () => {
    try {
      const data = await AsyncStorage.getItem('userDetails');
      // dev numbers
      // return {userId: '1539', mobile: '6384320081'};
      return JSON.parse(data);
    } catch {
      return null;
    }
  };


  export const getLocations = async () => {
    try {
      const data = await AsyncStorage.getItem('location_details');
      
      // dev numbers
      // return {userId: '1539', mobile: '6384320081'};
      return JSON.parse(data);
    } catch {
      return null;
    }
  };


  export const getTherapistDetails = async () => {
    try {
      const data = await AsyncStorage.getItem('therapistDetails');
      // dev numbers
      // return {userId: '1539', mobile: '6384320081'};
      return JSON.parse(data);
    } catch {
      return null;
    }
  };