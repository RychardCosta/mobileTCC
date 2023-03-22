import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Atualizar() {
  const navigation = useNavigation();
  const [hasNotProfessorId, setHasNotProfessorId] = useState(false);

  useEffect(() => {
    checkProfessorId()
    })
    
 
 

  const checkProfessorId = async () => {
    const  professorId = await AsyncStorage.getItem("professorId")
      if(professorId === null)
      setHasNotProfessorId(true)
  }





  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AtualizarUser')}>
          <Text style={styles.textButton}>Atualizar meu usuário</Text>
        </TouchableOpacity>
          <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AtualizarAluno')}>
          <Text style={styles.textButton}>Atualizar alunos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AtualizarCategoria')}>
          <Text style={styles.textButton}>Atualizar categoria</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AtualizarPergunta')}>
          <Text style={styles.textButton}>Atualizar pergunta</Text>
        </TouchableOpacity>
      </View>
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
  textButton: {
    marginTop: '2%',
    marginBottom: '1%',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  containerButton: {
    flex: 1,
    backgroundColor: '#fff',

    paddingStart: '5%',
    paddingEnd: '5%',
    marginTop: '20%',
    borderRadius: 5,
  },
});
