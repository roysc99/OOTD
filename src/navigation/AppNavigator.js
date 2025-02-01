import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import supabase from "../utils/supabaseClient";
import TabNavigator from "./TabNavigator";
import LoginNavigator from "../navigation/LoginNavigator";
import LoadingScreen from "../components/LoadingScreen";
import HomeSearch from "../screens/HomeSearch";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUserSession() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setTimeout(() => {
        setInitializing(false);
      }, 1000);
    }
    checkUserSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (initializing) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator>
      {user ? (
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
        // Render the logged-out navigator (LoginNavigator)
        <Stack.Screen
          name="LoginNav"
          component={LoginNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
