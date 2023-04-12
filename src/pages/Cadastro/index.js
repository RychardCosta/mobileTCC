import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
   SafeAreaView,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';



export default function Cadastro() {
  const navigation = useNavigation();





  return (
    <SafeAreaView style={styles.container}>
   
        <View style={styles.view}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("SignupAluno")}>
            <Text style={styles.text}>Cadastrar aluno</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CadastrarCategoria")}>
            <Text style={styles.text}>Cadastrar categoria</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CadastrarPergunta")}>
            <Text style={styles.text}>Cadastrar pergunta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CadastrarEstudo")}>
            <Text style={styles.text}>Cadastrar estudo</Text>
          </TouchableOpacity>
        </View>
 
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',

    height: '80%',
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  text: {
    marginTop: '2%',
    marginBottom: '1%',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    marginBottom: 15,

    fontSize: 16,
    paddingStart: '25%',
    backgroundColor: '#404040',
  },
  view: {
    marginTop: 40,
   
  }
});
