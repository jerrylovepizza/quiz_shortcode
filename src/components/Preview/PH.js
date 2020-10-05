import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ContentEditable from "react-contenteditable";

class PH_Compnent extends Component {
    
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

        return (
            <div class={q.img_align + " mc-question ph-question"}  >

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
                            ( <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.023 8.76975C12.6922 7.8679 12.9322 6.91742 12.1753 6.07844C10.4768 3.7018 9.33456 2.2321 8.61807 1.52432C7.25594 0.178748 5.01519 0.360758 3.83548 1.52317C3.20184 2.14751 2.98733 2.36192 2.33673 3.02275C-1.28724 6.64866 0.922843 14.3137 6.79805 20.1947C12.6719 26.0743 20.3362 28.2856 23.9678 24.652C24.5682 24.0732 25.0765 23.5647 25.4774 23.1409C26.6335 21.919 26.809 19.7771 25.4698 18.3856C24.7832 17.6722 23.3817 16.5851 20.905 14.8135C20.1465 14.1352 19.2471 14.2822 18.4226 14.8232C18.026 15.0834 17.7373 15.3466 17.1923 15.8922L16.2026 16.8825C16.0722 17.0129 14.3021 16.1264 12.5838 14.4065C10.8646 12.6856 9.97878 10.9154 10.1085 10.7857C10.3761 10.5181 10.7062 10.1878 11.0989 9.79471C11.2719 9.62162 11.3545 9.53782 11.4606 9.42639C11.6814 9.19424 11.8643 8.98357 12.023 8.76975ZM18.0281 18.709L19.0181 17.7185C19.318 17.4182 19.5124 17.2336 19.6706 17.1063C21.8401 18.6643 23.0966 19.644 23.6098 20.1773C23.918 20.4974 23.8701 21.0817 23.6022 21.3648C23.2315 21.7566 22.7499 22.2385 22.1589 22.8085C19.8106 25.1578 13.6238 23.3728 8.62401 18.3682C3.6227 13.362 1.83857 7.1742 4.16914 4.84234C4.81712 4.18423 5.02242 3.97903 5.64701 3.3636C5.88119 3.13285 6.5191 3.08103 6.80398 3.36245C7.35561 3.90737 8.37886 5.21757 9.88413 7.31439C9.80621 7.41113 9.70888 7.52046 9.59044 7.64494C9.5035 7.73631 9.43108 7.80972 9.27275 7.96821C8.88033 8.36102 8.55051 8.69102 8.28331 8.9582C6.60007 10.6413 8.03357 13.5058 10.7576 16.2326C13.4798 18.9575 16.3455 20.3926 18.0281 18.709Z" fill="#EACD38"/>
                            </svg> )
                            }                            
                        </span>
                        <span class="qs-ph-code">
                            {
                                q.country_code
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

PH_Compnent.propTypes = {
    question: PropTypes.object,
    changeQuestion: PropTypes.func,
    nextQuestion:PropTypes.func,
    activate: PropTypes.number,
    is_error: PropTypes.bool
};

export default PH_Compnent;