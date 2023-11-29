import CreateAccount from '../MainScreens/AuthScreens/CreateAccount';
import Login from '../MainScreens/AuthScreens/Login';
import OnBoarding from '../MainScreens/OnBoardingScreen/OnBoarding';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const OnboardStack = createNativeStackNavigator();
const AuthStack=createNativeStackNavigator()

const StackConfig = {headerShown: false};
 
export const OnBoardStackScreen=()=>{
    return(
        <OnboardStack.Navigator screenOptions={StackConfig} initialRouteName='OnBoarding'>
            <OnboardStack.Screen name="OnBoarding" component={OnBoarding} />
            <OnboardStack.Screen name="CreateAccount" component={CreateAccount} />
            <OnboardStack.Screen name="Login" component={Login} />
        </OnboardStack.Navigator>
    )
}