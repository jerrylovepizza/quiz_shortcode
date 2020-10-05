import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ContentEditable from "react-contenteditable";
import FileUploader from "./FileUploader";

class FU_Compnent extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            question: this.props.question,
        };
    }
    
    changeFile(e) {
        let q = this.props.question;
        q.text = e;        
        this.props.changeQuestion(q);
    }
    
    render() {
        
        const q = this.props.question;
        const question = this.state.question;

        return (
            <div class={q.img_align + " mc-question fu-question"}  >                
                <div class="qs-content">
                    <FileUploader changeFile={(e) => {this.changeFile(e);}}></FileUploader>
                </div>

                <div class="qs-header">
                    <ContentEditable
                    html={q.title}
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

            </div>
        )
    }
}

FU_Compnent.propTypes = {
    question: PropTypes.object,
    changeQuestion: PropTypes.func,
    nextQuestion:PropTypes.func,
    activate: PropTypes.number,
    is_error: PropTypes.bool
};

export default FU_Compnent;