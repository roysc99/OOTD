import React from 'react';
import { SafeAreaView, View, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


export default function PreviewScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  // photoUri is passed from Camera
  const { photoUri } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.fullImage} />
      ) : (
        <Button title="No Photo" onPress={() => navigation.goBack()} />
      )}

        <View style={styles.overlay}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle-outline" size={52} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={() => alert('Go to next step')}>
            <Ionicons name="checkmark-circle-outline" size={52} color="#fff" />
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111', // Helps show full screen contrast
  },
  fullImage: {
    flex: 1,
    resizeMode: 'contain', // or 'cover'
  },
  overlay: {
    position: 'absolute',
    bottom: 60,               // Positions icons near the bottom
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    borderRadius: 30,
  },
});


