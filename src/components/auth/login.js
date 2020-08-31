import React, { Component } from 'react'
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorText: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
        })
    }

    handleSubmit(event) {
        axios.post("https://api.devcamp.space/sessions",
        {
            client: {
                email: this.state.email,
                password: this.state.password
            }
        },
        { withCredentials: true }
        ).then(response => {
            if (response.data.status === 'created') {
                this.props.handleSuccessfulAuth();
            } else {
                this.setState({
                    errorText: "Wrong Email or Password"
                })
                this.props.handleUnSuccessfulAuth();
            }
        }).catch(error => {
            this.setState({
                errorText: "An error Occrued"
            })
            this.props.handleUnSuccessfulAuth();
        });

        event.preventDefault();
    }

  render() {
      return (
          <div>
              <h1>LOGING TO ACCESS YOUR DASHBOARD</h1>
              <div>{this.state.errorText}</div>
              
              <form onSubmit={this.handleSubmit}>
                  <input 
                        className="auth-form" 
                        type="email" 
                        name="email" 
                        placeholder="You email"
                        value={this.state.email}
                        onChange={this.handleChange}
                   />
                  <input 
                        className="auth-form" 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                   />

                   <div>
                       <button type="submit" className="btn">Login</button>
                   </div>
              </form>

          </div>
      )
  }
}