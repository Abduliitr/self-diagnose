import React, { Component } from 'react';
import FadeIn from 'react-fade-in';
// import vid from '../assets/ISL_animations/0.mp4'

class VideoDisplay extends Component {
    constructor(props){
        super(props);
        this.state = {
            src:'',
            word:'',
            data:this.props.data,
            x:0
        }
    }

    sleep = (milliseconds) => {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }

    playVideo = () => {
        return (
            <>
            {/* <div>HEEKEO</div> */}
            {/* <img style={{width:"50%"}} src={require('./../assets/img/hello.gif')}></img> */}
            {/* <FadeIn> */}
                <h3 className="" style={{textAlign:"center", fontSize:"1.5rem"}}><i>{this.state.word}</i></h3>
            <FadeIn transitionDuration="1000">
                <div className="video-container">
                    <a class="carousel-control-prev" role="button"
                        style={{position:"absolute", left:"50px"}}
                        onClick={ () => {
                            if(this.state.x >= 2){
                                this.setState({x: this.state.x - 2})
                                console.log("x bcame = " + this.state.x)
                            }
                        }}
                    >
                        <span class="carousel-control-prev-icon"></span>
                    </a>
                    <video key={this.state.src} id="glass" width="100%" height="100%" autoPlay>
                        <source src={this.state.src} type="video/mp4" />
                    </video>
                </div>
                
            </FadeIn>
            </>
        );
    }

    VideoInterval = () => {
        // let x = 0;
        const interval = setInterval(() => {
            // this.setState({src: `/ISL_animations/${this.props.data[x]}.mp4`});
            if(this.state.x<this.state.data.length){
                var st = this.props.data[this.state.x];
                var pos1 = st.indexOf("(")
                var pos2 = st.indexOf(")")
                if(pos1!==-1){
                    var syn = st.substring(0,pos1);
                    var actual = st.substring(pos1+1, pos2);

                    this.setState({src: require(`./../assets/ISL_animations/${syn}.mp4`)});
                    // src={require('./../assets/img/hello.gif')}
                    
                }else{
                    this.setState({src: require(`./../assets/ISL_animations/${this.props.data[this.state.x]}.mp4`)});
                    // src={require('./../assets/img/hello.gif')}
                }
                this.setState({word: this.props.data[this.state.x]});
                this.setState({data: this.props.data})
                // this.state.x++;
                this.setState({x: this.state.x+1})
                
                console.log("this.state.x = " + this.state.x + " , len = " + this.state.data.length)
            }
            
            if(this.state.x>=this.state.data.length){
                // this.sleep(3000);
                // console.log("Sleep 3 sec")
                setTimeout(() => { this.setState({x : (this.state.x)%(this.state.data.length)}) }, 3000);
                
                // clearInterval(interval);
            }
            
                
        }, 3000)
    }

    componentDidMount(){
        this.VideoInterval();
    }

    componentDidUpdate(prevProps){
        // console.log("'qwertyui")
        if(prevProps!==this.props){
            this.setState({
                data: this.props.data
            })
            this.VideoInterval();
        }
        // console.log(prevProps)
        // console.log(this.props)
    }

    

    render() { 
        return (<>
            {this.playVideo()}
            {/* {this.VideoInterval()} */}
        </>);
    }
}
 
export default VideoDisplay;