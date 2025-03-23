import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { router } from 'expo-router';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import Svg, { Path } from 'react-native-svg';

export default function OnboardingName() {
  const [name, setName] = useState('');
  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleNext = () => {
    if (name.trim()) {
      router.push('/onboarding/goals');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>WHAT'S YOUR NAME?</Text>
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

        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Timothy"
          placeholderTextColor="#ADB5BD"
          onSubmitEditing={handleNext}
          returnKeyType="next"
          mode="flat"
          textColor="#FFFFFF"
          underlineColor="transparent"
          activeUnderlineColor="#FFFFFF"
          theme={{
            colors: {
              primary: '#FFFFFF',
              text: '#FFFFFF',
            },
          }}
        />
      </View>
    </KeyboardAvoidingView>
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
    justifyContent: 'flex-start',
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
  input: {
    backgroundColor: 'transparent',
    fontSize: 24,
    marginTop: 20,
    height: 56,
  },
  curveContainer: {
    position: 'absolute',
    right: 0,
    bottom: '25%',
    transform: [{ scale: 1.35 }],
    zIndex: -1,
  },
}); 