import React, {useRef} from 'react';
import {
  Alert,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';
import * as Animatable from 'react-native-animatable';

export default function Signup() {
  const refNome = useRef("nome");
  const refSobrenome = useRef("sobrenome");
  const refSenha = useRef("senha");
  const refRepetirSenha = useRef("repetirSenha");
  const navigation = useNavigation();
  const height = useHeaderHeight();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({});
 

  const handleSubmitSignUp = async (data) => {
    try {
      await AsyncStorage.removeItem('cpf');
      await AsyncStorage.removeItem('nome');
      await AsyncStorage.removeItem('sobrenome');
      await AsyncStorage.removeItem('pontuacao');
      await AsyncStorage.removeItem('tipoDeConta');
      await AsyncStorage.removeItem('professorId');
    } catch (error) {
      console.log(error);
    }

    try {
      if (cpfIsValid(data.cpf)) {
        if (data.senha === data.repetirSenha) {
          const user = {
            cpf: data.cpf,
            nome: data.nome,
            sobrenome: data.sobrenome,
            tipoDeConta: 'professor',
            senha: data.senha,
          };
          const response = await api
            .post('/signup', user)
            .catch(error => console.log(error));
          if (response.data.message === 'Usuário já cadastrado!') {
            Alert.alert('ERRO DE CADASTRO', 'Usuário já cadastrado.', [
              {
                text: 'Ok',
                onPress: () => console.log('Botão 1 Pressionado'),
              },
            ]);
          } else {
            console.log(response.data.user);
            await AsyncStorage.setItem('cpf', response.data.user.cpf);
            await AsyncStorage.setItem('nome', response.data.user.nome);
            await AsyncStorage.setItem(
              'sobrenome',
              response.data.user.sobrenome,
            );
            await AsyncStorage.setItem(
              'tipoDeConta',
              response.data.user.tipoDeConta,
            );
            await AsyncStorage.setItem(
              'pontuacao',
              String.toString(response.data.user.pontuacao),
            );
            if (response.data.user.professorId) {
              await AsyncStorage.setItem(
                'professorId',
                response.data.user.professorId,
              );
            }
            navigation.navigate('MainProfessor');
          }
        } else {
          Alert.alert('Senhas não combinam', 'Verifique a senha digitada.', [
            {
              text: 'Ok',
              onPress: () => console.log('Botão 1 Pressionado'),
            },
          ]);
        }
      } else {
        Alert.alert('CPF inválido', 'CPF deve ter 11 digitos.', [
          {
            text: 'Ok',
            onPress: () => console.log('Botão 1 Pressionado'),
          },
        ]);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Verifique as informaões fornecidas', 'Dados incompletos.', [
        {
          text: 'Ok',
          onPress: () => console.log('Botão 1 Pressionado'),
        },
      ]);
    }

    function cpfIsValid(cpf) {
      if (cpf.length != 11) {
        console.log('CPF deve ter 11 digitos');
        return false;
      }
      console.log('Deu certo');
      return true;
    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={height}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
      enabled>
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
      <Text style={styles.titleForm}>CPF</Text>
          <Controller
            control={control}
            name="cpf"
            render={({field: {onChange, value, onBlur}}) => (
              <TextInput
              returnKeyType = "next"
                keyboardType="decimal-pad"
                style={styles.input}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                onSubmitEditing={() => refNome.current.focus()}
              />
            )}
          />
          <Text style={styles.titleForm}>Nome</Text>
          <Controller
          
            control={control}
            name="nome"
            render={({field: {onChange, value, onBlur}}) => (
              <TextInput
              returnKeyType = "next"
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
              returnKeyType = "next"
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
              returnKeyType = "next"
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
        <Animatable.View animation="flipInY" delay={300}>
          <TouchableOpacity onPress={handleSubmit(handleSubmitSignUp)} style={styles.button}>
            <Text style={styles.textButton}>Criar conta</Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
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
    // /flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
    marginTop: '20%',
    justifyContent: 'flex-end',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  titleForm: {
    marginTop: '2%',
    marginBottom: '1%',
    fontSize: 20,
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
