const url = "http://127.0.0.1:3000";
import * as Crypto from "expo-crypto";
import "../global/global.js"
export const login = async (email: string, password: string) => {
  try {
    let hash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password);
    let body = JSON.stringify({
      correo: email,
      password: hash,
    });

    const response = await fetch(url + "/usuario/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body
    });
    const json = await response.json();
    console.log(json);
    const result = json.password == hash;
    global.id_user = json._id;
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const registering = async (email: string, name: string, password: string) => {
  try {
    let hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password);
    let body = JSON.stringify({
      correo: email,
      nombre: name,
      password: hash,
    });

    const response = await fetch(url + "/usuario/registrar_usuario", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body,
    });
    const json = await response.json();
    const result = json.password == hash;
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const registering_location = async (id: string, ubicacion) => {
  try {
    
    let body = JSON.stringify({
      idUsuario: id,
      ubicacion: ubicacion
    });

    const response = await fetch(url + "/usuario/registrar_ubicacion", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body,
    });
    const json = await response.json();
    let result = response.status >= 200  && response.status < 300;
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const registering_avg_trips = async (id: string, p_a,p_b,p_t,p_c) => {
  try {
    
    let body = JSON.stringify({
      idUsuario: id,
      promedio_dias_automovil: p_a,
      promedio_dias_bicicleta: p_b,
      promedio_dias_bus: p_t,
      promedio_dias_caminando: p_c
    });

    const response = await fetch(url + "/usuario/registrar_promedio_viajes", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body,
    });
    const json = await response.json();
    let result = response.status >= 200  && response.status < 300;
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const get_huella = async (id: string) => {
  try {
    
    let body = JSON.stringify({
      idUsuario: id,
    });

    const response = await fetch(url + "/usuario/huella_de_carbono_por_id", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body,
    });
    const json = await response.json();
    //let result = response.status >= 200  && response.status < 300;
    return json;
  } catch (error) {
    console.error(error);
  }
};

export default { login, registering };
