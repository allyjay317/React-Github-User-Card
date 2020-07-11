import React from 'react';
import logo from './logo.svg';
import './App.css';
import CardList from './components/CardList';
import axios from 'axios'
import { PageHeader, Input } from 'antd';

class App extends React.Component{

  constructor(){
    super()
    this.state = {
      users: [],
      error: '',
      searchField: '',
      searching: [],
      search: ''
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.searching.length === 0 && this.state.search != prevState.search && this.state.search !== ''){
      console.log(`current: ${this.state.search}, previous: ${prevState.search}`)
      axios.get(`http://api.github.com/users/${this.state.search}`)
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
            users: [user]
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
  }
  handleSearchChange = e =>{
    let id = Date.now()
    this.setState({
      searching: [...this.state.searching, id],
      searchField: e.target.value
    })
    window.setTimeout((e)=>{
      this.setState({
        searching: this.state.searching.filter((i) => i!== id)
      })
      if(this.state.searching.length === 0){
        this.setState({
          search: this.state.searchField
        })
      }
    }, 2000)
  }

  render() {
    return (
      <div className="App">
        <PageHeader
          className='site-page-header'
          onBack={() => this.setState({users: [], searchField: ''})}
          title='GitHub User Lookup'
          subTitle={<Input placeholder='search' name='search' value={this.state.searchField} onChange={this.handleSearchChange} />}
          />
        <CardList userData={this.state.users} error={this.state.error}/>
      </div>
    );
  }
}

export default App;
