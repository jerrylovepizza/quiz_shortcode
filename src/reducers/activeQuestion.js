import {NEXT_QUESTION} from "../constants/index";

export default function reducer(state = 1, action) {
    
    switch (action.type) {

        case NEXT_QUESTION:            
            let newState = action.payload;            
            return newState;
        break;

      }
    
    return state;
}