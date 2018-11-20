import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filterCacheState } from '@/common/stateCahce';

const mapStateToProps = state => ({ state });

@connect(mapStateToProps)
class RouteRoot extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  componentDidMount() {
    window.onbeforeunload = () => {
      // sessionStorage.setItem('CACHE_STATE', JSON.stringify(this.props.state));
      filterCacheState(this.props.state);
    };
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

export default RouteRoot;
