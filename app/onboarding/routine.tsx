import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import Svg, { Path } from 'react-native-svg';

export default function OnboardingRoutine() {
  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSelect = (routine: string) => {
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>HOW WOULD YOU</Text>
          <Text style={styles.question}>DESCRIBE YOUR</Text>
          <Text style={styles.question}>DAILY ROUTINE?</Text>
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

        <View style={styles.optionsContainer}>
          <Button
            mode="outlined"
            onPress={() => handleSelect('unstructured')}
            style={styles.optionButton}
            labelStyle={styles.optionLabel}
          >
            UNSTRUCTURED
            <Text style={styles.optionDescription}>{"\n"}(work day is different)</Text>
          </Button>

          <Button
            mode="outlined"
            onPress={() => handleSelect('semi-structured')}
            style={styles.optionButton}
            labelStyle={styles.optionLabel}
          >
            SEMI-STRUCTURED
            <Text style={styles.optionDescription}>{"\n"}(some routine, flexible)</Text>
          </Button>

          <Button
            mode="outlined"
            onPress={() => handleSelect('structured')}
            style={styles.optionButton}
            labelStyle={styles.optionLabel}
          >
            STRUCTURED
            <Text style={styles.optionDescription}>{"\n"}(set schedule, consistent habits)</Text>
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
  curveContainer: {
    position: 'absolute',
    right: 0,
    bottom: '25%',
    transform: [{ scale: 1.35 }],
    zIndex: -1,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 40,
  },
  optionButton: {
    borderRadius: 12,
    borderColor: '#ADB5BD',
    height: 72,
    justifyContent: 'center',
  },
  optionLabel: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'BebasNeue_400Regular',
  },
  optionDescription: {
    fontSize: 14,
    color: '#ADB5BD',
    fontFamily: 'BebasNeue_400Regular',
  },
}); 