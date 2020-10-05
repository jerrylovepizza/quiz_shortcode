import axios from "axios";
import {NEXT_QUESTION, CHANGE_QUESTION} from "../constants/index";

// import {READ_RESULT } from "../constants/result";


// const  quiz_id = window.quiz_id;

// export const readPost = () => {
//     return dispatch => {
        
//         if (quiz_id > 0) {
//             axios.get(`${apiUrl}quiz/${quiz_id}`).then(
//                 res => {
//                     // console.log(res.data);
//                     const data = res.data;
//                     dispatch(dispatchQuiz(data.quiz));
//                     dispatch(dispatchQuestion(data.questions));                                     
//                     dispatch(dispatchReadResult(data.result));
//                     dispatch(dispatchDisableLoading());
//                 }
//             ).catch(error => {
//                 throw(error);
//                 dispatch(dispatchDisableLoading());
//             })
        
            
//         } else {
//             dispatch(dispatchDisableLoading());
//         }
//     }
// }

// export function dispatchReadResult(result) {
//     return {
//         type: READ_RESULT,
//         payload: result,
//     }
// }

// export function dispatchQuestion(questions) {
//     return {
//         type: QUIZ_EXECUTE_QUESTION,
//         payload: questions
//     }
// }

// export function dispatchQuiz(quiz) {
//     return {
//         type: QUIZ_EXECUTE_QUIZ,
//         payload: quiz
//     }
// }

// export function dispatchDisableLoading() {
//     return {
//         type: QUIZ_LOADING,
//         payload: false
//     }
// }

// export function dispatchEnableLoading() {
//     return {
//         type: QUIZ_LOADING,
//         payload: true
//     }
// }

export function dispatchNext(current) {
    return {
        type: NEXT_QUESTION,
        payload: current
    }
}

export function dispatchchangeQuestion(payload) {
    return {
      type: CHANGE_QUESTION,
      payload: payload
    }
  }

export function dispatchMailer(payload) {
  return {
    type: SUBMITTED_QUESTION,
    payload: payload,
  }
}

export const sendmailer = (e) => {
    return dispatch => {
            axios.post(`${apiUrl}send/`, e).then(
                res => {
                  const data = res.data;

                  if (data.status != "success") {
                    console.log("error");
                  }
                  dispatch(dispatchMailer(true));
                }
            ).catch(error => {
                console.log("error");
                throw(error);
                dispatch(dispatchMailer(true));
            });
        } 
}