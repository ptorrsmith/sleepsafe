import { combineReducers } from "redux";

import providers from './providers'
import currentService from './currentService'
import currentView from './currentView'
import currentProvider from './currentProvider'
import location from './location'
import timer from "./timer";
import auth from './fakeAuth'

export default combineReducers({
  providers,
  currentService,
  currentProvider,
  location,
  timer,
  auth
});
