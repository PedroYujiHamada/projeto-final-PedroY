import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../assets/perfil.png')}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>

        <View style={styles.titleBox}>
          <Text style={styles.sectionTitle}>Sobre Mim</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.text}>
            Olá! Meu nome é Pedro Yuji Hamada, tenho 16 anos e atualmente estou no 2º ano do ensino médio na ETEC Milton Gazzeti de Presidente Venceslau. Sou apaixonado por jogos e tecnologia, e estou sempre buscando aprender coisas novas. Tenho um sonho de morar no Japão e ter uma vida tranquila e feliz.
          </Text>
        </View>

        <View style={styles.titleBox}>
          <Text style={styles.sectionTitle}>Contatos</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.contactItem}>
            <Text style={styles.contactLabel}>Email:</Text> pedro.yuji.hamada@gmail.com
          </Text>
          <Text style={styles.contactItem}>
            <Text style={styles.contactLabel}>Telefone:</Text> +55 (18) 99776-3482
          </Text>
          <Text style={styles.contactItem}>
            <Text style={styles.contactLabel}>GitHub:</Text> github.com/PedroYujiHamada
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Obrigado por ver o aplicativo</Text>
        </View>

        <StatusBar style="dark" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbfd',
  },
  scrollContent: {
    padding: 22,
    alignItems: 'center',
    paddingBottom: 48,
  },
  avatarContainer: {
    width: 125,
    height: 125,
    borderRadius: 62.5,
    borderWidth: 4,
    borderColor: '#ffffff',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  titleBox: {
    backgroundColor: '#f0f9ff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 18,
    borderWidth: 3,
    borderColor: '#bae6fd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 4,
    width: '100%',
    maxWidth: 520,
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 14,
    marginBottom: 26,
    borderWidth: 3,
    borderColor: '#dbeafe',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
    width: '100%',
    maxWidth: 520,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1e40af',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 18,
  },
  contactItem: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 18,
    marginBottom: 8,
  },
  contactLabel: {
    fontWeight: '700',
    color: '#1d4ed8',
  },
  footer: {
    marginTop: 20,
    maxWidth: 520,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 17,
    color: '#4b5563',
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '500',
  },
});