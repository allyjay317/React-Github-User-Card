import React from 'react';
import logo from './logo.svg';
import './App.css';
import CardList from './components/CardList';
import axios from 'axios'

class App extends React.Component{

  constructor(){
    super()
    this.state = {
      users: [],
      error: ''
    }
  }

  componentDidMount(){
    axios.get('http://api.github.com/users/allyjay317')
      .then(data =>{
        console.log(data)
        let user = 
        {  
            avatar: data.data.avatar_url,
            userName: data.data.login,
            url: data.data.html_url,
            followers: []
        }
        axios.get(data.data.followers_url)
        .then(followers =>{
          console.log(followers)
          followers.data.forEach(follower => {
            user.followers.push({
              avatar: follower.avatar_url,
              userName: follower.login,
              url: follower.html_url,
            })
          })
          
          this.setState({
            users: [...this.state.users, user]
          })
        })
        .catch(error =>{
          this.setState({
            error: this.state.error + ' Could not load follower data'
          })
        })
        })
        
      .catch(error =>{
        this.setState({
          error: this.state.error + 'Could not load data'
        })
      })
  }

  render() {
    return (
      <div className="App">
        <CardList userData={this.state.users} error={this.state.error}/>
      </div>
    );
  }
}

export default App;
