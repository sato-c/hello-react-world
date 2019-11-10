import React, { MouseEvent } from 'react';
// import logo from './logo.svg';
import './App.css';

var util = require('util')

type StringT = string | undefined;
type StringN = string | null;
var users:StringT[] = ['','Cahal','Edite','Everyone']
type InputElement = boolean | string;


interface WelcomeProps {
    name: StringT;
    onClick: (e:React.MouseEvent<HTMLButtonElement>, user_name:StringT) => void;
    setDeleteMember: (user_name:StringT, listin:boolean, deletelist: StringT[]) => void;
    deleteList: StringT[]
  }

interface WelcomeState {
  name: StringT;
  changeName: StringN;
  checked: boolean;
}

// 変更されたかどうかを判定して、変更されていたら変更内容を知らせる
// 

class Welcome extends React.Component<WelcomeProps, WelcomeState> {
  constructor(props: WelcomeProps) {
    super(props);

    this.state = {
        name: props.name,
        changeName: null,
        checked: false,
      }
  }

  onChangeHandler(e:React.ChangeEvent<HTMLInputElement>) {
    // alert(e.target.name)
    const checked = !this.state.checked
    this.setState({checked: checked })
    this.props.setDeleteMember(this.state.name, checked, this.props.deleteList)
  }

  render() {
    return (
      <div>
        <input type="checkbox" name={this.state.name} checked={this.state.checked} onChange={(e:React.ChangeEvent<HTMLInputElement>) => this.onChangeHandler(e)} />
        <input type="text" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
        <button onClick={(e) => this.props.onClick(e, this.state.name)} >Hello!</button>
      </div>
    );
  }
}

interface UserListProps { 
    names: StringT[];
}

interface UserListState {
    names: StringT[];
    deleteList: StringT[];
    pushed: StringT;
//    update: boolean;
}

class UserList extends React.Component<UserListProps, UserListState> {
  constructor(props: UserListProps) {
    super(props)

    this.state = {
        names: this.props.names,
        pushed: undefined,
        deleteList: [],
    }
  }

  handleDeleteList(user_name: StringT, listset:boolean, deletelist: StringT[]) {
//    alert(user_name + "/" + listset)
     alert(util.inspect(this,false,null))
     alert(util.inspect(this.state,false,null))

    var i;

    if (!listset) {
      for (i = 0; i < deletelist.length; ++i) {
        if ( deletelist[i] === user_name )
        {
          deletelist.splice(i,1)
          return;
        }
      }
    } else {
      for ( i = 0; i < deletelist.length; ++i ) {
        if ( deletelist[i] === user_name ) {
          return;
        }
      }

      deletelist.push(user_name)
    }
  }

  handleClick(e:React.MouseEvent<HTMLButtonElement>, user_name:StringT) {
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

  handleAddClick() {
    let newmembers: StringT[] = this.state.names;

    newmembers.push("New Member" + newmembers.length)
    this.setState({names: newmembers})
  }

  handleDelClick() {
    alert(this.state.deleteList)
  }

  render() {
    return (
      <div>
          <div className="msg">{this.state.pushed ? <div>Hello! {this.state.pushed}</div>:''}</div>
        <fieldset>
          <legend>このサイトに登録されているメンバーリスト</legend>
          <button onClick={()=>this.handleDelClick()}>チェックした人を削除</button>
          <button onClick={()=>this.handleAddClick()}>新メンバー追加</button>
          {
            this.state.names.map((user_name: StringT, index:number) => {
                if ( user_name === undefined || user_name === '') {
                    return <Welcome 
                            name='everyOne'
                            onClick={this.handleClick}
                            setDeleteMember={this.handleDeleteList}
                            deleteList={this.state.deleteList}
                            /> 
                } else {
                    return <Welcome
                            name={user_name}
                            onClick={this.handleClick}
                            setDeleteMember={this.handleDeleteList}
                            deleteList={this.state.deleteList}
                            /> 
                }
            })
          }
          <div>
          {
            this.state.deleteList.map((user_name: StringT) => {
              return <div>{user_name}</div>
            })
          }
          </div>
        </fieldset>
        </div>
    )
  }
}

const App: React.FC = () => {
  return (
    <div className="App">
      <UserList names={users}/>
    </div>
  );
}

export default App;