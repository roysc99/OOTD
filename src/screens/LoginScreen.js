import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Track async call status

  // Example of a basic validation check
  const isValidForm = () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Email and password cannot be empty.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!isValidForm()) return;

    try {
      setLoading(true);
      // 1. TODO: Perform your actual login logic here
      //    (e.g., call your API or Firebase auth).
      // 2. If successful, redirect:
      navigation.replace("MainTabs");
    } catch (error) {
      // 3. Handle errors gracefully:
      Alert.alert("Login Failed", error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupNavigation = () => {
    // Navigate to your "SignUpScreen" inside the "LoginNav" stack
    navigation.navigate("LoginNav", { screen: "SignUpScreen" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={loading}
      />

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <Button title="Sign Up" onPress={handleSignupNavigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "600",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
    fontSize: 16,
  },
  signupContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  signupText: {
    marginBottom: 6,
  },
});
