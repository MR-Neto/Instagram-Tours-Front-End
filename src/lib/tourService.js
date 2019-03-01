import axios from 'axios';

class TourService {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true
    })
  }

  getAllTours() {
    return this.api.get('/tours')
      .then(({ data }) => data)
      .catch((err) => {
        console.log("Error: ", err)
      });
  }

  makeBooking(date, user, places) {
    return this.api.post('/book', { date, user, places })
      .then(({ data }) => data)
      .catch((err) => {
        console.log("Error: ", err)
      });
  }

  getBookedToursByUser(userId) {
    return this.api.get(`/${userId}/bookedtours`)
      .then(({ data }) => data)
      .catch((err) => {
        console.log("Error: ", err)
      });
  }
}

const tourService = new TourService();

export default tourService;
