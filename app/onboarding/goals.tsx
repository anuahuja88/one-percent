import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import Svg, { Path } from 'react-native-svg';

export default function OnboardingGoals() {
  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>DO YOU WANT HELP</Text>
          <Text style={styles.question}>GETTING UP YOUR</Text>
          <Text style={styles.question}>GOALS AND HABITS?</Text>
          <Text style={styles.subtitle}>BASED ON YOUR LIFESTYLE,</Text>
          <Text style={styles.subtitle}>WE'LL CREATE A PLAN TO</Text>
          <Text style={styles.subtitle}>HELP YOU GET STARTED</Text>
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
            mode="contained"
            onPress={() => router.push('/onboarding/routine')}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            icon="arrow-right"
          >
            GET STARTED
          </Button>
          <Button
            mode="text"
            onPress={() => router.push('/onboarding/routine')}
            style={styles.skipButton}
            labelStyle={styles.skipButtonLabel}
          >
            SKIP & SET UP MYSELF
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
  questionContainer: {
    marginTop: 60,
  },
  question: {
    color: '#FFFFFF',
    fontSize: 48,
    fontFamily: 'BebasNeue_400Regular',
    lineHeight: 52,
  },
  subtitle: {
    color: '#ADB5BD',
    fontSize: 16,
    fontFamily: 'BebasNeue_400Regular',
    lineHeight: 20,
    marginTop: 4,
  },
  curveContainer: {
    position: 'absolute',
    right: 0,
    bottom: '25%',
    transform: [{ scale: 1.35 }],
    zIndex: -1,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 40,
  },
  button: {
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    height: 56,
  },
  buttonLabel: {
    color: '#212529',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  skipButton: {
    borderRadius: 50,
  },
  skipButtonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
}); 