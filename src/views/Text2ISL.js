import React from "react";
import axios from 'axios';

import {Link} from 'react-router-dom'
import Typist from 'react-typist';

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col, Button, Form, FormGroup, Label,Input  } from "reactstrap";

import VideoDisplay from './VideoDisplay'
import Dictaphone from './Dictaphone';
import FadeIn from 'react-fade-in';

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

class Text2ISL extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        msg: '',
        // trans:'',
        data: []
    }
  }

  componentDidMount(){
    store.addNotification({
      title: "Convert English to ISL..",
      message: "I'm here to help you!",
      type: "warning",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true,
        pauseOnHover:true
      }
    });
  }


  handleInputChange = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }

  handleTrans =(t)=>{
      this.setState({msg: t});
  }
  // state = {  }
  async getDataAxios(){
      const response =
        await axios.get(`http://${window.location.hostname}:8080/english-to-isl?id=${this.state.msg}`)
      console.log(response.data)
      this.setState({data: response.data});
      // console.log(this.state.data);
  }

  // componentDidMount(){
  //     console.log("Msg is "+this.state.msg)
  //     // this.getDataAxios();
  //     console.log("Window.location.hostname is " + window.location.hostname)
  // }

  handleSubmit = () => {
      // alert("Your message is: " + this.state.msg);
      console.log("msg is " + this.state.msg);
      this.getDataAxios();
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title" style={{display:"inline"}}>Text to ISL</h5>
                  <Link to="/admin/dashboard">
                      <Button color="primary" className="ml-auto" outline style={{display:"flex"}}>
                          Back
                      </Button>
                  </Link>
                </CardHeader>
                <CardBody>
                <div className="row">
                      <div className="col-12 col-md-6">
                          <Form>
                              <FormGroup row>
                                  <Label htmlFor="voice-text" md={5}>Speech (in English):</Label>
                                  <Col md={7}>
                                      <Dictaphone
                                        getTrans={this.handleTrans} 
                                      />
                                      {/* <p style={{color:"red"}}>{this.state.trans}</p> */}
                                  </Col>
                              </FormGroup>
                              <p><i style={{textAlign:"center"}}>OR</i></p>
                              {/* <FormGroup row>
                                  <Label htmlFor="audio-file" md={5}>Input Audio file (English):</Label>
                                  <Col md={7}>
                                      <Input type="file" id="audio-file" name="audio-file" />
                                  </Col>
                              </FormGroup>
                              <p><i style={{textAlign:"center"}}>OR</i></p> */}
                              <FormGroup row>
                                  <Label htmlFor="msg" md={12}>Input Text (in English): </Label>
                                  <Col md={12}>
                                      <Input type="textarea" id="msg" name="msg" rows="2"
                                          placeholder="Hello" value={this.state.msg} onChange={this.handleInputChange} />
                                  </Col>
                              </FormGroup>
                              <FormGroup row>
                                  <Col md={{size:10}}>
                                      <Button color="primary" outline onClick={this.handleSubmit}>
                                          Submit
                                      </Button>
                                  </Col>
                              </FormGroup>
                          </Form>   

                      </div>
                      <div className="col-12 col-md-6">
                          
                          {this.state.data.length===0 ? (
                              <>
                                  <FadeIn>
                                      <h5 className="" style={{textAlign:"center", fontSize:"1.2rem"}}><i>
                                        <Typist>Hello, I am Shagun! Your ISL interpreter...</Typist>
                                      </i></h5>
                                      <div style={{height:"240px", overflow:"hidden"}}>
                                        <img style={{width:"100%"}} src={require('./../assets/img/hello.gif')}></img>
                                      </div>
                                      
                                  </FadeIn>
                              </>
                          ) : (
                              <>
                                  {/* {console.log("Received length " + this.state.data.length)} */}
                                  {/* this.handleVideoDisplay */}
                                  
                                  <VideoDisplay data={this.state.data} key={this.state.data} />
                                  <h6 style={{textAlign:"center", padding:"10px"}}>{(this.state.data).toString()}</h6>
                                  
                              </>
                          )}
                          
                      </div>
                  </div>           
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Text2ISL;

