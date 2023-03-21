import React, {useState, useRef, useEffect} from 'react';
import {
  Alert,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {useHeaderHeight} from '@react-navigation/elements';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';

import * as Animatable from 'react-native-animatable';

import api from '../../services/api.js';

export default function CadastrarPergunta() {
  const [categoria, setCategoria] = useState([]);
  const [categoriaEscolhida, setCategoriaEscolhida] = useState([]);
  const refPergunta = useRef('pergunta');
  const refResposta = useRef('resposta');
  const refOpcao1 = useRef('opcao1');
  const refOpcao2 = useRef('opcao2');
  const refOpcao3 = useRef('opcao3');
  const refOpcao4 = useRef('opcao4');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({});
  const navigation = useNavigation();
  const height = useHeaderHeight();

  const handleSubmitCriarPergunta = async (data) => {
    console.log("categoriaEscolhida");
    console.log(categoriaEscolhida);
    try {
      const cpf = await AsyncStorage.getItem('cpf');

      const response = await api.post('pergunta', {
        pergunta: data.pergunta,
        resposta: data.resposta,
        categoriaName: categoriaEscolhida ? categoriaEscolhida : 'GERAL',
        professorId: cpf,
        opcao1: data.opcao1,
        opcao2: data.opcao2,
        opcao3: data.opcao3,
        opcao4: data.opcao4,
      });
      Alert.alert('Sucesso!', response.data.message, [
        {
          text: 'Ok',
          onPress: () => navigation.navigate('MainProfessor'),
        },
      ]);

      console.log(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro ao cadastrar aluno', response.data.message, [
        {
          text: 'Ok',
          onPress: () => console.log('Botão 1 Pressionado'),
        },
      ]);
    }
  };
  useEffect(() => {
    getDados();
  }, []);

  async function getDados() {
    const cpf = await AsyncStorage.getItem('cpf');

    try {
      await getDadosUser(cpf);
    } catch (error) {
      console.log(error);
    }

    async function getDadosUser(user) {
      const response = await api.get(`/user/${user}`);
      console.log('response.data.categorias');
      console.log(response.data);

      for (item of response.data.categorias) {
        setCategoria(oldArray => [...oldArray, item.categoria]);
      }
      console.log(categoria);
    }
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={height}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
      enabled>
      <ScrollView>
        <Animatable.View animation="fadeInUp" style={styles.containerForm}>
          <Text style={styles.titleForm}>Categoria</Text>
          <SelectDropdown
          defaultValueByIndex ={0}
            data={categoria}
            search={true}
            onSelect={(selectedItem, index) => {
              setCategoriaEscolhida(selectedItem);
              console.log(selectedItem, index);
              
            }}
          />
          {/* <Controller
            control={control}
            name="categoria"
            render={({field: {onChange, value, onBlur}}) => (
              <TextInput
              returnKeyType='next'
                style={styles.input}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                placeholder="PADRÃO GERAL"
                onSubmitEditing={() => refPergunta.current.focus()}
                
              />
            )}
          /> */}

          <Text style={styles.titleForm}>Pergunta</Text>
          <Controller
            control={control}
            name="pergunta"
            render={({field: {onChange, value, onBlur}}) => (
              <TextInput
                ref={refPergunta}
                returnKeyType="next"
                style={styles.input}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                onSubmitEditing={() => refResposta.current.focus()}
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
                returnKeyType="next"
                onSubmitEditing={() => refOpcao1.current.focus()}
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
          <Animatable.View animation="flipInY" delay={300}>
            <TouchableOpacity
              onPress={handleSubmit(handleSubmitCriarPergunta, categoriaEscolhida)}
              style={styles.button}>
              <Text style={styles.textButton}>Criar pergunta</Text>
            </TouchableOpacity>
          </Animatable.View>
        </Animatable.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  containerForm: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
    justifyContent: 'flex-end',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    marginBottom: 1,
    fontSize: 16,
  },
  titleForm: {
    marginTop: '2%',
    marginBottom: '1%',
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#404040',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 15,
  },
  textButton: {
    color: '#fff',
  },
});
