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
      .then(({ data }) => data);
  }

  makeBooking(booking) {
    return this.api.post('/book', booking)
      .then(({ data }) => data);
  }

  getBookedToursByUser(userId) {
    return this.api.get(`/${userId}/bookedtours`)
      .then(({ data }) => data);
  }
}

const tourService = new TourService();

export default tourService;
