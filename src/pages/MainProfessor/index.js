import React , {useState,useEffect, useCallback} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, RefreshControl , ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



import {useNavigation} from '@react-navigation/native'
import api from '../../services/api'


export default function MainProfessor() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();
  const [quantidadeDeAlunos, setQuantidadeDeAlunos] =useState();
  const [quantidadeDeCategorias, setQuantidadeDeCategorias] =useState();
  const [quantidadeDePerguntas, setQuantidadeDePerguntas] =useState();
  const navigation = useNavigation();

 

  useEffect( () => {
    AsyncStorage.getItem('nome').then(nome => {
      setNome(nome)
         }, [])
    AsyncStorage.getItem('cpf').then(cpf => {
      setCpf(cpf)
         }, [])
         Alunos()
         Categorias()
         Perguntas()

 
        });

        const onRefresh = useCallback(() => {
          setRefreshing(true);
          setTimeout(() => {
            setRefreshing(false);
          }, 1000);
        }, []);

        async function Alunos(){
         try {
          const response = await api.get(`/user/${cpf}`).catch(error => console.log(error));
          const array = response.data.alunos;
          
          setQuantidadeDeAlunos(array.length);

         } catch (error) {
          console.log(error)
          setQuantidadeDeAlunos(0);
         } 
        }
       
        async function Categorias(){
         try {
          const response = await api.get(`/categoria?professorId=${cpf}`).catch(error => console.log(error));
          const array = response.data.categoria;  
          setQuantidadeDeCategorias(array.length);

         } catch (error) {
          console.log(error)
          setQuantidadeDeCategorias(0);
          
         } 
        }
        
        async function Perguntas(){
         try {
          const response = await api.get(`/pergunta/${cpf}`).catch(error => console.log(error));
          const array = response.data.pergunta;
          setQuantidadeDePerguntas(array.length);

         } catch (error) {
          console.log(error)
          setQuantidadeDePerguntas(0)
         } 
        }
       
        const handleSubmitSair = async () =>{
          try {  await AsyncStorage.removeItem('cpf');
          await AsyncStorage.removeItem('nome');
          await AsyncStorage.removeItem('sobrenome');
          await AsyncStorage.removeItem('pontuacao');
          await AsyncStorage.removeItem('tipoDeConta');
          await AsyncStorage.removeItem('professorId');
          navigation.navigate("Welcome")
          
          
        } catch (error) {
          console.log(error)
          navigation.navigate("Welcome")
            
          }
        
       

        }

     
                    

  return (
    <ScrollView 
     style={styles.container} 
     refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <View>
        <Text style={styles.textHeader}> Bem vindo {nome} </Text>
        <Text style={styles.textHeader2}> Quantidade de alunos: {quantidadeDeAlunos}</Text>
        <Text style={styles.textHeader2}> Quantidade de categorias: {quantidadeDeCategorias}</Text>
        <Text style={styles.textHeader2}> Quantidade de perguntas: {quantidadeDePerguntas}</Text>
      </View>
      <View style={styles.containerForm}>
        <Text style={styles.text}>Escolha uma das opções abaixo</Text>
        <TouchableOpacity style={styles.input} onPress={() => navigation.navigate("Jogo")}>
          <Text style={styles.textInput}>Executar jogo</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.input} onPress={() => navigation.navigate("SignupAluno")}>
          <Text style={styles.textInput}>Cadastrar aluno</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.input} onPress={() => navigation.navigate("CadastrarCategoria")}>
          <Text style={styles.textInput}>Cadastrar categoria</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.input} onPress={() => navigation.navigate("CadastrarPergunta")}>
          <Text style={styles.textInput}>Cadastrar pergunta</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.input}>
          <Text style={styles.textInput}>Mostrar rank</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.input}>
          <Text style={styles.textInput} onPress={handleSubmitSair}>SAIR</Text>
          </TouchableOpacity>

          <TouchableOpacity><Text>Oi</Text></TouchableOpacity>
      </View>
     </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1 ,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    paddingStart: "25%",
    
  }, 
  textInput: {
      color:"#000",
      marginTop: '2%', 
      marginBottom: '1%',
      fontSize: 20,
      fontWeight: 'bold'
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25 ,
    borderTopRightRadius: 25 ,
    paddingStart: '5%',
    paddingEnd: '5%',
    marginTop: "20%",
    marginBottom: "10%"
  },
  text:{
    color: "#000",
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25
  },
  textHeader:{
    color: "#000",
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10
  },
  textHeader2:{
    color: "#000",
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10
  },
})


