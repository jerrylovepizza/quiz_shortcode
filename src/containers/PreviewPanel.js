import React, { Component } from "react";
import PreviewPanel from "../components/PreviewPanel";
import { connect } from "react-redux";
import {dispatchNext, dispatchchangeQuestion, sendmailer} from "../actions/index";

export class Controller extends Component {
  render() {
    return (
        <PreviewPanel {...this.props}/>
    )
  }
};

const mapStateToProps = store => {
  return {
    questions: store.questions,
    activate: store.activate,
    mailer: window.suvery_data.mails     
  };
};

const mapDispatchToProps = dispatch => {
    return {    
        changeQuestion: (e) => {
          dispatch(dispatchchangeQuestion(e));
        },
        nextQuestion: (e) => {          
          dispatch(dispatchNext(e));
        },
        sendmail: (e) => {
          dispatch(sendmailer(e));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controller);
