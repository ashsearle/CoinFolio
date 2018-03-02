import React, { Component } from 'react';

export default class LoginForm extends Component {

  render() {
    return (
      <div className="login-form">
        <header>
          <h1 className="title">Login</h1>
          <p>Sign in with your favorite network.</p>
        </header>
        <div className="buttons">
          <button
            type="button"
            className="btn btn-google btn-icon"
            onClick={this.props.onGoogleLogin}
          >
            <span className="icon">
              <i className="fa fa-google" />
            </span>
            Login with Google
          </button>
          <button
            type="button"
            className="btn btn-facebook btn-icon"
            onClick={this.props.onFacebookLogin}
          >
            <span className="icon">
              <i className="fa fa-facebook" />
            </span>
            Login with Facebook
          </button>
          <button
            type="button"
            className="btn btn-twitter btn-icon"
            onClick={this.props.doTwitterLogin}
          >
            <span className="icon">
              <i className="fa fa-twitter" />
            </span>
            Login with Twitter
          </button>
        </div>
      </div>
    );
  }
}
