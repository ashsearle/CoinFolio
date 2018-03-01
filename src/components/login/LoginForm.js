import React, { Component } from 'react';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    };
  }

  onEmailChange = e => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };

  onPasswordChange = e => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  };

  onSubmit = e => {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      this.setState(() => ({ error: 'Please enter your email and password!' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        email: this.state.email,
        password: this.state.password
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.error && (
          <div className="alert alert-danger">{this.state.error}</div>
        )}
        <form className="login-form">
          <div className="row">
            <div className="col-md-8">
              <div className="form-group">
                <label htmlFor="inputEmail">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onPasswordChange}
                />
              </div>
              <nav className="float-right">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onSubmit}
                >
                  {this.props.submitButtonLabel}
                </button>
              </nav>
            </div>

            <div className="form-group col-md-4 social-buttons">
              <h4>Social login</h4>
              <button
                type="button"
                className="btn btn-google mb-1"
                onClick={this.props.onGoogleLogin}
              >
                <i className="fa fa-google" />Login with Google
              </button>
              <button
                type="button"
                className="btn btn-facebook"
                onClick={this.props.onFacebookLogin}
              >
                <i className="fa fa-facebook" />Login with Facebook
              </button>
            </div>

            <div className="clearfix" />
          </div>
        </form>
      </div>
    );
  }
}
