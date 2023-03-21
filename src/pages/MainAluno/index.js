import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,

  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

export default function MainProfessor() {


 
  const navigation = useNavigation();
  const [nome, setNome] = useState();





  useEffect(() => {
    AsyncStorage.getItem('nome').then(nome => {
      setNome(nome);
    }, []);
  
  }, []);

 



  const handleSubmitSair = async () => {
    try {
      await AsyncStorage.removeItem('cpf');
      await AsyncStorage.removeItem('nome');
      await AsyncStorage.removeItem('sobrenome');
      await AsyncStorage.removeItem('pontuacao');
      await AsyncStorage.removeItem('tipoDeConta');
      await AsyncStorage.removeItem('professorId');
      navigation.navigate('Welcome');
    } catch (error) {
      console.log(error);
      navigation.navigate('Welcome');
    }
  };

  return (
    <SafeAreaView>


      <Animatable.View animation="fadeInDown" style={styles.header}>
        <Text style={styles.textHeader}>
          {' '}
          {`Bem vindo ${nome}`}
        </Text>

        <Text style={styles.textHeader2}></Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.text}>Escolha uma das opções abaixo: </Text>
        <Animatable.View animation="flipInY" delay={300}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('CategoriaJogo')}>
            <Text style={styles.textInput}>Executar jogo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Ranking')}>
            <Text style={styles.textInput}>Mostrar rank</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AtualizarUser")}>
            <Text style={styles.textInput}>Atualizar dados</Text>
          </TouchableOpacity>




          <TouchableOpacity style={styles.button} onPress={handleSubmitSair}>
            <Text style={styles.textInput}>SAIR</Text>
          </TouchableOpacity>


        </Animatable.View>




      </Animatable.View>



    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    paddingStart: '25%',
    backgroundColor: '#404040',
  },
  textInput: {
    marginTop: '2%',
    marginBottom: '1%',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#fff',


    paddingStart: '5%',
    paddingEnd: '5%',
    marginTop: '20%',
    borderRadius: 5,
  },
  text: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  textHeader: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
  },
  textHeader2: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
  },
  header: {
    backgroundColor: '#404040',
    borderWidth: 1,
    borderColor: '#404040',
    borderRadius: 5,
  },
})

