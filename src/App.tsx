import React from 'react';
// import logo from './logo.svg';
import './App.css';

interface WelcomeProps {
    name: StringT;
    onClick: () => void;
  }
  
  interface WelcomeState {
    name: StringT;
    onClick: () => void;
  }
  
  class Welcome extends React.Component<WelcomeProps, WelcomeState> {
    constructor(props: WelcomeProps) {
      super(props);
  
      this.state = {
          name: props.name,
          onClick: props.onClick,
        }
    }
  
    render() {
      return (
            <button onClick={this.state.onClick} >
          {this.state.name}
          </button>
      );
    }
  }
  
interface UserListProps {
    name: StringT[];
}

interface UserListState {
    name: StringT[];
    pushed: StringT;
//    update: boolean;
}

class UserList extends React.Component<UserListProps, UserListState> {
    constructor(props: UserListProps) {
        super(props)

        this.state = {
            name: this.props.name,
            pushed: undefined,
        }
    }

    handleClick(user_name: StringT) {
        //e.preventDefault();
  
        if (this.state.pushed === user_name ) {
            this.setState({
                pushed: undefined,
            })
        } else {
            this.setState({
                pushed: user_name,
//                update: true,
            })
        }
    }

    render() {
        return (
            <p>
            {
                this.state.name.map((user_name: StringT) => {
                    if ( user_name === undefined || user_name === '') {
                        return <Welcome name='everyOne' onClick={() => this.handleClick('everyOne')} /> 
                    } else {
                        return <Welcome name={user_name} onClick={() => this.handleClick(user_name)} /> 
                    }
                })
            }
            <h1>{this.state.pushed ? <div>Hello! {this.state.pushed}</div>:''}</h1>
            </p>
        )
    }
}

type StringT = string | undefined;

const users = ['','Cahal','Edite','Everyone']

const App: React.FC = () => {
  return (
    <div className="App">
      <UserList name={users} />
    </div>
  );
}

export default App;