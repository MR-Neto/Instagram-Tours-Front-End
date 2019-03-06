import axios from 'axios';

class TourService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_URL_API,
      withCredentials: true
    })
  }

  getAllTours() {
    return this.api.get('/tours')
      .then(({ data }) => data);
  }
  
  getBookedToursByUser(userId) {
    return this.api.get(`/${userId}/bookedtours`)
      .then(({ data }) => data);
  }

  makeBooking(booking) {
    return this.api.post('/book', booking)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log("Error: ", err)
        if (err.response.data.code) {
          return err.response.data.code;
        } else {
          console.log("Error: ", err)
        }
      });
  }
}

const tourService = new TourService();

export default tourService;
