import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.banner}>
          <Image
            source={require('../assets/pokemon-banner-1.png')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.box}>
          <Image
            source={require('../assets/HistoriaPokemon.png')}
            style={styles.titleImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.box}>
          <Text style={styles.text}>
            Pokémon é uma franquia criada por Satoshi Tajiri e Ken Sugimori, desenvolvida pela Game Freak e publicada pela Nintendo. A ideia surgiu da paixão de Tajiri por insetos e da observação de como as conexões de cabos no Game Boy permitiam trocas entre jogadores — inspirando o conceito central de “capturar, treinar e trocar criaturas”.
          </Text>
          <Text style={styles.text}>
            Em 27 de fevereiro de 1996, foram lançados no Japão os primeiros jogos: <Text style={styles.bold}>Pokémon Red</Text> e <Text style={styles.bold}>Green</Text> (este último substituído por <Text style={styles.bold}>Blue</Text> em versões revisadas). A versão internacional, com <Text style={styles.bold}>Red</Text> e <Text style={styles.bold}>Blue</Text>, chegou à América do Norte em setembro de 1998, tornando-se um fenômeno global.
          </Text>
        </View>

        <View style={styles.banner}>
          <Image
            source={require('../assets/pokemon-banner-2.png')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.box}>
          <Image
            source={require('../assets/GeracoesPokemon.png')}
            style={styles.titleImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.box}>
          <Text style={styles.text}>
            A franquia é organizada em gerações, cada uma introduzindo novos Pokémon, regiões, mecânicas e hardware. Até 2025, são nove gerações principais:
          </Text>
          <Text style={[styles.text, { paddingLeft: 20 }]}>
            – <Text style={styles.bold}>Geração I</Text> (1996–1999): 151 Pokémon; região de Kanto; Game Boy.{'\n'}
            – <Text style={styles.bold}>Geração II</Text> (1999–2002): 100 novos; Johto; introduziu tipos Noturno e Metálico, e reprodução.{'\n'}
            – <Text style={styles.bold}>Geração III</Text> (2002–2006): 135 novos; Hoenn; Game Boy Advance; sistema de naturezas.{'\n'}
            – <Text style={styles.bold}>Geração IV</Text> (2006–2010): 107 novos; Sinnoh; Nintendo DS; online via Wi-Fi.{'\n'}
            – <Text style={styles.bold}>Geração V</Text> (2010–2013): 156 novos; Unova; maior adição única até então.{'\n'}
            – <Text style={styles.bold}>Geração VI</Text> (2013–2016): 72 novos; Kalos; Nintendo 3DS; batalhas em 3D e Mega Evoluções.{'\n'}
            – <Text style={styles.bold}>Geração VII</Text> (2016–2019): 88 novos; Alola; introduziu Z-Moves e formas regionais.{'\n'}
            – <Text style={styles.bold}>Geração VIII</Text> (2019–2022): 96 novos; Galar; Switch; Dynamax e Gigantamax.{'\n'}
            – <Text style={styles.bold}>Geração IX</Text> (2022–presente): 120 novos; Paldea; terceira versão <Text style={styles.bold}>The Hidden Treasure of Area Zero</Text>.
          </Text>
          <Text style={styles.text}>
            Ao todo, são mais de 1.000 espécies catalogadas, com linhas evolutivas complexas, variantes regionais e formas alternativas.
          </Text>
        </View>

        <View style={styles.banner}>
          <Image
            source={require('../assets/pokemon-banner-3.png')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.box}>
          <Image
            source={require('../assets/CuriosidadesPokemon.png')}
            style={styles.titleImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.box}>
          <Text style={styles.text}>
            Além dos jogos principais, Pokémon expandiu-se para múltiplas mídias. O anime, estrelado por Ash Ketchum (Satoshi no Japão), estreou em 1997 e teve 25 temporadas, tornando-se uma das séries animadas mais longas do mundo. Em 2023, Ash encerrou sua jornada, passando o protagonismo para novos personagens.
          </Text>
          <Text style={styles.text}>
            O <Text style={styles.bold}>Trading Card Game (TCG)</Text>, lançado em 1996, é um dos jogos de carta mais populares globalmente, com torneios oficiais e cartas colecionáveis de alto valor (ex: carta Pikachu Illustrator, vendida por mais de US$ 5 milhões).
          </Text>
          <Text style={styles.text}>
            Filmes animados são lançados anualmente desde 1998; o mais recente, <Text style={styles.bold}>Pokémon Horizons: O Filme</Text>, alinha-se à nova série pós-Ash. Já os jogos spin-off incluem <Text style={styles.bold}>Pokémon GO</Text> (2016), que revolucionou a realidade aumentada em smartphones, e <Text style={styles.bold}>Pokémon Scarlet and Violet</Text> (2022), o primeiro jogo principal em mundo aberto.
          </Text>
          <Text style={styles.text}>
            A franquia gerou mais de US$ 100 bilhões em receita desde seu lançamento, sendo a segunda mais lucrativa da história (atrás apenas da série Mario), com presença em brinquedos, roupas, livros, mangás, parques temáticos (ex: Pokémon Center em Tóquio e Osaka) e colaborações com marcas como Uniqlo, Levi’s e McDonald’s.
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
    backgroundColor: '#f9fbfd',
  },
  scrollContent: {
    padding: 22,
    alignItems: 'center',
    paddingBottom: 40,
  },
  banner: {
    width: '100%',
    height: 165,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 28,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.09,
    shadowRadius: 12,
    elevation: 5,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  box: {
    backgroundColor: '#ffffff',
    padding: 22,
    borderRadius: 14,
    marginBottom: 28,
    borderWidth: 3,
    borderColor: '#dbeafe',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 5,
    width: '100%',
    maxWidth: 540,
    alignItems: 'center',
  },
  titleImage: {
    width: '100%',
    height: 72,
    maxWidth: 420,
  },
  text: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingLeft: 6,
    paddingRight: 12,
    marginBottom: 10,
  },
  bold: {
    fontWeight: '700',
    color: '#1d4ed8',
  },
});