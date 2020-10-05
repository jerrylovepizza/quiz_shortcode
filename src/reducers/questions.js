import {CHANGE_QUESTION} from "../constants/index";

const initialState = window.suvery_data.questions;

export default function reducer(state = initialState, action) {
    
    if (action.type == CHANGE_QUESTION) {
        let ddindex = action.payload.id - 1;
        let res = [...state];
        res[ddindex] = JSON.parse(JSON.stringify(action.payload));//Object.assign({}, action.payload); 
        if (action.payload.type == "FU") {
        	res[ddindex].text = action.payload.text;
        }
        
        return res;
    }

    return state;
}

