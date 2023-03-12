import React, {useState} from 'react';
import { View, Text , TouchableOpacity, TextInput, StyleSheet,Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native'

import * as Animatable from 'react-native-animatable';

import api from "../../services/api.js"


export default function SignIn() {
  const navigation = useNavigation();
    const [cpf, setCpf] = useState(null);
    const [senha, setSenha] = useState(null);


      const handleSubmitAcessar =  async ()=>{
         const response = await api.post("/login",{
          cpf,
          senha
        }).catch(error => console.log(error));
        if(response.data.message === "Login feito com sucesso!"){
          console.log(response.data.user)
          await AsyncStorage.setItem('cpf', response.data.user.cpf);
          await AsyncStorage.setItem('nome', response.data.user.nome);
          await AsyncStorage.setItem('sobrenome', response.data.user.sobrenome);
          await AsyncStorage.setItem('pontuacao', String.toString(response.data.user.pontuacao));
          await AsyncStorage.setItem('tipoDeConta', response.data.user.tipoDeConta);
          if(response.data.user.professorId){
            await AsyncStorage.setItem('professorId', response.data.user.professorId);
          }
          if(response.data.user.tipoDeConta === "professor"){
            navigation.navigate("MainProfessor")
          }else{
            navigation.navigate("MainAluno")
          }
        }else{
          console.log(response.data.message)
          Alert.alert(
            'Login inválido',
            'Nome de usuário ou senha incorretos.',
            [
              {
                text: 'Ok',
                onPress: () => console.log('Botão 1 Pressionado')
              }
           
            ]
          ); 
        }

        
         
  }
    return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" style={styles.containerHeader}>
      <Text style={styles.message}> BEM-VINDO(a) </Text>  
      </Animatable.View>
      <Animatable.View animation='fadeInRight' style={styles.containerForm}>
      <Text style={styles.title}>CPF </Text>
        <TextInput 
          keyboardType='decimal-pad'
          style={styles.input}
          onChangeText={setCpf} />  
      <Text style={styles.title}>Senha </Text>
        <TextInput 
        secureTextEntry={true} 
        style={styles.input}
        onChangeText={setSenha}/>  

        <TouchableOpacity 
        onPress={handleSubmitAcessar}
        style={styles.button}> 
          <Text style={styles.textButton}>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
         onPress={ () => navigation.navigate("Signup")}
        style={styles.register}>
          <Text>Criar uma conta</Text>
        </TouchableOpacity>
      </Animatable.View> 
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#404040'
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
    justifyContent: "flex-end",

  },
  message: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold'

  },
  containerForm: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25 ,
    borderTopRightRadius: 25 ,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    marginBottom: 12,
    fontSize: 16
  },
  title: {
    marginTop: '7%', 
    marginBottom: '2%',
    fontSize: 20,
    fontWeight: 'bold'
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
    color: '#fff'

  }, 
  register: {
    alignItems: 'center',
    marginTop: 14
  }

});
