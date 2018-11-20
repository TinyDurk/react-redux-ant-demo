import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Icon } from 'antd';

export default class QuestionCircleTip extends React.PureComponent {
  static defaultProps = {
    title: 'title',
    content: 'content',
    placement: 'topLeft'
  };

  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.node,
    placement: PropTypes.string
  };

  render() {
    const {
      title,
      content,
      placement
    } = this.props;
    return (
      <Popover placement={placement} title={title} content={content}>
        <Icon type="question-circle" theme="outlined" style={{ fontSize: 16 }} />
      </Popover>
    );
  }
}
