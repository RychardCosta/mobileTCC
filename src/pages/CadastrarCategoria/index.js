import React, { useState, useEffect } from 'react';
import {
  Alert,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';

import * as Animatable from 'react-native-animatable';

export default function CadastrarCategora() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const navigation = useNavigation();
  const height = useHeaderHeight();

  const [professorId, setProfessorId] = useState();

  useEffect(() => {
    AsyncStorage.getItem('cpf').then(cpf => {
      setProfessorId(cpf);
    }, []);
  });

  const handleSubmitCriarCategoria = async data => {
    const response = await api.post('/categoria', {
      categoria: data.categoria.toUpperCase(),
      professorId,
    });
    if (response.data.message === 'Categoria criada com sucesso.') {
      Alert.alert('Sucesso!', 'Categoria criada  com sucesso!.', [
        {
          text: 'Ok',
          onPress: () => navigation.navigate('MainProfessor'),
        },
      ]);
    } else {
      Alert.alert('Erro ao cadastrar', response.data.message, [
        {
          text: 'Ok',
          onPress: () => console.log('Botão 1 Pressionado'),
        },
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={height}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
      enabled>
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.titleForm}>Nome da categoria</Text>
        <Controller
          control={control}
          name="categoria"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
        />

        <Animatable.View animation="flipInY" delay={300}>
          <TouchableOpacity
            onPress={handleSubmit(handleSubmitCriarCategoria)}
            style={styles.button}>
            <Text style={styles.textButton}>Cadastrar categoria</Text>
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

  containerForm: {
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
