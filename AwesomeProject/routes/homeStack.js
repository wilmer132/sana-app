import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer} from 'react-navigation'
import Home from '../src/views/screens/home'
<<<<<<< Updated upstream
import Signup from '../src/views/screens/signup'

const screens = {
=======
import Login from '../src/views/screens/login'
import Signup from '../src/views/screens/signup'

const screens = {
    Login: {
        screen: Login,
    },
>>>>>>> Stashed changes
    Signup: {
        screen: Signup
    },
    Home: {
        screen: Home
    },
}

<<<<<<< Updated upstream
const HomeStack = createStackNavigator(screens);
=======
const options = {
    header: false
}

const HomeStack = createStackNavigator(screens, options);
>>>>>>> Stashed changes

export default createAppContainer(HomeStack);