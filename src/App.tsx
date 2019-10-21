import React from 'react';
// import logo from './logo.svg';
import './App.css';

interface GreetingProps {
    isLoggedIn: boolean;
}

interface GreetingState {
    isLoggedIn: boolean;
}

interface LoginGreeting {
    name: string;
}

function UserGreeting(props: LoginGreeting) {
    return <h1>Welcome back! {props.name}</h1>
}

function GuestGreeting(props: LoginGreeting) {
    return <h1>Please sign up! {props.name}</h1>
}

class Greeting extends React.Component<GreetingProps,GreetingState> {
    constructor(props: GreetingProps) {
        super(props);

        this.state = {
            isLoggedIn: props.isLoggedIn,
        }
    }

    handleClick = () => {
        this.setState({
            isLoggedIn: !this.state.isLoggedIn, 
        })
    }

    render() {
        if ( this.state.isLoggedIn ) {
            return <UserGreeting name="" />
        } else {
            return <GuestGreeting name="GuestUser" />
        }
    }
}

interface WelcomeProps {
  name: string;
}

interface WelcomeState {
  name: string;
}

class Welcome extends React.Component<WelcomeProps,WelcomeState> {
  constructor(props: WelcomeProps) {
    super(props);

    this.state = {name: props.name ? props.name : 'everyOne', };
  }

  render() {
    return <h1>Hello, {this.state.name}</h1>;
  }
}

const App: React.FC = () => {
    return (
        <div className="App">
          <Welcome name=""/>
          <Welcome name="Cahal" />
          <Welcome name="Edite" />
          <Welcome name="Everyone" />
    
            <Greeting isLoggedIn={false} />
        </div>
        )
    }

export default App;
