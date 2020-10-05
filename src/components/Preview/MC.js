import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ContentEditable from "react-contenteditable";
import {replace_recall} from "../../constants/index";

class MC_Compnent extends Component {
    
    constructor(props) {
        super(props);
    }
    
    onAnswerClick(index) {
        
        const q = this.props.question;
        const mul_answer = q.mul_answer;

        if (!mul_answer) {
            q.answers.map((val) => val.checked = false);
        }

        if (typeof q.answers[index].checked == "undefined") {
            q.answers[index].checked = false;
        }

        q.answers[index].checked = !q.answers[index].checked;
        this.props.changeQuestion(q);
    }

    render() {
        
        const q = this.props.question;
        const acount = q.answers.length + 1;
        const others = q.others ? q.others : [];
        const is_image = q.is_image;
        let answers = "";

        if (is_image) {
            answers = (
                (
                    <div class="qs-content qs-img-content">
                        {
                            q.answers.map((as, index) => (
                                <div className={as.checked ? "qs-img active" : "qs-img" }  index={index} onClick={(e) => {this.onAnswerClick(index);}}>
                                    <div>
                                        <img src={as.url} />
                                        <span class="qs-index">{as.title}</span>
                                    </div>
                                </div>
                            )
                            )
                        }
                    </div>
                )
            )
        } else {
            answers = (
                (
                    <div class="qs-content">
                        {
                            q.answers.map((as, index) => (
                                <div className={as.checked ? "qs-answer active" : "qs-answer" }  index={index} onClick={(e) => {this.onAnswerClick(index);}}>
                                    <span class="qs-index">{index + 1}</span>
                                    <span class="qs-item"><ContentEditable              
                                        html={as.title}
                                        disabled={true}                    
                                        tagName='span'
                                        /></span>
                                </div>
                            )
                            )
                        }
                        {
                            others.map((o, index) => (
                                <div class="qs-answer qs-others" key={`${o}`} >
                                    <span class="qs-index">{index + acount }</span>
                                    <span class="qs-item"><input type="text" class="qs-control" placeholder="type your answer here" value={o.title}></input></span>
                                </div>
                            ))
                        }
                    </div>
                )
            )
        }
        return (
           
            <div class={q.img_align + " mc-question"}  >
                <div class="qs-bg-img">
                    {   
                        q.add_img ? 
                        (<img src={q.img}></img>)
                        :                        
                        (<Fragment></Fragment>)
                    }
                </div>

                <div class="qs-header">
                
                    <ContentEditable
                    html={replace_recall(q.title, this.props.questions)}
                    disabled={true}                    
                    tagName='h3'
                    />
                </div>
                <div class="qs-description">
                    <ContentEditable              
                    html={q.description}
                    disabled={true}                    
                    tagName='p'
                    />
                </div>
                
                {answers}

                
                
            </div>
            
        )
    }
}

MC_Compnent.propTypes = {
    questions: PropTypes.object,
    question: PropTypes.object,
    changeQuestion: PropTypes.func,
    nextQuestion:PropTypes.func,
    activate: PropTypes.number,
    is_error: PropTypes.bool
};

export default MC_Compnent;
