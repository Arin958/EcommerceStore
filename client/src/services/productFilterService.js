import axios from "axios";

const API = import.meta.env.VITE_API;

export const getFilteredProducts = async (params = {}) => {
  try {
    const res = await axios.get(`${API}/api/user/filter`, {
      params
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
