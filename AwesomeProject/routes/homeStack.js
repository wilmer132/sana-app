import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer} from 'react-navigation'
import Home from '../src/views/screens/home'
import Signup from '../src/views/screens/signup'

const screens = {
    Signup: {
        screen: Signup
    },
    Home: {
        screen: Home
    },
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);