import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  ScrollView,
  View,
  TextInput,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

export default function MainProfessor() {

  
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [nome, setNome] = useState();
  const [quantidadeDeAlunos, setQuantidadeDeAlunos] = useState(0);
  const [quantidadeDeCategorias, setQuantidadeDeCategorias] = useState(0);
  const [quantidadeDePerguntas, setQuantidadeDePerguntas] = useState(0);



  useEffect(() => {
    getDados();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(async () => {
      getDados();

      setRefreshing(false);
    }, 1000);
  }, []);

  async function getDados() {
    const cpf = await AsyncStorage.getItem('cpf');
    

    await AsyncStorage.getItem('nome').then(nome => {
      setNome(nome);
    }, []);

    try {
      getDadosUser(cpf);
    } catch (error) {
      console.log(error);
    }

    async function getDadosUser(user) {
      const response = await api.get(`/user/${user}`);
      console.log('response.data.categorias');
      console.log(response.data);
      setQuantidadeDeAlunos(response.data.alunos.length);
      setQuantidadeDeCategorias(response.data.categorias.length);
      setQuantidadeDePerguntas(response.data.perguntas.length);
    }
  }

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
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Animatable.View animation="fadeInDown" style={styles.header}>
        <Text style={styles.textHeader}> {`Bem vindo ${nome}`}</Text>
        <Text style={styles.textHeader2}>
          {' '}
          {`Quantidade de alunos: ${quantidadeDeAlunos}`}
        </Text>
        <Text style={styles.textHeader2}>
          {' '}
          {`Quantidade de categorias: ${quantidadeDeCategorias}`}
        </Text>
        <Text style={styles.textHeader2}>
          {`Quantidade de perguntas: ${quantidadeDePerguntas}`}
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
            onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.textInput}>Cadastro </Text>
          </TouchableOpacity>
              <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Ranking')}>
            <Text style={styles.textInput}>Mostrar rank</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Atualizar')}>
            <Text style={styles.textInput}>Atualizar dados</Text>
          </TouchableOpacity>

        
          <TouchableOpacity style={styles.button} onPress={handleSubmitSair}>
            <Text style={styles.textInput}>SAIR</Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
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
    backgroundColor: 'rgb(255,255,255)',
    paddingStart: '5%',
    paddingEnd: '5%',
    marginTop: '13%',
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
    //borderWidth: 1,
    backgroundColor: '#404040',
    // borderRadius: 25 ,
    borderWidth: 1,
    borderColor: '#404040',
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    marginBottom: 10,
    fontSize: 16,
    paddingStart: '25%',
    backgroundColor: '#fff',
  },
  textInputModal: {
    marginTop: '2%',
    marginBottom: '1%',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
    paddingStart: '5%',
    paddingEnd: '5%',
    marginTop: '13%',
    borderRadius: 5,

  },
  button2: {
    backgroundColor: '#404040',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 15,
  },
  textButton2: {
    color: '#fff',
  },
});
