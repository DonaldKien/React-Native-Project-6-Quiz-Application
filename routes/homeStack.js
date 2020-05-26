import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import homeScreen from '../components/home';
import questionScreen from '../components/question';

const screens = {
    home: {
        screen: homeScreen, 
        navigationOptions: {title: "Home"} 
    },
    question: {
        screen: questionScreen, 
        navigationOptions: {title: "Quiz"}
    }
}


const HomeStack = createStackNavigator (screens)
export default createAppContainer (HomeStack);

