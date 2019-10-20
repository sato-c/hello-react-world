import React from 'react';
// import logo from './logo.svg';
import './App.css';

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
    </div>
  );
}

export default App;
