import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Alert,
  Text,
  Button,
  StyleSheet,
} from "react-native";
import axios from "axios";
import Checkbox from "expo-checkbox";
import { useApp } from "../context/AppContext";

const Home = () => {
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const app = useApp();

  useEffect(() => {
    fetchTypesAndUserInterests();
  }, []);

  const fetchTypesAndUserInterests = async () => {
    setIsLoading(true);
    try {
      const [typesRes, interestsRes] = await Promise.all([
        axios.get("https://project-l-3mor.onrender.com/api/v1/user/get-types"),
        axios.get("https://project-l-3mor.onrender.com/api/v1/user/user-interests", {
          headers: { Authorization: `Bearer ${app.token}` },
        }),
      ]);

      setTypes(typesRes.data.types);
      // Initialize selectedTypes based on interestsRes
      setSelectedTypes(interestsRes.data.interests);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSelection = (item) => {
    setSelectedTypes((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const updateInterest = async () => {
    setIsLoading(true);
    try {
      // Map selected keys back to interest names
      await axios.put(
        "https://project-l-3mor.onrender.com/api/v1/user/update-interest",
        { interests: selectedTypes },
        { headers: { Authorization: `Bearer ${app.token}` } }
      );

      Alert.alert("Success", "Interests updated successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to update interests");
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.centered}>
      {types.map((el, index) => (
        <View key={index + el} style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={selectedTypes.includes(el)}
            onValueChange={() => toggleSelection(el)}
            color={selectedTypes.includes(el) ? "#4630EB" : undefined}
          />
          <Text>{el}</Text>
        </View>
      ))}
      <Button
        title="Update Interests"
        onPress={updateInterest}
        disabled={isLoading}
      />
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    alignSelf:"center",
    display:"flex",
    
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  checkbox: {
    margin: 8,
  },
});
