import React, {Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'
import { Button } from 'reactstrap'

const options = {
  autoStart: false,
  continuous: false
}


class Dictaphone extends Component {

  constructor(props){
    super(props);
    this.state = {
      voice: ''
    }
  }

  

  render() {

    const { transcript, resetTranscript, browserSupportsSpeechRecognition, startListening, listening, finalTranscript   } = this.props
    // console.log("final trans len is " + finalTranscript.length)
    

    if (!browserSupportsSpeechRecognition) {
      console.log("Browser doesnt support speech recognition api")
      return null
    }

    if(!listening && this.state.voice!==finalTranscript){
      console.log("final trans len is " + finalTranscript.length)
      this.setState({voice: finalTranscript})
      this.props.getTrans(finalTranscript ); 
    }

    
    return (
      <div>
        <Button onClick={startListening} color="secondary" className="btn-circle" outline><span className="fa fa-microphone"></span></Button>
        {/* <Button onClick={resetTranscript} color="primary">Reset</Button> */}
        
        <span>{transcript}</span>
        <br />
        <br />
      </div>
    )
  }
}

export default SpeechRecognition(options)(Dictaphone)