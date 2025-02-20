import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Text,
} from "react-native";
import supabase from "../utils/supabaseClient";
import { Button, Input } from "@rneui/themed";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>OOTD</Text>
        <Input
          containerStyle={styles.inputContainer}
          label="Email"
          labelStyle={styles.label}
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
        <Input
          containerStyle={styles.inputContainer}
          label="Password"
          labelStyle={styles.label}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
        />
        <Button
          title="Sign In"
          loading={loading}
          buttonStyle={styles.signInButton}
          containerStyle={styles.buttonContainer}
          onPress={signInWithEmail}
        />
        <TouchableOpacity
          style={styles.signUpLink}
          onPress={() => navigation.navigate("SignUpScreen")}
        >
          <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    alignSelf: "center",
    marginTop: "60%", // Adjust to position the title
    marginBottom: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "600",
    color: "#333",
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: "#4a90e2",
    paddingVertical: 15,
    borderRadius: 8,
  },
  signUpLink: {
    alignItems: "center",
    marginTop: 10,
  },
  signUpText: {
    color: "#4a90e2",
    fontSize: 16,
    fontWeight: "500",
  },
});
