/*
 * @Author: Burning
 * @Date: 2018-09-13 14:17:27
 * @Last Modified by: Burning
 * @Last Modified time: 2018-10-12 17:40:03
 */

import React from 'react';
import { Menu, Icon } from 'antd';
import routerConfig from '@/route.config';

const menuKeyPrefix = 'sider_menu_';

export default class SiderMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: [],
    };
    this.rootSubmenuKeys = [];
    this.defaultOpenKeys = [];
    this.defaultSelectedKeys = [];
  }

  componentWillMount() {
    this._initDefaultKeys();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.collapsed !== this.props.collapsed) {
      if (nextProps.collapsed) {
        this.setState({ openKeys: [] });
      }
    }
  }

  _initDefaultKeys = () => {
    const { router } = this.props;
    const { pathname } = router.location;

    this.rootSubmenuKeys = routerConfig
      .map((parentRoute, parentIndex) => {
        if (pathname.indexOf(parentRoute.path) !== -1) {
          this.defaultOpenKeys.push(`${menuKeyPrefix}${parentIndex}`);
        }
        if (parentRoute.children && parentRoute.children.some(childRoute => !childRoute.hidden)) {
          parentRoute.children.forEach((childRoute, childIndex) => {
            if (`/${parentRoute.path}/${childRoute.path}` === pathname) {
              this.defaultSelectedKeys.push(`${menuKeyPrefix}${parentIndex}-${childIndex}`);
            }
          });
        } else if (parentRoute.children && `/${parentRoute.path}/${parentRoute.children[0].path}` === pathname) {
          this.defaultSelectedKeys.push(`${menuKeyPrefix}${parentIndex}`);
        }
        return `${menuKeyPrefix}${parentIndex}`;
      });

    this.setState({
      openKeys: this.defaultOpenKeys,
    });

    return this.defaultSelectedKeys;
  }

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  handleClick = (args) => {
    const { router } = this.props;
    const { item: { props: { info } } } = args;
    let path;
    if (info.firstMenu && info.secondItem) {
      path = `/${info.firstMenu.path}/${info.secondItem.path}`;
    } else {
      path = `/${info.path}`;
    }
    router.push(path);
  };

  render() {
    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={this.defaultSelectedKeys}
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        onClick={this.handleClick}
      >
        {routerConfig.map((firstMenu, fIndex) => {
          if (firstMenu.hidden) {
            return null;
          }
          if (
            firstMenu.children === undefined
            || firstMenu.children.length === 0
            || firstMenu.children.every(x => x.hidden)
          ) {
            return (
              <Menu.Item
                key={`${menuKeyPrefix}${fIndex}`}
                disabled={firstMenu.disabled}
                info={{ firstMenu, secondItem: firstMenu.children[0] }}
              >
                <Icon type={firstMenu.icon} />
                <span>{firstMenu.name}</span>
              </Menu.Item>
            );
          }
          return (
            <Menu.SubMenu
              key={`${menuKeyPrefix}${fIndex}`}
              disabled={firstMenu.disabled}
              title={<span><Icon type={firstMenu.icon} /><span>{firstMenu.name}</span></span>}
            >
              {firstMenu.children.map((secondItem, sIndex) => (
                secondItem.hidden
                  ? null
                  : (
                    <Menu.Item
                      key={`${menuKeyPrefix}${fIndex}-${sIndex}`}
                      disabled={secondItem.disabled}
                      info={{ firstMenu, secondItem }}
                    >
                      {secondItem.name}
                    </Menu.Item>
                  )
              ))}
            </Menu.SubMenu>
          );
        })}
      </Menu>
    );
  }
}
