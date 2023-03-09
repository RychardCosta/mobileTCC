import React from 'react';
import { View, Text , TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
export default function SignIn() {
  return (
    <View style={styles.container}> 
      <Animatable.View animation="fadeInLeft" style={styles.containerHeader}>
      <Text style={styles.message}> BEM-VINDO(a) </Text>
      </Animatable.View>
      <Animatable.View animation='fadeInRight' style={styles.containerForm}>
      <Text style={styles.title}>CPF </Text>
        <TextInput style={styles.input}></TextInput>  
      <Text style={styles.title}>Senha </Text>
        <TextInput style={styles.input}></TextInput>  
        <TouchableOpacity>
          <Text>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity>
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
    paddingStart: '5%'
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
    paddingEnd: '5%'
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
  }
});
