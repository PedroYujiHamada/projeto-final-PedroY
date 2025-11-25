import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.banner}>
          <Image
            source={require('../assets/API1.png')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.box}>
          <Text style={styles.sectionTitle}>📌 O que é uma API?</Text>
          <Text style={styles.text}>
            API significa {' '}
            <Text style={styles.bold}>Application Programming Interface</Text>
            {' '} (Interface de Programação de Aplicações). É um conjunto de regras e protocolos que permite que softwares se comuniquem.
          </Text>
          <Text style={styles.text}>
            Pense nela como um {' '}
            <Text style={styles.bold}>cardápio de restaurante</Text>
            {': você (cliente) não entra na cozinha (servidor), mas pode pedir pratos (dados/acoes) usando o cardápio (a API).'}
          </Text>
        </View>

        <View style={styles.banner}>
          <Image
            source={require('../assets/API2.png')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.box}>
          <Text style={styles.sectionTitle}>🔧 Exemplos Reais de APIs</Text>

          <Text style={styles.exampleTitle}>📍 Google Maps API</Text>
          <Text style={styles.text}>
            Apps como Uber ou iFood usam para mostrar mapas e rotas - sem recriar o Google Maps.
          </Text>

          <Text style={styles.exampleTitle}>📍 WhatsApp Business API</Text>
          <Text style={styles.text}>
            Empresas enviam mensagens automaticas (ex: confirmacao de entrega) via interface padronizada.
          </Text>

          <Text style={styles.exampleTitle}>📍 Banco Central (Brasil)</Text>
          <Text style={styles.code}>
            GET /dados/serie/bcdata.sgs.10813/dados?formato=json
          </Text>
          <Text style={styles.text}>
            Retorna cotacao do dolar em tempo real - usada por apps financeiros.
          </Text>

          <Text style={styles.sectionTitle}>🧩 Partes de uma Requisicao</Text>
          <Text style={styles.text}>
            {'• '}
            <Text style={styles.bold}>Endpoint</Text>
            {': URL especifica (ex: '}
            <Text style={styles.code}>/users/123</Text>
            {')'}
          </Text>
          <Text style={styles.text}>
            {'• '}
            <Text style={styles.bold}>Metodo</Text>
            {': GET, POST, PUT, DELETE'}
          </Text>
          <Text style={styles.text}>
            {'• '}
            <Text style={styles.bold}>Headers</Text>
            {': Metadados (ex: autenticacao)'}
          </Text>
          <Text style={styles.text}>
            {'• '}
            <Text style={styles.bold}>Body</Text>
            {': Dados enviados (ex: JSON)'}
          </Text>
          <Text style={styles.text}>
            {'• '}
            <Text style={styles.bold}>Resposta</Text>
            {': '}
            <Text style={styles.code}>{"{ \"nome\": \"Joao\" }"}</Text>
          </Text>
        </View>

        <StatusBar style="dark" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bbf3f9',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    height: 160,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  box: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 22,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    width: '100%',
    maxWidth: 520,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 12,
    alignSelf: 'flex-start',
    paddingLeft: 4,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976d2',
    marginTop: 12,
    alignSelf: 'flex-start',
    paddingLeft: 4,
  },
  text: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingLeft: 4,
    paddingRight: 10,
  },
  bold: {
    fontWeight: 'bold',
    color: '#1976d2',
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 14,
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    color: '#d32f2f',
  },
});