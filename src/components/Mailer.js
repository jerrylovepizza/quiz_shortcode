import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
const apiUrl = window.survey_settings.url;
class Mailer extends Component {
    
    constructor(props) {
        super(props);

        this.onSubmitMail();
    }

    onSubmitMail() {       
       
        axios.post(`${apiUrl}/send/`, this.props.mailer).then(
            res => {
              const data = res.data;

              if (data.status != "success") {
                console.log("error");
              }
              this.props.submitted(true);
              
            }
        ).catch(error => {
            console.log("error");
            throw(error);
            this.props.submitted(false);
        });
    }
    render() {
        
        return (
            <div class="mailer-wrapper">
                <div class="mailer-box">
                    <h3>Submitting the survey data....</h3>
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
}

Mailer.propTypes = {
    mailer:PropTypes.object,
    submitted: PropTypes.func,
};

export default Mailer;