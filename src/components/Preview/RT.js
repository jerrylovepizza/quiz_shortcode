import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ContentEditable from "react-contenteditable";
import {range} from "../../util";

class RT_Compnent extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            question: this.props.question,
        };
    }
    
    onChangeText(e) {
        let q = this.props.question;
        q.text = e;

        this.props.changeQuestion(q);
    }

    render() {
        
        const q = this.props.question;
        const question = this.state.question;

        return (
            <div class={q.img_align + " mc-question tx-question"}  >

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

                    {q.barchart ? (
                    <div class="qs-rating-wraper">
                        <div class="qs-rating-bar">
                            {range(q.scale).map((val, index) => (
                                <div className={ (q.text == index) ?  "qs-rate active" : "qs-rate"} onClick={(e) => {this.onChangeText(index)}}>{val + 1}</div>
                            ))}
                        </div>
                        <div class="qs-rating-description">
                            <span class="qs-rating-txt">{q.left}</span>
                            <span class="qs-rating-txt">{q.middle}</span>
                            <span class="qs-rating-txt">{q.right}</span>
                        </div>
                    </div>
                    ) :(
                    <div class="qs-rating-wrapper">
                        <div class="qs-rating-star">
                            {range(q.scale).map((val, index) => (
                                <div className={ (q.text == index) ?  "qs-star active" : "qs-star"} index={"qs-star" + index} onClick={(e) => {this.onChangeText(index)}}>
                                    <span class="star">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path  d="M15.5999 20.0194L10.7119 22.9704L12.0119 17.4064L7.69589 13.6624L13.3899 13.1684L15.5999 7.92944L17.8229 13.1814L23.5169 13.6754L19.2009 17.4194L20.5009 22.9834L15.5999 20.0194Z" fill="transparent" />
                                        <path class="star-out" fill-rule="evenodd" clip-rule="evenodd" d="M19.253 11.2061L28.6 12.0121L21.515 18.1611L23.634 27.3001L15.6 22.4511L7.56601 27.3001L9.69801 18.1611L2.60001 12.0121L11.947 11.2191L15.6 2.6001L19.253 11.2061ZM10.7118 22.971L15.5998 20.02L20.5008 22.984L19.2008 17.42L23.5168 13.676L17.8228 13.182L15.5998 7.92998L13.3898 13.169L7.69581 13.663L12.0118 17.407L10.7118 22.971Z" fill="#000" opacity="0.54"  />
                                        </svg>
                                    </span>

                                    <span>
                                        {val + 1}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    )
                }
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

RT_Compnent.propTypes = {
    question: PropTypes.object,
    changeQuestion: PropTypes.func,
    nextQuestion:PropTypes.func,
    activate: PropTypes.number,
    is_error: PropTypes.bool
};

export default RT_Compnent;