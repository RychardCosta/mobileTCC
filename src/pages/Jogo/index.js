import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

export default function Jogo({ route }) {
  const { categoriaID } = route.params;
  const navigation = useNavigation();
  const [pergunta, setPergunta] = useState('');
  const [opcao, setOpcao] = useState([]);
  const [message, setMessage] = useState('');
  const [resposta, setResposta] = useState('');
  const [pontos, setPontos] = useState(0);
  const [pontosObtidos, setPontosObtidos] = useState(0);

  const [perguntaId, setPerguntaId] = useState('');
  const [arrayPerguntas, setArrayPerguntas] = useState([]);
  const [load, setLoad] = useState(true);
  const [index, setIndex] = useState(0);
  const indexView = [0, 1, 2, 3, 4];
  shuffleArray(indexView);

  useEffect(() => {
    GerarPergunta();
  }, [index])

  async function GerarPergunta() {
    const cpf = await AsyncStorage.getItem('cpf');
    const professorId = await AsyncStorage.getItem('professorId');
    let response = [];
    setLoad(true)

    if (cpf) {
      professorId
        ? (response = await api.get(
          `/pergunta/gerar/${professorId}?verificarPerguntasRepetidas=true&alunoId=${cpf}&categoriaID=${categoriaID}`
        ))
        : (response = await api.get(`/pergunta/gerar/${cpf}?categoriaID=${categoriaID}`));
      for (let i = 0; i < response.data.perguntas.length; i++) {
        setArrayPerguntas(oldArray => [response.data.perguntas]);
        try {
          setPerguntaId(response.data.perguntas[0].id);
          setPontos(response.data.perguntas[0].valorDaPontuacao);
          setMessage(response.data.message);
          setPergunta(response.data.perguntas[0].pergunta);
          setResposta(response.data.perguntas[0].resposta);
          setOpcao(oldArray => [response.data.perguntas[0].resposta]);
          setOpcao(oldArray => [
            ...oldArray,
            response.data.perguntas[0].opcao1,
          ]);
          setOpcao(oldArray => [
            ...oldArray,
            response.data.perguntas[0].opcao2,
          ]);
          setOpcao(oldArray => [
            ...oldArray,
            response.data.perguntas[0].opcao3,
          ]);
          setOpcao(oldArray => [
            ...oldArray,
            response.data.perguntas[0].opcao4,
          ]);
          setLoad(false);
          console.log('Pergunta gerada front ');
          console.log(cpf);
          break;

        } catch (erro) {
          console.log(erro);
        }
      }

    } else {

    }




  }


  const verificarResposta = async opcaEscolhida => {
    const cpf = await AsyncStorage.getItem('cpf');
    const professorId = await AsyncStorage.getItem('professorId');
    console.log('Pergunta Id');
    console.log(perguntaId);

    await api.post(`/responderPergunta/${perguntaId}`, {
      respostaEscolhida: opcaEscolhida,
      alunoId: cpf,
    });

    if (opcaEscolhida === resposta) {
      setPontosObtidos(pontosObtidos + pontos);
      console.log(`Resposta certa: ${opcaEscolhida}`);
      Alert.alert('Resposta certa', `Resposta certa: ${opcaEscolhida}`, [
        {
          text: 'Menu iniciar',
          onPress: () =>
            professorId
              ? navigation.navigate('MainAluno')
              : navigation.navigate('MainProfessor'),
        },
        {
          text: 'Continuar',
          onPress: () => {
            if (arrayPerguntas.length == 0) {
              console.log('Sem mais');
            } else {
              setIndex(index + 1);
            }
          },
        },
      ]);
    } else {
      Alert.alert(
        'Resposta errada',
        `Resposta errada. Pontos obtidos: ${pontosObtidos}`,
        [
          {
            text: 'Menu iniciar',
            onPress: () =>
              professorId
                ? navigation.navigate('MainAluno')
                : navigation.navigate('MainProfessor'),
          },
        ],
      );
      console.log(`Resposta errada: Opção certa ${resposta}`);
    }
  };

  function shuffleArray(arr) {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i--) {
      // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
  }

  return (
    <View
      style={styles.container}
    >
      <View style={styles.perguntaForm}>
        <Text style={{ fontSize: 15, color: '#rgb(200,0,0)' }}>
          {' '}
          {load ? '' : message}{' '}
        </Text>
        <Text style={styles.textPergunta}>
          {' '}
          {load ? 'Carregando' : pergunta}{' '}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.buttom}
          onPress={() => verificarResposta(opcao[indexView[0]])}>
          <Text style={styles.textButton}>
            {load ? '' : opcao[indexView[0]]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttom}
          onPress={() => verificarResposta(opcao[indexView[1]])}>
          <Text style={styles.textButton}>
            {load ? '' : opcao[indexView[1]]}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttom}
          onPress={() => verificarResposta(opcao[indexView[2]])}>
          <Text style={styles.textButton}>
            {load ? '' : opcao[indexView[2]]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttom}
          onPress={() => verificarResposta(opcao[indexView[3]])}>
          <Text style={styles.textButton}>
            {load ? '' : opcao[indexView[3]]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttom}
          onPress={() => verificarResposta(opcao[indexView[4]])}>
          <Text style={styles.textButton}>
            {load ? '' : opcao[indexView[4]]}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0310',
  },
  buttom: {
    backgroundColor: '#rgba(255,255,255,0.9)',
    borderWidth: 1,
    borderRadius: 15,
    height: 60,
    fontSize: 16,
    paddingStart: '5%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 15,
  },
  perguntaForm: {
    height: '20%',
    marginTop: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: '#404040',
    borderRadius: 5,
  },
  buttonsContainer: {
    paddingStart: '5%',
    height: 600,
    paddingTop: 30,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  textPergunta: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  textButton: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
});
