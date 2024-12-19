import React from 'react';
import HomeNavigator from '../navigation/HomeNavigator'
import Profile from '../screens/Profile'
import Leaderboard from '../screens/Leaderboard'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

/** TabNavigator is different from StackNavigator 
 *  TabNavigator moves between pages
 *  
 *  This contains each page
 */
const TabNavigator = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeNavigator} />        
        <Tab.Screen name="Leaderboard" component={Leaderboard} />
        <Tab.Screen name="Profile" component={Profile} />
        
      </Tab.Navigator>
    );
  };
  
  export default TabNavigator;
