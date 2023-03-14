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

  const [categoria, setCategoria] = useState();
  const [professorId, setProfessorId] = useState();
  

  useEffect(() => {
    AsyncStorage.getItem('cpf').then(cpf => {
        setProfessorId(cpf)
         }, [])
});



  const handleSubimit = async () => {
    const response = await api.post('/categoria', {
      categoria,
      professorId
    });
    if(response.data.message === "Categoria criada com sucesso."){
      Alert.alert(
        'Sucesso!',
        'Categoria criada  com sucesso!.',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate("MainProfessor")
          }
       
        ]
      )
    }else{
      Alert.alert(
        'Erro ao cadastrar',
        response.data.message,
        [
          {
            text: 'Ok',
            onPress: () => console.log('Botão 1 Pressionado')
          }
       
        ]
      )

    }

  }


  return (
    <KeyboardAvoidingView
    keyboardVerticalOffset={height}
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    style={styles.container}
    enabled>
       
        <Animatable.View  animation="fadeInUp"  style={styles.containerForm}>
            <Text style={styles.titleForm}>Nome da categoria</Text>
            <TextInput 
            keyboardType='decimal-pad'
            onChangeText={setCategoria}
            style={styles.input} />
            
            <Animatable.View  animation="flipInY" delay={300}>
            <TouchableOpacity
            onPress={handleSubimit} 
            style={styles.button}><Text style={styles.textButton}>Cadastrar categoria</Text></TouchableOpacity>
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

    containerForm:{
        // /flex: 1,
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
        height: 40,
        marginBottom: 12,
        fontSize: 16
      },
      titleForm: {
        marginTop: '2%', 
        marginBottom: '1%',
        fontSize: 20,
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
