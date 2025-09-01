import React, { useState } from 'react';
import { Linking } from 'react-native';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const dicas = [
  "Beba 2L de água hoje 💧",
  "Faça 15 min de caminhada 🚶‍♂️",
  "Evite alimentos muito açucarados 🍬",
];

const registrosHoje = [
  { glicemia: 98, insulina: 4 },
  { glicemia: 110, insulina: 6 },
  { glicemia: 102, insulina: 4 },
];

const data = [
  {
    title: 'FAZER NOVO REGISTRO',
    description: 'Faça novo registro do seu estado glicêmico.',
    backgroundColor: '#e3f8f5ff',
    titleColor: '#000000',
    descriptionColor: '#555555',
    buttonColor: '#00cfff',
    buttonText: 'fazer registro',
    icon: <Ionicons name="create-outline" size={32} color="#00cfff" />,
    onPress: () => console.log('Registro clicado!'),
  },
  {
    title: 'DOSE DE INSULINA',
    description: 'Insira as doses aplicadas durante o dia.',
    backgroundColor: '#f0fef5',
    titleColor: '#00796b',
    descriptionColor: '#33691e',
    buttonColor: '#4caf50',
    buttonText: 'registrar dose',
    icon: <MaterialCommunityIcons name="needle" size={32} color="#4caf50" />,
    onPress: () => console.log('Dose clicada!'),
  },
  {
    title: 'ÍNDICE DIÁRIO',
    description: 'Veja seu índice glicêmico médio do dia.',
    backgroundColor: '#fff8e1',
    titleColor: '#ff6f00',
    descriptionColor: '#6d4c41',
    buttonColor: '#ff9800',
    buttonText: 'ver índice',
    icon: <Ionicons name="stats-chart" size={32} color="#ff9800" />,
    onPress: () => console.log('Índice clicado!'),
  },
];

const noticias = [
  {
    title: "Controle da glicemia",
    description: "Aprenda 5 dicas práticas para manter sua glicemia estável.",
    url: "https://natcofarma.com/controle-de-glicemia/natcofarma"
  },
  {
    title: "Alimentação saudável",
    description: "Descubra alimentos que ajudam no controle da diabetes.",
    url: "https://aworsaude.com.br/dieta-para-diabetes"
  },
  {
    title: "Exercícios recomendados",
    description: "Veja quais exercícios são mais eficazes para diabéticos.",
    url: "https://www.youtube.com/watch?v=AnF8j2MLkH4"
  },
];

export default function HomeScreen({ route }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { user } = route.params || {};
  const nome = user?.displayName || "Usuário";

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 22, fontWeight: "bold", margin: 20, color: '#277410ff' }}>
        Bem-vindo, {nome}! ✌
      </Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Carrossel de ações no topo */}
        <View style={styles.carouselContainer}>
          <Carousel
            loop
            width={screenWidth * 0.9}
            height={220}
            data={data}
            scrollAnimationDuration={500}
            onSnapToItem={(index) => setActiveIndex(index)}
            renderItem={({ item }) => (
              <View style={[styles.card, { backgroundColor: item.backgroundColor }]}>
                <View style={styles.iconContainer}>{item.icon}</View>
                <Text style={[styles.title, { color: item.titleColor }]}>{item.title}</Text>
                <Text style={[styles.description, { color: item.descriptionColor }]}>{item.description}</Text>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: item.buttonColor }]}
                  onPress={item.onPress}
                >
                  <Text style={styles.buttonText}>{item.buttonText}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.dots}>
            {data.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === activeIndex && styles.activeDot]}
              />
            ))}
          </View>
        </View>

  <Animated.View entering={FadeInUp.delay(400)} style={{ marginTop: 20 }}>
    <Text style={{ fontSize: 24, fontWeight: "bold", marginLeft: 20, marginBottom: 10 }}>Notícias & Curiosidades</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 20 }}>
        {noticias.map((item, index) => (
    <View key={index} style={[styles.carouselCard, { backgroundColor: "#1e90ff", width: 250, marginBottom: 40}]}>
        <Text style={{ fontWeight: "bold", color: "#fff", marginBottom: 5, fontSize: 18 }}>{item.title}</Text>
        <Text style={{ color: "#fff", marginBottom: 10, }}>{item.description}</Text>
        <TouchableOpacity
          style={{ backgroundColor: "#fff", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10 }}
          onPress={() => Linking.openURL(item.url)}
        >
          <Text style={{ color: "#1e90ff", fontWeight: "bold"}}>Ler mais</Text>
      </TouchableOpacity>
    </View>
  ))}
  </ScrollView>
</Animated.View>

        {/* Resumo diário animado */}
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Resumo Diário</Text>
      {registrosHoje.length === 0 ? (
        <Text>Nenhum registro para hoje.</Text>
      ) : (
        registrosHoje.map((item, index) => (
          <Text key={index}>
            Glicemia: {item.glicemia} mg/dL | Insulina: {item.insulina} UI
          </Text>
        ))
      )}
    </View>

        {/* Mini gráfico */}
        <Animated.View entering={FadeInUp.delay(200)} style={styles.card}>
          <Text style={styles.cardTitle}>Últimos 7 dias</Text>
          <LineChart
            data={{
              labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
              datasets: [{ data: [90, 110, 100, 105, 98, 120, 95] }],
            }}
            width={screenWidth - 40}
            height={200}
            yAxisSuffix=" mg/dL"
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 128, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: { r: "5", strokeWidth: "2", stroke: "#1e90ff" },
            }}
            style={{ borderRadius: 16 }}
          />
        </Animated.View>

        {/* Carrossel de dicas */}
        <Animated.View entering={FadeInUp.delay(300)}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
            {dicas.map((dica, index) => (
              <View key={index} style={styles.carouselCard}>
                <Text style={styles.carouselText}>{dica}</Text>
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="home-outline" size={24} color="#00c47c" />
          <Text style={[styles.footerText, { color: '#00c47c' }]}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="water-outline" size={24} color="#00bcd4" />
          <Text style={[styles.footerText, { color: '#00bcd4' }]}>Glicemia</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="#d17d6b" />
          <Text style={[styles.footerText, { color: '#d17d6b' }]}>Refeição</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="barbell-outline" size={24} color="#7c6e7f" />
          <Text style={[styles.footerText, { color: '#7c6e7f' }]}>Exercícios</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  carousel: { flexDirection: "row", paddingLeft: 10 },
  carouselCard: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 16,
    marginRight: 15,
    minWidth: 200,
  },


  carouselText: { color: "#fff", fontWeight: "bold" },
  carouselContainer: { marginTop: 20, alignItems: "center" },
  iconContainer: { marginBottom: 10 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  description: { fontSize: 14, textAlign: 'center', marginBottom: 15 },
  button: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  buttonText: { color: '#fff', fontWeight: '600', textTransform: 'lowercase' },
  dots: { flexDirection: 'row', marginTop: -20, paddingBottom: 30 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ccc', margin: 4 },
  activeDot: { backgroundColor: '#000' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  footerItem: { alignItems: 'center' },
  footerText: { fontSize: 12, marginTop: 4, fontWeight: '600' },
});


