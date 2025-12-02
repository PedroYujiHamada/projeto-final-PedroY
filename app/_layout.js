import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          headerShown: false,
        }}
      />
        <Tabs.Screen
          name="TemaLivre"
          options={{
            title: 'Tema Livre',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="lightbulb-o" color={color} />,
            headerShown: false,
          }}
        />
      <Tabs.Screen
        name="TemaObrigatorio"
        options={{
          title: 'Tema Obrigatório',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="book" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Aboutme"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="info-circle" color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}