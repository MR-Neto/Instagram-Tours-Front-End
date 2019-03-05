import axios from 'axios';

class PlacesService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_URL_API,
      withCredentials: true
    })
  }

  getAllPlaces() {
    return this.api.get('/places')
      .then(({ data }) => data)
      .catch((err) => console.log("Error: ", err));
  }

  getPlacesById(arrayOfid) {
    return this.api.get(`/places?id=${JSON.stringify(arrayOfid)}`)
      .then(({ data }) => data)
      .catch((error) => console.log(error));
  }
}

const placesService = new PlacesService();

export default placesService;
