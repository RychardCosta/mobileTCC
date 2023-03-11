import {createStackNavigator} from '@react-navigation/stack'

import Welcome from '../pages/Welcome'
import SignIn from '../pages/Signin'
import Signup from '../pages/Signup'


const Stack = createStackNavigator();

export default function Routes(){
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name='Welcome'
            component={Welcome}
            options={{headerShown:false}} />
            <Stack.Screen 
             name='SignIn'
            component={SignIn} 
            options={{headerShown:false}}/>
            <Stack.Screen 
             name='Signup'
            component={Signup} 
            options={{headerShown:false}}/>
        </Stack.Navigator>

    )

}