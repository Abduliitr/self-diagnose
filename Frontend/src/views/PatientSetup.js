import React from 'react'
import Select from 'react-select'
import gender_option from '../json/gender.json'
import symptoms_option from '../json/symptoms.json'
import new_symptoms_option from '../json/newsymptoms.json'

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
      symptoms: '',
      symptomduration: {},
      moreinfo:{}
    }
  }

  getGender = () => {
    return gender_option.map(gender => ({
      value: gender.i,
      label: gender.name
    }))
  }
  getSymtoms = () => {

    let newsymptoms=new_symptoms_option[0].split(",")
     return newsymptoms.map((symptoms,key) => ({
      value: key,
      label: symptoms
    }))

    // return symptoms_option.map(symptoms => ({
    //   value: symptoms.name,
    //   label: symptoms.name
    // }))
  }

  handlepatientSubmit = () => {
    let data = {
      patientname: this.state.patientname,
      info:'Name'
    }
    this.props.handleNameSetup(data)
  }
  handleageSubmit = () => {
    let data = {
      age: this.state.age,
      info:'What is your age ?'
    }
    this.props.handleAgeSetup(data)
  }

  handlegenderSubmit = () => {
    let data = {
      gender: this.state.gender.value,
      info: 'What is your gender ?'
    }
    this.props.handlegenderSetup(data)
  }

  handlesymptomsSubmit = () => {
    let data = {
      symptoms: this.state.symptoms.label,
      key:this.state.symptoms.value,
      info:'Add your symptoms '
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
    this.setState({ age: newAge })
  };

  handleInputChange = (event) => {

    this.setState({ age: event.target.value === '' ? '' : Number(event.target.value) });
  };
  handlerradioChanger = (event) => {
    console.log(event.target.name + event.target.value)
    // let newsymptoms = this.props.data.symptoms

    // newsymptoms.map(sym=>{
    //     if(sym==event.target.name)
    //     return {
    //       ...this.state.symptomduration,
    //       
    //     }
    // })

    let sympdur = this.state.symptomduration;
    sympdur[event.target.name] = event.target.value;

    this.setState({ symptomduration: sympdur });

  }
  durationSubmit=()=>{
    this.props.handledurationSetup(this.state.symptomduration);

  }
  handlerradio1Changer=(event)=>{
    let minf=this.state.moreinfo;
    minf[event.target.name]=event.target.value==="YES"?1:0;
    console.log(minf,"minf")
    console.log(event.target.name + event.target.value,"this")

  }
  render() {



    return (
      <div>
         <div className="diagnose-parent-title">
             {this.props.info}
              </div>
        {this.props.activeStep === 0 ?
          <>

            {/* <div className="patient-heading">  <input name='patientname' value={this.state.patientname} onChange={this.handleChange} /></div> */}
            <div className="patient-heading">Hello!<br/><br/>
            You’re about to use a short (3 min), safe and anonymous health checkup. <br/>
            Your answers will be carefully analyzed and you’ll learn about possible causes of your symptoms. <br/>Let's Start the Diagnose</div>

            <div className="diagnose-btn-next" onClick={this.handlepatientSubmit}> NEXT </div>

          </>
          : null}

        {this.props.activeStep === 1 ?
          <>



            {/* <div className="patient-heading">  How old are you ?  </div> */}

            <div className="patient-heading-slide">
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
          
            <div className="diagnose-btn-next" onClick={this.handleageSubmit}> NEXT </div>
            <div className="diagnose-btn-back" onClick={this.handlebackSubmit}> BACK </div>
          </>
          : null}

        {this.props.activeStep === 2 ?
          <>
            {/* <div className="patient-heading"> What is your Gender ? </div> */}
            <Select
                styles={custom_styles}
                value={this.state.gender}
                onChange={event => {
                  this.handleSelectGenderChange(event)
                }}
                options={this.getGender()}
                placeholder="Gender"
              />
            <div className="diagnose-btn-next" onClick={this.handlegenderSubmit}> NEXT </div>
            <div className="diagnose-btn-back" onClick={this.handlebackSubmit}> BACK </div>
          </>
          : null}

        {this.props.activeStep === 3 ?
          <>
            {/* <div className="patient-heading">  Add symptoms  </div> */}
            {this.props.data.symptoms && this.props.data.symptoms.length >0 && this.props.data.symptoms.map(symptom =>
                  
                  <div className="diagnose-parent-syptomslist-parent">
                          <div className="diagnose-parent-syptomslist-parent-head">{symptom["symptom"]}</div>
                          <div className="diagnose-parent-syptomslist-parent-img" onClick={() => this.props.removeElement(symptom)}></div>

                  </div>
                   )
              
              }
            <div className="patient-heading-symptom-body">  Please use the search or click on the body. Add as many symptoms as you can for the most accurate results.  </div>
          
            <Select
                styles={custom_styles}
                value={this.state.symptoms}
                onChange={event => {
                  this.handleSelectSymtomsChange(event)

                }}
                options={this.getSymtoms()}
                placeholder="symptoms"
              />
            <div className="diagnose-btn-next" onClick={this.props.handlenextSubmit}> NEXT </div>
            <div className="diagnose-btn-back" onClick={this.handlebackSubmit}> BACK </div>
          </>
          : null}

        {this.props.activeStep === 4 ?
          <>

            <div className="">

              <table style={{ width: "100%" }} id="Symptoms-duration"> 
                <tbody>
                  <tr>
                    <th>Symptoms</th>
                    <th>Less than 3 hrs</th>
                    <th>Between 3-6 hrs</th>
                    <th>Between 6-12 hrs</th>
                    <th>More than 12 hrs</th>

                  </tr>
                </tbody>
                {this.props.data.symptoms && this.props.data.symptoms.map((val, key) =>

                  <tr onChange={this.handlerradioChanger}>
                    <td>{val["symptom"]}</td>
                    <td> <input type="radio" value="1" name={val["symptom"]} /> </td>
                    <td> <input type="radio" value="2" name={val["symptom"]} /> </td>
                    <td> <input type="radio" value="3" name={val["symptom"]} /> </td>
                    <td> <input type="radio" value="4" name={val["symptom"]} /> </td>
                  </tr>

                )}


              </table>
            </div>


            <div className="diagnose-btn-next" onClick={this.durationSubmit}> NEXT </div>
            <div className="diagnose-btn-back" onClick={this.handlebackSubmit}> BACK </div>
          </>
          : null}

        {this.props.activeStep === 5 ?
          <>
            <div className="patient-diagnose-moreinfo-parent" onChange={this.handlerradio1Changer}>
                <div className="patient-diagnose-moreinfo-child" >Smoking</div>
                <div className="patient-diagnose-moreinfo-childs"><input type="radio" value="YES" name="Smoking" /> YES</div>
                <div className="patient-diagnose-moreinfo-childs"><input type="radio" value="NO" name="Smoking" /> NO</div>
            </div>
            <div className="patient-diagnose-moreinfo-parent" onChange={this.handlerradio1Changer}>
                <div className="patient-diagnose-moreinfo-child">Injury</div>
                <div className="patient-diagnose-moreinfo-childs"><input type="radio" value="YES" name="Injury" /> YES</div>
                <div className="patient-diagnose-moreinfo-childs"><input type="radio" value="NO" name="Injury" /> NO</div>
            </div>
            <div className="patient-diagnose-moreinfo-parent" onChange={this.handlerradio1Changer}>
                <div className="patient-diagnose-moreinfo-child">High Cholesterol </div>
                <div className="patient-diagnose-moreinfo-childs"><input type="radio" value="YES" name="High Cholesterol " /> YES</div>
                <div className="patient-diagnose-moreinfo-childs"><input type="radio" value="NO" name="High Cholesterol " /> NO</div>
            </div>
            <div className="patient-diagnose-moreinfo-parent" onChange={this.handlerradio1Changer}>
                <div className="patient-diagnose-moreinfo-child">Hypertension </div>
                <div className="patient-diagnose-moreinfo-childs"><input type="radio" value="YES" name="Hypertension" /> YES</div>
                <div className="patient-diagnose-moreinfo-childs"><input type="radio" value="NO" name="Hypertension" /> NO</div>
            </div>
         
            <div className="diagnose-btn-next" onClick={()=>this.props.handlegenInfoSetup(this.state.moreinfo)}> NEXT </div>
            <div className="diagnose-btn-back" onClick={this.handlebackSubmit}> BACK </div>
          </>
          : null}


        {this.props.activeStep === 6 ?
          <>
          <div className="disease-parent-head">Please note that the list below may not be complete and is provided solely for informational purposes and is not a qualified medical opinion.</div>

            <ul>
            {this.props.data.disease&&this.props.data.disease.map((e,key)=>
            <>
           
            
           <div className="disease-parent-title"><li>{e}</li></div>

           
            </>
            )}
          </ul>
            <div className="diagnose-btn-next" onClick={()=>this.props.handlegenInfoSetup(this.state.moreinfo)}> NEXT </div>
            <div className="diagnose-btn-back" onClick={this.handlebackSubmit}> BACK </div>
          </>
          : null}


      </div>
    )
  }
}
