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

import { useForm, Controller } from 'react-hook-form';


import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';



export default function AtualizarUser() {
    const navigation = useNavigation()

    useEffect(() => {
        AsyncStorage.getItem('cpf').then(cpf => {
            setCpfView(cpf)
        });

    })
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({});

    const [cpfView, setCpfView] = useState();
    const refNome = useRef("nome");
    const refSobrenome = useRef("sobrenome");
    const refSenha = useRef("senha");
    const refRepetirSenha = useRef("repetirSenha");

    const handleSubmitAtualizarDados = async (data) => {
        try {
            const cpf = await AsyncStorage.getItem('cpf');
            const professorId = await AsyncStorage.getItem('professorId');
            if(data.name){
                await AsyncStorage.setItem('nome', data.nome);
            }

            await api.put(`/user/${cpf}`, {
                nome: data.nome,
                sobrenome: data.sobrenome,
                senha: data.senha
            })


            if (data.senha === data.repetirSenha) {

                await api.put(`/user/${cpf}`, {

                    senha: data.senha
                })



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
                    onPress: async () => professorId ? navigation.navigate("MainAluno") : navigation.navigate("MainProfessor")
                },
            ]);


        } catch (error) {
            console.log(error)

        }


    }



    return (
        <ScrollView style={styles.container}>


            <View style={styles.header}>
                <Text style={styles.textHeader}>Atualização de dados</Text>
                <Text style={styles.textHeader}>CPF: {cpfView}</Text>
  
            </View>
            <View style={styles.containerModal}>
                <Text style={styles.titleForm}>Nome</Text>
                <Controller
                    control={control}
                    name="nome"
                    render={({ field: { onChange, value, onBlur } }) => (
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
                    render={({ field: { onChange, value, onBlur } }) => (
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
                    render={({ field: { onChange, value, onBlur } }) => (
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
                    render={({ field: { onChange, value, onBlur } }) => (
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
                <TouchableOpacity onPress={handleSubmit(handleSubmitAtualizarDados)} style={styles.button2}>
                    <Text style={styles.textButton2}>Atualizar Dados</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
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
        paddingStart: 30, paddingTop: 5, backgroundColor: "#404040", borderRadius: 5
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
});
