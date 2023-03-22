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
  const refCategoria = useRef('categoria');
 

  useEffect(() => {
    GetCategorias()
    }, []);

    async function GetCategorias() {
      const cpf = await AsyncStorage.getItem("cpf")
      const response = await api.get(`/user/${cpf}`);
      console.log('response.data.categorias');
      console.log(response.data);

      for (item of response.data.categorias) {
        setCategoria(oldArray => [...oldArray, item.categoria]);
      }
      console.log(categoria);
    }
  

  const handleSubmitAtualizarDados = async data => {
    try {
      
      const response = await api.put(`/categoria`, {
        nomeDaCategoria: categoriaSelected,
        novaCategoria: data.categoria.toUpperCase()
    
      });
      if(response.data.message === "Categoria já cadastrada"){
        Alert.alert('Error', 'Categoria já cadastrada".', [
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
    
      
      
    } 
  catch (error) {
      
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
     
      <View style={styles.containerModal}>
        <Text style={styles.titleForm}>CATEGORIA</Text>
      <SelectDropdown
                       
          defaultButtonText="Categoria"     
          defaultValueByIndex ={0}
            data={categoria}
            search={true}
            onSelect={(selectedItem, index) => {
              setCategoriaSelected(selectedItem);
              console.log(selectedItem, index);          
            }}
          />

        <Text style={styles.titleForm}>Nome da categoria</Text>
        <Controller
          control={control}
          name="categoria"
          render={({field: {onChange, value, onBlur}}) => (
            <TextInput
             
              ref={refCategoria}
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
    color: "#000"
  }
});
