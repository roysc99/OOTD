import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context/AuthProvider";
import TabNavigator from "./TabNavigator";
import HomeSearch from "../screens/HomeSearch";
import LoginNavigator from "../navigation/LoginNavigator";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(AuthContext);
  return (
    <Stack.Navigator>
      {user ? (
        // User is signed in
        <>
          <Stack.Screen
            name="MainTabs"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeSearch"
            component={HomeSearch}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        // No user is signed in
        <Stack.Screen
          name="LoginNav"
          component={LoginNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
