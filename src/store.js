import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers"; // Gets the State from the reducer(s)
import thunk from "redux-thunk";

let store = createStore(reducer, applyMiddleware(thunk)); // Creates the store from the State received from the reducer(s)

export default store;

