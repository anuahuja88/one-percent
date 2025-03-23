import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, IconButton, Surface } from 'react-native-paper';
import { useLocalSearchParams, router } from 'expo-router';

type Habit = {
  id: string;
  title: string;
  description: string;
  frequency: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

// Mock AI-generated habits (in a real app, this would come from an API)
const generateHabits = (answers: Record<string, string>): Habit[] => {
  // This is a simplified version - in production, this would use GPT-4
  return [
    {
      id: '1',
      title: 'Morning Meditation',
      description: 'Start your day with 5 minutes of mindfulness meditation',
      frequency: 'Daily',
      difficulty: 'easy',
    },
    {
      id: '2',
      title: 'Read One Page',
      description: 'Read at least one page of a book before bed',
      frequency: 'Daily',
      difficulty: 'easy',
    },
    {
      id: '3',
      title: 'Take a 10-minute Walk',
      description: 'Go for a short walk during your lunch break',
      frequency: 'Daily',
      difficulty: 'medium',
    },
  ];
};

export default function HabitsScreen() {
  const { answers } = useLocalSearchParams<{ answers: string }>();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [selectedHabits, setSelectedHabits] = useState<Set<string>>(new Set());

  useEffect(() => {
    const parsedAnswers = JSON.parse(answers);
    const generatedHabits = generateHabits(parsedAnswers);
    setHabits(generatedHabits);
  }, [answers]);

  const toggleHabitSelection = (habitId: string) => {
    setSelectedHabits((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(habitId)) {
        newSelection.delete(habitId);
      } else {
        newSelection.add(habitId);
      }
      return newSelection;
    });
  };

  const handleContinue = () => {
    if (selectedHabits.size === 0) {
      // Show error message
      return;
    }
    // Navigate to the main app
    router.replace('/(tabs)');
  };

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.surface}>
        <Text variant="headlineMedium" style={styles.title}>
          Your Personalized Habits
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Select the habits you want to focus on
        </Text>

        <View style={styles.habitsContainer}>
          {habits.map((habit) => (
            <Card
              key={habit.id}
              style={[
                styles.habitCard,
                selectedHabits.has(habit.id) && styles.selectedCard,
              ]}
            >
              <Card.Content>
                <View style={styles.habitHeader}>
                  <Text variant="titleMedium">{habit.title}</Text>
                  <IconButton
                    icon={selectedHabits.has(habit.id) ? 'check-circle' : 'circle-outline'}
                    onPress={() => toggleHabitSelection(habit.id)}
                    iconColor={selectedHabits.has(habit.id) ? '#4CAF50' : '#757575'}
                  />
                </View>
                <Text variant="bodyMedium" style={styles.description}>
                  {habit.description}
                </Text>
                <View style={styles.habitFooter}>
                  <Text variant="bodySmall" style={styles.frequency}>
                    {habit.frequency}
                  </Text>
                  <Text
                    variant="bodySmall"
                    style={[
                      styles.difficulty,
                      { color: getDifficultyColor(habit.difficulty) },
                    ]}
                  >
                    {habit.difficulty}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        <Button
          mode="contained"
          onPress={handleContinue}
          style={styles.continueButton}
          disabled={selectedHabits.size === 0}
        >
          Continue with {selectedHabits.size} Habits
        </Button>
      </Surface>
    </ScrollView>
  );
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return '#4CAF50';
    case 'medium':
      return '#FFC107';
    case 'hard':
      return '#F44336';
    default:
      return '#757575';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  surface: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  habitsContainer: {
    gap: 16,
  },
  habitCard: {
    marginBottom: 8,
  },
  selectedCard: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
    color: '#666',
  },
  habitFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  frequency: {
    color: '#666',
  },
  difficulty: {
    textTransform: 'capitalize',
  },
  continueButton: {
    marginTop: 24,
  },
}); 