import React, { Component } from 'react';
import { connect } from 'react-redux';

import { doGoogleLogin, doFacebookLogin, doTwitterLogin, doLogout } from '../actions/user';

import LoginForm from '../components/login/LoginForm';

class LoginPage extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <section className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 text-center">
            <LoginForm
              onGoogleLogin={this.props.doGoogleLogin}
              onFacebookLogin={this.props.doFacebookLogin}
              onTwitterLogin={this.props.doTwitterLogin}
              submitButtonLabel="Login"
            />
          </section>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  doGoogleLogin: () => dispatch(doGoogleLogin()),
  doFacebookLogin: () => dispatch(doFacebookLogin()),
  doTwitterLogin: () => dispatch(doTwitterLogin()),
  doLogout: () => dispatch(doLogout())
});

export default connect(null, mapDispatchToProps)(LoginPage);
