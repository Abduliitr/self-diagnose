import React from "react";
// import {Container, Form, FormGroup, Label, Col, Input, Button } from 'reactstrap';
import VideoRecorder from 'react-video-recorder'
import axios from 'axios';

import {Link} from 'react-router-dom'
import FadeIn from 'react-fade-in';

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

import { Alert, Container } from "reactstrap";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label,
  Progress
} from "reactstrap";
import ProgressBarComp from "./ProgressBarComp";

const API_BASE = `http://${window.location.hostname}:8080`

class ISL2text extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        output_msg:'',
        feedback_msg:'',
        toggle: false,
        progress_visible:false,
        alert1: true
    }

    this.submitForm = this.submitForm.bind(this)
    // this.uploadWithFormDataFile = this.uploadWithFormDataFile.bind(this)
  }

  handleChange = (e) => {
    // e.preventDefault();
    this.setState({toggle: !this.state.toggle});
    console.log("Clicked value is " + e.target.checked);
    console.log("toggle value is " + this.state.toggle);
  }

  handleFeedbackChange = (e) => {
    e.preventDefault();
    this.setState({[e.target.name] : e.target.value});
  }

  async getDataAxios(){
    const response =
      await axios.get(`${API_BASE}/feedback?msg=${this.state.feedback_msg}&ids=1`);
    console.log(response.data.message)
    // alert(response.data.message);
    
    window.location.reload();
    // this.setState({data: response.data});
    // console.log(this.state.data);
  }

  handleFeedbackSubmit = () => {
    // alert("Your Feedback message is: " + this.state.feedback_msg);
    store.addNotification({
      title: "Thanks for the Feedback!",
      message: "Feedback message is " + this.state.feedback_msg,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true
      }
    });
    console.log("Feedback is " + this.state.feedback_msg);
    this.getDataAxios();
  }

  submitForm(contentType, data, setResponse) {
    axios({
        url: `${API_BASE}/isl-to-english`,
        method: 'POST',
        data: data,
        headers: {
        'Content-Type': contentType
        }
    }).then((response) => {
        console.log("setting response and state")
        setResponse(response.data);
        this.setState({output_msg: response.data});
        console.log("Removing progress bar")
        this.setState({progress_visible: false});
        store.addNotification({
          title: "Response received!",
          message: "Prediction text is " + this.state.output_msg,
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true
          }
        });
    }).catch((error) => {
        console.log("error");
        console.log(error);
    })
}

uploadWithFormData = async (videofile) => {

    this.setState({progress_visible: true});
    const formData = new FormData();
    formData.append("blob", videofile, "test.mp4");

    console.log("checkpoint 2, formdata")
    console.log(formData);
   
    this.submitForm("multipart/form-data", formData, (msg) => console.log(msg));
}

uploadWithFormDataFile = async () =>{

    this.setState({progress_visible: true});
    const formData = new FormData();
    var videofile = document.querySelector('#video-file').files[0];
    console.log(videofile)
    formData.append("file", videofile, "test.mp4");

    console.log("checkpoint 2, formdata")
    console.log(formData);
   
    axios({
        url: `${API_BASE}/isl-file`,
        method: 'POST',
        data: formData,
        headers: {
        'Content-Type': "multipart/form-data"
        }
    }).then((response) => {
        console.log("setting response and state")
        console.log(response.data);
        this.setState({output_msg: response.data})
        console.log("Removing progress Bar")
        this.setState({progress_visible: false});
        store.addNotification({
          title: "Response received!",
          message: "Prediction text is " + this.state.output_msg,
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true
          }
        });
    }).catch((error) => {
        console.log("error");
        console.log(error);
    })
  }

  render() {
    return (
      <>
        <CardHeader>
          {/* <h5 className="title" style={{display:"inline"}}>ISL to Text</h5> */}
          {/* <p className="page-category">Use this feature for all the gestures except alphabets and single digit numbers...</p> */}
          <Alert color="warning" isOpen={this.state.alert1}>
                <Container>
                    <div className="alert-icon">
                    <i className=""></i>
                    </div>
                    <strong>Use this feature for all the gestures except alphabets and single digit numbers! {"   "}
                        <Link to="/admin/user-manual" style={{color:"white"}}>
                            (CheckOut more details)
                        </Link>
                    </strong>
                    
                    <button
                    type="button"
                    className="close"
                    onClick={() => this.setState({alert1: false})}
                    >
                    {/* <span aria-hidden="true"> */}
                        <i className="nc-icon nc-simple-remove" style={{color:"white"}}> </i>
                    {/* </span> */}
                    </button>
                </Container>
            </Alert>
          <Link to="/admin/dashboard">
              <Button color="primary" className="ml-auto" outline style={{display:"flex"}}>
                  Back
              </Button>
          </Link>
        </CardHeader>
        <CardBody>
        <div className="row">
            <div className="col-12 col-md-6">
              <FadeIn>
                <VideoRecorder 
                    onRecordingComplete={(videoBlob) => {
                    console.log('Uploading videoBlob with formDtata', videoBlob)
                    this.uploadWithFormData(videoBlob);
                    console.log('videoBlob', videoBlob)
                    }} 
                />
              </FadeIn>  
            </div>
            <div className="col-12 col-md-6">
                <p>OR</p>
                <Form>                                    
                    <FormGroup row>
                        <Label htmlFor="video-file" md={12}>Upload Video (ISL): </Label>
                        <Col md={12}>
                            <Input type="file" id="video-file" name="file"
                                />
                            {/* <Button type="submit" outline>Submit</Button> */}
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={{size:10}}>
                            <Button color="primary" outline onClick={this.uploadWithFormDataFile}>
                                Submit
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
                
                <Form>
                    
                    <FormGroup row>
                        <Label htmlFor="output_msg" md={12}>Output Text (in English): </Label>
                        <Col md={12}>
                          {this.state.progress_visible ? <ProgressBarComp time={1255} /> : <></>}  
                        </Col>
                        <Col md={12}>
                            <Input type="textarea" id="output_msg" name="output_msg" rows="2"
                                placeholder="Hello, Fetching Response..." value={this.state.output_msg}/>
                        </Col>
                    </FormGroup>
                    
                </Form>                           
            </div>
        </div>
        {
          this.state.output_msg!=='' ?
            <Row style={{paddingTop:"50px"}}>
            <Col md="4">
              <p>Is the predicted text correct for input gesture?</p>
            </Col>
            <Col md="2">
                <div className='custom-control custom-switch'>
                  <input
                    type='checkbox'
                    className='custom-control-input'
                    id='customSwitchesChecked'
                    defaultChecked
                    onChange={this.handleChange}
                    // checked={this.state.toggle}
                  />
                  <label className='custom-control-label' htmlFor='customSwitchesChecked'>

                  </label>
                </div>
            </Col>
            <Col md="6">
              {this.state.toggle ? 
                <>
                  <Form>
                        <FormGroup row>
                            <Label htmlFor="feedback_msg" md={12}>Correct text for this gesture: </Label>
                            <Col md={6}>
                                <Input type="text" id="feedback_msg" name="feedback_msg" value={this.state.feedback_msg}
                                    onChange={this.handleFeedbackChange}
                                    placeholder="Correction"/>
                            </Col>
                            <Col md={6}>
                              <Button color="primary" outline className="btn-sm" onClick={this.handleFeedbackSubmit}>
                                  Submit
                              </Button>
                            </Col>
                        </FormGroup>
                      
                  </Form>     
                </>
                :
                <>
                </>
              }
            </Col>
          </Row>
          :
          <></>
        } 
        
        </CardBody>
      </>
    );
  }
}

export default ISL2text;
