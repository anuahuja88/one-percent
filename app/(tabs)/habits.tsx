import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Surface, FAB, Portal, Modal, TextInput } from 'react-native-paper';

type Habit = {
  id: string;
  title: string;
  description: string;
  frequency: string;
  difficulty: 'easy' | 'medium' | 'hard';
  streak: number;
};

// Mock data - in a real app, this would come from a database
const mockHabits: Habit[] = [
  {
    id: '1',
    title: 'Morning Meditation',
    description: '5 minutes of mindfulness meditation',
    frequency: 'Daily',
    difficulty: 'easy',
    streak: 3,
  },
  {
    id: '2',
    title: 'Read One Page',
    description: 'Read at least one page of a book',
    frequency: 'Daily',
    difficulty: 'easy',
    streak: 5,
  },
  {
    id: '3',
    title: 'Take a 10-minute Walk',
    description: 'Go for a short walk during lunch',
    frequency: 'Daily',
    difficulty: 'medium',
    streak: 2,
  },
];

export default function HabitsScreen() {
  const [habits, setHabits] = useState<Habit[]>(mockHabits);
  const [visible, setVisible] = useState(false);
  const [newHabit, setNewHabit] = useState({
    title: '',
    description: '',
    frequency: 'Daily',
    difficulty: 'easy' as const,
  });

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleAddHabit = () => {
    if (newHabit.title.trim()) {
      const habit: Habit = {
        id: Date.now().toString(),
        ...newHabit,
        streak: 0,
      };
      setHabits((prev) => [...prev, habit]);
      setNewHabit({
        title: '',
        description: '',
        frequency: 'Daily',
        difficulty: 'easy',
      });
      hideModal();
    }
  };

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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Surface style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            Your Habits
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Track and manage your daily habits
          </Text>
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
                <Text variant="bodyMedium" style={styles.description}>
                  {habit.description}
                </Text>
                <Text variant="bodySmall" style={styles.frequency}>
                  {habit.frequency}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}
        >
          <Text variant="titleLarge" style={styles.modalTitle}>
            Add New Habit
          </Text>
          <TextInput
            label="Habit Title"
            value={newHabit.title}
            onChangeText={(text) => setNewHabit((prev) => ({ ...prev, title: text }))}
            style={styles.input}
          />
          <TextInput
            label="Description"
            value={newHabit.description}
            onChangeText={(text) => setNewHabit((prev) => ({ ...prev, description: text }))}
            multiline
            numberOfLines={3}
            style={styles.input}
          />
          <Button mode="contained" onPress={handleAddHabit} style={styles.addButton}>
            Add Habit
          </Button>
        </Modal>
      </Portal>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={showModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
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
    marginBottom: 8,
  },
  frequency: {
    color: '#666',
  },
  difficulty: {
    textTransform: 'capitalize',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 12,
  },
  modalTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  addButton: {
    marginTop: 8,
  },
}); 