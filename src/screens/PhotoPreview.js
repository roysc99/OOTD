import React from "react";
import {
  SafeAreaView,
  View,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { decode } from "base64-arraybuffer";
import supabase from "../utils/supabaseClient";
import * as FileSystem from "expo-file-system";

export default function PreviewScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  // photoUri is passed from Camera
  const { photoUri } = route.params || {};

  const handleUpload = async () => {
    try {
      const photo = await FileSystem.readAsStringAsync(photoUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      //upload in supabase storage 'images'
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`images/${Date.now()}.jpg`, decode(photo), {
          contentType: "image/jpeg",
        });
      if (data) {
        const publicUrl = supabase.storage
          .from("images")
          .getPublicUrl(data.path).data.publicUrl;
      }
      if (error) throw new Error(error.message);
    } catch (e) {
      console.error("Upload error", e);
    }
    navigation.navigate("Home", { screen: "FollowingFeed" });
  };

  return (
    <SafeAreaView style={styles.container}>
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.fullImage} />
      ) : (
        <Button title="No Photo" onPress={() => navigation.goBack()} />
      )}

      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-circle-outline" size={52} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={handleUpload}>
          <Ionicons name="checkmark-circle-outline" size={52} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111", // Helps show full screen contrast
  },
  fullImage: {
    flex: 1,
    resizeMode: "contain", // or 'cover'
  },
  overlay: {
    position: "absolute",
    bottom: 60, // Positions icons near the bottom
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  iconButton: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
    borderRadius: 30,
  },
});
