import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    padding: 30,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  title: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    top: -15,
  },
  safeArea: {
    fles: 1,
    backgroundColor: "white",
  },
  buttonGroup: {
    flexDirection: "row",
    position: "absolute",
    top: 40,
    justifyContent: "center",
  },
  followingButton: {
    color: "gray",
    fontSize: 16,
    fontWeight: "bold",
    right: 30,
    top: 20,
  },
  globalButton: {
    color: "gray",
    fontSize: 16,
    fontWeight: "bold",
    left: 20,
    top: 20,
  },
  activeText: {
    color: "black",
  },
  searchButton: {
    top: -37,
    left: 150,
  },
});
