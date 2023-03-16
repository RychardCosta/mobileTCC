import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/native'

export default function MainAluno() {
  const navigation = useNavigation();

  return (
    <View>
        <TouchableOpacity style={styles.input} onPress={() => navigation.navigate("Jogo")}>
          <Text style={styles.textInput}>Executar jogo</Text>
          </TouchableOpacity>
     </View>
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

