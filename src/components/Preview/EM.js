import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ContentEditable from "react-contenteditable";
import ProgressBar from "./ProgressBar";



class EM_Compnent extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            question: this.props.question,
        };
    }
    
    onChangeText(e) {
        let q = this.props.question;
        q.text = e.target.value;

        this.props.changeQuestion(q);
    }

    render() {
        
        const q = this.props.question;
        const question = this.state.question;
        const question_icon = (q.type == "EM") ? (
            <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2 0H20C21.1046 0 22 0.89543 22 2V16C22 17.1046 21.1046 18 20 18H2C0.89543 18 0 17.1046 0 16V2C0 0.89543 0.89543 0 2 0ZM2 6.61811V16H20V6.61853L11 11.1185L2 6.61811ZM2 4.38199L11 8.88245L20 4.38247V2H2V4.38199Z" fill="#6C858E"/>
            </svg>
        ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0ZM2.06565 9.9074C2.35719 10.2805 3.16782 10.758 4.40826 11.1475C4.89668 11.3009 5.4316 11.4357 6.00555 11.5502C6.00186 11.3679 6 11.1844 6 11C6 7.67236 6.60556 4.6673 7.65455 2.64231C4.66412 3.84042 2.46628 6.59699 2.06565 9.9074ZM6.12914 13.6108C4.52334 13.3317 3.14644 12.9093 2.10296 12.3658C2.58837 15.5542 4.74677 18.1927 7.65455 19.3577C6.88867 17.8792 6.35916 15.8783 6.12914 13.6108ZM8.17891 13.8773C9.07601 13.9581 10.0209 14 11 14C11.9633 14 12.9124 13.9454 13.8253 13.8441C13.3742 17.4417 12.127 20 11 20C9.87647 20 8.63347 17.4574 8.17891 13.8773ZM13.9863 11.8045C13.0367 11.9275 12.028 12 11 12C9.95577 12 8.95341 11.9483 8.01531 11.8502C8.00522 11.5706 8 11.287 8 11C8 5.98399 9.5936 2 11 2C12.4064 2 14 5.98399 14 11C14 11.2713 13.9953 11.5397 13.9863 11.8045ZM15.8792 13.5269C15.6539 15.8289 15.1208 17.861 14.3454 19.3577C17.3046 18.1721 19.4876 15.4606 19.9212 12.1964C18.861 12.7479 17.4647 13.209 15.8792 13.5269ZM19.9285 9.86013C19.458 10.3883 17.9737 11.0157 15.9962 11.4541C15.9987 11.3035 16 11.1521 16 11C16 7.67236 15.3944 4.6673 14.3454 2.64231C17.3216 3.83471 19.5128 6.57077 19.9285 9.86013Z" fill="#F37350"/>
            </svg>
        );

        return (
            <div class={q.img_align + " mc-question em-question"}  >

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

                <div class="qs-content">
                    <div class="qs-answer qs-others">
                        <span class="qs-index">
                            {q.img ? 
                            (
                                <img src={q.img} class="qs-img-icon"></img>
                            )
                            :
                            ( question_icon )
                            }
                        </span>                        
                        <span class="qs-item">
                            <input              
                            value={q.text}                                                        
                            class="qs-control qs-m0"
                            onChange={(e) => {this.onChangeText(e); }}
                            />
                            </span>
                    </div>
                </div>
                                
            </div>
        )
    }
}

EM_Compnent.propTypes = {
    question: PropTypes.object,
    changeQuestion: PropTypes.func,
    nextQuestion:PropTypes.func,
    activate: PropTypes.number,
    is_error: PropTypes.bool
};

export default EM_Compnent;