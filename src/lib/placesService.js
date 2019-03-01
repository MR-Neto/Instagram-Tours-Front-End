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
      .then(({ data }) => {
        return data;
      })
  }
}

const placesService = new PlacesService();

export default placesService;
