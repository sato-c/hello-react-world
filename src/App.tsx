import React from 'react';
// import logo from './logo.svg';
import './App.css';

interface WelcomeProps {
  name: string;
}
 
  function Welcome(props: WelcomeProps) {
    return <h1>Hello, {props.name}</h1>;
  }
  
  const App: React.FC = () => {
    return (
      <div className="App">
        <Welcome name="Sara" />
        <Welcome name="Cahal" />
        <Welcome name="Edite" />
        <Welcome name="Everyone" />
      </div>
    );
  }
  
  export default App;
  