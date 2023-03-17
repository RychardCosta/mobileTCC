import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

export default function Ranking() {
  const [posicao, setPosicao] = React.useState(0);
  const data = [
    {id: 0, nome: 'Rychard', sobrenome: 'Costa', pontuação: 100},
    {id: 0, nome: 'Carlos', sobrenome: 'Jose', pontuação: 90},
    {id: 0, nome: 'Fabio', sobrenome: 'Lima', pontuação: 160},
    {id: 0, nome: 'Fabio', sobrenome: 'Lima', pontuação: 15},
  ];
  data.sort(compare);
  mudarId(data);

  function compare(a, b) {
    if (a.pontuação > b.pontuação) return -1;
    if (a.pontuação < b.pontuação) return 1;
    return 0;
  }

  function mudarId(d) {
    for (let i = 0; i < d.length; i++) {
      d[i].id = i + 1;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Posição</Text>
        <Text style={styles.textHeader}>Nome</Text>
        <Text style={styles.textHeader}>Sobrenome</Text>
        <Text style={styles.textHeader}>Pontuação</Text>
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.itens}>
              <Text style={styles.textHeader}>{item.id}</Text>
              <Text style={styles.textHeader}>{item.nome}</Text>
              <Text style={styles.textHeader}>{item.sobrenome}</Text>
              <Text style={styles.textHeader}>{item.pontuação}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignSelf: 'center',
    height: 50,
    backgroundColor: '#001449',
  },
  itens: {
    flexDirection: 'row',
    alignSelf: 'center',
    height: 50,
    backgroundColor: '#00b4fc',
  },
  textHeader: {
    padding: 10,
    borderWidth: 1,
    width: '25%',
    paddingStart: '4%',
    fontWeight: 'bold',
    color: '#fff',
  },
});
