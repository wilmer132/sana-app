import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer} from 'react-navigation'
import Home from '../src/views/screens/home'
import Login from '../src/views/screens/login'
import Signup from '../src/views/screens/signup'

const screens = {
    Login: {
        screen: Login,
    },
    Signup: {
        screen: Signup
    },
    Home: {
        screen: Home
    },
}

const options = {
    header: false
}

const HomeStack = createStackNavigator(screens, options);

export default createAppContainer(HomeStack);