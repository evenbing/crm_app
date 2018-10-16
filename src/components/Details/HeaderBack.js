/**
 * @component HeaderBack
 * @description
 * @time 2018/8/12
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

class HeaderBack extends React.PureComponent {
  render() {
    return (
      <LinearGradient
        start={{ x: 1.0, y: 0.0 }}
        end={{ x: 0.0, y: 1.0 }}
        colors={['#98CE5E', '#019D55']}
      >
        {this.props.children}
      </LinearGradient>
    );
  }
}

HeaderBack.defaultProps = {
  children: null,
};

HeaderBack.propTypes = {
  children: PropTypes.node,
};

export default HeaderBack;
