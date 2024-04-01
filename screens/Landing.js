import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Landing = () => {
  const navigation = useNavigation(); // Hook to access navigation prop

  const [opacity] = useState(new Animated.Value(0));
  const [scale] = useState(new Animated.Value(0.5));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Function to handle button press
  const navigateToSignIn = () => {
    navigation.navigate("signin"); // Use the screen name you defined in your navigation stack
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, { opacity, transform: [{ scale }] }]}>
        <Text style={styles.title}>Appointment Alert System</Text>
        <Text style={styles.subtitle}>
          Stay notified. Never miss an appointment.
        </Text>
      </Animated.View>
      <View style={{ marginTop: 30 }}>
        <TouchableOpacity
          onPress={navigateToSignIn}
          style={{
            padding: 8,
            backgroundColor: "#007bff",
            paddingHorizontal: 35,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f5",
  },
  card: {
    width: width * 0.9,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
  },
});

export default Landing;
