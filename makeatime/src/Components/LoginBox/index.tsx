import React, { Component, useState } from 'react';


import './index.scss';

interface Props {} //possibly add an "event name" that is parsed

interface IState {
  [key: string]: any; // the type of input
} 

class LoginBox extends Component<{}, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event: any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    console.log(this.state.username + " poopoopeepee" + this.state.password);
    //all loging things
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
        </label>
        <br />
        <input type="submit" value="Login" />
      </form>
    );
  }
}

export default LoginBox;
