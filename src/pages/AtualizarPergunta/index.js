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

export default function AtualizarCategoria() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({});

  const [categoriaSelected, setCategoriaSelected] = useState();
  const [categoria, setCategoria] = useState([]);
  const [perguntaSelected, setPerguntaSelected] = useState();
  const [pergunta, setPergunta] = useState([]);
  const [perguntaComId, setPerguntaComId] = useState([]);
  const refPergunta = useRef('pergunta');
  const refResposta = useRef('resposta');
  const refOpcao1 = useRef('opcao1');
  const refOpcao2 = useRef('opcao2');
  const refOpcao3 = useRef('opcao3');
  const refOpcao4 = useRef('opcao4');

  useEffect(() => {
    GetCategorias();
    GetPerguntas();
  }, []);

  async function GetCategorias() {
    const cpf = await AsyncStorage.getItem('cpf');
    const response = await api.get(`/user/${cpf}`);
    console.log('response.data.categorias');
    console.log(response.data);

    for (item of response.data.categorias) {
      setCategoria(oldArray => [...oldArray, item.categoria]);
    }
    console.log(categoria);
  }
  async function GetPerguntas() {
    const cpf = await AsyncStorage.getItem('cpf');
    const response = await api.get(`/user/${cpf}`);
    console.log('response.data.categorias');
    console.log(response.data);

    for (item of response.data.perguntas) {
      setPergunta(oldArray => [...oldArray, item.pergunta]);
      setPerguntaComId(oldArray => [
        ...oldArray,
        {id: item.id, pergunta: item.pergunta},
      ]);
    }
    console.log(categoria);
  }

  const handleSubmitAtualizarDados = async data => {
    try {
      const perguntaSelectedComId = perguntaComId.find(
        e => e.pergunta === perguntaSelected,
      ).id;

      const response = await api.put(`/pergunta/${perguntaSelectedComId}`, {
        newCategoria: categoriaSelected,
        novaPergunta: data.pergunta,
        novaResposta: data.resposta,
        novaOpcao1: data.opcao1,
        novaOpcao2: data.opcao2,
        novaOpcao3: data.opcao3,
        novaOpcao4: data.opcao4,
      });
      if(response.data.message === "Pergunta já cadastrada"){
        Alert.alert('Error', 'Pergunta já cadastrada".', [
          {
            text: 'Ok',
            onPress: async () => console.log("pressionaod")
             
          },
        ]);

      }else{
        Alert.alert('Sucesso', 'Atualizado com sucesso.', [
          {
            text: 'Ok',
            onPress: async () => navigation.navigate('MainProfessor'),
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
        <SelectDropdown
          defaultButtonText="Categoria"
          defaultValueByIndex={0}
          data={categoria}
          search={true}
          onSelect={(selectedItem, index) => {
            setCategoriaSelected(selectedItem);
            console.log(selectedItem, index);
          }}
        />
        <SelectDropdown
          defaultButtonText="Pergunta"
          defaultValueByIndex={0}
          data={pergunta}
          search={true}
          onSelect={(selectedItem, index) => {
            setPerguntaSelected(selectedItem);
            console.log(selectedItem, index);
          }}
        />

        <Text style={styles.titleForm}>Pergunta</Text>
        <Controller
          control={control}
          name="pergunta"
          render={({field: {onChange, value, onBlur}}) => (
            <TextInput
              ref={refPergunta}
              style={styles.input}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
        />
        <Text style={styles.titleForm}>Resposta</Text>
        <Controller
          control={control}
          name="resposta"
          render={({field: {onChange, value, onBlur}}) => (
            <TextInput
              ref={refResposta}
              style={styles.input}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
        />
        <Text style={styles.titleForm}>Opção 1</Text>
        <Controller
          control={control}
          name="opcao1"
          render={({field: {onChange, value, onBlur}}) => (
            <TextInput
              ref={refOpcao1}
              onSubmitEditing={() => refOpcao2.current.focus()}
              returnKeyType="next"
              style={styles.input}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
        />
        <Text style={styles.titleForm}>Opção 2</Text>
        <Controller
          control={control}
          name="opcao2"
          render={({field: {onChange, value, onBlur}}) => (
            <TextInput
              ref={refOpcao2}
              onSubmitEditing={() => refOpcao3.current.focus()}
              returnKeyType="next"
              style={styles.input}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
        />
        <Text style={styles.titleForm}>Opção 3</Text>
        <Controller
          control={control}
          name="opcao3"
          render={({field: {onChange, value, onBlur}}) => (
            <TextInput
              ref={refOpcao3}
              onSubmitEditing={() => refOpcao4.current.focus()}
              returnKeyType="next"
              style={styles.input}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
        />
        <Text style={styles.titleForm}>Opção 4</Text>
        <Controller
          control={control}
          name="opcao4"
          render={({field: {onChange, value, onBlur}}) => (
            <TextInput
              ref={refOpcao4}
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
    color: '#000',
  },
});
