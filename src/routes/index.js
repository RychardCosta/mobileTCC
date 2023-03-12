import {createStackNavigator} from '@react-navigation/stack'

import Welcome from '../pages/Welcome'
import SignIn from '../pages/Signin'
import Signup from '../pages/Signup'
import MainProfessor from '../pages/MainProfessor'
import MainAluno from '../pages/MainAluno'
import SignupAluno from '../pages/SignupAluno'


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
            options={{title: 'Cadastro de professor',
        }}
          />
       
            <Stack.Screen 
             name='SignupAluno'
            component={SignupAluno} 
            options={{title: 'Cadastro de aluno',
        }}
          />
        <Stack.Screen 
        name='MainProfessor'
        component={MainProfessor}
        options={{headerShown:false}} />
        <Stack.Screen 
        name='MainAluno'
        component={MainAluno}
        options={{headerShown:false}} />
        
        
        </Stack.Navigator>

    )

}