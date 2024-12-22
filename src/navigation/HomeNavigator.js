import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FollowingFeed from "../screens/FollowingFeed";
import GlobalFeed from "../screens/GlobalFeed";
import HomeSearch from "../screens/HomeSearch";

const Stack = createStackNavigator();

/** home stack contains following and global feed */
const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FollowingFeed"
        component={FollowingFeed}
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="GlobalFeed"
        component={GlobalFeed}
        options={{ headerShown: false, animation: "none" }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
