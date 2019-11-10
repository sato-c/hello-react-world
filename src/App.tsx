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
    onClick: (e:React.MouseEvent<HTMLButtonElement>,user_name:StringT) => void;
    setDeleteMember: (user_name:StringT, checked:boolean) => void;
  }

interface WelcomeState {
  name: StringT;
  checked: boolean;
}

// 変更されたかどうかを判定して、変更されていたら変更内容を知らせる
// 

class Welcome extends React.Component<WelcomeProps, WelcomeState> {
  constructor(props: WelcomeProps) {
    super(props);

    this.state = {
        name: props.name,
        checked: false,
      }
  }

  onChangeHandler(e:React.ChangeEvent<HTMLInputElement>) {
    // alert(e.target.name)
    const checked = !this.state.checked
    this.setState({checked: checked })

    this.props.setDeleteMember(this.state.name, checked )
  }

  onChangeTextHandler(e:React.ChangeEvent<HTMLInputElement>) {
    if (!this.state.checked) {
      this.setState({name: e.target.value})
    }
  }  

  onClickHandler(e:React.MouseEvent<HTMLButtonElement>) {
    this.props.onClick(e,this.state.name)
  }

  render() {
    return (
      <div>
        <input type="checkbox" name={this.state.name} checked={this.state.checked} onChange={(e) => this.onChangeHandler(e)} />
        <input type="text" value={this.state.name} onChange={(e) => this.onChangeTextHandler(e)} />
        <button onClick={(e) => this.props.onClick(e,this.state.name)}>Hello!</button>
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

  updateDeleteMember(old_name: StringT, new_name: StringT, deletelist: StringT[]) {
    const idx = deletelist.indexOf(old_name)

    if ( idx >= 0) {
      deletelist.splice(idx,1)
      deletelist.push(new_name)    
    }
  }


  handleDeleteList(user_name: StringT, checked: boolean) {
//    alert(user_name)
//     alert(util.inspect(this,false,null))
//     alert(util.inspect(this.state,false,null))
    var dellist = this.state.deleteList

    if ( checked ) {
      dellist.push(user_name)
    } else {
      const idx = dellist.indexOf(user_name)

      if ( idx >= 0 ) {
        dellist.splice(idx,1)
      }
    }

    this.setState({deleteList: dellist})
  }

  handleClick(e:React.MouseEvent<HTMLButtonElement>,user_name:StringT) {
    //e.preventDefault();
    alert(util.inspect(this,false,null))
    alert(util.inspect(this.state,false,null))

    if (this.state.pushed === user_name ) {
      this.setState({
        pushed: undefined,
      })
    } else {
      this.setState({
        pushed: user_name,
      })
    }
  }

  handleAddClick() {
    let newmembers: StringT[] = this.state.names;

    newmembers.push("New Member" + newmembers.length)
    this.setState({names: newmembers})
  }

  handleDelClick() {
//    alert(this.state.deleteList)
    let localDL:StringT[] = this.state.deleteList
    let nameList:StringT[] = this.state.names

    for ( let i = 0; i < localDL.length; ++i) {
      if( nameList.includes(localDL[i])) {
        nameList = this.state.names.filter(n => n !== localDL[i])
      }
    }

//    alert("namelist:"+nameList)

    this.setState({
      names: nameList,
    })
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
            this.state.names.map((user_name: StringT) => {
                if ( user_name === undefined || user_name === '') {
                    return <Welcome 
                            key={user_name}
                            name='everyOne'
                            onClick={(e,t:StringT) => this.handleClick(e,t)}
                            setDeleteMember={(t:StringT,c:boolean) => this.handleDeleteList(t,c)}
                            /> 
                } else {
                    return <Welcome
                            key={user_name}
                            name={user_name}
                            onClick={(e,t:StringT)=>this.handleClick(e,t)}
                            setDeleteMember={(t:StringT,c:boolean) => this.handleDeleteList(t,c)}
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