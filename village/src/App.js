import React, { Component } from 'react';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import axios from "axios"; 
import {Route, Link} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount(){
    this.getSmurfs();
  }
  addNew = s => {
    this.setState({smurfs: s})
    console.log('adding new smurf');
  }
getSmurfs(){
  axios
    .get('http://localhost:3333/smurfs')
    .then(res=>{
      console.log(res.data);
      this.setState({smurfs: res.data})

    })
    .catch(err=>console.log(err));
}

  render() {
    return (
      <div className="App">
    <ul className= "navbar">
    <li>
      <Link to= "/">Home</Link>
    </li>
    <li>
      <Link to ="/smurf-form">Add Smurf</Link>
    </li>
    </ul>
      <Route 
      exact path = {"/" }
       render ={props =>(
         <Smurfs
         {...props}
        smurfs= {this.state.smurfs}
         />
       )} 
       />
       <Route 
       path = {"/smurf-form"}
       render = {props => (
         <SmurfForm
         {...props}
         addNew= {this.state.addNew}
         />
        )}
        />
      </div>
    );
  }
}

export default App;
