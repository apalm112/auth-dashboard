/*********************************************************

      Main application entry point for Shards Dashboard.

**********************************************************/

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Switch
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

// import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./views/Register";
import Login from "./views/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.css";

import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.scss";
// end SD imports

/* MERN-AUTH CODE BLOCK  */
// Check for token to keep user logged in even if they close or refresh the app (e.g. until they log out or the token expires)
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  // redux-thunk: middleware for Redux that allows us to directly access the `dispatch()` method to make asynchronous calls from our actions
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      // MERN-AUTH LINE
      <Provider store={store}> 
        <Router basename={process.env.REACT_APP_BASENAME || ""}>



          {/* START OF SD CODE */}
          <div>
          {/* <div className="App">
              <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div> 
          */}
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={withTracker(props => {
                    return (
                      <route.layout {...props}>
                        <route.component {...props} />
                      </route.layout>
                    );
                  })}
                />
              );
            })}
          </div>
          {/* END OF SD CODE */}

         
        </Router>
      </Provider>
    );
  }
}
export default App;

// Removed MERN AUTH Code Block for Private Route Component
//  <div className="App">
//   {/* <Navbar /> */}
//   <Route exact path="/" component={Landing} />
//   <Route exact path="/register" component={Register} />
//   <Route exact path="/login" component={Login} />
//   <Switch>
{/* 
                  Pull in our Dashboard component and define it as a PrivateRoute 
              */}
//     <PrivateRoute exact path="/dashboard" component={Dashboard} />
//   </Switch>
// </div>