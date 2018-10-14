/**
 * @component CommStatusBar.js
 * @description 头部
 * @time 2018/6/22
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';

const CommStatusBar = ({ barStyle, backgroundColor, translucent }) => (
  <StatusBar
    barStyle={barStyle}
    backgroundColor={backgroundColor}
    translucent={translucent}
  />
);

CommStatusBar.defaultProps = {
  barStyle: 'light-content',
  backgroundColor: 'transparent',
  translucent: true,
};

CommStatusBar.propTypes = {
  barStyle: PropTypes.string,
  backgroundColor: PropTypes.string,
  translucent: PropTypes.bool,
};

export default CommStatusBar;
