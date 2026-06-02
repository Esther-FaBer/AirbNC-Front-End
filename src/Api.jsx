import axios from "axios";

//Properties API
  export const getProperties = async () => {
    const { data } = await axios.get("http://localhost:9090/api/properties");
    console.log(data);
    const { results } = data;

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
    const { data } = await axios.get(`http://localhost:9090/api/properties/${id}`);
    return data;
  }

  //Reviews (by prop id) API
  export const getReviewsByProperty = async (id) => {
    const { data } = await axios.get(`http://localhost:9090/api/properties/${id}/reviews`);
    return data;
  }

  