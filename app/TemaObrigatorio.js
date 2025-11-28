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

        <View style={styles.titleBox}>
          <Text style={styles.sectionTitle}>O que é uma API?</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.text}>
            API significa <Text style={styles.bold}>Application Programming Interface</Text> (Interface de Programação de Aplicações). É um conjunto padronizado de métodos, regras e definições que permite que diferentes sistemas de software se comuniquem de forma estruturada.
          </Text>
          <Text style={styles.text}>
            Em termos práticos, uma API define <Text style={styles.bold}>como</Text> um serviço pode ser acessado, quais parâmetros aceita, quais formatos de resposta fornece (como JSON ou XML), e quais operações são permitidas.
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Analogia do restaurante:</Text> você (cliente) não precisa saber como o prato é preparado na cozinha (servidor). Basta consultar o cardápio (API), fazer o pedido (requisição), e receber o que pediu (resposta). O garçom é a interface — justamente o que a API faz.
          </Text>
        </View>

        <View style={styles.banner}>
          <Image
            source={require('../assets/API2.png')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.titleBox}>
          <Text style={styles.sectionTitle}>Exemplos Reais de APIs</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.exampleTitle}>Google Maps Platform API</Text>
          <Text style={styles.text}>
            Usada por aplicativos de logística, delivery e transporte. Permite incorporar mapas interativos, calcular rotas, estimar tempo de trânsito e geolocalizar endereços. A Uber, por exemplo, não constrói seus próprios mapas — integra via API.
          </Text>

          <Text style={styles.exampleTitle}>WhatsApp Business API</Text>
          <Text style={styles.text}>
            Oferecida pelo Meta para empresas. Permite envio automatizado de mensagens transacionais (ex: confirmação de compra, alertas de entrega), com templates pré-aprovados e suporte a respostas em escala. Garante conformidade com políticas de privacidade.
          </Text>

          <Text style={styles.exampleTitle}>OpenWeatherMap API</Text>
          <Text style={styles.text}>
            Fornece dados meteorológicos em tempo real: temperatura, umidade, vento, previsão por hora/dia. Apps como widgets de clima no celular ou sistemas agrícolas inteligentes consomem esses dados via requisições HTTP simples.
          </Text>

          <Text style={styles.exampleTitle}>Banco Central do Brasil — SGS API</Text>
          <Text style={styles.code}>
            https://api.bcb.gov.br/dados/serie/bcdata.sgs.1/dados?formato=json
          </Text>
          <Text style={styles.text}>
            Retorna a série histórica da taxa SELIC. Outros códigos (ex: 10813 = dólar) permitem construir dashboards econômicos sem raspagem manual de sites.
          </Text>
        </View>

        <View style={styles.banner}>
          <Image
            source={require('../assets/API3.png')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.titleBox}>
          <Text style={styles.sectionTitle}>Estrutura de uma Requisição HTTP</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.text}>
            {'• '}
            <Text style={styles.bold}>Endpoint</Text>
            {': Endereço único da operação. Ex: '}
            <Text style={styles.code}>https://api.exemplo.com/v1/users</Text>
          </Text>

          <Text style={styles.text}>
            {'• '}
            <Text style={styles.bold}>Método HTTP</Text>
            {': Define a ação desejada:'}
          </Text>
          <Text style={[styles.text, { paddingLeft: 24 }]}>
            – <Text style={styles.bold}>GET</Text>: recupera dados (somente leitura){'\n'}
            – <Text style={styles.bold}>POST</Text>: cria novo recurso{'\n'}
            – <Text style={styles.bold}>PUT</Text>: atualiza recurso existente completamente{'\n'}
            – <Text style={styles.bold}>PATCH</Text>: atualiza parcialmente{'\n'}
            – <Text style={styles.bold}>DELETE</Text>: remove recurso
          </Text>

          <Text style={styles.text}>
            {'• '}
            <Text style={styles.bold}>Headers</Text>
            {': Metadados da requisição. Exemplos comuns:'}
          </Text>
          <Text style={[styles.text, { paddingLeft: 24 }]}>
            – <Text style={styles.code}>Content-Type: application/json</Text>{'\n'}
            – <Text style={styles.code}>Authorization: Bearer xyz123</Text>{'\n'}
            – <Text style={styles.code}>Accept: application/json</Text>
          </Text>

          <Text style={styles.text}>
            {'• '}
            <Text style={styles.bold}>Body (corpo)</Text>
            {': Dados enviados no corpo da requisição (em POST/PUT/PATCH). Geralmente no formato:'}
          </Text>
          <Text style={styles.code}>
            {"{\n  \"nome\": \"Ana\",\n  \"email\": \"ana@email.com\",\n  \"ativo\": true\n}"}
          </Text>

          <Text style={styles.text}>
            {'• '}
            <Text style={styles.bold}>Resposta</Text>
            {': O servidor responde com código HTTP (ex: 200 = sucesso, 404 = não encontrado) e, geralmente, um corpo JSON. Exemplo de resposta bem-sucedida:'}
          </Text>
          <Text style={styles.code}>
            {"{\n  \"id\": 101,\n  \"nome\": \"Ana\",\n  \"status\": \"ativo\"\n}"}
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
    backgroundColor: '#f7fbff',
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
    marginBottom: 26,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  titleBox: {
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 18,
    borderWidth: 3,
    borderColor: '#bae6fd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    width: '100%',
    maxWidth: 540,
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 14,
    marginBottom: 28,
    borderWidth: 3,
    borderColor: '#dbeafe',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 5,
    width: '100%',
    maxWidth: 540,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: '800',
    color: '#1e40af',
  },
  exampleTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1d4ed8',
    marginTop: 16,
    marginBottom: 10,
    alignSelf: 'flex-start',
    paddingLeft: 4,
  },
  text: {
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 24,
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingLeft: 4,
    paddingRight: 10,
    marginBottom: 6,
  },
  bold: {
    fontWeight: '700',
    color: '#1d4ed8',
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 14,
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 6,
    color: '#0891b2',
    lineHeight: 20,
    alignSelf: 'flex-start',
    marginTop: 6,
    marginBottom: 12,
  },
});