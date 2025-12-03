import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, Platform } from 'react-native';

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
          <Text style={styles.sectionTitle}>O que é uma API?:</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.text}>
            API significa <Text style={styles.bold}>Application Programming Interface</Text> (Interface de Programação de Aplicações). É um conjunto organizado de regras que permite que dois sistemas conversem de maneira clara e padronizada.
          </Text>
          <Text style={styles.text}>
           <Text style={styles.bold}>Ela</Text> diz o que você pode solicitar, quais informações deve enviar e como o sistema vai responder.
           Isso evita confusão e garante que a comunicação aconteça sempre do mesmo jeito, independentemente de quem esteja usando.
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Analogia do restaurante</Text> O cardápio representa a API, porque mostra tudo o que pode ser pedido e como cada pedido deve ser feito.
            O garçom é a interface: ele recebe seu pedido, leva para a cozinha e depois traz a resposta para você.
            A cozinha é o servidor, onde tudo realmente acontece, mas você não precisa ver nem entender como funciona.
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
          <Text style={styles.sectionTitle}>Exemplos Reais de APIs:</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.exampleTitle}>Google Maps Platform API</Text>
          <Text style={styles.text}>
           É usada por apps de entrega, transporte e logística.
           Com ela, é possível colocar mapas dentro do aplicativo, calcular rotas, ver tempo de viagem e localizar endereços.
           Empresas como a Uber não criam seus próprios mapas — elas apenas “puxam” tudo isso do Google através da API.
          </Text>

          <Text style={styles.exampleTitle}>WhatsApp Business API</Text>
          <Text style={styles.text}>
           Criada pelo Meta para empresas.
           Permite enviar mensagens automáticas, como confirmação de compra, código de entrega, avisos e suporte.
           As mensagens seguem modelos aprovados pelo WhatsApp para garantir segurança e privacidade.
          </Text>

          <Text style={styles.exampleTitle}>OpenWeatherMap API</Text>
          <Text style={styles.text}>
            Fornece informações de clima em tempo real: temperatura, umidade, vento e previsão.
            Aplicativos de previsão do tempo, widgets no celular e sistemas agrícolas usam essa API para mostrar dados atualizados.
            Ela funciona com requisições simples, como um pedido enviado pela internet.
          </Text>

          <Text style={styles.exampleTitle}>Banco Central do Brasil — SGS API</Text>
          <Text style={styles.code}>
            https://api.bcb.gov.br/dados/serie/bcdata.sgs.1/dados?formato=json
          </Text>
          <Text style={styles.text}>
           Disponibiliza dados oficiais de indicadores econômicos.
           Por exemplo, o link citado retorna a série histórica da taxa SELIC.
           Trocando o código da série, você pode pegar dados de dólar, inflação e outros indicadores.
           Isso ajuda a criar gráficos e dashboards econômicos sem precisar copiar nada manualmente de sites.
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
          <Text style={styles.sectionTitle}>Estrutura de uma Requisição HTTP:</Text>
        </View>

        <View style={styles.box}>
  <Text style={styles.text}>
    {'• '}
    <Text style={styles.bold}>Endpoint</Text>
    {': É o endereço específico onde você faz uma ação da API. Ex: '}{'\n'}
    <Text style={styles.code}>https://api.exemplo.com/v1/users</Text>
  </Text>

  <Text style={styles.text}>
    {'• '}
    <Text style={styles.bold}>Método HTTP</Text>
    {': Indica o que você quer fazer:'}
  </Text>
  <Text style={[styles.text, { paddingLeft: 24 }]}>
    – <Text style={styles.bold}>GET</Text>: pegar informações{'\n'}
    – <Text style={styles.bold}>POST</Text>: criar algo novo{'\n'}
    – <Text style={styles.bold}>PUT</Text>: atualizar tudo{'\n'}
    – <Text style={styles.bold}>PATCH</Text>: atualizar só uma parte{'\n'}
    – <Text style={styles.bold}>DELETE</Text>: apagar
  </Text>

  <Text style={styles.text}>
    {'• '}
    <Text style={styles.bold}>Headers</Text>
    {': Informações extras enviadas junto com a requisição:'}
  </Text>
  <Text style={[styles.text, { paddingLeft: 24 }]}>
    – <Text style={styles.code}>Content-Type: application/json</Text>{'\n'}
    – <Text style={styles.code}>Authorization: Bearer xyz123</Text>{'\n'}
    – <Text style={styles.code}>Accept: application/json</Text>
  </Text>

  <Text style={styles.text}>
    {'• '}
    <Text style={styles.bold}>Body (corpo)</Text>
    {': Conteúdo enviado quando você cria ou atualiza algo. Exemplo:'}
  </Text>
  <Text style={styles.code}>
    {"{\n  \"nome\": \"Ana\",\n  \"email\": \"ana@email.com\",\n  \"ativo\": true\n}"}
  </Text>

  <Text style={styles.text}>
    {'• '}
    <Text style={styles.bold}>Resposta</Text>
    {': Retorno do servidor. Vem com um código (ex: 200 = ok, 404 = não achou) e geralmente um JSON:'}
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
    width: Platform.OS === 'web' ? 850 : '100%',
    height: Platform.OS === 'web' ? 200 : 160, 
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 26,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#93c5fd',
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
    borderColor: '#93c5fd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    width: '100%',
    maxWidth: 850,
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 14,
    marginBottom: 28,
    borderWidth: 3,
    borderColor: '#93c5fd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 5,
    width: '100%',
    maxWidth: 850,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: Platform.OS === 'web' ? 30 : 25,
    fontWeight: '800',
    color: '#1e40af',
  },
  exampleTitle: {
    fontSize: Platform.OS === 'web' ? 18 : 14,
    fontWeight: '700',
    color: '#1d4ed8',
    marginTop: 16,
    marginBottom: 10,
    alignSelf: 'flex-start',
    paddingLeft: 4,
  },
  text: {
    fontSize: Platform.OS === 'web' ? 16 : 12,
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
    fontSize: Platform.OS === 'web' ? 16 : 11,
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