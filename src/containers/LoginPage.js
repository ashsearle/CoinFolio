import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';

import { doGoogleLogin, doLogout } from '../actions/user';

import SectionHeader from '../components/utils/SectionHeader';
import LoginForm from '../components/login/LoginForm';

const TabPane = Tabs.TabPane;

class LoginPage extends Component {
  onLogin = data => {
    console.log('onLogin', data);
  };
  onRegister = data => {
    console.log('onRegister', data);
  };
  onFacebookLogin = () => {
    console.log('onFacebookLogin');
  };
  render() {
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <SectionHeader title="Login / Register" />
          <section className="col-12 offset-md-2 col-md-8 text-center">
            <Tabs defaultActiveKey="1" size={'large'}>
              <TabPane tab="Login" key="1">
                <LoginForm
                  onSubmit={data => this.onLogin(data)}
                  onGoogleLogin={this.props.doGoogleLogin}
                  onFacebookLogin={this.onFacebookLogin}
                  submitButtonLabel="Login"
                />
              </TabPane>
              <TabPane tab="Register" key="2">
                <LoginForm
                  onSubmit={data => this.onRegister(data)}
                  onGoogleLogin={this.props.doGoogleLogin}
                  onFacebookLogin={this.onFacebookLogin}
                  submitButtonLabel="Register"
                />
              </TabPane>
            </Tabs>
          </section>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  doGoogleLogin: () => dispatch(doGoogleLogin()),
  doLogout: () => dispatch(doLogout())
});

export default connect(null, mapDispatchToProps)(LoginPage);
