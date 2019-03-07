class BookingService {
  constructor() {
    this.date = '';
    this.placesPicked = [];
    this.numberOfTickets = 1;
    this.stage = 0;
  }

  setValues(values, num) {
    if (values) {
      this.date = values.date;
      this.placesPicked = values.placesPicked;
      this.numberOfTickets = values.numberOfTickets;
    }
    this.stage = num;

  }

  togglePlacesPicked(placeId) {
    const { placesPicked } = this;
    if (placesPicked.includes(placeId)) {
      placesPicked.splice(placesPicked.indexOf(placeId), 1);
    } else {
      this.placesPicked.push(placeId);
    }
  }

  setNumberOfTickets(num) {
    this.numberOfTickets = num;
  }

  setDate(date) {
    this.date = date;
    console.log('update BOOKING SERVICE DATE', this.date);
  }

  clearValues(values) {
    this.date = '';
    this.placesPicked = [];
    this.numberOfTickets = 0;
    this.stage = 0;
  }
}

const booking = new BookingService();

export default booking;
