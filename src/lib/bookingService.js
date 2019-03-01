class BookingService {
  constructor(date, placesPicked, numberOfTickets, stage) {
    this.date = date;
    this.placesPicked = placesPicked;
    this.numberOfTickets = numberOfTickets;
    this.stage = stage;
  }

  setValues(values, num) {
    if (values) {
      this.date = values.date;
      this.placesPicked = values.placesPicked;
      this.numberOfTickets = values.numberOfTickets;
    }
    if (num) {
      this.stage = num;
    }
  }
  clearValues(values) {
    this.date = '';
    this.placesPicked = [];
    this.numberOfTickets = 0;
    this.stage = 0;
  }

}

const booking = new BookingService('', [], 0, 0);

export default booking;