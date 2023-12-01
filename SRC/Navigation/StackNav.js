import CreateAccount from '../MainScreens/AuthScreens/CreateAccount';
import Home from '../MainScreens/HomeScreens/Home';
import Login from '../MainScreens/AuthScreens/Login';
import OnBoarding from '../MainScreens/OnBoardingScreen/OnBoarding';
import Register from '../MainScreens/AuthScreens/Register';
import TabNavigation from './TabNavigation/TabNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../MainScreens/ProfileScreen/Profile';
import EditProfile from '../MainScreens/ProfileScreen/Editprofile';
import Search from '../MainScreens/SearchScreens/Search';
import About from '../MainScreens/AboutScreen/About';
import Booking from '../MainScreens/BookingsScreen/Booking';
import Subscription from '../MainScreens/Subscription/Subscription';
import SubscriptionDetails from '../MainScreens/Subscription/SubscriptionDetails';

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
            <HomeStack.Screen name="Booking" component={Booking} />
            <HomeStack.Screen name="Subscription" component={Subscription} />
            <HomeStack.Screen name="SubscriptionDetails" component={SubscriptionDetails} />
        </HomeStack.Navigator>
    )
}