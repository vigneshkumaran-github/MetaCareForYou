import About from '../SubScreens/AboutScreen/About';
import Appointment from '../MainScreens/AppointmentScreen/Appointment';
import Booking from '../MainScreens/BookingsScreen/Booking';
import BookingSuccess from '../MainScreens/AppointmentScreen/BookingSuccess';
import CreateAccount from '../MainScreens/AuthScreens/CreateAccount';
import DoctorProfile from '../MainScreens/DoctorProfile/DoctorProfile';
import EditProfile from '../MainScreens/ProfileScreen/Editprofile';
import ForgotPassword from '../MainScreens/AuthScreens/ForgotPassword/ForgotPassword';
import Help from '../MainScreens/HelpandSupport/Help';
import Home from '../MainScreens/HomeScreens/Home';
import Login from '../MainScreens/AuthScreens/Login';
import NotificationScreen from '../SubScreens/Notification/NotificationScreen';
import OnBoarding from '../MainScreens/OnBoardingScreen/OnBoarding';
import OtpScreen from '../MainScreens/AuthScreens/ForgotPassword/OtpScreen';
import PaymentFailed from '../MainScreens/PaymentScreens/PaymentFailed';
import PaymentSuccess from '../MainScreens/PaymentScreens/PaymentSuccess';
import Profile from '../MainScreens/ProfileScreen/Profile';
import Register from '../MainScreens/AuthScreens/Register';
import ResetPassword from '../MainScreens/AuthScreens/ForgotPassword/ResetPassword';
import Search from '../MainScreens/SearchScreens/Search';
import Specialist from '../MainScreens/SpecialListScreen/Specialist';
import Subscription from '../MainScreens/Subscription/Subscription';
import SubscriptionDetails from '../MainScreens/Subscription/SubscriptionDetails';
import TabNavigation from './TabNavigation/TabNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServiceLists from '../MainScreens/ServiceListScreens/ServiceLists';
import DoctorList from '../MainScreens/DoctorsLists/DoctorList';

// import TabNavigation from './TabNavigation/TabNavigation';


const OnboardStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

const StackConfig = { headerShown: false };

export const OnBoardStackScreen = () => {
    return (
        <OnboardStack.Navigator screenOptions={StackConfig} initialRouteName='OnBoarding'>
            <OnboardStack.Screen name="OnBoarding" component={OnBoarding} />
            <OnboardStack.Screen name="CreateAccount" component={CreateAccount} />
            <OnboardStack.Screen name="Login" component={Login} />
            <OnboardStack.Screen name="Register" component={Register} />
            <OnboardStack.Screen name="ForgotPassword" component={ForgotPassword} />
            <OnboardStack.Screen name="OtpScreen" component={OtpScreen} />
            <OnboardStack.Screen name="ResetPassword" component={ResetPassword} />
        </OnboardStack.Navigator>
    )
}

export const AuthStackScreen = () => {
    return (
        <AuthStack.Navigator screenOptions={StackConfig} initialRouteName='CreateAccount'>
            <AuthStack.Screen name="CreateAccount" component={CreateAccount} />
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen name="Register" component={Register} />
        </AuthStack.Navigator>
    )
}

export const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator screenOptions={StackConfig} initialRouteName='TabNav'>
            <HomeStack.Screen name="TabNav" component={TabNavigation} />
            <HomeStack.Screen name="Home" component={Home} />
            <HomeStack.Screen name="Profile" component={Profile} />
            <HomeStack.Screen name="EditProfile" component={EditProfile} />
            <HomeStack.Screen name="Search" component={Search} />
            <HomeStack.Screen name="About" component={About} />
            <HomeStack.Screen name="PaymentFailed" component={PaymentFailed} />
            <HomeStack.Screen name="PaymentSuccess" component={PaymentSuccess} />
            <HomeStack.Screen name="Booking" component={Booking} />
            <HomeStack.Screen name="Help" component={Help} />
            <HomeStack.Screen name="Subscription" component={Subscription} />
            <HomeStack.Screen name="SubscriptionDetails" component={SubscriptionDetails} />
            <HomeStack.Screen name="Specialist" component={Specialist} />
            <HomeStack.Screen name="DoctorProfile" component={DoctorProfile} />
            <HomeStack.Screen name="AppointmentScreen" component={Appointment} />
            <HomeStack.Screen name="BookingSuccess" component={BookingSuccess} />
            <HomeStack.Screen name="NotificationScreen" component={NotificationScreen} />
            <OnboardStack.Screen name="ServiceLists" component={ServiceLists} />
            <OnboardStack.Screen name="DoctorList" component={DoctorList} />
        </HomeStack.Navigator>
    )
}