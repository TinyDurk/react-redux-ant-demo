/*
 * @Author: Burning
 * @Date: 2018-09-13 14:17:30
 * @Last Modified by: Burning
 * @Last Modified time: 2018-09-14 12:17:49
 */

import React from 'react';
import {
  Layout, Menu, Icon, Dropdown, Avatar, Spin,
} from 'antd';
import styles from './index.less';

// 日后功能多了可能要加一个container包裹，解放BasicLayout处理
export default class GlobalHeader extends React.PureComponent {
  _renderMenu() {
    return (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.props.onMenuClick}>
        <Menu.Item key="userCenter">
          <Icon type="user" />
          <span>个人中心</span>
        </Menu.Item>
        <Menu.Item key="userinfo">
          <Icon type="setting" />
          <span>个人设置</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出登录
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    const { auth, collapsed, onToggleClick } = this.props;
    return (
      <Layout.Header className={styles.headerCtn}>
        <div className={styles.header}>
          <Icon
            className={styles.toggleBtn}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={onToggleClick}
          />
          <div className={styles.right}>
            {auth.user.nick ? (
              <Dropdown overlay={this._renderMenu()}>
                <span className={`${styles.action} ${styles.account}`}>
                  <Avatar
                    size="small"
                    className={styles.avatar}
                    src={auth.user.hurl}
                    alt="avatar"
                  />
                  <span className={styles.name}>{auth.user.nick}</span>
                </span>
              </Dropdown>
            ) : (
              <Spin size="small" className={styles.loading} />
            )}
          </div>
        </div>
      </Layout.Header>
    );
  }
}
