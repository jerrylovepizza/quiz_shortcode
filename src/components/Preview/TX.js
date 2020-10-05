import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ContentEditable from "react-contenteditable";
import {replace_recall} from "../../constants/index";

class TX_Compnent extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            question: this.props.question,
        };
    }
    
    onChangeText(e) {
        const question = this.props.question;
        
        question.text = e.target.value;

        // this.setState({
        //     question: q
        // });
        this.props.changeQuestion(question);
    }

    render() {
        
        const q = this.props.question;
        const question = this.state.question;

        return (
            <div class={q.img_align + " mc-question tx-question"}  >

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

                <div class="qs-content">
                    <div class="qs-answer qs-others">
                        <span class="qs-index"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 20C2 21.1046 2.89543 22 4 22H17.4142L22 17.4142V4C22 2.89543 21.1046 2 20 2H4C2.89543 2 2 2.89543 2 4V20ZM4 4H20V15H17C15.8954 15 15 15.8954 15 17V20H4V4ZM17 17H19.5858L17 19.5858V17ZM7 15V17H13V15H7ZM7 13V11H17V13H7ZM7 7V9H17V7H7Z" fill="#95BB54"/>
                        </svg>
                        </span>
                        <span class="qs-item">
                            <ContentEditable              
                            html={q.text}                            
                            tagName='p'
                            class="qs-control"
                            onChange={(e) => {this.onChangeText(e); }}
                            />
                            </span>
                    </div>
                </div>

                <div class="qs-bg-img">
                    {
                        q.add_img ? 
                        (<img src={q.img}></img>)
                        :                        
                        (<Fragment></Fragment>)
                    }
                </div>                

                
            </div>
        )
    }
}

TX_Compnent.propTypes = {
    questions: PropTypes.object,
    question: PropTypes.object,
    changeQuestion: PropTypes.func,
    nextQuestion:PropTypes.func,
    activate: PropTypes.number,
    is_error: PropTypes.bool
};

export default TX_Compnent;