import { StyleSheet,TextInput, Pressable, Alert } from 'react-native';
import React, {useState, createRef} from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {registering} from "../services";
import { showMessage, hideMessage } from "react-native-flash-message";

export default function Register({ navigation }: RootTabScreenProps<'Register'>) {

  const [email, onChangeEmail] = useState('');
  const [name, onChangeName] = useState('');
  const [password, onChangePassword] = useState('');
  const [passwordConfirm, onChangePasswordConfirm] = useState('');

  const Registration = () => {
    console.log(`registering ${email} ${name} ${password}`);

    if(password != passwordConfirm) return showAlert();
    try{
      registering(email, name, password).then( (success) => {
        if ( success ){
          showMessage({
            message: "Registrado con Exito",
            type: "success",
          });
          navigation.navigate('Login');
        } 
      });
      
    }catch(error) {
        console.log(error)
    }

  }

  const showAlert = () =>
    Alert.alert(
      "Contraseñas no son iguales",
      "Las dos contraseñas escritas no son iguales entre ellas",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
    

  return (
    <View style={styles.container}>
      <Text style={styles.main_title}>Register</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TextInput style={styles.input} 
                 placeholder="Email" 
                 onChangeText={string => onChangeEmail(string)}
                 value={email}/>
      <TextInput style={styles.input} 
                 placeholder="Nombre" 
                 onChangeText={string => onChangeName(string)}
                 value={name}/>
      <TextInput style={styles.input} 
                 placeholder="Contrseña" 
                 onChangeText={string => onChangePassword(string)}
                 value={password}/>
      <TextInput style={styles.input} 
                 placeholder="Confirmar contraseña" 
                 onChangeText={string => onChangePasswordConfirm(string)}
                 value={passwordConfirm}/>
      <Pressable style={styles.button}
        onPress={() => Registration()}
      >
        <Text style={styles.text_button}>Registrarse</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0,116,255,0.9)"
  },
  main_title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "rgba(255,255,255,1)",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgba(255,255,255,1)",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    width: "80%",
    margin: 12,
    borderWidth: 1,
    marginVertical: 20,
    padding: 10,
    borderRadius: 11,
    backgroundColor: "rgba(255,255,255,1)",
  },
  button: {
    width: "40%",
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
