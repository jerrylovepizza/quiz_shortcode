import {QUIZ_LOADING} from "../constants/index";

export default function reducer(state = true, action) {
    
    switch (action.type) {
        case QUIZ_LOADING:
            state = action.payload;
            return state;
        break;
      }
    
    return state;
}