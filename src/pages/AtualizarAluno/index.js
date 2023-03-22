import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  ScrollView,
  View,
  TextInput,
  Alert,
} from 'react-native';

import {useForm, Controller} from 'react-hook-form';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';

import {useNavigation} from '@react-navigation/native';

import api from '../../services/api';

export default function AtualizarAluno() {
  const navigation = useNavigation();


  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({});

  const [cpfSelected, setCpfSelected] = useState();
  const [data, setData] = useState([]);
  const refNome = useRef('nome');
  const refSobrenome = useRef('sobrenome');
  const refSenha = useRef('senha');
  const refRepetirSenha = useRef('repetirSenha');

  useEffect(() => {
    GetUsers()
    }, []);


  async function GetUsers(){
    const cpf = await AsyncStorage.getItem("cpf");
    const response = await api.get(`/user/${cpf}`);

    for(item of response.data.alunos)
    setData(oldArray => [...oldArray, item.cpf]);
    
  }

  const handleSubmitAtualizarDados = async data => {
    try {
      
      const professorId = await AsyncStorage.getItem('professorId');
      if (data.name) {
        await AsyncStorage.setItem('nome', data.nome);
      }

      await api.put(`/user/${cpfSelected}`, {
        nome: data.nome,
        sobrenome: data.sobrenome,
      });

      if (data.senha === data.repetirSenha) {
        await api.put(`/user/${cpfSelected}`, {
          senha: data.senha,
        });
      } else {
        Alert.alert('Senhas não combinam', 'Verifique a senha digitada.', [
          {
            text: 'Ok',
            onPress: () => console.log('Botão 1 Pressionado'),
          },
        ]);
      }

      Alert.alert('Sucesso', 'Atualizado com sucesso.', [
        {
          text: 'Ok',
          onPress: async () =>
            professorId
              ? navigation.navigate('MainAluno')
              : navigation.navigate('MainProfessor'),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitExcluir = async data => {
    try {
      const selectedCpf = await AsyncStorage.getItem("selectedCpf")
      if (selectedCpf) {
        
        Alert.alert('Alerta', 'Deseja exluir o aluno?.', [
          {
            text: 'Excluir',
            onPress: async () => {
              await api.delete(`/user/${selectedCpf}`)
              console.log("Excluido com sucesso")
              navigation.navigate("Atualizar")
            },
          },
          {
            text: 'Cancelar',
            onPress: async () => {
              console.log("Excluido com sucesso")
              
            },
          },
        ]);
      
      }


   
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
     
      <View style={styles.containerModal}>
        <Text style={styles.titleForm}>CPF</Text>
      <SelectDropdown
                       
          defaultButtonText="Alunos"     
          defaultValueByIndex ={0}
            data={data}
            search={true}
            onSelect={async (selectedItem, index) => {
              await AsyncStorage.setItem("selectedCpf",selectedItem);
              console.log(selectedItem, index);          
            }}
          />

        <Text style={styles.titleForm}>Nome</Text>
        <Controller
          control={control}
          name="nome"
          render={({field: {onChange, value, onBlur}}) => (
            <TextInput
              returnKeyType="next"
              ref={refNome}
              style={styles.input}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              onSubmitEditing={() => refSobrenome.current.focus()}
            />
          )}
        />

        <Text style={styles.titleForm}>Sobrenome</Text>
        <Controller
          control={control}
          name="sobrenome"
          render={({field: {onChange, value, onBlur}}) => (
            <TextInput
              returnKeyType="next"
              ref={refSobrenome}
              style={styles.input}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              onSubmitEditing={() => refSenha.current.focus()}
            />
          )}
        />
        <Text style={styles.titleForm}>Senha</Text>
        <Controller
          control={control}
          name="senha"
          render={({field: {onChange, value, onBlur}}) => (
            <TextInput
              returnKeyType="next"
              ref={refSenha}
              secureTextEntry={true}
              style={styles.input}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              onSubmitEditing={() => refRepetirSenha.current.focus()}
            />
          )}
        />

        <Text style={styles.titleForm}>Repita a senha</Text>
        <Controller
          control={control}
          name="repetirSenha"
          render={({field: {onChange, value, onBlur}}) => (
            <TextInput
              ref={refRepetirSenha}
              secureTextEntry={true}
              style={styles.input}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
        />
        <TouchableOpacity
          onPress={handleSubmit(handleSubmitAtualizarDados)}
          style={styles.button2}>
          <Text style={styles.textButton2}>Atualizar Dados</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit(handleSubmitExcluir)}
          style={styles.button2}>
          <Text style={styles.textButton2}>Exluir aluno</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
  },

  textHeader: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 3,
    marginTop: 5,
  },
  header: {
    paddingStart: 30,
    paddingTop: 5,
    backgroundColor: '#404040',
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
    marginTop: '1%',
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
    marginTop: '8%',
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
  titleForm: {
    color: "#000"
  }
});
