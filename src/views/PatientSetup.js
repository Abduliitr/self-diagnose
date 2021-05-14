import React from 'react'
import Select from 'react-select'
import gender_option from '../json/gender.json'
import symptoms_option from '../json/symptoms.json'
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import InputRange from 'react-input-range';

const custom_styles = {
  control: styles => ({ ...styles, background: 'transparent', padding: '10px' })
}



export default class PatientSetup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      patientname: '',
      age: 0,
      gender: '',
      symptoms: ''
    }
  }

  getGender = () => {
    return gender_option.map(gender => ({
      value: gender.name,
      label: gender.name
    }))
  }
  getSymtoms = () => {
    return symptoms_option.map(symptoms => ({
      value: symptoms.name,
      label: symptoms.name
    }))
  }

  handlepatientSubmit = () => {
    let data = {
      patientname: this.state.patientname
    }
    this.props.handleNameSetup(data)
  }
  handleageSubmit = () => {
    let data = {
      age: this.state.age
    }
    this.props.handleAgeSetup(data)
  }

  handlegenderSubmit = () => {
    let data = {
      gender: this.state.gender.value
    }
    this.props.handlegenderSetup(data)
  }

  handlesymptomsSubmit = () => {
    let data = {
      symptoms: this.state.symptoms.value
    }
    this.props.handlesymtomsSetup(data)
  }
  handleChange = (e) => {
    const name = e.target.name
    let value = e.target.value
    this.setState({ [name]: value })
  }
  handleSelectGenderChange = selectedOption => {
    this.setState({ gender: selectedOption })
  }

  handleSelectSymtomsChange = selectedOption => {
    this.setState({ symptoms: selectedOption }, () => this.handlesymptomsSubmit())
  }

  handlebackSubmit = () => {

    this.props.handlebackSubmit()
  }

  handleSliderChange = (event, newAge) => {
    this.setState({age:newAge})
  };

   handleInputChange = (event) => {

    this.setState({age: event.target.value === '' ? '' : Number(event.target.value)});
  };
 

  render() {

    

    return (
      <div>

        {this.props.activeStep === 0 ?
          <>

          <div className="patient-heading">  Name: <input name='patientname' value={this.state.patientname} onChange={this.handleChange} /></div>
            <div className="diagnose-btn-next" onClick={this.handlepatientSubmit}> NEXT </div>

          </>
          : null}

        {this.props.activeStep === 1 ?
          <>
         
        

            <div className="patient-heading">  Age  
            <div  className="patient-heading-slide">
            <Slider
            value={typeof this.state.age === 'number' ? this.state.age : 0}
            onChange={this.handleSliderChange}
            aria-labelledby="input-slider"
          /> 
            <Input
            value={this.state.age}
            margin="dense"
            onChange={this.handleInputChange}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
          </div>
          </div>
                 
            <div className="diagnose-btn-next" onClick={this.handleageSubmit}> NEXT </div>
            <div className="diagnose-btn-back"  onClick={this.handlebackSubmit}> BACK </div>
          </>
          : null}

        {this.props.activeStep === 2 ?
          <>
           <div className="patient-heading"> Gender:
            <Select
              styles={custom_styles}
              value={this.state.gender}
              onChange={event => {
                this.handleSelectGenderChange(event)
              }}
              options={this.getGender()}
              placeholder="Gender"
            /></div>
            <div className="diagnose-btn-next" onClick={this.handlegenderSubmit}> NEXT </div>
            <div className="diagnose-btn-back" onClick={this.handlebackSubmit}> BACK </div>
          </>
          : null}

        {this.props.activeStep === 3 ?
          <>
           <div className="patient-heading">  Symptoms
            <Select
              styles={custom_styles}
              value={this.state.symptoms}
              onChange={event => {
                this.handleSelectSymtomsChange(event)

              }}
              options={this.getSymtoms()}
              placeholder="symptoms"
            /></div>
            {/* <div className="diagnose-btn-next" onClick={this.handlesymptomsSubmit}> SUBMIT </div> */}
            <div className="diagnose-btn-back" onClick={this.handlebackSubmit}> BACK </div>
          </>
          : null}


      </div>
    )
  }
}
