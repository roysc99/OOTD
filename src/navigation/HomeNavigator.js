import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import FollowingFeed from '../screens/FollowingFeed'
import GlobalFeed from '../screens/GlobalFeed'
import HomeSearch from '../screens/HomeSearch'

const Stack = createStackNavigator();

/** This is our home stack which contains our two feeds */
const HomeNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Following" component={FollowingFeed} />
        <Stack.Screen name="Global" component={GlobalFeed} />
        <Stack.Screen name ="Home Search" component={HomeSearch} />
      </Stack.Navigator>
    );
  };
  
  export default HomeNavigator;
