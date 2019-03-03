import axios from 'axios';

class PlacesService {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true
    })
  }

  getAllPlaces() {
    return this.api.get('/places')
      .then(({ data }) => data)
      .catch((err) => console.log("Error: ", err));
  }

  getPlaceById(id) {
    return this.api.get(`/places?id=${id}`)
      .then(({ data }) => data)
      .catch((error) => console.log(error));
  }
}

const placesService = new PlacesService();

export default placesService;
