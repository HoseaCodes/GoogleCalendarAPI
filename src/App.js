import React from 'react';
import ApiCalendar from 'react-google-calendar-api';
import BigCalendar from './Calendar';
import moment from "moment";
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      sign: ApiCalendar.sign,
      userFName: null,
      userLName: null,
      userEmail: null,
      events: []
    };
    this.signUpdate = this.signUpdate.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    ApiCalendar.onLoad(() => {
      ApiCalendar.listenSign(this.signUpdate);
    });
  }



  signUpdate(sign) {
    this.setState({
      sign
    })
  }

  handleItemClick(event, name) {
    if (name === 'sign-in') {
      ApiCalendar.handleAuthClick()
      console.log(ApiCalendar)
      const calendar = ApiCalendar.getBasicUserProfile();
      // const now = new Date();
      // const yearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
      // const newevents = ApiCalendar.getEvent(now, yearFromNow)
      // console.log(newevents)
      this.setState({
        userFName: calendar.oT, userLName: calendar.kR,
        signedIn: true, userEmail: calendar.zt
      })
      this.getUpcomingEvents()
      // .getName()
      // .then(console.log);
      // ApiCalendar.listUpcomingEvents(10).then(({ result }) => console.log(result.items))
      // ApiCalendar.listEvents({
      //   timeMin: new Date().toString(),
      //   timeMax: new Date().addDays(10).toString(),
      //   showDeleted: true,
      //   maxResults: 10,
      //   orderBy: 'updated'
      // }).then(({ result }) => console.log(result.items))
    } else if (name === 'sign-out') {
      ApiCalendar.handleSignoutClick();
      this.setState({ signedIn: false })
      console.log('out')
    }
  }

  getUpcomingEvents() {
    console.log('hi')
    ApiCalendar.listUpcomingEvents(10).then(({ result }) => {
      console.log(result)
      const neweventsarr = []
      for (let index = 0; index < result.items.length; index++) {
        const start = moment.utc(result.items[index].start.dateTime).toDate().toString();
        const end = moment.utc(result.items[index].end.dateTime).toDate().toString();
        const event = { start: start, end: end, title: result.items[index].summary }
        neweventsarr.push(event)
      }
      console.log(neweventsarr)
      console.log(ApiCalendar.listUpcomingEvents)
      this.setState({ events: neweventsarr })
    })
  }


  render() {
    console.log(new Date(new Date().setFullYear(new Date().getFullYear() - 1)))
    console.log(this.state)
    // const eventFromNow = {
    //   summary: 'Poc Dev From Now',
    //   time: 480,
    // };

    // ApiCalendar.createEventFromNow(eventFromNow)
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // const event = {
    //   summary: 'New Event Title',
    // };
    // ApiCalendar.getEvent('2eo85lmjkkd2i63uo3lhi8a2cq').then(console.log);
    // ApiCalendar.updateEvent(event, '2eo85lmjkkd2i63uo3lhi8a2cq').then(console.log);
    // ApiCalendar.deleteEvent('2eo85lmjkkd2i63uo3lhi8a2cq').then(console.log);
    if (!this.state.signedIn) {
      return (
        <>
          <div className="middle">
            <div>
              <h1 className="title">Hosea Codes</h1>
              <button type="button" className="google-button "
                onClick={(e) => this.handleItemClick(e, 'sign-in')}>
                <span className="google-button__icon">
                  <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg"><path d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z" id="Shape" fill="#EA4335" /><path d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z" id="Shape" fill="#FBBC05" /><path d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z" id="Shape" fill="#4285F4" /><path d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z" fill="#34A853" /></svg>
                </span>
                <span className="google-button__text">Sign in with Google</span>
              </button>
            </div>
          </div>
          <footer>Made with <span>🖤 &amp; 🍕</span> by: HoseaCodes</footer>
        </>
      )
    }
    return (
      <>
        <div>{this.state.sign}</div>
        <button type="button" className="google-button out "
          onClick={(e) => this.handleItemClick(e, 'sign-out')}>
          <span className="google-button__icon">
            <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg"><path d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z" id="Shape" fill="#EA4335" /><path d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z" id="Shape" fill="#FBBC05" /><path d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z" id="Shape" fill="#4285F4" /><path d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z" fill="#34A853" /></svg>
          </span>
          <span className="google-button__text">Sign out of Google</span>
        </button>
        <h2>Welcome, {`${this.state.userFName} ${this.state.userLName}`}</h2>
        <BigCalendar events={this.state.events} />
      </>
    );
  }
}