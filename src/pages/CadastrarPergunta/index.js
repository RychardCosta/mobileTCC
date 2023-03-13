import React, {useState,useEffect} from 'react';
import { Alert, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements'
import {useNavigation} from '@react-navigation/native'
import api from "../../services/api.js"
import AsyncStorage from '@react-native-async-storage/async-storage';



import * as Animatable from 'react-native-animatable';


export default function SignupAluno() {
  const navigation = useNavigation();
  const height = useHeaderHeight()

  const [cpf, setCPF] = useState();
  const [nome, setNome] = useState();
  const [sobrenome, setSobrenome] = useState();
  const [senha, setSenha] = useState();
  const [repetirSenha, setRepetirSenha] = useState();
  const [professorId, setProfessorId] = useState();
  

  useEffect(() => {
    AsyncStorage.getItem('cpf').then(cpf => {
        setProfessorId(cpf)
         }, [])
});



  const handleSubimit = async () => {

     try {
      if(cpfIsValid(cpf)){
        if(senha === repetirSenha){
         const user = {
           cpf,
           nome,
           sobrenome,
           tipoDeConta: "aluno",
           senha, 
           professorId
          }
          const response = await api.post("/signup", user).catch(error => console.log(error));
          if(response.data.message === "Usuário já cadastrado!"){
            Alert.alert(
              'ERRO DE CADASTRO',
              'Usuário já cadastrado.',
              [
                {
                  text: 'Ok',
                  onPress: () => console.log('Botão 1 Pressionado')
                }
             
              ]
            ); 
      
          }else{
            console.log(response.data.user)
             Alert.alert(
              'Sucesso!',
              'Aluno cadastrado com sucesso!.',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate("MainProfessor")
                }
             
              ]
            )
          }
        }else{
         Alert.alert(
           'Senhas não combinam',
           'Verifique a senha digitada.',
           [
             {
               text: 'Ok',
               onPress: () => console.log('Botão 1 Pressionado')
             }
          
           ]
         )
         
        }
       }else{
         Alert.alert(
           'CPF inválido',
           'CPF deve ter 11 digitos.',
           [
             {
               text: 'Ok',
               onPress: () => console.log('Botão 1 Pressionado')
             }
          
           ]
         ); 
   
       }
     } catch (error) {
      console.log(error)
      Alert.alert(
        'Verifique as informaões fornecidas',
        'Dados incompletos.',
        [
          {
            text: 'Ok',
            onPress: () => console.log('Botão 1 Pressionado')
          }
       
        ]
      ); 
      
     }





    function cpfIsValid(){
      if(cpf.length != 11){
        console.log('CPF deve ter 11 digitos')
        return false
      }
      console.log("Deu certo")
      return true
    }



  }


  return (
    <KeyboardAvoidingView
    keyboardVerticalOffset={height}
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    style={styles.container}
    enabled>
       
        <Animatable.View  animation="fadeInUp"  style={styles.containerForm}>
            <Text style={styles.titleForm}>Pergunta</Text>
            <TextInput 
            onChangeText={setCPF}
            style={styles.input} />
            <Text style={styles.titleForm}>Resposta</Text>
            <TextInput 
            onChangeText={setNome}
            style={styles.input} />          
            <Text style={styles.titleForm}>Opção 1</Text>
            <TextInput
            onChangeText={setSobrenome}
            style={styles.input} />            
            <Text style={styles.titleForm}>Opção 2</Text>
            <TextInput
            secureTextEntry={true}
            onChangeText={setSenha}
            style={styles.input} />            
            <Text style={styles.titleForm}>Opção 3</Text>
            <TextInput
            secureTextEntry={true}
            onChangeText={setRepetirSenha}
            style={styles.input} />
            <Text style={styles.titleForm}>Opção 4</Text>
            <TextInput
            secureTextEntry={true}
            onChangeText={setRepetirSenha}
            style={styles.input} />
            <Animatable.View  animation="flipInY" delay={300}>
            <TouchableOpacity
            onPress={handleSubimit} 
            style={styles.button}><Text style={styles.textButton}>Criar pergunta</Text></TouchableOpacity>
            </Animatable.View>
                      
        </Animatable.View >
           

      
     </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
         title : {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold'
    },
    containerForm:{
       // flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25 ,
        borderTopRightRadius: 25 ,
        paddingStart: '5%',
        paddingEnd: '5%',         

        marginTop: "20%",
        justifyContent: 'flex-end'
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        height: 25,
        marginBottom: 12,
        fontSize: 16
      },
      titleForm: {
        marginTop: '2%', 
        marginBottom: '1%',
        fontSize: 15,
        fontWeight: 'bold'
      },
      button:{
        backgroundColor: "#404040",
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 14,
        paddingVertical: 8,
        borderRadius: 4, 
        marginBottom : 15
      },
      textButton:{
        color: "#fff"
      }
    
})
