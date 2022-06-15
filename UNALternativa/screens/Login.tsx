import { StyleSheet, TextInput, Pressable } from "react-native";
import React, {useState, createRef} from 'react';
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import {login} from "../services";
import { showMessage, hideMessage } from "react-native-flash-message";
import '../global/global.js'

export default function Login({ navigation }: RootTabScreenProps<"Login">) {
  
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  

  const logueo = () => {
    console.log(`login ${email} ${password}`);
    try{
      login(email, password).then( (success) => {
        if ( success ){
          showMessage({
            message: "Autenticado con Exito",
            type: "success",
          });
          console.log(global.id_user);
          navigation.navigate('Home')
        } else {
          showMessage({
            message: "Error en autenticado",
            type: "error",
          });
        }
      });
      
    }catch(error) {
        console.log(error)
    }
    


  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de sesion</Text>
      <TextInput style={styles.input} 
                 placeholder="Email" 
                 onChangeText={string => onChangeEmail(string)}
                 value={email}/>
      <TextInput style={styles.input} 
                 placeholder="Password" 
                 onChangeText={string => onChangePassword(string)}
                 type="password"
                 value={password}
                 secureTextEntry={true}/>
      <Pressable style={styles.button}
        onPress={() => logueo()}
      >
        <Text style={styles.text_button}>Inicio</Text>
      </Pressable>
      <Pressable
        onPress={() =>
          navigation.navigate('Register')
        }
      >
        <Text style={styles.text_button}>¿Nuevo aqui?¡Regístrate!</Text>
      </Pressable>
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


