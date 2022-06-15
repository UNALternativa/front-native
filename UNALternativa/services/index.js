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

export default { login, registering };
