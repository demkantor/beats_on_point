import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import './App.css';
import {connect} from 'react-redux';
import Footer from '../Footer/Footer'
import Nav from '../Nav/Nav';

import Zip from '../Zip/Zip'
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import Lebowski from '../Lebowski/Lebowski';
import Shows from '../Shows/Shows';
import PhotoEdit from '../PhotoEdit/PhotoEdit';
import CalendarView from '../CalendarView/CalendarView';
import BandView from '../BandView/BandView';
import VenueView from '../VenueView/VenueView';



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
              <Route
                exact
                path="/about"
                component={AboutPage}
              />
              <Route path="/zip" component={Zip}/>
              <Route path="/lebowski" component={Lebowski}/>
              <Route path="/shows" component={Shows}/>
              <Route path="/photo-edit" component={PhotoEdit}/>
              <Route path="/calendar-view" component={CalendarView}/>
              <Route path="/band-view" component={BandView}/>
              <Route path="/venue-view" component={VenueView}/>
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
              <ProtectedRoute
                exact
                path="/info"
                component={InfoPage}
              />
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
