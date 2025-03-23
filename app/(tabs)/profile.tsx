import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, List, Switch, Button, Avatar } from 'react-native-paper';

type UserProfile = {
  name: string;
  email: string;
  notifications: boolean;
  darkMode: boolean;
  weeklyReport: boolean;
};

// Mock data - in a real app, this would come from a database
const mockProfile: UserProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  notifications: true,
  darkMode: false,
  weeklyReport: true,
};

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);

  const toggleSetting = (setting: keyof UserProfile) => {
    setProfile((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header}>
        <View style={styles.avatarContainer}>
          <Avatar.Text
            size={80}
            label={profile.name.split(' ').map((n) => n[0]).join('')}
          />
        </View>
        <Text variant="headlineMedium" style={styles.name}>
          {profile.name}
        </Text>
        <Text variant="bodyLarge" style={styles.email}>
          {profile.email}
        </Text>
      </Surface>

      <Surface style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Settings
        </Text>
        <List.Section>
          <List.Item
            title="Push Notifications"
            description="Receive reminders and updates"
            left={(props) => <List.Icon {...props} icon="bell" />}
            right={() => (
              <Switch
                value={profile.notifications}
                onValueChange={() => toggleSetting('notifications')}
              />
            )}
          />
          <List.Item
            title="Dark Mode"
            description="Use dark theme"
            left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => (
              <Switch
                value={profile.darkMode}
                onValueChange={() => toggleSetting('darkMode')}
              />
            )}
          />
          <List.Item
            title="Weekly Progress Report"
            description="Get a weekly summary of your progress"
            left={(props) => <List.Icon {...props} icon="chart-bar" />}
            right={() => (
              <Switch
                value={profile.weeklyReport}
                onValueChange={() => toggleSetting('weeklyReport')}
              />
            )}
          />
        </List.Section>
      </Surface>

      <Surface style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Account
        </Text>
        <List.Section>
          <List.Item
            title="Edit Profile"
            description="Change your name and email"
            left={(props) => <List.Icon {...props} icon="account-edit" />}
            onPress={() => {}}
          />
          <List.Item
            title="Change Password"
            description="Update your password"
            left={(props) => <List.Icon {...props} icon="lock" />}
            onPress={() => {}}
          />
        </List.Section>
      </Surface>

      <Surface style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          About
        </Text>
        <List.Section>
          <List.Item
            title="Privacy Policy"
            left={(props) => <List.Icon {...props} icon="shield-account" />}
            onPress={() => {}}
          />
          <List.Item
            title="Terms of Service"
            left={(props) => <List.Icon {...props} icon="file-document" />}
            onPress={() => {}}
          />
          <List.Item
            title="App Version"
            description="1.0.0"
            left={(props) => <List.Icon {...props} icon="information" />}
          />
        </List.Section>
      </Surface>

      <Button
        mode="outlined"
        onPress={() => {}}
        style={styles.logoutButton}
        textColor="#F44336"
      >
        Log Out
      </Button>
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
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  name: {
    marginBottom: 4,
  },
  email: {
    color: '#666',
  },
  section: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  logoutButton: {
    margin: 16,
    borderColor: '#F44336',
  },
}); 