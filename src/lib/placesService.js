import axios from 'axios';

class PlacesService {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true
    })
  }

  getAllPlaces() {
    console.log("places");

    return this.api.get('/places')
      .then(({ data }) => {
        console.log("got data");
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const placesService = new PlacesService();

export default placesService;
