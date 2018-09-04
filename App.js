import React , {Component} from 'react';
import {View} from 'react-native';
import {Header, Button, CardSection, Spinner} from './src/components/common';
import LoginForm from './src/components/LoginForm'
class App extends Component {
  state = {loggedIn : 'null'}
  UNSAFE_componentWillMount(){
    const firebase = require("firebase");
    firebase.initializeApp({
      apiKey: "AIzaSyAReQPfSW1S1yn0-fY0jTeU1bGbkMo3Ook",
      authDomain: "authentication-23ced.firebaseapp.com",
      databaseURL: "https://authentication-23ced.firebaseio.com",
      projectId: "authentication-23ced",
      storageBucket: "authentication-23ced.appspot.com",
      messagingSenderId: "204042463792"
    });
  
    firebase.auth().onAuthStateChanged((user) => {
      if(user)
      this.setState({loggedIn: true});
      else
      this.setState({loggedIn: false});

    });
  }
  logout(){
    const firebase = require("firebase");
    firebase.auth().signOut();
    this.setState({loggedIn:false});
  }
  renderContent(){
      switch(this.state.loggedIn){
        case true:
        return(<CardSection><Button pressed = {this.logout.bind(this)}>Log Out</Button></CardSection>);
        case false:
        return(<LoginForm/>);

        default:
        return(<View style = {this.styles.spinnerStyle}> 
        <Spinner  size ={'large'}/>
        </View>
        );
      };
    }

    
  
  render(){
    return(
      <View>
        <Header  headerText = "Authentication"/>
        {this.renderContent()}
      </View>
    );
  }
  styles = {
    spinnerStyle : {
      justifyContent:'center',
      alignItems:'center',
      flex:1
    }
  };
}
export default App;