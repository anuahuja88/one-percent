import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Surface, ProgressBar } from 'react-native-paper';

type HabitProgress = {
  id: string;
  title: string;
  completionRate: number;
  streak: number;
  totalCompletions: number;
};

// Mock data - in a real app, this would come from a database
const mockProgress: HabitProgress[] = [
  {
    id: '1',
    title: 'Morning Meditation',
    completionRate: 0.85,
    streak: 3,
    totalCompletions: 17,
  },
  {
    id: '2',
    title: 'Read One Page',
    completionRate: 0.92,
    streak: 5,
    totalCompletions: 23,
  },
  {
    id: '3',
    title: 'Take a 10-minute Walk',
    completionRate: 0.78,
    streak: 2,
    totalCompletions: 15,
  },
];

const { width } = Dimensions.get('window');

export default function ProgressScreen() {
  const overallProgress =
    mockProgress.reduce((acc, habit) => acc + habit.completionRate, 0) / mockProgress.length;

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Your Progress
        </Text>
        <View style={styles.overallProgressContainer}>
          <Text variant="titleMedium" style={styles.overallProgressTitle}>
            Overall Completion Rate
          </Text>
          <ProgressBar
            progress={overallProgress}
            style={styles.overallProgressBar}
            color="#4CAF50"
          />
          <Text variant="bodyLarge" style={styles.overallProgressText}>
            {Math.round(overallProgress * 100)}%
          </Text>
        </View>
      </Surface>

      <View style={styles.statsContainer}>
        <Surface style={styles.statCard}>
          <Text variant="titleLarge" style={styles.statNumber}>
            {mockProgress.reduce((acc, habit) => acc + habit.streak, 0)}
          </Text>
          <Text variant="bodyMedium" style={styles.statLabel}>
            Total Streak Days
          </Text>
        </Surface>
        <Surface style={styles.statCard}>
          <Text variant="titleLarge" style={styles.statNumber}>
            {mockProgress.reduce((acc, habit) => acc + habit.totalCompletions, 0)}
          </Text>
          <Text variant="bodyMedium" style={styles.statLabel}>
            Total Completions
          </Text>
        </Surface>
      </View>

      <View style={styles.habitsProgressContainer}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Individual Habit Progress
        </Text>
        {mockProgress.map((habit) => (
          <Surface key={habit.id} style={styles.habitProgressCard}>
            <View style={styles.habitProgressHeader}>
              <Text variant="titleMedium">{habit.title}</Text>
              <Text variant="bodyMedium" style={styles.completionRate}>
                {Math.round(habit.completionRate * 100)}%
              </Text>
            </View>
            <ProgressBar
              progress={habit.completionRate}
              style={styles.habitProgressBar}
              color="#4CAF50"
            />
            <View style={styles.habitStats}>
              <View style={styles.statItem}>
                <Text variant="bodySmall" style={styles.statLabel}>
                  Current Streak
                </Text>
                <Text variant="bodyLarge">{habit.streak} days</Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="bodySmall" style={styles.statLabel}>
                  Total Completions
                </Text>
                <Text variant="bodyLarge">{habit.totalCompletions}</Text>
              </View>
            </View>
          </Surface>
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
  overallProgressContainer: {
    alignItems: 'center',
  },
  overallProgressTitle: {
    marginBottom: 8,
  },
  overallProgressBar: {
    width: width - 64,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  overallProgressText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    width: (width - 48) / 2,
    alignItems: 'center',
  },
  statNumber: {
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#666',
  },
  habitsProgressContainer: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  habitProgressCard: {
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    marginBottom: 16,
  },
  habitProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  completionRate: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  habitProgressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  habitStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
}); 