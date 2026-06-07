import axios from "axios";

const BASE_URL = "http://localhost:9090";

export const getProperties = async () => {
  const { data: { properties } } = await axios.get(`${BASE_URL}/api/properties`);  
  const propertiesWithImages = await Promise.all(
    properties.map(async (property) => {
      try {
          const { data: { images } } = await axios.get(`${BASE_URL}/api/properties/${property.property_id}/images`);
          return {
            ...property,
            image_url: images[0]?.image_url || null,
            alt_tag: images[0]?.alt_text || property.property_name,
          };
      } catch {
        return { ...property, image_url: null, alt_tag: property.property_name };
      }
    })
  );

  return propertiesWithImages;
};
  


  export const getPropertyById = async (id) => {
    const { data } = await axios.get(`${BASE_URL}/api/properties/${id}`);
    return data;
  };

 
  export const getReviewsByProperty = async (id) => {
    const { data } = await axios.get(`${BASE_URL}/api/properties/${id}/reviews`);
    return data;
  };

  export const getImagesByProperty = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/api/properties/${id}/images`);
  return data;
};

  