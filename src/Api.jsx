import axios from "axios";

const BASE_URL = "http://localhost:9090";

//Properties API
 export const getProperties = async () => {
  const { data: { properties } } = await axios.get(`${BASE_URL}/api/properties`);
  return properties;
};
  
  //PropertybyId API
  export const getPropertyById = async (id) => {
    const { data } = await axios.get(`${BASE_URL}/api/properties/${id}`);
    return data;
  }

  //Reviews (by prop id) API
  export const getReviewsByProperty = async (id) => {
    const { data } = await axios.get(`http://localhost:9090/api/properties/${id}/reviews`);
    return data;
  }

  