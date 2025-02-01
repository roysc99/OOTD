import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // For tab icons
import HomeNavigator from "../navigation/HomeNavigator";
import Profile from "../screens/Profile";
import Leaderboard from "../screens/Leaderboard";
import CameraNavigator from "../navigation/CameraNavigator";
import Header from "../components/HomeHeader";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => { // Only have header when we are on the home page, but this can be changed
          if (route.name === "Home") {
            return <Header title="OOTD" />;
          }
          return null;
        },
        tabBarIcon: ({ color, size }) => { // Default icons 
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Leaderboard") {
            iconName = "trophy";
          } else if (route.name === "Profile") {
            iconName = "person";
          } else if (route.name === "Camera") {
            iconName = "camera";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
      />
      {/** Use CameraNavigator here */}
      <Tab.Screen
        name="Camera"
        component={CameraNavigator}
        options={{
          tabBarStyle: { display: "none" }, // Optional: hide tab bar on Camera/Preview
        }}
      />
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
