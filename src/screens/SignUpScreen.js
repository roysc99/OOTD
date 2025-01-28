import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useAuth } from "../context/AuthProvider"; // Adjust path to your AuthProvider if using a custom hook

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // If you have a login function in your AuthProvider

  const handleSignup = async () => {
    try {
      // This is where you'd typically call your backend or a service like Firebase:
      //   await auth().createUserWithEmailAndPassword(email, password);

      // For this example, we’ll just pretend it worked and store the user in context.
      const mockUserData = { email, name: "New User" };
      await login(mockUserData);
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Error", error.message || "Failed to sign up");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Sign Up" onPress={handleSignup} />

      <Text style={styles.linkText}>Already have an account?</Text>
      <Button title="Back to Login" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  linkText: {
    marginVertical: 12,
    textAlign: "center",
  },
});
