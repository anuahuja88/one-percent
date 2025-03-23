import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router } from 'expo-router';
import Svg, { Path, Polygon } from 'react-native-svg';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';

export default function SplashScreen() {
  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
  });

  const handleGetStarted = () => {
    router.push('/onboarding');
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text variant="displayLarge" style={styles.percentage}>1%</Text>
          <Text variant="headlineLarge" style={styles.better}>BETTER</Text>
          <Text variant="headlineLarge" style={styles.everyday}>EVERYDAY</Text>
          <Text style={styles.pricing}>FROM $7.99 PER MONTH</Text>
        </View>

        <View style={styles.curveContainer}>
          <Svg height="400" width="300" viewBox="0 0 200 200">
            <Path
              d="M -10 200 Q 180 200, 180 -180"
              stroke="#ADB5BD"
              strokeWidth="2"
              fill="none"
            />
          </Svg>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={handleGetStarted}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            icon="arrow-right"
          >
            TRY IT FOR FREE
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212529',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 0,
  },
  percentage: {
    color: '#FFFFFF',
    fontSize: 72,
    fontFamily: 'BebasNeue_400Regular',
    lineHeight: 72,
  },
  better: {
    color: '#FFFFFF',
    fontSize: 72,
    fontFamily: 'BebasNeue_400Regular',
    lineHeight: 72,
  },
  everyday: {
    color: '#FFFFFF',
    fontSize: 72,
    fontFamily: 'BebasNeue_400Regular',
    lineHeight: 72,
  },
  pricing: {
    color: '#ADB5BD',
    opacity: 0.7,
    fontSize: 14,
    marginTop: 8,
  },
  curveContainer: {
    position: 'absolute',
    right: 0,
    bottom: '25%',
    transform: [{ scale: 1.35 }]
  },
  buttonContainer: {
    marginBottom: 40,
    paddingLeft: 0,
  },
  button: {
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 0,
    height: 40,
  },
  buttonLabel: {
    color: '#212529',
    fontSize: 20,
    fontWeight: 'bold',
  },
}); 