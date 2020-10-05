import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class ProgressBar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            progress: window.suvery_data.settings.background,            
        }      
    }
    
    render() {

        const is_percent = this.state.progress[0].option;

        const progress = this.props.activate / this.props.total * 100;

        let label = is_percent ? 
        (
            <span>{progress.toFixed()}%</span>
        ):
        (
            <span>{this.props.activate} / {this.props.total}</span>
        );

        return (
            <div class="qs-progress-bar-wrapper">
                <div class="qs-progress-bar">
                    <span class="qs-progress" style={{width: progress + "%" }}></span>
                </div>
                <span class="qs-ps-title">
                    {label}                    
                </span>
            </div>
        )
    }
}

ProgressBar.propTypes = {
    total: PropTypes.number,
    activate: PropTypes.number,
};

export default ProgressBar;
