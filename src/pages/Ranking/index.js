import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, FlatList, StyleSheet, RefreshControl, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';

import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';

export default function Ranking() {
  const [data, setData] = useState([]);
  const [cpf, setCpf] = useState();
  const [professorId, setProfessorId] = useState();
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    AsyncStorage.getItem('cpf').then(cpf => {
      setCpf(cpf);
    }, []);
    AsyncStorage.getItem('professorId').then(professorId => {
      setProfessorId(professorId);
    }, []);

  }, []);

  useEffect(() => {
    Dados();
  }, [cpf, professorId]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(async() => {
      await AsyncStorage.getItem('cpf').then(cpf => {
        setCpf(cpf);
      }, []);
      await AsyncStorage.getItem('professorId').then(professorId => {
        setProfessorId(professorId);
      }, []);
      
      await Dados();
      setRefreshing(false);
    }, 2000);
  }, []);

  async function Dados() {
    let newArray = [];
    if (professorId) {
      try {
        const response = await api.get(`/user/${professorId}`);

        newArray = response.data.alunos;
        newArray.sort(compare);
        setData(colocarId(newArray.slice(0, 10)));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        console.log('Nao Tem professor');

        const response = await api.get(`/user/${cpf}`);
        newArray = response.data.alunos;
        newArray.sort(compare);
        setData(colocarId(newArray.slice(0, 10)));
      } catch (error) {
        console.log(error);
      }
    }

    function compare(a, b) {
      if (a.pontuacao > b.pontuacao) return -1;
      if (a.pontuacao < b.pontuacao) return 1;
      return 0;
    }
    function colocarId(arr) {
      let newArrayComId = [];
      for (i = 0; i < arr.length; i++) {
        newArrayComId[i] = {id: i + 1, ...arr[i]};
        console.log(i);
      }
      console.log(newArrayComId);
      return newArrayComId;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
    
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Posição</Text>
        <Text style={styles.textHeader}>Nome</Text>
        <Text style={styles.textHeader}>Sobrenome</Text>
        <Text style={styles.textHeader}>Pontuação</Text>
      </View>
      <View>
      {
          data.map((item) => (
            <View style={styles.itens}>
              <Text style={item.cpf === cpf ? styles.textHeaderItsMe :  styles.textHeader}>{item.id}</Text>
              <Text style={item.cpf === cpf ? styles.textHeaderItsMe :  styles.textHeader}>{item.nome}</Text>
              <Text style={item.cpf === cpf ? styles.textHeaderItsMe :  styles.textHeader}>{item.sobrenome}</Text>
              <Text style={item.cpf === cpf ? styles.textHeaderItsMe :  styles.textHeader}>{item.pontuacao}</Text>
            </View>
          ))
      }
        {/* <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.itens}>
              <Text style={styles.textHeader}>{item.id}</Text>
              <Text style={styles.textHeader}>{item.nome}</Text>
              <Text style={styles.textHeader}>{item.sobrenome}</Text>
              <Text style={styles.textHeader}>{item.pontuacao}</Text>
            </View>
          )}
        /> */}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignSelf: 'center',
    height: 50,
    backgroundColor: '#001449',
  },
  itens: {
    flexDirection: 'row',
    alignSelf: 'center',
    height: 50,
    backgroundColor: '#404040',
  },
  textHeader: {
    padding: 10,
    borderWidth: 1,
    width: '25%',
    paddingStart: '4%',
    fontWeight: 'bold',
    color: '#fff',
  }, textHeaderItsMe: {
    padding: 10,
    borderWidth: 1,
    width: '25%',
    paddingStart: '4%',
    fontWeight: 'bold',
    color: 'rgb(255,0,0)',
  },
});
