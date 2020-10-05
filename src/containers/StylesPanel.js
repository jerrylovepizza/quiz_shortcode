import React, { Component, Fragment } from "react";

const FONT_FAMILY = [
    {
      id: "open-sans",
      title: "Open Sans"
    },
    {
      id: "roboto",
      title: "Roboto"
    },
    {
      id: "lato",
      title: "Lato"
    },
    {
      id: "montserrat",
      title: "Montserrat"
    },
    {
      id: "oswald",
      title: "oswald"
    }  
  ];


const font_names = (e) => {
    for (var i in FONT_FAMILY) {
        if (FONT_FAMILY[i].id == e) {
            return FONT_FAMILY[i].title;
        }
    }
}

const font_classes = [
    ".suvry-wrapper .mc-question .qs-header h3",
    ".suvry-wrapper .mc-question .qs-description p",
    ".suvry-wrapper .qs-content .qs-answer .qs-control, .suvry-wrapper .mc-question .qs-content .qs-answer span.qs-item",
    ".suvry-wrapper button.qs-btn",
    ".suvry-wrapper .mc-question .qs-content span.qs-index,.suvry-wrapper .qs-rating-wraper .qs-rating-bar .qs-rate,.suvry-wrapper .qs-rating-wraper .qs-rating-bar .qs-rating-txt,.suvry-wrapper .qs-rd-cat,.suvry-wrapper .qs-rd-topic "
];

const create_para_style = (e, index) => {
    return font_classes[index] + "{text-align:" + e.align + ";line-height:" + e.spacing + "}";
}

const create_font_style = (e, index) => {
    return font_classes[index] + "{font-size:" + e.size + "px;font-family:" + font_names(e.family) + ";font-weight:" + e.weight + "}";
}

const color_classes = [
    ".suvry-wrapper .mc-question .qs-header h3",
    ".suvry-wrapper .mc-question .qs-description p",
    ".suvry-wrapper .qs-content .qs-answer .qs-control",
    ".suvry-wrapper button.qs-btn.qs-btn-normal",
    ".suvry-wrapper button.qs-btn.qs-btn-normal",
    ".suvry-wrapper .mc-question .qs-content span.qs-index,.suvry-wrapper .qs-rating-wraper .qs-rating-bar .qs-rate,.suvry-wrapper .qs-rating-wraper .qs-rating-bar .qs-rating-txt,.suvry-wrapper .qs-rd-cat,.suvry-wrapper .qs-rd-topic, .suvry-wrapper .mc-question .qs-answer .qs-ph-code ",
    ".suvry-wrapper .mc-question .qs-answer",
    ".suvry-wrapper .mc-question .qs-answer",
    ".suvry-wrapper  .mc-question .qs-content svg path",
    ".suvry-wrapper .qs-rating-wraper .qs-rating-bar .qs-rate:hover ~ div,.suvry-wrapper .qs-rating-wraper .qs-rating-bar .qs-rate.active ~ div",
    ".suvry-wrapper .qs-rating-wraper .qs-rating-bar",
    ".qs-progress-bar-wrapper .qs-progress-bar .qs-progress",
    ".suvry-wrapper",
]

const create_color_style = (e, index) => {
    let colorName = "";

    if (index == 3) {
        return color_classes[index] + "{background-color: #"+ e.color + "}" +  color_classes[index] + "{border-color: #"+ e.color + "}";
    }

    if (index == 8) {
        return color_classes[index] + "{fill: #"+ e.color + "}";
    }

    if (index == 9 || index == 10 || index >= 11 ) {
        return color_classes[index] + "{background: #"+ e.color + "}";
    }
    
    if (index == 6) {
        colorName = "border-";
    }
    return color_classes[index] + "{" + colorName + "color: #"+ e.color + "}";
}

class StylesPanel extends Component {
    
    constructor(props) {
        super(props);

        let font = []
        window.suvery_data.settings.font.map((val, index) => {
           if (font.indexOf(val.family) < 0) {
               font.push(val.family);
           }
        });

        this.state = {
            settings: window.suvery_data.settings,
            font: font
        }
    }

    render() {
        
       const fonts = this.state.font.map((val, index) => (<link href={"https://pagecdn.io/lib/easyfonts/"+ val + ".css"} rel="stylesheet" />));
       const fontstyle = this.state.settings.font.map((val, index) => {return create_font_style(val, index); });
        const colorstyle = this.state.settings.color.map((val, index) => { return create_color_style(val, index)});
        const parastyle = this.state.settings.paragraph.map((val, index) => { return create_para_style(val, index)});
        
        return (
            <Fragment>
                {fonts}
                <style type="text/css">
                     {fontstyle}
                     {colorstyle}
                     {parastyle}
                </style>
            </Fragment>
        )
    }
};

export default StylesPanel;