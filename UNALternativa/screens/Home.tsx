import { StyleSheet, TextInput, Pressable } from "react-native";
import React, {useState, createRef, useEffect} from 'react';
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { get_huella } from "../services";
import { showMessage, hideMessage } from "react-native-flash-message";
import '../global/global.js'
import {useNavigationState} from '@react-navigation/native';



export default function Home({ navigation }: RootTabScreenProps<"Home">) {
  
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [HuellaSemanal,onChangeHuella] = useState(0);
  const [HuellaMensual,onChangeHuellaM] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigationState = useNavigationState(state => state);



    const Circle = () => {
        return <View style={styles.circle}>
            <Text style={styles.text_button}> 1000 Puntos</Text>
            </View>;
    };
    useEffect(() => {
        get_huella(global.id_user).then((huella) =>{
        onChangeHuella(Math.round(huella.huella_semanal*100)/100);
        onChangeHuellaM(Math.round(huella.huella_mensual*100)/100);
        setIsLoading(false);
      }, [navigationState]);
    
  })

  if (isLoading){
    return (
      <View style={styles.container}>
      <Text style={styles.title}>Hola, usted tiene</Text>
      <Circle/>
      <Text style={styles.text}>Huella de carbono semanal aproximada: 0 kg de CO2</Text>
      <Text style={styles.text}>Huella de carbono Mensual aproximada: 0 kg de CO2</Text>
    </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola, usted tiene</Text>
      <Circle/>
      <Text style={styles.text}>Huella de carbono semanal aproximada: {HuellaSemanal} kg de CO2</Text>
      <Text style={styles.text}>Huella de carbono Mensual aproximada: {HuellaMensual} kg de CO2</Text>
      <Pressable style={styles.button}
        onPress={() => navigation.navigate('DataUpdate')}
      >
        <Text style={styles.text_button}>Registrar datos</Text>
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
  text: {
    fontSize: 15,
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
    width: "50%",
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
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: "rgba(241,184,7,255)",
    justifyContent: "center",
    alignItems: 'center',
  }
});


