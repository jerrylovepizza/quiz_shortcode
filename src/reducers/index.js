// This will can combine one or more Reducer functions and export it through Redux's combineReducer helper.
import { combineReducers } from "redux";

// import secondCounter from './exampleReducer';

import questions from "./questions";
import activate from "./activeQuestion";
import loading from "./loading";


export default combineReducers({ loading, activate, questions});

// Example for combining multiple reducers:
// export default combineReducers({ count, secondCounter });