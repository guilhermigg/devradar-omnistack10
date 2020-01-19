import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: "DevRadar"
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: "Github profile"
            }
        }
    },{
        defaultNavigationOptions: {
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerStyle:{
                backgroundColor: '#7159c1'
            }
        }
    })
)

export default Routes;