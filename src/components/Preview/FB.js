import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ContentEditable from "react-contenteditable";

const twitter = window.suvery_data.options.twitter;
const facebook = window.suvery_data.options.facebook;
const instagram = window.suvery_data.options.instagram;

class FB_Compnent extends Component {
    
    constructor(props) {
        super(props);
        
        // this.state = {
        //     question: this.props.question,
        // };
    }
    
    render() {
        
        const q = this.props.question;
                
        return (
            
            <div class={q.img_align + " mc-question fb-question"}  >
            

                <div class={q.logo_align + " qs-logo"}>
                    {
                        q.is_logo ?
                        (<img src={q.logo}></img>)
                        :
                        (<Fragment></Fragment>)
                    }
                    
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
                
                <div class="qs-bg-img">
                    {
                        q.add_img ? 
                        (<img src={q.img}></img>)
                        :                        
                        (<Fragment></Fragment>)
                    }                    
                </div>
                
                { q.social && 
                    <div class="qs-social-section">
                        <a class="qs-social twitter" href={twitter}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1195 4.50827L22.5343 4.67349L21.8983 5.948C21.5882 6.56953 21.2778 7.19105 20.967 7.81258C20.9302 7.94422 20.8654 8.05962 20.7697 8.20987C20.7296 8.27265 20.5929 8.47236 20.5865 8.48194C20.5504 8.53608 20.5237 8.57878 20.5045 8.61299V11.0015C20.5045 17.1135 14.5895 20.9974 9.00354 20.9974C7.86051 20.9974 6.99207 20.9427 5.99765 20.7257C4.36115 20.3685 3.14327 19.6587 2.58597 18.418L2.01221 17.1407L3.40659 17.0124C4.66801 16.8964 5.76169 16.6561 6.60159 16.3343C4.29577 15.9635 3.0036 14.9508 3.0036 13.0489V12.0489H4.0036C4.22331 12.0489 4.42143 12.0311 4.59854 11.9983C2.868 10.9636 2.00122 9.30379 2.00122 7.00152C2.00103 6.9034 2.00103 6.90339 2.00044 6.79847C1.99394 5.63803 2.05627 5.01797 2.37395 4.22659C2.57754 3.71941 2.87183 3.24988 3.2679 2.81967L4.02251 2L4.75617 2.83847C7.17394 5.60161 9.56395 7.27795 12.0042 7.48072C12.0146 4.93105 13.9415 3.00152 16.5043 3.00152C17.6991 3.00152 18.7828 3.45501 19.6345 4.27273C20.1006 4.36851 20.5957 4.44709 21.1195 4.50827ZM18.9086 6.16202L18.6021 6.0926L18.3904 5.86028C17.8785 5.29855 17.2359 5.00152 16.5043 5.00152C15.0414 5.00152 14.0041 6.04391 14.0041 7.50152C14.0041 7.73974 13.998 7.88942 13.9683 8.08615C13.8499 8.87116 13.4096 9.50152 12.5041 9.50152C9.50607 9.50152 6.80136 7.89542 4.16389 5.15228C4.02792 5.56561 3.99595 5.99047 4.00041 6.78727C4.00101 6.89384 4.00101 6.89384 4.00122 7.00152C4.00122 9.04953 4.83093 10.1698 6.79547 10.7942L7.49255 11.0158V11.7472C7.49255 12.6342 6.65222 13.4691 5.42268 13.8431C5.98631 14.2708 7.139 14.5015 9.00389 14.5015H10.0039V15.5015C10.0039 16.9343 8.35762 18.0561 5.87075 18.6419C6.68178 18.8903 7.76166 18.9974 9.00354 18.9974C13.618 18.9974 18.5045 15.7888 18.5045 11.0015V8.50152C18.5045 8.20774 18.5897 7.95273 18.7311 7.68759C18.7865 7.58393 18.8474 7.48509 18.9225 7.37237C18.9367 7.35115 18.9892 7.27426 19.0309 7.21279L19.1101 7.05429C19.2386 6.79745 19.3669 6.54061 19.4952 6.28377C19.2958 6.24599 19.1003 6.20541 18.9086 6.16202Z" fill="#32373C"/>
                        </svg>
                        </a>

                        <a class="qs-social facebook" href={facebook}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4 2H20C21.1046 2 22 2.89543 22 4V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V4C2 2.89543 2.89543 2 4 2ZM4 4V20H20V4H4ZM11.1331 12.0044H13V18H15V12.0044H16.9824V10.0044H15V9C15 8.44772 15.4477 8 16 8H17V6H16C14.3431 6 13 7.34315 13 9V10.0044H11.1331V12.0044Z" fill="#32373C"/>
                        </svg>
                        </a>

                        <a class="qs-social instagram" href={instagram}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 2H8C4.68629 2 2 4.68629 2 8V16C2 19.3137 4.68629 22 8 22H16C19.3137 22 22 19.3137 22 16V8C22 4.68629 19.3137 2 16 2ZM4 8C4 5.79086 5.79086 4 8 4H16C18.2091 4 20 5.79086 20 8V16C20 18.2091 18.2091 20 16 20H8C5.79086 20 4 18.2091 4 16V8ZM12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15ZM18 7C18 7.55228 17.5523 8 17 8C16.4477 8 16 7.55228 16 7C16 6.44772 16.4477 6 17 6C17.5523 6 18 6.44772 18 7Z" fill="#32373C"/>
                        </svg>
                        </a>
                    </div>
                }

            </div>
           
        )
    }
}

FB_Compnent.propTypes = {
    question: PropTypes.object,
    changeQuestion: PropTypes.func,
    nextQuestion:PropTypes.func,
    activate: PropTypes.number,
};

export default FB_Compnent;
