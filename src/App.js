import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import AuthProvider from './components/AuthProvider';
import PrivateRoute from './routes/PrivateRoute';
import AnonRoute from './routes/AnonRoute';
import Home from './pages/Home';
import AuthView from './pages/AuthView';
import Profile from './pages/Profile';
import BookingController from './pages/BookingController';


import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './lib/Booking/reducers'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


class App extends Component {

  render() {
    return (
      <AuthProvider>
        <Provider store={store}>
          <div className="container">
            <Switch>
              <AnonRoute path="/auth" component={AuthView} />
              <PrivateRoute path="/profile" component={Profile} />
              <Route path="/book" component={BookingController} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </Provider>
      </AuthProvider>
    )
  }
}

export default App;
