import React from 'react';
import { Spin } from 'antd';

const AsyncComponent = loadComponent => (
  class AsyncComponentClass extends React.PureComponent {
    state = {
      Component: null,
    }

    componentWillMount() {
      if (this.hasLoadedComponent()) {
        return;
      }

      loadComponent()
        .then((Component) => {
          this.setState({ Component });
        })
        .catch((err) => {
          console.error('Cannot load component in <AsyncComponent />');
          throw err;
        });
    }

    hasLoadedComponent() {
      return this.state.Component !== null;
    }

    render() {
      const { Component } = this.state;
      return Component
        ? <Component {...this.props} />
        : (
          <div
            style={{
              width: '100%',
              height: '100%',
              margin: 'auto',
              paddingTop: 50,
              textAlign: 'center',
            }}
          >
            <Spin size="large" />
          </div>
        );
    }
  }
);

export default AsyncComponent;
