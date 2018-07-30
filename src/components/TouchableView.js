/**
 * @component TouchableView
 * @description 自定义触摸
 * @time 2018/7/2
 * @author zhao
 */
import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

class TouchableView extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  onClick = () => {
    const { onPress } = this.props;
    if (global.isClick) return;
    global.isClick = true;
    onPress && onPress();
    this.clearTimer();
    global.timer = setTimeout(() => {
      global.isClick = false;
    }, 300);
  };

  clearTimer() {
    if (global.timer) clearTimeout(global.timer);
    global.timer = null;
  }
  render() {
    const { children, style, activeOpacity } = this.props;
    return (
      <TouchableOpacity activeOpacity={activeOpacity} style={style} onPress={this.onClick}>{children}</TouchableOpacity>
    );
  }
}

TouchableView.defaultProps = {
  onPress: () => null,
  style: {},
  activeOpacity: 0.85,
};

TouchableView.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  activeOpacity: PropTypes.number,
};

export default TouchableView;
