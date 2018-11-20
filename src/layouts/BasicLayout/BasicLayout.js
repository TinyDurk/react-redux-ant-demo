/*
 * @Author: Burning
 * @Date: 2018-09-14 11:59:24
 * @Last Modified by: Burning
 * @Last Modified time: 2018-11-20 11:52:27
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Icon, message } from 'antd';
import SiderMenu from '@/components/common/SiderMenu';
import GlobalHeader from '@/components/common/GlobalHeader';
import GlobalFooter from '@/components/common/GlobalFooter';
import styles from './BasicLayout.less';
import AppLogin from '@/common/appLogin';

const mapStateToProps = state => ({
  auth: state.auth,
});

@connect(mapStateToProps)
class BasicLayout extends Component {
  static defaultProps = {
    fixedHeader: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  handleToggleClick = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed,
    }));
  };

  hadnleMenuClick = ({ key }) => {
    switch (key) {
      case 'userCenter':
        message.info('后续开放，敬请期待');
        break;
      case 'userinfo':
        message.info('后续开放，敬请期待');
        break;
      case 'logout':
        AppLogin.logout();
        break;
      default:
        break;
    }
  }

  handleLogOut = () => {
    console.log('退出登陆');
  };

  render() {
    const {
      auth, children, router, fixedHeader,
    } = this.props;
    const { collapsed } = this.state;
    return (
      <Layout className={styles.layoutCtn}>
        <Layout.Sider
          className={styles.sSideriderCtn}
          trigger={null}
          width={256}
          collapsible
          collapsed={collapsed}
        >
          <div className={styles.logoCtn}>{collapsed ? 'OP' : 'DEMO - OP'}</div>
          <SiderMenu
            collapsed={collapsed}
            router={router}
          />
        </Layout.Sider>
        <Layout>
          <GlobalHeader
            auth={auth}
            collapsed={collapsed}
            onToggleClick={this.handleToggleClick}
            onMenuClick={this.hadnleMenuClick}
          />
          <Layout.Content className={fixedHeader ? `${styles.contentStyle} ${styles.fixedHeader}` : styles.contentStyle}>
            <div className={styles.contentWrapper}>
              {children}
            </div>
          </Layout.Content>
          <GlobalFooter copyright={<React.Fragment>Copyright <Icon type="copyright" /> 2018 XFE</React.Fragment>} />
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
