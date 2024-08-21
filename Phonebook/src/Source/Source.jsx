import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getData = () => {
  return axios.get(baseUrl)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching data:', error);
      throw error;
    });
};

const postData = (newPerson) => {
  return axios.post(baseUrl, newPerson)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error adding person:', error);
      throw error;
    });
};

const deleteData = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleting person:", error);
      throw error;
    });
};

// Corrected replaceData function
const replaceData = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Problem replacing person:", error);
      throw error;
    });
}

export default {
  getData,
  postData,
  deleteData,
  replaceData  // Ensure this is exported
};
