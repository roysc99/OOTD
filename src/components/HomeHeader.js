import React, { useState } from "react";
import styles from "../components/HomeHeaderStyles";
import { SafeAreaView, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

/* Homepage header that displays Following, Global, and Search */
export default function HomeHeader({}) {
  //states for when following page is active or global
  const [activeButton, setActiveButton] = useState(null);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>OOTD</Text>
        <View style={styles.searchButton}>
          <Pressable
            onPress={() => {
              navigation.navigate("HomeSearch");
            }}
          >
            <Text>Search</Text>
          </Pressable>
        </View>
        <View style={styles.buttonGroup}>
          <Pressable
            onPress={() => {
              setActiveButton("Following");
              navigation.navigate("HomeNavigator", { screen: "FollowingFeed" });
            }}
            style={styles.textButton}
          >
            <Text
              style={[
                //if activeButton is equal to Following, styles.activeText is returned
                styles.followingButton,
                activeButton === "Following" && styles.activeText,
              ]}
            >
              Following
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setActiveButton("Global");
              navigation.navigate("HomeNavigator", { screen: "GlobalFeed" });
            }}
          >
            <Text
              style={[
                styles.globalButton,
                activeButton === "Global" && styles.activeText,
              ]}
            >
              Global
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
