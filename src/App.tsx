import React from 'react';
// import logo from './logo.svg';
import './App.css';

interface WelcomeProps {
    name: string;
    onClick: () => void;
  }
  
  interface WelcomeState {
    name: string;
    onClick: () => void;
  }
  
  class Welcome extends React.Component<WelcomeProps, WelcomeState> {
    constructor(props: WelcomeProps) {
      super(props);
  
      this.state = {
          name: props.name ? props.name : 'everyOne',
          onClick: props.onClick,
        }
    }
  
    render() {
      return (
            <button onClick={this.state.onClick} name={this.state.name}>
          {this.state.name}
          </button>
      );
    }
  }
  
interface UserListProps {
    name: string;
}

interface UserListState {
    name: string[];
    pushed: string;
    update: boolean;
}

class UserList extends React.Component<UserListProps, UserListState> {
    constructor(props: UserListProps) {
        super(props)

        this.state = {
            name: this.props.name.split(','),
            pushed: '',
            update: false,
        }
    }

    handleClick(user_name: string) {
        //e.preventDefault();
  
        if (this.state.pushed === user_name ) {
            this.setState({
                pushed: '',
                update: false,
            })
        } else {
            this.setState({
                pushed: user_name,
                update: true,
            })
        }
    }

    render() {
        return (
            <p>
            {
                this.state.name.map((user_name) => {
                    if ( user_name === '' ) {
                        return <Welcome name='everyOne' onClick={() => this.handleClick('everyOne')} /> 
                    } else {
                        return <Welcome name={user_name} onClick={() => this.handleClick(user_name)} /> 
                    }
                })
            }
            <h1>{this.state.update ? <div>Hello! {this.state.pushed}</div>:''}</h1>
            </p>
        )
    }
}

const App: React.FC = () => {
  return (
    <div className="App">
      <UserList name=",Cahal,Edite,Everyone" />
    </div>
  );
}

export default App;