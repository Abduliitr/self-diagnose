import React from "react";
import axios from 'axios';

import {Link} from 'react-router-dom'

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col, Button, Label  } from "reactstrap";


import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
// const maxLength = (len) => (val) => !(val) || (val.length <= len)
// const minLength = (len) => (val) => (val) && (val.length >= len)
// const isNumber = (val) => !isNaN(Number(val));
// const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)

class Diagnosis extends React.Component {

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
      title: "Hola !",
      message: "Let's Diagnose now..",
      type: "success",
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
              {/* <Card>
                <CardHeader> */}
                  {/* <h5 className="title" style={{display:"inline"}}>Self Diagnosis</h5> */}
                  <Link to="/admin/dashboard">
                      <Button color="primary" className="ml-auto" outline style={{display:"flex"}}>
                          Back
                      </Button>
                  </Link>
                {/* </CardHeader>
                <CardBody> */}
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                      <Row>
                        <Col>
                          <Card>
                            <CardHeader style={{textAlign:'center'}}>  
                            <hr />                           
                              <h6>Patients' Details:</h6>
                              <hr />
                            </CardHeader>
                            <CardBody>
                              <Row className="form-group">
                                  <Col md={4}>
                                      <Control.text model=".name" id="name" name="name"
                                          placeholder="Patients' Name"   
                                          className="form-control"
                                          validators={{
                                              required
                                          }}
                                      />
                                      <Errors 
                                          className="text-danger"
                                          model=".name"
                                          show="touched"
                                          messages={{
                                              required: 'Required!'
                                          }}
                                      />
                                  </Col>
                                  <Col md={2}>
                                      <Control.text model=".age" id="age" name="age"
                                        type="number"
                                        min={0}
                                          placeholder="Age (in years)"   
                                          className="form-control"
                                          validators={{
                                              required
                                          }}
                                      />
                                      <Errors 
                                          className="text-danger"
                                          model=".age"
                                          show="touched"
                                          messages={{
                                              required: 'Required!'
                                          }}
                                      />
                                  </Col>
                                
                                  <Col>
                                    <Label md={3} style={{fontSize:"1.23em"}}>Gender:</Label>
                                    <Label md={3}  style={{fontSize:"1.1em"}} ><Control.radio model=".gender" value="male" /> Male</Label>
                                    <Label md={3}  style={{fontSize:"1.1em"}}><Control.radio model=".gender" value="female" /> Female</Label>
                                    <Label md={3}  style={{fontSize:"1.1em"}}><Control.radio model=".gender" value="other" /> Other</Label>
                                  </Col>

                              </Row>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>

                      {/* <hr /> */}

                      <Row>
                        <Col>
                          <Card>
                            <CardHeader style={{textAlign:'center'}}>    
                            <hr />                          
                              <h6>Please check all the statements below that apply to you:</h6>
                              <p>Select one answer in each row.</p>
                              <hr />
                            </CardHeader>
                              
                            
                            <CardBody>
                              <Row className="form-group">
                                                       
                                  <Col md={12}>
                                    <Label md={5} style={{fontSize:"1.23em"}}>I have diabetes:</Label>
                                    <Label md={2}  style={{fontSize:"1.1em"}}><Control.radio model=".diabetes" value="yes" /> Yes</Label>
                                    <Label md={2}  style={{fontSize:"1.1em"}}><Control.radio model=".diabetes" value="no" /> No</Label>
                                    <Label md={3}  style={{fontSize:"1.1em"}}><Control.radio model=".diabetes" value="other" /> Don't Know</Label>
                                  </Col>

                                  <Col md={12}>
                                    <Label md={5} style={{fontSize:"1.23em"}}>I have hypertension:</Label>
                                    <Label md={2}  style={{fontSize:"1.1em"}}><Control.radio model=".hypertension" value="yes" /> Yes</Label>
                                    <Label md={2}  style={{fontSize:"1.1em"}}><Control.radio model=".hypertension" value="no" /> No</Label>
                                    <Label md={3}  style={{fontSize:"1.1em"}}><Control.radio model=".hypertension" value="other" /> Don't Know</Label>
                                  </Col>

                                  <Col md={12}>
                                    <Label md={5} style={{fontSize:"1.23em"}}>I have high cholesterol:</Label>
                                    <Label md={2}  style={{fontSize:"1.1em"}}><Control.radio model=".cholesterol" value="yes" /> Yes</Label>
                                    <Label md={2}  style={{fontSize:"1.1em"}}><Control.radio model=".cholesterol" value="no" /> No</Label>
                                    <Label md={3}  style={{fontSize:"1.1em"}}><Control.radio model=".cholesterol" value="other" /> Don't Know</Label>
                                  </Col>

                                  <Col md={12}>
                                    <Label md={5} style={{fontSize:"1.23em"}}>I've recently suffered an injury:</Label>
                                    <Label md={2}  style={{fontSize:"1.1em"}}><Control.radio model=".injury" value="yes" /> Yes</Label>
                                    <Label md={2}  style={{fontSize:"1.1em"}}><Control.radio model=".injury" value="no" /> No</Label>
                                    <Label md={3}  style={{fontSize:"1.1em"}}><Control.radio model=".injury" value="other" /> Don't Know</Label>
                                  </Col>

                                  <Col md={12}>
                                    <Label md={5} style={{fontSize:"1.23em"}}>I smoke cigarettes:</Label>
                                    <Label md={2}  style={{fontSize:"1.1em"}}><Control.radio model=".cigarettes" value="yes" /> Yes</Label>
                                    <Label md={2}  style={{fontSize:"1.1em"}}><Control.radio model=".cigarettes" value="no" /> No</Label>
                                    <Label md={3}  style={{fontSize:"1.1em"}}><Control.radio model=".cigarettes" value="other" /> Don't Know</Label>
                                  </Col>

                                  <Col md={12}>
                                    <Label md={5} style={{fontSize:"1.23em"}}>I’m overweight or obese:</Label>
                                    <Label md={2}  style={{fontSize:"1.1em"}}><Control.radio model=".overweight" value="yes" /> Yes</Label>
                                    <Label md={2}  style={{fontSize:"1.1em"}}><Control.radio model=".overweight" value="no" /> No</Label>
                                    <Label md={3}  style={{fontSize:"1.1em"}}><Control.radio model=".overweight" value="other" /> Don't Know</Label>
                                  </Col>

                              </Row>
                            </CardBody>
                          </Card>
                          <Row className="form-group">
                              <Col md={6}>
                                  <Button color="danger" id="reset" block type="reset">Reset</Button>
                              </Col>
                              <Col md={6}>
                                  <Button type="submit" outline block color="success">
                                      Submit
                                  </Button>
                              </Col>
                          </Row>
                        </Col>
                      </Row>
                    </LocalForm>
                {/* </CardBody>
              </Card> */}
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Diagnosis;

