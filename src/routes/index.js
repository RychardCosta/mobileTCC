import {createStackNavigator} from '@react-navigation/stack';

import Welcome from '../pages/Welcome';
import SignIn from '../pages/Signin';
import Signup from '../pages/Signup';
import MainProfessor from '../pages/MainProfessor';
import MainAluno from '../pages/MainAluno';
import SignupAluno from '../pages/SignupAluno';
import Jogo from '../pages/Jogo';
import CadastrarCategoria from '../pages/CadastrarCategoria';
import CadastrarPergunta from '../pages/CadastrarPergunta';
import Ranking from '../pages/Ranking';
import CategoriaJogo from '../pages/CategoriaJogo';
import Atualizar from '../pages/Atualizar';
import AtualizarUser from '../pages/AtualizarUser';
import AtualizarAluno from '../pages/AtualizarAluno';
import AtualizarCategoria from '../pages/AtualizarCategoria';
import AtualizarPergunta from '../pages/AtualizarPergunta';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{title: 'Cadastro de professor'}}
      />

      <Stack.Screen
        name="SignupAluno"
        component={SignupAluno}
        options={{title: 'Cadastro de aluno'}}
      />
      <Stack.Screen
        name="MainProfessor"
        component={MainProfessor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainAluno"
        component={MainAluno}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Jogo"
        component={Jogo}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CadastrarCategoria"
        component={CadastrarCategoria}
        options={{headerShown: true}}
      />

      <Stack.Screen
        name="CadastrarPergunta"
        component={CadastrarPergunta}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Ranking"
        component={Ranking}
        options={{headerShown: true}}
      />

      <Stack.Screen
        name="CategoriaJogo"
        component={CategoriaJogo}
        options={{title: 'Categoria de jogos', headerShown: true}}
      />
      <Stack.Screen
        name="AtualizarUser"
        component={AtualizarUser}
        options={ {headerShown: false}}
      />
      <Stack.Screen
        name="Atualizar"
        component={Atualizar}
        options={{title: 'Atualização de dados', headerShown: true}}
      />
      <Stack.Screen
        name="AtualizarAluno"
        component={AtualizarAluno}
        options={{title: 'Atualização de alunos', headerShown: true}}
      />
      <Stack.Screen
        name="AtualizarCategoria"
        component={AtualizarCategoria}
        options={{title: 'Atualização de categoria', headerShown: true}}
      />
      <Stack.Screen
        name="AtualizarPergunta"
        component={AtualizarPergunta}
        options={{title: 'Atualização de pergunta', headerShown: true}}
      />
    </Stack.Navigator>
  );
}
