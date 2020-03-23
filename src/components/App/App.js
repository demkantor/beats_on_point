import React, {Component} from 'react';
import {HashRouter as Router, Route, Redirect, Switch, Link} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import './App.css';
import {connect} from 'react-redux';
import Footer from '../Footer/Footer'
import Nav from '../Nav/Nav';
import AboutPage from '../AboutPage/AboutPage';
import Lebowski from '../Lebowski/Lebowski';
import CalendarView from '../CalendarView/CalendarView';
import BandView from '../BandView/BandView';
import VenueView from '../VenueView/VenueView';

import Zip from '../Zip/Zip'
import Shows from '../Shows/Shows';

import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import PhotoEdit from '../PhotoEdit/PhotoEdit';
import SignInSuccess from '../SignInSuccess/SignInSuccess';

import BandEdit from '../BandEdit/BandEdit';
import VenueEdit from '../VenueEdit/VenueEdit';
import AddEvent from '../AddEvent/AddEvent';





class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <>
          <Nav />
          <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />
              {/* Visiting localhost:3000/about will show the about page.
              This is a route anyone can see, no login necessary */}
              <Route exact path="/about" component={AboutPage}/>
              <Route exact path="/zip" component={Zip}/>
              <Route exact path="/lebowski" component={Lebowski}/>
              <Route exact path="/shows" component={Shows}/>
              <Route exact path="/calendar-view" component={CalendarView}/>
              <Route exact path="/band-view" component={BandView}/>
              <Route exact path="/venue-view" component={VenueView}/>

              {/* All routes below are protected, must be signed in to see */}
              <ProtectedRoute exact path="/sign-in-success" component={SignInSuccess}/>
              <ProtectedRoute exact path="/calendar-edit" component={AddEvent}/>
              <ProtectedRoute exact path="/band-edit" component={BandEdit}/>
              <ProtectedRoute exact path="/venue-edit" component={VenueEdit}/>
              <ProtectedRoute exact path="/photo-edit" component={PhotoEdit}/>
              {/* For protected routes, the view could show one of several things on the same route.
              Visiting localhost:3000/home will show the UserPage if the user is logged in.
              If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
              Even though it seems like they are different pages, the user is always on localhost:3000/home */}
              <ProtectedRoute
                exact
                path="/home"
                component={UserPage}
              />
              {/* This works the same as the other protected route, except that if the user is logged in,
              they will see the info page instead. */}
              <ProtectedRoute exact path="/info" component={InfoPage}/>

              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => 
                <div className="fourOfour">
                  <img src="./images/lebowski_404.png" alt="lebowski" className="lost"/>
                  <Link className="nav-link lostLink" to="/lebowski">The rug really did tie the room together</Link>
                  <Link className="nav-link lostLinkBack" to="/home">Bring Me Somewhere Safe!</Link>
                </div>
              } />
            </Switch>
            <Footer />
        </>
      </Router>
  )}
}

export default connect()(App);
