const url = "localhost:3000/";
import * as Crypto from "expo-crypto";

export const login = async (email: string, password: string) => {
  try {
    let hash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password);
    let body = JSON.stringify({
      email: email,
      password: hash,
    });

    const response = await fetch(url + "/usuario/login", {
      method: "POST",
      body: body,
    });
    const json = await response.json();
    const result = json.password == hash;
    return result;
  } catch (error) {
    console.error(error);
  }
};

const register = async (email: string, password: string) => {
  try {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, function (err, hash) {
        body = JSON.stringify({
          email: email,
          password: hash,
        });
      });
    });

    const response = await fetch(url + "/usuario/login", {
      method: "GET",
      body: body,
    });
    const json = await response.json();
    const result = await bcrypt.compare(json.password, hash);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default { login, register };
