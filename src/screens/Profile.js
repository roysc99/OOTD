import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import supabase from "../utils/supabaseClient";

export default function ProfileScreen() {
  async function signOut() {
    await supabase.auth.signOut();
  }
  return (
    <View style={styles.container}>
      <Text>Welcome to the app!</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
