import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { decode } from "base64-arraybuffer";
import supabase from "../utils/supabaseClient";
import * as FileSystem from "expo-file-system";

export default function PreviewScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [uploading, setUploading] = useState(false);

  // photoUri is passed from Camera
  const { photoUri } = route.params || {};

  const handleUpload = async () => {
    if (uploading) return;

    setUploading(true);
    try {
      const photo = await FileSystem.readAsStringAsync(photoUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`outfits/${Date.now()}.jpg`, decode(photo), {
          contentType: "image/jpeg",
        });
      if (error) throw new Error(error.message);
    } catch (e) {
      console.error("Upload error", e);
    } finally {
      setUploading(false);
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

      <View>
        <TouchableOpacity
          style={styles.redoButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close-outline" size={40} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.sendButton} onPress={handleUpload}>
          <Ionicons name="send-outline" size={45} color="#fff" />
        </TouchableOpacity>
      </View>

      {uploading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  fullImage: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  sendButton: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  redoButton: {
    position: "absolute",
    top: -725,
    left: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
