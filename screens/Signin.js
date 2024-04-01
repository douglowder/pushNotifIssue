import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useApp } from "../context/AppContext";
import axios from "axios";

export default Signin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const app = useApp();
  const showAlert = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };

  const login = async () => {
    console.log(app.pushToken);

    axios
      .post("https://project-l-3mor.onrender.com/api/v1/user/login", {
        email,
        password,
        pushToken: app.pushToken,
      })
      .then((res) => {
        console.log("success" + res.data.token);
        app.changeToken(res.data.token);
      })
      .catch(() => Alert.alert("Error", "Please verify your credentials"));
  };
  return (
    <View style={styles.container}>
      <Image style={styles.bgImage} source={require("../assets/bg.jpg")} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Email"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onChangeText={(email) => setEmail(email)}
        />
        <Image
          style={styles.inputIcon}
          source={{ uri: "https://img.icons8.com/nolan/40/000000/email.png" }}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={(password) => setPassword(password)}
        />
        <Image
          style={styles.inputIcon}
          source={{ uri: "https://img.icons8.com/nolan/40/000000/key.png" }}
        />
      </View>

      <TouchableOpacity
        style={[styles.buttonContainer, styles.loginButton]}
        onPress={() => login()}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCDCDC",
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: "center",
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: "transparent",
  },
  btnForgotPassword: {
    height: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 10,
    width: 300,
    backgroundColor: "transparent",
  },
  loginButton: {
    backgroundColor: "#00b5ec",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: "white",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});
