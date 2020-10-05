import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class FileUploader extends React.Component {
    constructor() {
       super();
       this.handleAddImage = this.handleAddImage.bind(this);
       this.handleUploadImage = this.handleUploadImage.bind(this);
       this.handleDragOver = this.handleDragOver.bind(this);
       this.handleDragEnter = this.handleDragEnter.bind(this);
       this.handleDragLeave = this.handleDragLeave.bind(this);
       this.handleDrop = this.handleDrop.bind(this);
       this.handleCancelUpload = this.handleCancelUpload.bind(this);
       this.state = {
          file: null,
          dragOver: false,
          errorNoficication: null
       };
    }
    
    /**
       Drag and Drop Event Handlers
    **/
    handleDragEnter(e) {
       e.preventDefault();
    }
    handleDragOver(e) {
       e.preventDefault();
       if (!this.state.dragOver) {
          this.setState({
             dragOver: true
          });
       }
    }
    handleDragLeave(e) {
       e.preventDefault();
       this.setState({
          dragOver: false
       });
    }
    handleDrop(e) {
       e.preventDefault();
       let file = e.dataTransfer.files[0];
       
       // Validate file is of type Image
    //    let fileType = file.type.split("/")[0];
    //    if (fileType !== "image") {
    //       console.log("Not an image file");
    //       this.setState({
    //          file: null,
    //          errorNotification: "Not an image File",
    //          dragOver: false
    //       });
    //       return setTimeout(() => {
    //          this.setState({
    //             errorNotification: null
    //          });
    //       }, 3000);
    //    }
       // this.refs.image.files = e.dataTransfer.files;
       document.getElementById("upload-image-input").fileList =  e.dataTransfer.files[0];
       this.setState({
          file,
          dragOver: false
       });

       this.props.changeFile(file);
    }
    
    
    /**
       Handle Manually (File Input) Added Files
    **/
    handleAddImage(e) {
       e.preventDefault();
       let file = this.refs.image.files[0];
       
       // Validate file is of type Image
      //  let fileType = this.refs.image.files[0].type.split("/")[0];
      //  if (fileType !== "image") {
      //     console.log("Not an image file");
      //     this.setState({
      //        file: null,
      //        errorNotification: "Not an image File",
      //        dragOverClass: ""
      //     });
      //     return setTimeout(() => {
      //        this.setState({
      //           errorNotification: null
      //        });
      //     }, 3000);
      //  }
          
       this.setState({
          file
       });

       this.props.changeFile(file);
    }
    
    /**
       Handle Upload after Upload Button Clicked
    **/
    handleUploadImage(e) {
       e.preventDefault();
       if (this.refs.image.files[0]) {
          console.log("Uploading Image " + this.refs.image.files[0].name + "");
          /**
             Handle image Upload
          **/
       }
    }
    handleCancelUpload (e) {
       e.preventDefault();
       this.setState({
          file: null
       });
    }
    
    
    render() {
       
       // Match drag over css to hover css
       let dragOverClass = this.state.dragOver
          ? `display-box drag-over`
          : `display-box`;
       
       // If file is set, change upload box text to file name
       let uploadText = this.state.file
          ? <div>
               <h4>{this.state.file.name}</h4>
               {/* <button 
                  className="cancel-upload-button btn btn-warning"
                  onClick={this.handleCancelUpload}
               >
                  Cancel
              </button>
               <button
                  className="upload-button btn btn-primary"
                  onClick={this.handleUploadImage}
               >
                  Upload
               </button> */}
            </div>
          : <div>
               <h4>Choose Files to Upload</h4>
            </div>;
       
       // Show Error message if file type is not an image
       let errorNotification = this.state.errorNotification
          ? <div className="error-notification">
               <p>{this.state.errorNotification}</p>
            </div>
          : null;
       
       
       return (
          <div className="image-uploader-wrapper">
             <div className={dragOverClass}>
                <div className="icon-text-box">
                   <div className="upload-icon">
                     <svg width="172" height="133" viewBox="0 0 172 133" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path fill-rule="evenodd" clip-rule="evenodd" d="M124.449 101.115V116.671H132.227C153.706 116.671 171.118 99.2593 171.118 77.7808C171.118 58.2186 156.674 42.0298 137.87 39.2967C131.255 16.3777 110.127 0 85.5588 0C67.3071 0 50.6276 9.06202 40.6007 23.7253C17.6331 26.7057 0 46.3478 0 70.0027C0 95.777 20.8942 116.671 46.6684 116.671V101.115C29.4856 101.115 15.5561 87.1855 15.5561 70.0027C15.5561 53.2833 28.7738 39.5683 45.4213 38.9148L49.707 38.7466L51.8519 35.0323C58.7579 23.0731 71.4992 15.5562 85.5588 15.5562C104.624 15.5562 120.796 29.3721 123.912 47.9608L125.023 54.5879L131.741 54.4515C131.862 54.4494 131.923 54.4484 131.983 54.4478C132.044 54.4471 132.105 54.4469 132.227 54.4465C145.114 54.4465 155.561 64.8936 155.561 77.7808C155.561 90.6679 145.114 101.115 132.227 101.115H124.449ZM93.3371 132.227V81.0026L111.171 98.8369L122.171 87.837L85.559 51.2248L48.9468 87.837L59.9466 98.8369L77.7809 81.0026V132.227H93.3371Z" fill="#EACD38"/>
                     </svg>
                   </div>
                   <div className="upload-text">
                      {uploadText}
                   </div>
                   {errorNotification}
                </div>
                <div>
                   <input
                      type="file"
                      ref="image"
                      id="upload-image-input"
                      className="upload-image-input"
                      accept="*"
                      onDrop={this.handleDrop}
                      onDragEnter={this.handleDragEnter}
                      onDragOver={this.handleDragOver}
                      onDragLeave={this.handleDragLeave}
                      onChange={this.handleAddImage}
                   />
                </div>
             </div>
          </div>
       );
    }
}
 
FileUploader.propTypes = {
   changeFile: PropTypes.func,
};

 export default FileUploader;