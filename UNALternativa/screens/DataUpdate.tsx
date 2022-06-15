import { StyleSheet, TextInput, Pressable } from "react-native";
import React, {useState, createRef} from 'react';
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import DropDownPicker from 'react-native-dropdown-picker'
import { RootTabScreenProps } from "../types";
import {registering_location, registering_avg_trips} from "../services";
import { showMessage, hideMessage } from "react-native-flash-message";
import * as Location from 'expo-location';
import '../global/global.js'


export default function DataUpdate({ navigation }: RootTabScreenProps<"DataUpdate">) {
  
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [items1, setItems1] = useState([
    {label: 'Ninguno', value: 0},
    {label: 'Uno', value: 1},
    {label: 'Dos', value: 2},
    {label: 'Tres', value: 3},
    {label: 'Cuatro', value: 4},
    {label: 'Cinco', value: 5},
    {label: 'Seis', value: 6},
    {label: 'Siete', value: 7},
  ]);
  const [items2, setItems2] = useState([
    {label: 'Ninguno', value: 0},
    {label: 'Uno', value: 1},
    {label: 'Dos', value: 2},
    {label: 'Tres', value: 3},
    {label: 'Cuatro', value: 4},
    {label: 'Cinco', value: 5},
    {label: 'Seis', value: 6},
    {label: 'Siete', value: 7},
  ]);
  const [items3, setItems3] = useState([
    {label: 'Ninguno', value: 0},
    {label: 'Uno', value: 1},
    {label: 'Dos', value: 2},
    {label: 'Tres', value: 3},
    {label: 'Cuatro', value: 4},
    {label: 'Cinco', value: 5},
    {label: 'Seis', value: 6},
    {label: 'Siete', value: 7},
  ]);
  const [items4, setItems4] = useState([
    {label: 'Ninguno', value: 0},
    {label: 'Uno', value: 1},
    {label: 'Dos', value: 2},
    {label: 'Tres', value: 3},
    {label: 'Cuatro', value: 4},
    {label: 'Cinco', value: 5},
    {label: 'Seis', value: 6},
    {label: 'Siete', value: 7},
  ]);
  const [AutomovilValue, setAutomovilValue] = useState(0);
  const [BicicletaValue, setBicicletaValue] = useState(0);
  const [BusTransmilenioValue, setBusTransmilenioValue] = useState(0);
  const [CaminandoValue, setCaminandoValue] = useState(0);
  const [currentlocation, setLocation] = useState({});
  

  const Update = () => {
    (async () => {
      let permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== 'granted') {
        showMessage({
          message: "Permission to access location was denied",
          type: "danger",
        });
        return;
      }
      let currentlocation = await Location.getCurrentPositionAsync({});
      setLocation(currentlocation);
      if(AutomovilValue+BicicletaValue+BusTransmilenioValue+CaminandoValue > 7){
        showMessage({
          message: "La cantidad de dias indicados supera los 7 dias de la semana",
          duration: 3500,
          type: "danger",
        });
        return;
      }
      let result = registering_location(global.id_user,[currentlocation.coords.latitude, currentlocation.coords.longitude]);
      if(result){
        showMessage({
          message: "Se cambio la ubicacion",
          duration: 3500,
          type: "success",
        });
        let result2 = registering_avg_trips(global.id_user,AutomovilValue,BicicletaValue,BusTransmilenioValue,CaminandoValue)
        if(result2){
          showMessage({
            message: "Se actualizo la huella",
            duration: 3500,
            type: "success",
          });
          navigation.navigate('Home')
        }else{
          showMessage({
            message: "Hubo un error",
            duration: 3500,
            type: "danger",
          });
        }
        
      }else{
        showMessage({
          message: "Hubo un error",
          duration: 3500,
          type: "danger",
        });
      }
    
    })();
    
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Por cada medio de transporte, cuantos días a la semana lo usa para ir a la Universidad?</Text>
      
      <View style={styles.InsideContainer}>
        <Text style={styles.Picker}>Automóvil</Text>
        <DropDownPicker
          containerStyle={{width: "40%"}}
          items={items1}
          open={open1}
          value={AutomovilValue}
          defaultIndex={1}
          onSelectItem={(thing) => console.log(thing)}
          setOpen={setOpen1}
          setValue={setAutomovilValue}
          setItems={setItems1}
          zIndex={4000}
          zIndexInverse={1000}
        />
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.InsideContainer}>
        <Text style={styles.Picker}>Bicicleta</Text>
        <DropDownPicker
          containerStyle={{width: "40%"}}
          items={items2}
          open={open2}
          value={BicicletaValue}
          defaultIndex={1}
          onSelectItem={(thing) => console.log(thing)}
          setOpen={setOpen2}
          setValue={setBicicletaValue}
          setItems={setItems2}
          zIndex={3000}
          zIndexInverse={2000}
        />
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.InsideContainer}>
        <Text style={styles.Picker}>Bus</Text>
        <DropDownPicker
          containerStyle={{width: "40%"}}
          items={items3}
          open={open3}
          value={BusTransmilenioValue}
          defaultIndex={1}
          onSelectItem={(thing) => console.log(thing)}
          setOpen={setOpen3}
          setValue={setBusTransmilenioValue}
          setItems={setItems3}
          zIndex={2000}
          zIndexInverse={3000}
        />
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.InsideContainer}>
        <Text style={styles.Picker}>Caminando</Text>
        <DropDownPicker
          containerStyle={{width: "40%"}}
          items={items4}
          open={open4}
          value={CaminandoValue}
          defaultIndex={1}
          onSelectItem={(thing) => console.log(thing)}
          setOpen={setOpen4}
          setValue={setCaminandoValue}
          setItems={setItems4}
          zIndex={1000}
          zIndexInverse={4000}
        />
      </View>
      
      <Pressable style={styles.button}
        onPress={() => Update()}
      >
        <Text style={styles.text_button}>Actualizar</Text>
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
    fontSize: 25,
    fontWeight: "bold",
    textAlign: 'center',
    color: "rgba(255,255,255,1)",
    marginVertical: 30,
  },
  separator: {
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  Picker:{
    width: "50%",
    fontSize: 30,
    fontWeight: "bold",
    color: "rgba(255,255,255,1)",
    textAlign: 'center',
  },
  InsideContainer: {
    backgroundColor: "inherit",
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
});


