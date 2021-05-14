import React from "react";
import axios from 'axios';

import { Link } from 'react-router-dom'
import '../assets/css/diagnosis.css'

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col, Button, Label } from "reactstrap";

import PatientSetup from './PatientSetup'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
// const maxLength = (len) => (val) => !(val) || (val.length <= len)
// const minLength = (len) => (val) => (val) && (val.length >= len)
// const isNumber = (val) => !isNaN(Number(val));
// const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)



class Diagnosis extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      // trans:'',
      data: [],
      activeStep: 0,
      patientname: '',
      age: '',
      gender: '',
      symptoms: []
    }
  }

  componentDidMount() {
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
        pauseOnHover: true
      }
    });
  }

  handleNameSetup = data => {
    this.setState({
      patientname: data.patientname,
      activeStep: this.state.activeStep + 1
    })
  }

  handleAgeSetup = data => {
    this.setState({
      age: data.age,
      activeStep: this.state.activeStep + 1
    })
  }

  handlegenderSetup = data => {
    this.setState({
      gender: data.gender,
      activeStep: this.state.activeStep + 1
    })
  }

  handlesymtomsSetup = data => {
    let newsymptoms = this.state.symptoms;
   
    let dummy=newsymptoms.filter( e=> e == data.symptoms) 

    console.log(dummy,"dummy")
    if(dummy==undefined||dummy===null||dummy.length===0)
    {
    newsymptoms.push(data.symptoms)
    this.setState({
      symptoms: newsymptoms
    })
    }


    console.log("final Sumit")
  }

  handlebackSubmit = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    })
  }

  handleInputChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleTrans = (t) => {
    this.setState({ msg: t });
  }
  // state = {  }
  async getDataAxios() {
    const response =
      await axios.get(`http://${window.location.hostname}:8080/english-to-isl?id=${this.state.msg}`)
    console.log(response.data)
    this.setState({ data: response.data });
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

  removeElement = (e) => {
    var symptoms = [...this.state.symptoms]; // make a separate copy of the array
    var index = symptoms.indexOf(e)
    if (index !== -1) {
      symptoms.splice(index, 1);
      this.setState({ symptoms: symptoms });
    }

  }
  render() {
    return (
      <>
        <div className="content">
          <div className="diagnose-parent">

           <div className="diagnose-parent-title">
              Self Diagnose
              </div>

               {this.state.activeStep === 0 ? (
              <PatientSetup
                data={this.state}
                activeStep={0}
                handlebackSubmit={this.handlebackSubmit}
                handleNameSetup={this.handleNameSetup}
              />
            ) : null}

            {this.state.activeStep === 1 ? (
              <PatientSetup
                data={this.state}
                activeStep={1}
                handlebackSubmit={this.handlebackSubmit}
                handleAgeSetup={this.handleAgeSetup}
              />
            ) : null}

            {this.state.activeStep === 2 ? (
              <PatientSetup
                data={this.state}
                activeStep={2}
                handlebackSubmit={this.handlebackSubmit}
                handlegenderSetup={this.handlegenderSetup}
              />
            ) : null}

            {this.state.activeStep === 3 ?
              <>
                {this.state.symptoms.map(symptom =>
                  
                  <div className="diagnose-parent-syptomslist-parent">
                          <div className="diagnose-parent-syptomslist-parent-head" key={symptom.index}>{symptom}</div>
                          <div className="diagnose-parent-syptomslist-parent-img" key={symptom.index} onClick={() => this.removeElement(symptom)}></div>

                  </div>
                   )}

                <PatientSetup
                  data={this.state}
                  activeStep={3}
                  handlesymtomsSetup={this.handlesymtomsSetup}
                  handlebackSubmit={this.handlebackSubmit}
                />


              </>
              : null}


          </div>
        </div>
      </>
    );
  }
}

export default Diagnosis;

