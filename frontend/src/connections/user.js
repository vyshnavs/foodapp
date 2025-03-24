import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchData = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/users/getData");
    return data;
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

export const sendData = async (payload) => {
  try {
    const { data } = await axios.post("http://localhost:5000/api/users/register", payload);
    return data;
  } catch (error) {
    console.error("API Error:", error);
  }
};
