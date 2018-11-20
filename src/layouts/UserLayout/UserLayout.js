/*
 * @Author: Burning
 * @Date: 2018-09-13 11:13:44
 * @Last Modified by: Burning
 * @Last Modified time: 2018-11-20 11:24:30
 */

import React, { Fragment } from 'react';
import { Link } from 'react-router';
import { Icon } from 'antd';
import GlobalFooter from '@/components/common/GlobalFooter';
import styles from './UserLayout.less';

const links = [
  {
    key: 'help',
    title: 'Help',
    href: '',
  },
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018 XFE
  </Fragment>
);

class UserLayout extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      // @TODO <DocumentTitle title={this.getPageTitle()}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                {/* <img alt="logo" className={styles.logo} src={logo} /> */}
                <span className={styles.title}>DEMO</span>
              </Link>
            </div>
            <div className={styles.desc}>demo description</div>
          </div>
          {children}
        </div>
        <GlobalFooter links={links} copyright={copyright} />
      </div>
    );
  }
}

export default UserLayout;
