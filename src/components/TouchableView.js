/**
 * @component TouchableView
 * @description 自定义触摸
 * @time 2018/7/2
 * @author zhao
 */
import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { NoDoublePress } from '../utils/utils';

class TouchableView extends React.PureComponent {
  onPress = (value) => {
    NoDoublePress.onPress(() => {
      this.props.onPress(value);
    });
  };

  render() {
    const { children, style, activeOpacity } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        style={style}
        onPress={this.onPress}
      >
        {children}
      </TouchableOpacity>
    );
  }
}

TouchableView.defaultProps = {
  onPress: () => null,
  style: {},
  activeOpacity: 0.85,
  children: null,
};

TouchableView.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  activeOpacity: PropTypes.number,
  children: PropTypes.node,
};

export default TouchableView;
