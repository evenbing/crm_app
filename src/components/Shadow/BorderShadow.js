/**
 * @component borderShadow
 * @description 边框阴影.js
 * @time 2018/6/24
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

class BorderShadow extends React.PureComponent {
  render() {
    const {
      setting: {
        side,
        width,
        color,
        border,
        opacity,
        inset,
        style,
      },
      children,
    } = this.props

    const linear = key => ([
      <Stop offset="0" stopColor={color} stopOpacity={opacity} key={`${key}Linear0`} />,
      <Stop offset="1" stopColor={color} stopOpacity="0" key={`${key}Linear1`} />,
    ]);
    const lineWidth = border;

    return (
      <View style={[{ position: 'relative', width }, style]} >
        {(() => {
          switch (side) {
            case 'top':
              return [
                <Svg
                  key={0}
                  height={lineWidth}
                  width={width + lineWidth}
                  style={{ position: 'absolute', top: (inset ? 0 : -lineWidth) }}
                >
                  <Defs>
                    <LinearGradient id="top" x1="0%" x2="0%" y1="100%" y2="0%">{linear('BorderTop')}</LinearGradient>
                    <LinearGradient id="top-inset" x1="0%" x2="0%" y1="0%" y2="100%">{linear('BorderTopInset')}</LinearGradient>
                  </Defs>
                  <Rect x={0} y={0} width={width} height={lineWidth} fill={`url(#top${inset ? '-inset' : ''})`} />
                </Svg>,
                children,
              ]
            case 'bottom':
              return [
                children,
                <Svg
                  key={0}
                  height={lineWidth}
                  width={width + lineWidth}
                  style={{ position: 'absolute', bottom: (inset ? -lineWidth : 0) }}
                >
                  <Defs>
                    <LinearGradient id="bottom" x1="0%" x2="0%" y1="0%" y2="100%">{linear('BorderBottom')}</LinearGradient>
                    <LinearGradient id="bottom-inset" x1="0%" x2="0%" y1="100%" y2="0%">{linear('BorderBottomInset')}</LinearGradient>
                  </Defs>
                  <Rect x={0} y={0} width={width} height={lineWidth} fill={`url(#bottom${inset ? '-inset' : ''})`} />
                </Svg>,
              ]
            default:
              return null;
          }
        })()}
      </View>
    );
  }
}

BorderShadow.defaultProps = {
  setting: {
    side: 'bottom',
    width: 0,
    color: '#000',
    border: 0,
    opacity: 1,
    inset: false,
    style: {},
  },
  children: null,
};

BorderShadow.propTypes = {
  setting: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.element,
};

export default BorderShadow;
