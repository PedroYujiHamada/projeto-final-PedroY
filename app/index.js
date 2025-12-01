import { StatusBar } from 'expo-status-bar';
import { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Image,
  Animated,
  Platform,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width >= 768;

export default function App() {
  const [input, setInput] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const inputRef = useRef(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    if (showIntro) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start(() => setShowIntro(false));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  const buscarPokemon = async () => {
    if (!input.trim()) {
      setError('Digite o nome ou número do Pokémon');
      return;
    }

    setLoading(true);
    setError(null);
    setPokemon(null);

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase().trim()}`);
      if (!res.ok) throw new Error('Pokémon não encontrado');
      const data = await res.json();

      const speciesRes = await fetch(data.species.url);
      const speciesData = await speciesRes.json();

      let evolutionChain = [];
      if (speciesData.evolution_chain) {
        const chainRes = await fetch(speciesData.evolution_chain.url);
        const chainData = await chainRes.json();

        const extractEvolutionData = async (chain) => {
          const species = await fetch(chain.species.url).then(r => r.json());
          const poke = await fetch(`https://pokeapi.co/api/v2/pokemon/${species.name}/`).then(r => r.json());
          const img = poke.sprites?.other?.['official-artwork']?.front_default || poke.sprites?.front_default;

          const entry = {
            name: species.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            id: species.id,
            image: img,
          };

          const evos = [];
          if (chain.evolves_to?.length) {
            for (const next of chain.evolves_to) {
              evos.push(...await extractEvolutionData(next));
            }
          }
          return [entry, ...evos];
        };

        evolutionChain = await extractEvolutionData(chainData.chain);
      }

      const imageUrl = data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default;

      setPokemon({
        name: data.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        id: data.id,
        types: data.types.map(t => t.type.name),
        height: (data.height / 10).toFixed(1),
        weight: (data.weight / 10).toFixed(1),
        image: imageUrl,
        evolutionChain,
      });
    } catch (err) {
      setError(err.message || 'Erro na conexão');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (input.trim()) buscarPokemon();
    else inputRef.current?.focus();
  };

  if (showIntro) {
    return (
      <View style={styles.introContainer}>
        <Animated.View
          style={[
            styles.introContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.introTitle}>Seja Bem-Vindo</Text>
          <Text style={styles.introSubtitle}>Tela Inicial</Text>
        </Animated.View>
        <StatusBar style="dark" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ImageBackground
          source={require('../assets/Pokemon.jpg')}
          style={[styles.banner, isDesktop && styles.bannerDesktop]}
          imageStyle={styles.bannerImage}
        />

        <View style={[styles.box, isDesktop && styles.boxDesktop]}>
          <Text style={[styles.title, isDesktop && styles.titleDesktop]}>Introdução</Text>
        </View>

        <View style={[styles.box, isDesktop && styles.boxDesktop]}>
          <Text style={[styles.subtitle, isDesktop && styles.subtitleDesktop]}>
            Neste aplicativo, você vai explorar três temas:
          </Text>
          <Text style={[styles.text, isDesktop && styles.textDesktop]}>
            <Text style={styles.bold}>Pokémon</Text>: criaturas digitais que viraram fenômeno global desde 1996, com tipos, habilidades e evoluções únicas.
            {'\n\n'}
            <Text style={styles.bold}>APIs</Text> (Application Programming Interface): tecnologia que permite que aplicativos troquem dados com servidores — como se fosse um “cardápio” de informações disponíveis na internet.
            {'\n\n'}
            <Text style={styles.bold}>PokéAPI</Text>: uma API pública e gratuita que reúne dados oficiais de todos os Pokémon. Ela é usada por milhares de desenvolvedores para criar aplicativos, sites e ferramentas — tudo de forma ética e não comercial.
          </Text>
        </View>

        <View style={[styles.box, isDesktop && styles.boxDesktop]}>
          <Image source={require('../assets/PokeAPI.png')} style={[styles.logo, isDesktop && styles.logoDesktop]} />
        </View>

        <View style={[styles.box, isDesktop && styles.boxDesktop]}>
          <Text style={[styles.text, isDesktop && styles.textDesktop]}>
            A <Text style={styles.bold}>PokéAPI</Text> é uma API REST gratuita e de código aberto que fornece acesso a dados oficiais de todos os Pokémon — incluindo tipos, altura, peso e linha evolutiva.
          </Text>
        </View>

        <View style={styles.search}>
          <TextInput
            ref={inputRef}
            style={[styles.input, isDesktop && styles.inputDesktop]}
            placeholder="Ex: pikachu, 25, charizard..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity style={[styles.button, isDesktop && styles.buttonDesktop]} onPress={handleSearch}>
            <Text style={styles.buttonText}>Buscar Pokémon</Text>
          </TouchableOpacity>

          {error && <Text style={styles.error}>{error}</Text>}
          {loading && (
            <View style={styles.loading}>
              <ActivityIndicator size="small" color="#10B981" />
              <Text style={styles.loadingText}>Buscando...</Text>
            </View>
          )}

          {pokemon && (
            <View style={[styles.result, isDesktop && styles.resultDesktop]}>
              {pokemon.image && <Image source={{ uri: pokemon.image }} style={[styles.img, isDesktop && styles.imgDesktop]} />}
              <Text style={[styles.name, isDesktop && styles.nameDesktop]}>#{pokemon.id} {pokemon.name}</Text>

              <View style={styles.types}>
                {pokemon.types.map((type, i) => (
                  <Text key={i} style={[styles.type, getTypeStyle(type)]}>
                    {type}
                  </Text>
                ))}
              </View>

              <Text style={[styles.label, isDesktop && styles.labelDesktop]}>Linha Evolutiva</Text>
              <View style={styles.evoRow}>
                {pokemon.evolutionChain.map((p, i) => (
                  <View key={p.id} style={styles.evoItem}>
                    {p.image && <Image source={{ uri: p.image }} style={[styles.evoImg, isDesktop && styles.evoImgDesktop]} />}
                    <Text style={[styles.evoName, isDesktop && styles.evoNameDesktop]}>{p.name}</Text>
                    {i < pokemon.evolutionChain.length - 1 && <Text style={styles.arrow}> </Text>}
                  </View>
                ))}
              </View>

              <Text style={[styles.detail, isDesktop && styles.detailDesktop]}>
                Altura: {pokemon.height} m
              </Text>
              <Text style={[styles.detail, isDesktop && styles.detailDesktop]}>
                Peso: {pokemon.weight} kg
              </Text>
            </View>
          )}
        </View>

        <StatusBar style="dark" />
      </ScrollView>
    </View>
  );
}

const getTypeStyle = (type) => {
  const colors = {
    normal: '#A8A77A', fire: '#EE8130', water: '#6390F0', electric: '#F7D02C',
    grass: '#7AC74C', ice: '#96D9D6', fighting: '#C22E28', poison: '#A33EA1',
    ground: '#E2BF65', flying: '#A98FF3', psychic: '#F95587', bug: '#A6B91A',
    rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC', dark: '#705746',
    steel: '#B7B7CE', fairy: '#D685AD',
  };
  return { backgroundColor: colors[type] || '#999999' };
};

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
  bannerDesktop: {
    height: 520,
    borderRadius: 16,
    borderWidth: 5,
  },
  bannerImage: {
    opacity: 0.9,
  },
  box: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 14,
    marginBottom: 26,
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
  boxDesktop: {
    maxWidth: 720,
    padding: 32,
    borderRadius: 16,
    borderWidth: 4,
    shadowRadius: 16,
    elevation: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1e40af',
    textAlign: 'center',
  },
  titleDesktop: {
    fontSize: 40,
  },
  subtitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 18,
    textAlign: 'center',
  },
  subtitleDesktop: {
    fontSize: 24,
  },
  text: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
    textAlign: 'justify',
  },
  textDesktop: {
    fontSize: 18,
    lineHeight: 28,
    paddingHorizontal: 20,
  },
  bold: {
    fontWeight: '700',
    color: '#1d4ed8',
  },
  logo: {
    width: 220,
    height: 75,
    resizeMode: 'contain',
  },
  logoDesktop: {
    width: 280,
    height: 90,
  },
  search: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#ffffff',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  inputDesktop: {
    fontSize: 18,
    padding: 18,
    borderRadius: 14,
    maxWidth: 600,
  },
  button: {
    backgroundColor: '#10B981',
    paddingHorizontal: 32,
    paddingVertical: 15,
    borderRadius: 50,
    shadowColor: '#0d9488',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonDesktop: {
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 52,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
  },
  error: {
    color: '#EF4444',
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 12,
    fontWeight: '600',
  },
  loading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#6b7280',
  },
  result: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 24,
    marginTop: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 520,
    borderWidth: 2,
    borderColor: '#dbeafe',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 6,
  },
  resultDesktop: {
    maxWidth: 640,
    padding: 32,
    borderRadius: 16,
  },
  img: {
    width: 130,
    height: 130,
    marginVertical: 12,
  },
  imgDesktop: {
    width: 180,
    height: 180,
    marginVertical: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1e3a8a',
    marginBottom: 10,
  },
  nameDesktop: {
    fontSize: 30,
  },
  types: {
    flexDirection: 'row',
    marginVertical: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  type: {
    color: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 4,
    fontSize: 14,
    fontWeight: '600',
    minWidth: 80,
    textAlign: 'center',
  },
  label: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1d4ed8',
    marginVertical: 14,
  },
  labelDesktop: {
    fontSize: 20,
  },
  evoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 12,
  },
  evoItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 4,
  },
  evoImg: {
    width: 65,
    height: 65,
    marginBottom: 6,
  },
  evoImgDesktop: {
    width: 85,
    height: 85,
    marginBottom: 8,
  },
  evoName: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    color: '#374151',
  },
  evoNameDesktop: {
    fontSize: 15,
  },
  arrow: {
    fontSize: 20,
    color: '#9ca3af',
    marginHorizontal: 6,
    alignSelf: 'center',
  },
  detail: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
  },
  detailDesktop: {
    fontSize: 18,
  },

  introContainer: {
    flex: 1,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  introContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  introTitle: {
    fontSize: 38,
    fontWeight: '800',
    color: '#0ea5e9',
    marginBottom: 14,
    textAlign: 'center',
  },
  introSubtitle: {
    fontSize: 21,
    color: '#3b82f6',
    textAlign: 'center',
    fontWeight: '500',
  },
});