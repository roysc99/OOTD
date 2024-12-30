import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Camera from "../screens/CameraScreen";
import PhotoPreview from "../screens/PhotoPreview"; // <-- Your new preview screen

const CameraStack = createStackNavigator();

export default function CameraNavigator() {
  return (
    <CameraStack.Navigator screenOptions={{ headerShown: false }}>
      <CameraStack.Screen name="Camera" component={Camera} />
      <CameraStack.Screen name="PhotoPreview" component={PhotoPreview} />
    </CameraStack.Navigator>
  );
}
