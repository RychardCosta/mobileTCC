import React, {useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ImageBackground
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';

import api from '../../services/api.js';

export default function SignIn() {
  const refSenha = useRef("senha")
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({});
  const navigation = useNavigation();
  const handleSubmitAcessar = async data => {
    console.log(data);
    const response = await api
      .post('/login', {
        cpf: data.cpf,
        senha: data.senha,
      })
      .catch(error => console.log(error));
    if (response.data.message === 'Login feito com sucesso!') {
      console.log(response.data.user);
      try {
        await AsyncStorage.removeItem('cpf');
        await AsyncStorage.removeItem('nome');
        await AsyncStorage.removeItem('sobrenome');
        await AsyncStorage.removeItem('pontuacao');
        await AsyncStorage.removeItem('tipoDeConta');
        await AsyncStorage.removeItem('professorId');
      } catch (error) {
        console.log(error);
      }

      await AsyncStorage.setItem('cpf', response.data.user.cpf);
      await AsyncStorage.setItem('nome', response.data.user.nome);
      await AsyncStorage.setItem('sobrenome', response.data.user.sobrenome);
      await AsyncStorage.setItem(
        'pontuacao',
        String.toString(response.data.user.pontuacao),
      );
      await AsyncStorage.setItem('tipoDeConta', response.data.user.tipoDeConta);
      if (response.data.user.professorId) {
        await AsyncStorage.setItem(
          'professorId',
          response.data.user.professorId,
        );
        console.log(response.data.user.professorId);
      }
      if (response.data.user.tipoDeConta === 'professor') {
        navigation.navigate('MainProfessor');
      } else {
        navigation.navigate('MainAluno');
      }
    } else {
      console.log(response.data.message);
      Alert.alert('Login inválido', 'Nome de usuário ou senha incorretos.', [
        {
          text: 'Ok',
          onPress: () => console.log('Botão 1 Pressionado'),
        },
      ]);
    }
  };
  return (
    <Animatable.View
    source={require('../../assets/fundo2.png')}
    style={styles.container}>
      <Animatable.View style={{
        backgroundColor: "#404040",
         borderBottomEndRadius: 5,
         borderBottomStartRadius: 5
         }}>
        <Text style={styles.message}> BEM-VINDO(A) </Text>

      </Animatable.View>
      
      
      <ImageBackground  
       source={require('../../assets/fundo3.png')}
      imageStyle={styles.image}
      animation="fadeInRight" style={styles.containerForm}>
        <Text style={styles.title}>CPF </Text>
        <Controller
          control={control}
          name="cpf"
          render={({field: {onChange, value, onBlur}}) => (
            <TextInput
              keyboardType="decimal-pad"
              returnKeyType = "next"
              style={styles.input}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              onSubmitEditing={() => refSenha.current.focus()
             
              }
              
            />
          )}
        />
        <Controller
          control={control}
          name="senha"
          render={({field: {onChange, value, onBlur}}) => (
            <TextInput
            ref={refSenha}
              secureTextEntry={true}
              style={styles.input}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
        />

        <TouchableOpacity
          onPress={handleSubmit(handleSubmitAcessar)}
          style={styles.button}>
          <Text style={styles.textButton}>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={styles.register}>
          <Text style={{fontWeight: 'bold', color: "rgba(255,255,255,0.8)"}}>Criar uma conta</Text>
        </TouchableOpacity>
        <View style={styles.containerImage}>
      
         
        </View>
        
      
            
       
      </ImageBackground>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
    //justifyContent: 'flex-end',
  },
  message: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#fff"
  },
  title: {
    marginTop: '7%',
    marginBottom: '2%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#404040',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    paddingVertical: 8,
    borderRadius: 4,
  },
  textButton: {
    color: '#fff',
     fontWeight: 'bold',
  },
  register: {
    alignItems: 'center',
    marginTop: 14,
    borderWidth: 1,
     borderRadius: 5,
     backgroundColor: "#404040"
  },
  image: {
    flex: 1,
    width: "110%",
    height: "110%",
   
    
    


    
  },
  containerImage: {
    flex: 1,
    flexDirection: 'row',
    
  },
});
