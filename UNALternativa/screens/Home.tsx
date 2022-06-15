import { StyleSheet, TextInput, Pressable } from "react-native";
import React, {useState, createRef} from 'react';
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import {login} from "../services";
import { showMessage, hideMessage } from "react-native-flash-message";


export default function Login({ navigation }: RootTabScreenProps<"Login">) {
  
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,116,255,0.9)",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "rgba(255,255,255,1)",
    marginVertical: 30,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    width: "80%",
    margin: 12,
    borderWidth: 1,
    marginVertical: 30,
    padding: 10,
    borderRadius: 11,
    backgroundColor: "rgba(255,255,255,1)",
  },
  button: {
    width: "30%",
    height: "10%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 11,
    backgroundColor: "rgba(241,184,7,255)",
    justifyContent: "center",
    alignItems: 'center',
  },
  text_button: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgba(255,255,255,1)",
  }
});


