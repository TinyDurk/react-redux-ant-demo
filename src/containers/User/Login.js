import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'antd';
import Login from '@/components/Login';
import AppLogin, { getLocalLogInfo, setLogInfoToLocal } from '@/common/appLogin';
import styles from './Login.less';

const {
  Tab, UserName, Password, Submit,
} = Login;

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    login: {
      status: auth.status,
    },
    submitting: auth.status === 'logining',
  };
};

@connect(mapStateToProps)
class LoginPage extends Component {
  static defaultProps = {
    login: {
      status: '',
      // type: 'account'
    },
    submitting: false,
  };

  componentWillMount() {
    // 应该设计到route onEnter那
    if (getLocalLogInfo()) {
      AppLogin.goLoginSucNextRoute();
    }
  }

  onTabChange = (type) => {
    console.log('type change: ', type);
  };

  handleSubmit = (err, values) => {
    if (!err) {
      AppLogin.doLogin(values.userName, values.password);
    }
  };

  handleTestLogin = () => {
    setLogInfoToLocal({
      nick: 'test',
      token_expire: Date.now() + 72000
    });
  }

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="warning" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey="account"
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={(form) => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab="Account">
            {login.status === 'error'
              && !submitting
              && this.renderMessage('账号或验证码有误')}
            <UserName name="userName" placeholder="Username" />
            <Password
              name="password"
              placeholder="Authentication Code"
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
          </Tab>
          <Submit loading={submitting}>Sign in</Submit>
          <div onClick={this.handleTestLogin}>test login</div>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
