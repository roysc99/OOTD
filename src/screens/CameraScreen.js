// CameraScreen.js
import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { decode } from "base64-arraybuffer";

import supabase from "../utils/supabaseClient";
import * as FileSystem from "expo-file-system";

export default function CameraScreen() {
  const navigation = useNavigation();
  const cameraRef = React.useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState("back");

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  if (!permission) return null;
  if (!permission.granted) return <Text>No Camera Permission</Text>;

  const flipCamera = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    try {
      const result = await cameraRef.current?.takePictureAsync?.({});
      if (result?.uri) {
        const photo = await FileSystem.readAsStringAsync(result.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Stores in supabase bucket called images
        const { data, error } = await supabase.storage
          .from("images")
          .upload(`images/${Date.now()}.jpg`, decode(photo), {
            contentType: "image/jpeg",
          });

        if (data) {
          const publicUrl = supabase.storage
            .from("images")
            .getPublicUrl(data.path).data.publicUrl;

          // Navigate to the next screen in the stack (PreviewScreen)
          navigation.navigate("PhotoPreview", { photoUri: result.uri });
        }
        if (error) throw new Error(error.message);
      }
    } catch (e) {
      console.error("Capture error:", e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing={facing}
        mirror={true}
      >
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              navigation.navigate("Home", { screen: "FollowingFeed" })
            }
          >
            <Ionicons name="arrow-back-circle-outline" size={42} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={takePicture}>
            <Ionicons name="camera-outline" size={52} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={flipCamera}>
            <Ionicons name="camera-reverse-outline" size={42} color="#fff" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Updated overlay styles:
  overlay: {
    position: "absolute",
    bottom: 40, // Positions icons near the bottom
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
