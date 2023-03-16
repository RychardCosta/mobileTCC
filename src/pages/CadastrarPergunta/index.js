import React from 'react';
import { Alert, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements'
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from "react-hook-form";

import * as Animatable from 'react-native-animatable';

import api from "../../services/api.js"



export default function CadastrarPergunta() {
  const {control, handleSubmit, formState:{errors}} = useForm({})
  const navigation = useNavigation();
  const height = useHeaderHeight()

 

const handleSubmitCriarPergunta = async (data) => {
  console.log(data)
   try {
   
    const cpf = await AsyncStorage.getItem('cpf');

    const response = await api.post('pergunta',{
     
        "pergunta": data.pergunta,
      "resposta": data.resposta,
       "categoriaName": data.categoria  ? data.categoria: "GERAL" ,
       "professorId": cpf,
        "opcao1": data.opcao1, 
        "opcao2": data.opcao2, 
        "opcao3": data.opcao3,
        "opcao4": data.opcao4
   

    });
    Alert.alert(
      'Sucesso!',
      response.data.message,
      [
        {
          text: 'Ok',
          onPress: () => navigation.navigate("MainProfessor")
        }
     
      ]
    );

    

    console.log(response.data)
  

  } catch (error) {
    console.log(error)
    Alert.alert(
      'Erro ao cadastrar imagem',
      response.data.message,
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
    <KeyboardAvoidingView
    keyboardVerticalOffset={height}
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    style={styles.container}
    enabled>
      <ScrollView>

        <Animatable.View  animation="fadeInUp"  style={styles.containerForm}>
         
           <Text style={styles.titleForm}>Categoria</Text>
           <Controller
            control={control}
            name="categoria"
            render={({field:  {onChange, value, onBlur}}) => (
          <TextInput 
            style={styles.input}
            onChangeText={onChange}
            value={value}
            onBlur={onBlur} 
            placeholder="PADRÃO GERAL"/> 
              )}
              />
       
           <Text style={styles.titleForm}>Pergunta</Text>
           <Controller
            control={control}
            name="pergunta"
            render={({field:  {onChange, value, onBlur}}) => (
          <TextInput 
            style={styles.input}
            onChangeText={onChange}
            value={value}
            onBlur={onBlur} 
            /> 
              )}
              />
            <Text style={styles.titleForm}>Resposta</Text>
            <Controller
            control={control}
            name="resposta"
            render={({field:  {onChange, value, onBlur}}) => (
          <TextInput 
            keyboardType='decimal-pad'
            style={styles.input}
            onChangeText={onChange}
            value={value}
            onBlur={onBlur} 
            /> 
              )}
              />        
            <Text style={styles.titleForm}>Opção 1</Text>
            <Controller
            control={control}
            name="opcao1"
            render={({field:  {onChange, value, onBlur}}) => (
          <TextInput 
            keyboardType='decimal-pad'
            style={styles.input}
            onChangeText={onChange}
            value={value}
            onBlur={onBlur} 
            /> 
              )}
              />         
            <Text style={styles.titleForm}>Opção 2</Text>
            <Controller
            control={control}
            name="opcao2"
            render={({field:  {onChange, value, onBlur}}) => (
          <TextInput 
            style={styles.input}
            onChangeText={onChange}
            value={value}
            onBlur={onBlur} 
            /> 
              )}
              />           
            <Text style={styles.titleForm}>Opção 3</Text>
            <Controller
            control={control}
            name="opcao3"
            render={({field:  {onChange, value, onBlur}}) => (
          <TextInput 
            style={styles.input}
            onChangeText={onChange}
            value={value}
            onBlur={onBlur} 
            /> 
              )}
              /> 
            <Text style={styles.titleForm}>Opção 4</Text>
            <Controller
            control={control}
            name="opcao4"
            render={({field:  {onChange, value, onBlur}}) => (
          <TextInput 
            
            style={styles.input}
            onChangeText={onChange}
            value={value}
            onBlur={onBlur} 
            /> 
              )}
              /> 
            <Animatable.View  animation="flipInY" delay={300}>
            <TouchableOpacity
            onPress={handleSubmit(handleSubmitCriarPergunta)}
            
            style={styles.button}><Text style={styles.textButton}>Criar pergunta</Text></TouchableOpacity>
      
            </Animatable.View>
                      
        </Animatable.View >
           

        </ScrollView>
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
       
        backgroundColor: '#fff',
        borderTopLeftRadius: 25 ,
        borderTopRightRadius: 25 ,
        paddingStart: '5%',
        paddingEnd: '5%',         
        justifyContent: 'flex-end'

        
      
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        marginBottom: 1,
        fontSize: 16,
        
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
