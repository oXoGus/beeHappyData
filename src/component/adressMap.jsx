import axios from 'axios';

const reverseGeocode = async (lat, lon) => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
      params: {
        format: 'json',
        lat,
        lon
      }
    });
    return response.data.display_name;  // Vous pouvez ajuster pour obtenir d'autres parties de l'adresse
  } catch (error) {
    console.error('Erreur lors du géocodage inverse:', error);
    return null;
  }
};

export default reverseGeocode;
