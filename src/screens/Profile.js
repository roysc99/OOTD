import React from "react";
import { View, Text } from "react-native";
import LogoutButton from "../components/LogoutButton"; // Adjust path to where you defined LogoutButton

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Screen</Text>
      <LogoutButton />
    </View>
  );
}
