import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

/*******************************************
  REDUX STORE

  import Constants from "./constants";
  // ^--will put flux constants into /types.js
  import getSidebarNavItems from "../data/sidebar-nav-items";
  
  // createFluxStore(reducer)
  
  Setting up our store: createStore() creates a Redux store that holds the complete state tree of your app. There should only be a single store in your app.

  Our store also sends application state to our React components, which will react accordingly to that state.

*******************************************/

const initialState = {};

const middleware = [thunk];


const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose
  )
);

export default store;
