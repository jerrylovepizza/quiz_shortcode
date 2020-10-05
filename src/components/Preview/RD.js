import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ContentEditable from "react-contenteditable";

class RD_Compnent extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            question: this.props.question,
        };
    }
    
    // onChangeTex(e) {
    //     let q = Object.assign({}, this.state.question);
    //     q.text = e.target.value;

    //     this.setState({
    //         question: q
    //     });
    // }

    onClick(el, index) {
        let q = this.props.question;
        q.text[el] = index;
        
        this.props.changeQuestion(q);
    }

    render() {
        
        const q = this.props.question;
        const question = this.props.question;
        let text = question.text;
        if (question.text.length == 0) {
            for (var i = 0; i < question.topic.length; i++) {
                text[i] = -1;
            }
        }
        
        const category = (e, e1) => (
            <tr class="qs-category-options">
                <td>{e}</td>
            {                
                question.category.map((val, index) => (
                <td><span class="qs-radio "><input id={"qs-cat-e" + e1 } type="radio" name={"qs-cat-" + e1 + "[]"} checked={ (text[e1] == index) ? "checked" : "" } onClick = {(evt) => {this.onClick(e1, index);}}/></span></td>
                ))
            }
            </tr>
        );

        return (
            <div class={q.img_align + " mc-question rd-question"}  >

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
                    <div class="qs-content-options">
                        <table>
                            <thead>
                                <th>
                                </th>
                                {
                                    question.category.map((val) => (
                                        <td>{val}</td>
                                    ))
                                }
                            </thead>
                        {
                            question.topic.map((val, index) => 
                            {
                                return category(val, index);
                            })
                        }
                        </table>
                    </div>
                </div>

               
                
            </div>
        )
    }
}

RD_Compnent.propTypes = {
    question: PropTypes.object,
    changeQuestion: PropTypes.func,
    nextQuestion:PropTypes.func,
    activate: PropTypes.number,
    is_error: PropTypes.bool
};

export default RD_Compnent;