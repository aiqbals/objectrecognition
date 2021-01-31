import React, { Component } from 'react';

import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
//import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';


/* const app = new Clarifai.App({
  apiKey: '65933865b1e440a9a54f81bceb3fc492'
 }); */

const particleOptions = {
  particles: {
    number: {
      value: 280,
      desitiy: {
        enable: true,
        value_area: 800
      }
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#e6ac00"
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#e6ac00",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 4,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      }
    },
    "modes": {
      "grab": {
        "distance": 180,
        "line_linked": {
          "opacity": 1.5
        }
      }
    }
  }
};

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    //password: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  state = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      //password: '',
      entries: 0,
      joined: ''
    }
  }

  /* componentDidMount(){
    fetch('http://localhost:3003/')
    .then(response => response.json())
    .then(console.log)
  } */

  updateUser = (data) => {
      this.setState({
        user: {
          id: data.id,
          name: data.name,
          email: data.email,
          //password: data.password,
          entries: data.entries,
          joined: data.joined
        }
      }
      )
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
    //console.log(box);
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
    //app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    //aii call from bacend for security reason
    //fetch('http://localhost:3003/image' // - while using local server
    fetch('https://git.heroku.com/arcane-taiga-52294.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          input: this.state.input
      })
    }) 
    .then(response => response.json())
    .then( response => {
        if(response) {
          fetch('https://arcane-taiga-52294.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
          .then(res => res.json())
          .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))   
          })
          .catch(console.log)
        }
        //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        this.displayFaceBox(this.calculateFaceLocation(response))
      })       
      .catch( err => console.log(err))
  }

  onRouteChange = (route) => {
    this.setState({route: route});
    if(route === 'signout') {
      //this.setState({isSignedIn: false})
      this.setState(initialState)
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
            <Rank 
              name={this.state.user.name}
              entries={this.state.user.entries} />
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit} 
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div> : ( route === 'signin' ? 
                      <div>
                          <Logo />
                          <Signin 
                            onRouteChange={this.onRouteChange}
                            updateUser={this.updateUser} />
                          )
                      </div> :
                       <div>
                          <Logo />
                          <Register 
                            onRouteChange={this.onRouteChange}
                            updateUser={this.updateUser} />
                       </div> 
                               
                  )
        } {/* manual routing reason, we use this bracket - way of declaring JS in JSX */}
    </div>
    );
  }
}

export default App;
