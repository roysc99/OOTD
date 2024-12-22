import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import HomeSearch from "../screens/HomeSearch";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      {/* main tab layout including ootd header, following, leaderboard, etc. */}
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />

      {/* separate search page */}
      <Stack.Screen
        name="HomeSearch"
        component={HomeSearch}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
