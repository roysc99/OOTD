import React from "react";
import HomeNavigator from "../navigation/HomeNavigator";
import Profile from "../screens/Profile";
import Leaderboard from "../screens/Leaderboard";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Header from "../components/HomeHeader";

const Tab = createBottomTabNavigator();

/** TabNavigator to move between each page(home, leaderboard, profile)
 */
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          header: () => <Header title="OOTD" />, // Custom header
        }}
      />
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
