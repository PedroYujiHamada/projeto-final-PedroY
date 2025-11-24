import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView, TextInput, ActivityIndicator, Image } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const buscarPokemon = async () => {
    if (!input.trim()) {
      setError('⚠️ Digite o nome ou número do Pokémon');
      return;
    }

    setLoading(true);
    setError(null);
    setPokemon(null);

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase().trim()}`);
      if (!res.ok) throw new Error('❌ Pokémon não encontrado');
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
      setError(err.message || '❌ Erro na conexão');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (input.trim()) buscarPokemon();
    else inputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ImageBackground
          source={require('../assets/Pokemon.jpg')}
          style={styles.banner}
          imageStyle={styles.bannerImage}
        />

        <View style={styles.box}>
          <Image source={require('../assets/images.png')} style={styles.logo} />
        </View>

        <View style={styles.box}>
          <Text style={styles.welcome}>Bem-vindo!</Text>
          <Text style={styles.subtitle}>
            Neste aplicativo, você vai explorar três temas:
          </Text>
          <Text style={styles.text}>
            {'\n'} <Text style={styles.bold}>Pokémon</Text>: criaturas digitais que viraram fenômeno global desde 1996, com tipos, habilidades e evoluções únicas.{'\n\n'}
            <Text style={styles.bold}>APIs</Text> (Application Programming Interface): tecnologia que permite que aplicativos troquem dados com servidores — como se fosse um “cardápio” de informações disponíveis na internet.{'\n\n'}
            <Text style={styles.bold}>PokéAPI</Text>: uma API pública e gratuita que reúne dados oficiais de todos os Pokémon. Ela é usada por milhares de devs para criar apps, sites e ferramentas — tudo de forma ética e não comercial.
          </Text>
        </View>

        <View style={styles.box}>
          <Image source={require('../assets/PokeAPI.png')} style={styles.logo} />
        </View>

        <View style={styles.box}>
          <Text style={styles.text}>
            A <Text style={styles.bold}>PokéAPI</Text> é uma API REST gratuita e de código aberto que fornece acesso a dados oficiais de todos os Pokémon — incluindo tipos, altura, peso e linha evolutiva.
          </Text>
        </View>

        <View style={styles.search}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Ex: pikachu, 25, charizard..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Text style={styles.buttonText}>🔍 Buscar Pokémon</Text>
          </TouchableOpacity>

          {error && <Text style={styles.error}>{error}</Text>}
          {loading && (
            <View style={styles.loading}>
              <ActivityIndicator size="small" color="#1976d2" />
              <Text style={styles.loadingText}>Buscando...</Text>
            </View>
          )}

          {pokemon && (
            <View style={styles.result}>
              {pokemon.image && <Image source={{ uri: pokemon.image }} style={styles.img} />}
              <Text style={styles.name}>#{pokemon.id} {pokemon.name}</Text>
              
              <View style={styles.types}>
                {pokemon.types.map((type, i) => (
                  <Text key={i} style={[styles.type, getTypeStyle(type)]}>{type}</Text>
                ))}
              </View>

              <Text style={styles.label}>🔄 Linha Evolutiva</Text>
              <View style={styles.evoRow}>
                {pokemon.evolutionChain.map((p, i) => (
                  <View key={p.id} style={styles.evoItem}>
                    {p.image && <Image source={{ uri: p.image }} style={styles.evoImg} />}
                    <Text style={styles.evoName}>{p.name}</Text>
                    {i < pokemon.evolutionChain.length - 1 && <Text style={styles.arrow}>→</Text>}
                  </View>
                ))}
              </View>

              <Text style={styles.detail}>Altura: {pokemon.height} m</Text>
              <Text style={styles.detail}>Peso: {pokemon.weight} kg</Text>
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
  container: { flex: 1, backgroundColor: '#bbf3f9' },
  scrollContent: { padding: 20, alignItems: 'center' },
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
  bannerImage: { opacity: 0.85 },
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
  title: { fontSize: 34, fontWeight: 'bold', color: '#1976d2' },
  welcome: { fontSize: 26, fontWeight: 'bold', color: '#1976d2', marginBottom: 6 },
  subtitle: { fontSize: 18, fontWeight: '600', color: '#444', marginBottom: 16 },
  text: { fontSize: 15, color: '#333', lineHeight: 22 },
  bold: { fontWeight: 'bold', color: '#1976d2' },
  logo: { width: 200, height: 70, resizeMode: 'contain' },
  search: { width: '100%', alignItems: 'center' },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#1976d2',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 50,
  },
  buttonText: { fontSize: 17, fontWeight: 'bold', color: '#fff' },
  error: { color: '#d32f2f', fontSize: 14, textAlign: 'center', marginVertical: 10 },
  loading: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  loadingText: { marginLeft: 8, fontSize: 15, color: '#555' },
  result: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
    maxWidth: 500,
  },
  img: { width: 120, height: 120, marginVertical: 10 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  types: { flexDirection: 'row', marginVertical: 10 },
  type: { color: '#fff', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginHorizontal: 4, fontSize: 13 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#1976d2', marginVertical: 12, alignSelf: 'flex-start', paddingLeft: 4 },
  evoRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  evoItem: { alignItems: 'center', marginHorizontal: 6 },
  evoImg: { width: 60, height: 60, marginBottom: 4 },
  evoName: { fontSize: 12, fontWeight: '500', textAlign: 'center', color: '#333' },
  arrow: { fontSize: 18, color: '#777', marginHorizontal: 4, alignSelf: 'center' },
  detail: { fontSize: 15, color: '#555', marginTop: 6 },
});