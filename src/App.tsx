import React from 'react';
// import logo from './logo.svg';
import './App.css';

type StringT = string | undefined;
const users = ['','Cahal','Edite','Everyone']

interface WelcomeProps {
    name: StringT;
    key: StringT;
    onClick: () => void;
}

interface WelcomeState {
  name: StringT;
  key: StringT;
  onClick: () => void;
}

// 変更されたかどうかを判定して、変更されていたら変更内容を知らせる
// 

class Welcome extends React.Component<WelcomeProps, WelcomeState> {
  constructor(props: WelcomeProps) {
    super(props);

    this.state = {
        name: props.name,
        key: props.key,
        onClick: props.onClick,
      }
  }

  render() {
    return (
      <div>
        <input type="checkbox" checked={false} key={this.state.name} />
        <input type="text" value={this.state.name} key={this.state.name} />
        <button onClick={this.state.onClick} >Hello!</button>
      </div>
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
//            update: true,
        })
    }
  }

          // 押されたときにチェックボックスにチェックされてるリストがあれば、その内容を配列から削除する
  render() {
    return (
        <div>
          <button>チェックした人を削除</button>
          {
            this.state.name.map((user_name: StringT, index:number) => {
                let key='key_';
                if ( user_name === undefined || user_name === '') {
                  key += 'everyOne' + index;
                    return <Welcome name='everyOne' onClick={() => this.handleClick('everyOne')} key={key} /> 
                } else {
                  key += user_name + index;
                    return <Welcome name={user_name} onClick={() => this.handleClick(user_name)} key={key} /> 
                }
            })
          }
          <div className="msg">{this.state.pushed ? <div>Hello! {this.state.pushed}</div>:''}</div>
        </div>
    )
  }
}

const App: React.FC = () => {
  return (
    <div className="App">
      <UserList name={users} />
    </div>
  );
}

export default App;