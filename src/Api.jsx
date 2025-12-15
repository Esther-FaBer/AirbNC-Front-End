import axios from "axios";

//Properties API
  export const getProperties = async () => {
    const { 
        data: { results },
    } = await axios.get(""); //check

    const propertiesData = await Promise.all(
      results.map(async ({ url }) => {
        const { data } = await axios.get(url);
        return data;
    })
  );
    return propertiesData;
  };
  
  //PropertybyID API
  export const getPropertyById = async () => {
    const { data } = await axios.get(`http://localhost:5174/api/properties/${id}`);//check
    return data;
  }

  //Reviews (by prop id) API
  export const getReviewsByProperty = async (id) => {
    const { data } = await axios.get(`http://localhost:5174/api/properties/${id}/reviews`);//check
    return data;
  }