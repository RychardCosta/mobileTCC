import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api';

export default function CategoriaJogo() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    categorias();
  }, []);

  const categorias = async () => {
    const cpf = await AsyncStorage.getItem('cpf');
    const professorId = await AsyncStorage.getItem('professorId');

    if (professorId) {
      try {
        getDados(professorId);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        getDados(cpf);
      } catch (error) {
        console.log(error);
      }
    }
    async function getDados(user) {
      const response = await api.get(`/user/${user}`);
      console.log('response.data.categorias');
      console.log(response.data.categorias);
      setDados(response.data.categorias);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ marginTop: 15}}>
       
        {dados.map(item => (
          <View style={{flex: 1, height: 60}}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>{item.categoria}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
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
   
    fontSize: 16,
    paddingStart: '25%',
    backgroundColor: '#404040',
    
   
  },

});
