import axios from "axios";
//import Header from './Components/Header.jsx';

//Properties API
  export const getProperties = async () => {
    const { 
        data: { results },
    } = await axios.get("http://localhost:5174/api/properties");

    const propertiesData = await Promise.all(
      results.map(async ({ url }) => {
        const { data } = await axios.get(url);
        return data;
    })
  );
    return propertiesData;
  };
  
  //PropertybyId API
  export const getPropertyById = async (id) => {
    const { data } = await axios.get(`http://localhost:5174/api/properties/${id}`);
    return data;
  }

  //Reviews (by prop id) API
  export const getReviewsByProperty = async (id) => {
    const { data } = await axios.get(`http://localhost:5174/api/properties/${id}/reviews`);
    return data;
  }

  