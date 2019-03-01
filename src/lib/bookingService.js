class BookingService {
  constructor(date, placesPicked, numberOfTickets) {
    this.date = date;
    this.placesPicked = placesPicked;
    this.numberOfTickets = numberOfTickets;
  }

  setValues(values) {
    this.date = values.date;
    this.placesPicked = values.placesPicked;
    this.numberOfTickets = values.numberOfTickets;
  }
}

const booking = new BookingService('', [], 0);

export default booking;