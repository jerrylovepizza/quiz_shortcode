import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ContentEditable from "react-contenteditable";

class YN_Compnent extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            question: this.props.question,
        };
    }
    
    onChangeTex(e) {
        let q = this.props.question;

        q.text = (e == 0) ? "Yes" : "No";
        this.props.changeQuestion(q);
    }

    render() {
        
        const q = this.props.question;
        const question = this.state.question;

        return (
            <div class={q.img_align + " mc-question yn-question"}  >

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

                <div class="qs-bg-img">
                    {
                        q.add_img ? 
                        (<img src={q.img}></img>)
                        :                        
                        (<Fragment></Fragment>)
                    }
                </div>                

                <div class="qs-content">
                    <div class="qs-content-buttons">
                        {
                            q.answers.map((as, index) => (
                                <a class="qs-btn" onClick={(e) => {this.onChangeTex(index)}} index={"qs-a-" + index}>{as}</a>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

YN_Compnent.propTypes = {
    question: PropTypes.object,
    changeQuestion: PropTypes.func,
    nextQuestion:PropTypes.func,
    activate: PropTypes.number,
    is_error: PropTypes.bool
};

export default YN_Compnent;