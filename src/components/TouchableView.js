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
  onClick = (value) => {
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
        onPress={this.onClick}
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
