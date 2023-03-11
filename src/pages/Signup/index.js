import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

import * as Animatable from 'react-native-animatable';


export default function Signup() {
  return (
    <View style={styles.container}>
        <Animatable.View  animation="fadeInDown" style={styles.containerTitle}>
            <Text style={styles.title}>Cadastro</Text>
        </Animatable.View >
        <Animatable.View  animation="fadeInUp"  style={styles.containerForm}>
            <Text style={styles.titleForm}>CPF</Text>
            <TextInput style={styles.input} />
            <Text style={styles.titleForm}>Nome</Text>
            <TextInput style={styles.input} />          
            <Text style={styles.titleForm}>Sobrenome</Text>
            <TextInput style={styles.input} />            
            <Text style={styles.titleForm}>Senha</Text>
            <TextInput style={styles.input} />            
            <Text style={styles.titleForm}>Repita a senha</Text>
            <TextInput style={styles.input} />
            <Animatable.View  animation="flipInY" delay={300}>
            <TouchableOpacity style={styles.button}><Text style={styles.textButton}>Criar conta</Text></TouchableOpacity>
            </Animatable.View>
                      
        </Animatable.View >
           

      
     </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#404040'
    },
    containerTitle: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
        
      
    },
    title : {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold',
        
    },
    containerForm:{
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25 ,
        borderTopRightRadius: 25 ,
        paddingStart: '5%',
        paddingEnd: '5%'
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
      },
      textButton:{
        color: "#fff"
      }
    
})
