import React, { ChangeEvent } from 'react';
// import logo from './logo.svg';
import './App.css';

type StringT = string | undefined;
type StringN = string | null;
var users:StringT[] = ['','Cahal','Edite','Everyone']

interface WelcomeProps {
    name: StringT;
    key: StringT;
    onClick: () => void;
    onChange: (e:React.ChangeEvent<HTMLInputElement>, index: StringT) => void;
  }

interface WelcomeState {
  name: StringT;
  key: StringT;
  changeName: StringN;
  onClick: () => void;
  onChange: (e:React.ChangeEvent<HTMLInputElement>, index: StringT) => void;
}

// 変更されたかどうかを判定して、変更されていたら変更内容を知らせる
// 

class Welcome extends React.Component<WelcomeProps, WelcomeState> {
  constructor(props: WelcomeProps) {
    super(props);

    this.state = {
        name: props.name,
        changeName: null,
        key: props.key,
        onClick: props.onClick,
        onChange: props.onChange,
      }
  }

//  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
//    alert("handleChange:" + e.target.value);
//    this.setState({changeName: e.target.value})
//  }

  render() {
    return (
      <div>
        <input type="checkbox" checked={false} key={this.state.key} />
        <input type="text" value={this.state.name} onChange={(e) => this.props.onChange(e, this.props.key)} />
        <button onClick={this.state.onClick} >Hello!</button>
      </div>
    );
  }
}

interface UserListProps {
    names: StringT[];
}

interface UserListState {
    names: StringT[];
    pushed: StringT;
//    update: boolean;
}

class UserList extends React.Component<UserListProps, UserListState> {
  constructor(props: UserListProps) {
    super(props)

    this.state = {
        names: this.props.names,
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

  handleChange(e: React.ChangeEvent<HTMLInputElement>, index:StringT) {
  //  const changedName = e.target.value;
    let users:StringT[] = this.state.names;

    // alert(e.target.value);

    //alert(index);

    if ( index === undefined ) {
      return;
    }

    const key_id:number = Number(index.split('_')[2]);

    users[key_id] = e.target.value;
    this.setState({
      names: users,
    })

    alert(key_id + ":" + e.target.value)
  }

          // 押されたときにチェックボックスにチェックされてるリストがあれば、その内容を配列から削除する
  render() {
    return (
        <fieldset>
          <legend>このサイトに登録されているメンバーリスト</legend>
          <button>チェックした人を削除</button>
          {
            this.state.names.map((user_name: StringT, index:number) => {
              const key = 'UserList_key_' + index;
                if ( user_name === undefined || user_name === '') {
                    return <Welcome name='everyOne' onClick={() => this.handleClick('everyOne')} key={key} onChange={(e) => this.handleChange(e, key)}/> 
                } else {
                    return <Welcome name={user_name} onClick={() => this.handleClick(user_name)} key={key} onChange={(e) => this.handleChange(e, key)} /> 
                }
            })
          }
          <div className="msg">{this.state.pushed ? <div>Hello! {this.state.pushed}</div>:''}</div>
        </fieldset>
    )
  }
}

const App: React.FC = () => {
  return (
    <div className="App">
      <UserList names={users} />
    </div>
  );
}

export default App;