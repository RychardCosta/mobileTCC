import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';

export default function Welcome() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Animatable.Image
          animation="flipInY"
          style={{right: '60%'}}
          source={require('../../assets/logo.jpg')}
        />
      </View>
      <Animatable.View
        delay={600}
        animation="fadeInUp"
        style={styles.containerForm}>
        <Text style={styles.textTitleStyle}>
          "Ponha à prova o seu QI neste jogo quiz divertido!"
        </Text>
        <Text style={styles.textStyle}>Faça o login para começar!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.textButton}>Acessar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#404040',
  },
  containerTitle: {
    flex: 2,
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: '12%',
    paddingTop: '12%',
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  titleStyle: {
    color: 'rgb(255,255,255)',
    fontStyle: 'italic',
    fontSize: 45,
    fontWeight: `bold`,
  },
  textTitleStyle: {
    color: 'rgb(0,0,0)',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
  },
  button: {
    position: 'absolute',
    backgroundColor: '#404040',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
