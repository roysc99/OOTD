// CameraScreen.js
import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";

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
      let result = await cameraRef.current?.takePictureAsync?.({});
      if (result?.uri) {
        // Navigate to the next screen in the stack (PreviewScreen)
        navigation.navigate("PhotoPreview", { photoUri: result.uri });
      }
    } catch (e) {
      console.error("Capture error:", e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        mirror={true}
      >
        <View style={styles.overlay}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Home", { screen: "FollowingFeed" })
            }
            style={styles.backButton}
          >
            <Ionicons name="chevron-back-outline" size={35} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
            <Ionicons name="radio-button-on-outline" size={90} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.flipButton} onPress={flipCamera}>
            <Ionicons name="repeat-outline" size={35} color="#fff" />
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
    bottom: 0, // Positions icons near the bottom
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  flipButton: {
    position: "absolute",
    top: -595,
    right: 15,
  },
  backButton: {
    position: "absolute",
    top: -595,
    left: 10,
  },
  cameraButton: {
    padding: 10,
    borderRadius: 30,
  },
  camera: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
});
