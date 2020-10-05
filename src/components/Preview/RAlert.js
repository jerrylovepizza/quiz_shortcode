import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class RAlert extends Component {
    
    render() {
        let message = "";
        
        switch (this.props.qtype) {
            case "MC":
                message = "Select an Answer.";
                break;
            case "EM":
                message = "Input a correct Email.";
                break;
            case "TX":
                message = "Input a Text.";
                break;
            case "PH":
                message = "Input a correct Phone Number.";
                break;
            case "RD":
                message = "Select a Radio Option";
                break;
            case "RT":
                message = "Select a Rate";
                break;
            case "WS":
                message = "Input a correct Url";
                break;
            case "YN":
                message = "Click on Yes/No Button";
                break;            
        }

        return (
            <div class="alert-message">
                {message}
            </div>
        )
    }
}

RAlert.propTypes = {
    qtype: PropTypes.string    
};

export default RAlert;