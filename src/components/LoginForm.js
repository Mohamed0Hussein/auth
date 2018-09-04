import React, {Component} from 'react';
import {Text} from 'react-native';
import {Button, Card, CardSection,Input, Spinner} from './common';
class LoginForm extends Component {
state = {email:'',password:'',error : '',loading:false};
onButtonPress(){
    const firebase = require('firebase');
    const {email,password} = this.state;
    this.setState({error:'',loading:true});
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(this.onLoginSuccess.bind(this))
    .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(this.onLoginSuccess.bind(this))
        .catch(this.onLoginFail.bind(this));
    });
}
onLoginSuccess(){
    this.setState({
        email:'',
        password:'',
        error:'',
        loading:false
    });
}
onLoginFail(){
    this.setState({
        error:'Error Logging .. double check and try again.',
        loading:false
    });
}
renderButton(){
    if(this.state.loading){
        return (<Spinner size ='small'/>)
    }
    else
    {
        return (<Button pressed = {this.onButtonPress.bind(this)}>
        Log In
    </Button>)
    }
}
render(){
    return(
        <Card>
            <CardSection>
                <Input label ="Email"
                placeholder="example@gmail.com"
                onChangeText={email => this.setState({email})}
                value ={this.state.email}
                ></Input>
            </CardSection>
            <CardSection>
            <Input label ="Password"
                placeholder="password"
                onChangeText={password => this.setState({password})}
                value ={this.state.password}
                secureTextEntry // = secureTextEntry ={true}
                ></Input>
            </CardSection>
            <Text style = {styles.errorTextStyle}>
                {this.state.error}
            </Text>
            <CardSection>
                {this.renderButton()}
            </CardSection>
        </Card>
    );
}
}

const styles = {
    errorTextStyle : {
        fontSize:20,
        alignSelf:'center',
        color:'red'
    }
};

export default LoginForm;