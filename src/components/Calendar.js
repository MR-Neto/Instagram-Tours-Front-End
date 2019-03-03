import React, { Component } from 'react';
import dateFns from 'date-fns';
import './Calendar.css';
import tourService from '../lib/tourService';

class Calendar extends Component {
  
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    tours: [],
  };
  
  componentDidMount() {
    tourService.getAllTours()
      .then((tours) => {
        this.setState({
          tours,
        });
      })
      .catch(error => console.log(error));
  }

  findMatchingTourByDate = (date) => {
    const { tours } = this.state;
    const formatDate = 'YYYY-MM-DD';
    const formattedInputDate = dateFns.format(date, formatDate);
    return tours.find((tour) => {
      const formattedTourDate = dateFns.format(tour.date, formatDate);
      return dateFns.isEqual(formattedTourDate, formattedInputDate);
    });
  }

  // updateCurrentDay = (day) => {
  //   console.log('yeasss')
  //   this.setState({
  //     currentDay: day,
  //   });
  // }

  renderHeader() {
    const dateFormat = "MMM YYYY";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>
            {dateFns.format(this.state.currentMonth, dateFormat)}
          </span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dd";
    const days = [];
    let startDate = dateFns.startOfWeek(this.state.currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = "D";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        // Find the corresponding day in our tours
        const foundTour = this.findMatchingTourByDate(day);
        const cloneDay = day;
        days.push(        
            <div
              className={`col cell ${
                // On current month display, disable days from past and next month
                !dateFns.isSameMonth(day, monthStart)
                  ? "disabled"
                  // Disable all past days
                  : dateFns.isBefore(day, dateFns.startOfToday(new Date())) ? "disabled"
                  : foundTour && foundTour.isFull ? 'unavailable'
                  : foundTour && !foundTour.isFull ? 'joinable'
                  : dateFns.isSameDay(day, selectedDate) ? "selected" : "available"
              }`}
              key={day}
              onClick={() => {
                this.onDateClick(dateFns.parse(cloneDay));
              }}
            >
              <div className="number">{formattedDate}</div>
            </div>          
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
    this.props.updateSelectedDateHandler(day);
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    const hasLoadedTours = this.state.tours.length > 0;
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {hasLoadedTours && this.renderCells()}
      </div>
    )
  }
}

export default Calendar;
