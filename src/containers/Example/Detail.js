import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as indexActionCreators from '@/actions';

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth
  };
};

const mapDispatchToProps = dispatch => ({
  indexActions: bindActionCreators(indexActionCreators, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
class Detail extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        Detail
      </div>
    );
  }
}

export default Detail;
