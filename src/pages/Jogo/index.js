import React, {useState, useLayoutEffect} from 'react';
import { View, Text , ScrollView, TouchableOpacity, StyleSheet, RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api'

export default function Jogo() {
  const [refreshing, setRefreshing] = React.useState(false);

  const [pergunta, setPergunta] = useState("");
  const [opcao1, SetOpcao1] = useState("Opcao 1");
  const [opcao2, SetOpcao2] = useState("Opcao 2");
  const [opcao3, SetOpcao3] = useState("Opcao 3");
  const [opcao4, SetOpcao4] = useState("Opcao 4");
  const [opcao5, SetOpcao5] = useState("Opcao 5");
  const [resposta, setResposta] = useState("Opcao 5");
  const [cpf, setCpf] = useState("Opcao 5");
  const [arrayPerguntas, setArrayPerguntas] = useState([]);
  const [load, setLoad]= useState()
  const [index, setIndex]= useState(0)
  




  useLayoutEffect(()=>{
      AsyncStorage.getItem('cpf').then(cpf => {
        setCpf(cpf)
           }, [])
           GerarPergunta()
   

    async function GerarPergunta(){

      const response =  await api.get(`/pergunta/gerar/${cpf}`)


      for(let i = 0;i <2; i++ ){
        setArrayPerguntas(response.data.perguntas)
        try{
          setPergunta(response.data.perguntas[0].pergunta)
          console.log(response.data.perguntas)
       
        }catch(erro){
          console.log(erro)
        }
        
      }
     

      if(arrayPerguntas != response.data.perguntas){
        setLoad(load+ 1)


      }

    
    }
      }, [load, index])
      

      const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      }, []);




  const verificarResposta = (opcaEscolhida) => {
    if(opcaEscolhida === resposta){
      console.log(`Resposta certa: ${opcaEscolhida}`)
    }else{
      console.log(`Resposta errada: Opção certa ${resposta}`)
      
    }
    if(arrayPerguntas.length  == 0 ){
      console.log("Sem mais")
    } else{
    setIndex(index + 1)
  }
}






  return (
    <ScrollView style={styles.container} 
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.perguntaForm}> 
      <Text> Pergunta: {pergunta} </Text>

      </View>
      <View style={styles.buttonsContainer}>
      <TouchableOpacity style={styles.buttom} onPress={() => verificarResposta(opcao1)} >
        <Text>{opcao1}</Text>
        </TouchableOpacity>
      <TouchableOpacity style={styles.buttom} onPress={() => verificarResposta(opcao2)}>
        <Text>{opcao2}</Text>
      </TouchableOpacity>
   
      <TouchableOpacity style={styles.buttom} onPress={()=> verificarResposta(opcao3)}>
        <Text>{opcao3}</Text>
      </TouchableOpacity>
          <TouchableOpacity style={styles.buttom} onPress={() =>verificarResposta(opcao4)}>
        <Text>{opcao4}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttom} onPress={() => verificarResposta(opcao5)}>

        <Text>{opcao5}</Text>
      </TouchableOpacity>
      </View>
     </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  buttom: {
    borderWidth: 1,
    borderRadius: 5,
    height: 60,
    marginBottom: 12,
    fontSize: 16,
    paddingStart: "25%",
  },
  perguntaForm: {
    height: "30%",
    marginTop: 10,
  //  backgroundColor: "#404040"
  },
  buttonsContainer:{
   // backgroundColor: "rgb(0,0,255)",
    paddingStart: "5%",
    height: 600,
    paddingTop: 30,
    paddingStart: "5%",
    paddingEnd: "5%"
    

  }
});