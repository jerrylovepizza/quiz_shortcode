import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MC from "./Preview/MC";
import FB from "./Preview/FB";
import TX from "./Preview/TX";
import RT from "./Preview/RT";
import PH from "./Preview/PH";
import EM from "./Preview/EM";
import YN from "./Preview/YN";
import RD from "./Preview/RD";
import FU from "./Preview/FU";
import ProgressBar from "./Preview/ProgressBar";
import validator from "validator";
import {RESULT} from "../constants/index";
import { CSSTransition, TransitionGroup  } from "react-transition-group";
import RAlert from "./Preview/RAlert";
import Mailer from "./Mailer";
import axios from "axios";
import {replace_recall} from "../constants/index";

const getTotal = (e, len) => {
    let count = 0;
    len = !len ? e.length : len;

    for (var i = 0; i < len; i++) {
        if (e[i].type == "HF") {
            continue;
        }

        count += 1;
    }
    
    return count;
};


const apiUrl = window.survey_settings.url;

class PreviewPanel extends Component {

    constructor(props) {
        super(props);
        let dindex = this.props.activate - 1;

        let q = this.props.questions.length > 0 ? this.props.questions[dindex] : {};
        let isEnded = 1;

        for (var i = this.props.questions.length - 1; i >= 0; i++) {
            if (this.props.questions[i].type != "HF") {
                isEnded = this.props.questions[i].id;
                break;
            }
        }

        this.state = {
            question: q,
            is_error: false,
            is_submit: false,            
            showMail: false,
            post: "",
            is_loading: false,
            end: isEnded
        };
    }


    static getDerivedStateFromProps(props, state) {
        if (props.questions.length > 0) {
            let dindex = props.activate - 1;
            let q = props.questions[dindex];
            
            
            return {
                question: q
            }
            
        }
        return null;
    }


    fileupload(e) {        
        
        var formData = new FormData();
        formData.append("file", document.getElementById("upload-image-input").files[0]);
        this.setState({
            is_loading: true
        });

        axios.post(`${apiUrl}/fileupload/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
        }).then((res) => {
            const data = res.data;
            this.setState({
                is_loading: false
            });
            if (!data.error) {
                const url = data.url;
                let q = this.props.questions[this.props.activate - 1];
                q.text = url;
                this.props.changeQuestion(q);
                setTimeout(() => {                    
                    this.nextQuestion();
                }, 100);
            }
        })
        .catch(function () {
            this.setState({
                is_loading: false
            });
            console.log("FAILURE!!");
        });        
    }

    nextable() {
        let next = this.props.activate;
        for (var i = next; i < this.props.questions.length; i++) {
            if (this.props.questions[i].type != "HF") {
                break;
            }
        }

        next = i;

        if (this.props.questions[next].type == "HF") {
            return false;
        }

        return next;
    }


    nextQuestion() {
        const q = this.props.questions[this.props.activate - 1];

        // if (q.type == "MC" || q.type == "TX") {
        //     q.title = replace_recall(q.title, this.props.questions);            
        //     this.props.changeQuestion(q);
        // }

        if (!q.required) {
            this.setState({
                is_error: false
            });

            if (this.props.activate < this.state.end) {

                const nextable = this.nextable();

                if (nextable) {
                    this.props.nextQuestion(nextable + 1);
                    return;
                }
                
            }
        }
            

        
        let checked = false;
        switch (q.type) {
            case "MC":                
                q.answers.map((val) => {
                    checked = checked || val.checked;
                });
                break;

            case "TX":
                checked = true;
                if (q.text.trim() == "") {
                    checked = false;
                }
                break;

            case "EM":                
                if (q.text.trim() == "") {
                    checked = false;
                } else {
                    if (new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(q.text)) {
                        checked = true;
                    } else {
                        checked  = false;
                    }
                    
                }
                break;
            case "PH":
                if (q.text.trim() == "") {
                    checked = false;
                } else {
                    checked  = true;

                    if (!validator.isMobilePhone(q.text.trim())) {
                        checked = false;
                    }
                }
                break;
            
            case "RD":
                checked = false;
                
                if (q.text.length > 0) {
                    q.text.map((val) => {
                        checked = checked | (val >= 0);
                    });
                }
                break;
            case "RT":
                checked = false;
                
                if (q.text >= 0) {
                    checked = true;
                }
                break;

            case "WS":
                checked = false;
                if (validator.isURL(q.text)) {
                    checked = true;
                }
                break;

            case "YN":
                checked = false;
                if (q.text == "Yes") {
                    checked = true;
                }
                break;

            case "FU":
                checked = false;
                
                if (typeof q.text === "object") {
                    this.fileupload(q.text);
                } else {
                    checked = true;
                }

                break;
        }

        this.setState({
            is_error: !checked
        });

        if (checked) {
            
            if (this.props.activate == this.state.end) {
                
                if (!this.state.post) {
                    let mailer = "";
                    let fields = {};
                    this.props.mailer.map((m, index) => {
                        if (this.props.questions[m.q_id - 1].type == "EM") {
                            mailer = this.props.questions[m.q_id - 1].text;   
                        }

                        fields[m.m_id] = this.props.questions[m.q_id - 1].text;                        
                    });

                    if (mailer) {
                        this.setState({
                            showMail: true,
                            post: {
                                email: mailer,
                                fields: fields
                            }
                        });

                        return;
                    }
                }
                
                if (RESULT) {
                    let conditions = RESULT.conditions;
                    let sum = this.onCalculate();
                    let is_redirect = true;

                    conditions.map((val) => {
                        var cond = false;
                        if (val.target == "Score") {
                            

                            const _min = parseInt(val.val[0]);
                            switch (val.condition) {
                                case "=":
                                    if (sum == _min) {
                                        cond = true;
                                    }
                                    break;
                                case "between":
                                    if (sum >= _min && sum <= parseInt(val.val[1])) {
                                        cond = true;
                                    }
                                    break;
                                case ">":
                                    if (sum > _min) {
                                       cond = true;
                                    }
                                    break;
                                case "<":
                                    if (sum < _min) {
                                        cond = true;
                                    }
                                    break;
                            }


                        } else {
                            //window.location.replace(val.redirect);
                            const val1 = val.val[0];
                            const context = this.props.questions[val.target - 1].text;

                            switch (val.condition) {
                                case "contains":
                                    if (context.indexOf(val1) >= 0) {
                                        cond = true;
                                    }
                                break;
                                case "is blank":
                                    if (context == "") {
                                        cond = true;
                                    }
                                break;
                                case "is not blank":
                                    if (context != "") {
                                        cond = true;
                                    }
                                break;
                                case "does not contains":
                                    if (context.indexOf(val1) < 0) {
                                        cond = true;
                                    }
                                break;
                                case "equals":
                                    if (context == val1) {
                                        cond = true;
                                    }
                                break;
                                case "does not equal":
                                    if (context != val1) {
                                        cond = true;
                                    }
                                break;
                            }
                        }

                        if (val.sum == "or") {
                            is_redirect = is_redirect | cond;  
                        } else {
                            is_redirect = is_redirect & cond;
                        }
                    });

                    if (is_redirect) {
                        window.location.replace(conditions[0].redirect);
                    }
                }
            }
            else {
                this.setState({
                    is_error: false,
                });

                const nextable = this.nextable();

                if (nextable) {
                    this.props.nextQuestion(nextable + 1);
                    return;
                }                
            }
        }
        
    }

    onCalculate() {
        let sum = 0;
        this.props.questions.map((q) => {
            if (q.scored_question) {
                switch (q.type) {
                    case "MC":
                        q.answers.map((as) => {
                            if (as.checked) {
                                sum += parseInt(as.score);
                            }
                        });
                        break;
                    case "EM":
                        if (new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(q.text)) {
                            sum += parseInt(q.score);
                        }
                        break;
                    case "TX":                        
                        if (q.text.trim() == "") {
                            sum += parseInt(q.score);
                        }
                        break;

                    case "PH":                        
                        if (!validator.isMobilePhone(q.text.trim())) {
                            sum += parseInt(q.score);
                        }                        
                        break;
                    
                    case "RD":
                        let checked = false;
                        
                        if (q.text.length > 0) {
                            q.text.map((val) => {
                                checked = checked | (val >= 0);
                            });
                        }

                        if (checked) {
                            sum += parseInt(q.score);
                        }
                        break;
                    case "RT":
                        if (q.text) {
                            sum += parseInt(q.score);
                        }
                        break;
        
                    case "WS":
                        
                        if (validator.isURL(q.text)) {
                            sum += parseInt(q.score);
                        }
                        break;

                    case "YN":
                    
                        if (q.text == "Yes") {
                            sum += parseInt(q.score);
                        }
                        break;
                }
            }            
        });

        return sum;
    }

    onSubmitted(e) {        
        this.setState({            
            showMail: false
        });

        this.nextQuestion();
    }
    
    render() { 
        let Question = (<Fragment></Fragment>);

        if (!this.state.question) {
            return (
                {Question}
            );
        }

        const question = this.state.question;

        switch (question.type) {
            case "MC":            
                Question = (<MC question={question}  questions = {this.props.questions} error={this.state.is_error} activate={this.props.activate} changeQuestion={this.props.changeQuestion} nextQuestion={this.props.nextQuestion}></MC>);
                break;
            case "FB":
                Question = (<FB question={question} error={this.state.is_error} activate={this.props.activate} changeQuestion={this.props.changeQuestion} nextQuestion={this.props.nextQuestion}></FB>);
                break;
            case "TX":
                Question = (<TX question={question} questions = {this.props.questions} error={this.state.is_error} activate={this.props.activate} changeQuestion={this.props.changeQuestion} nextQuestion={this.props.nextQuestion}></TX>);
                break;
            case "RT":
                Question = (<RT question={question} error={this.state.is_error} activate={this.props.activate} changeQuestion={this.props.changeQuestion} nextQuestion={this.props.nextQuestion}></RT>);
                break;
            case "PH":
                Question = (<PH question={question} error={this.state.is_error} activate={this.props.activate} changeQuestion={this.props.changeQuestion} nextQuestion={this.props.nextQuestion}></PH>);
                break;
            case "EM":
                Question = (<EM question={question} error={this.state.is_error} activate={this.props.activate} changeQuestion={this.props.changeQuestion} nextQuestion={this.props.nextQuestion}></EM>);
                break;
            case "WS":
                Question = (<EM question={question} error={this.state.is_error} activate={this.props.activate} changeQuestion={this.props.changeQuestion} nextQuestion={this.props.nextQuestion}></EM>);
                break;
            case "YN":
                Question = (<YN question={question} error={this.state.is_error} activate={this.props.activate} changeQuestion={this.props.changeQuestion} nextQuestion={this.props.nextQuestion}></YN>);
                break;
            case "RD":
                Question = (<RD question={question} error={this.state.is_error} activate={this.props.activate} changeQuestion={this.props.changeQuestion} nextQuestion={this.props.nextQuestion}></RD>);
                break;
            case "FU":
                Question = (<FU question={question} error={this.state.is_error} activate={this.props.activate} changeQuestion={this.props.changeQuestion} nextQuestion={this.props.nextQuestion}></FU>);
                break;
        }

        const q = this.props.questions[this.props.activate - 1];
        
        const is_showmail = (this.props.questions.length == this.props.activate) && this.state.showMail;
        
        let showMail = (<Fragment></Fragment>);
        if (is_showmail)
            showMail = (<Mailer mailer={this.state.post} submitted={(e) => {this.onSubmitted(e);}}></Mailer>);
        
        let is_loading = (<Fragment></Fragment>);

        if (this.state.is_loading) {
            is_loading = (
                <div class="mailer-wrapper qs-is-loading">
                    <div class="mailer-box">                    
                        <div class="load-wrapp">
                            <div class="load-3">                        
                                <div class="line"></div>
                                <div class="line"></div>
                                <div class="line"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
             <div class="suvry-wrapper">
                 {
                     is_loading
                 }
            <TransitionGroup>
                <CSSTransition
                key={this.props.activate}
                timeout={500}
                classNames="fade"
                >
                    {Question}                
                </CSSTransition>
                { this.state.is_error ? 
                (<RAlert qtype={this.state.question.type}></RAlert>)
                :
                (<Fragment></Fragment>)
                }
                
                {showMail}
                
                <div class="qs-footer">
                    <button class="qs-btn qs-btn-normal" onClick={(e) => {this.nextQuestion();}}>{q.btn_text}</button>
                </div>

                <div class="qs-progress-container">
                    <ProgressBar activate={getTotal(this.props.questions, this.props.activate)} total={getTotal(this.props.questions)}></ProgressBar>
                </div>
            </TransitionGroup>
            
            </div>
        )
    }
}

PreviewPanel.propTypes = {
    questions: PropTypes.array,
    activate: PropTypes.number,
    changeQuestion: PropTypes.func,
    nextQuestion: PropTypes.func,
    mailer: PropTypes.object,
    sendmail: PropTypes.object,
};

export default PreviewPanel;
