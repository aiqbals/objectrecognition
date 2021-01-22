import React, { Component } from 'react';

import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';


const app = new Clarifai.App({
  apiKey: '65933865b1e440a9a54f81bceb3fc492'
 });

const particleOptions = {
  particles: {
    number: {
      value: 130,
      desitiy: {
        enable: true,
        value_area: 800
      }
    }
  }
}
class App extends Component {
  state = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    } //extracting pixel value for % to position the box through style
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box});
  }
  
  onInputChange = (event) => {
    //console.log(event.target.value);
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    //console.log('click');
    this.setState({imageUrl: this.state.input})
    //COLOR_MODEL, FACE_DETECT_MODEL - WE CAN USE MANY MODELS LIKE THIS
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then( response => 
          //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
          this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch( err => console.log(err))
  }

  onRouteChange = (route) => {
    this.setState({route: route});
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;

    return (
    <div className="App">
        <Particles className='particles'
          params= {particleOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route === 'home' ? 
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit} 
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div> : ( route === 'signin' ? 
                      <Signin onRouteChange={this.onRouteChange} /> :
                      <Register onRouteChange={this.onRouteChange} />         
                  )
        } {/* manual routing reason, we use this bracket - way of declaring JS in JSX */}
    </div>
    );
  }
}

export default App;
