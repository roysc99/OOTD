import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthProvider"; // Adjust path to your AuthProvider

export default function LogoutButton() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout(); // Clears user data in context and AsyncStorage
      // Optionally navigate the user to a login screen if desired
      // e.g., navigation.replace('Login');
    } catch (error) {
      console.error("Logout error:", error);
      // Show an alert or toast if needed
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user?.name || "User"}!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 16,
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
});
