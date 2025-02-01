import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import supabase from "../utils/supabaseClient";
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";

const CDNURL =
  "https://azbppiezjcqmxbtkofom.supabase.co/storage/v1/object/public/images/outfits/";
//to get image CDNURL + image.name

export default function GlobalFeed() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function getImage() {
      try {
        const { data, error } = await supabase.storage
          .from("images")
          .list("outfits/");
        if (data) {
          setImages(data);
        }
        if (error) {
          throw new Error(error.message);
        }
      } catch (e) {
        console.error("Error fetching images: ", e);
      }
    }
    getImage();
  }, []);

  const onSwipeLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };
  return (
    <FlingGestureHandler
      direction={Directions.LEFT}
      onHandlerStateChange={(event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
          onSwipeLeft();
        }
      }}
    >
      <View style={styles.container}>
        {images.length > 0 ? (
          <Image
            key={images[currentIndex].id}
            source={{
              uri: CDNURL + images[currentIndex].name,
            }}
            style={styles.image}
          />
        ) : (
          <Text>No images</Text>
        )}
      </View>
    </FlingGestureHandler>
  );
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    backgroundColor: "white",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
  image: {
    width: width * 0.95,
    height: height * 0.7,
    borderRadius: 25,
    overflow: "hidden",
    marginHorizontal: 5,
    backgroundColor: "#fff",
  },
});
