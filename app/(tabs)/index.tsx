import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Surface, ProgressBar } from 'react-native-paper';

type DailyHabit = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  streak: number;
};

// Mock data - in a real app, this would come from a database
const mockHabits: DailyHabit[] = [
  {
    id: '1',
    title: 'Morning Meditation',
    description: '5 minutes of mindfulness meditation',
    completed: false,
    streak: 3,
  },
  {
    id: '2',
    title: 'Read One Page',
    description: 'Read at least one page of a book',
    completed: true,
    streak: 5,
  },
  {
    id: '3',
    title: 'Take a 10-minute Walk',
    description: 'Go for a short walk during lunch',
    completed: false,
    streak: 2,
  },
];

export default function TodayScreen() {
  const [habits, setHabits] = useState<DailyHabit[]>(mockHabits);

  const toggleHabit = (habitId: string) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const completedCount = habits.filter((h) => h.completed).length;
  const progress = completedCount / habits.length;

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Today's Progress
        </Text>
        <View style={styles.progressContainer}>
          <ProgressBar progress={progress} style={styles.progressBar} />
          <Text variant="bodyLarge" style={styles.progressText}>
            {completedCount} of {habits.length} habits completed
          </Text>
        </View>
      </Surface>

      <View style={styles.habitsContainer}>
        {habits.map((habit) => (
          <Card key={habit.id} style={styles.habitCard}>
            <Card.Content>
              <View style={styles.habitHeader}>
                <View style={styles.habitTitleContainer}>
                  <Text variant="titleMedium">{habit.title}</Text>
                  <Text variant="bodySmall" style={styles.streak}>
                    {habit.streak} day streak
                  </Text>
                </View>
                <Button
                  mode={habit.completed ? 'contained' : 'outlined'}
                  onPress={() => toggleHabit(habit.id)}
                  style={styles.checkButton}
                >
                  {habit.completed ? 'Completed' : 'Complete'}
                </Button>
              </View>
              <Text variant="bodyMedium" style={styles.description}>
                {habit.description}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressText: {
    color: '#666',
  },
  habitsContainer: {
    padding: 16,
    gap: 16,
  },
  habitCard: {
    marginBottom: 8,
  },
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  habitTitleContainer: {
    flex: 1,
  },
  streak: {
    color: '#666',
    marginTop: 4,
  },
  description: {
    color: '#666',
  },
  checkButton: {
    marginLeft: 8,
  },
});
