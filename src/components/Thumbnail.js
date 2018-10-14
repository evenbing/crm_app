/**
 * @component Thumbnail.js
 * @description 头像
 * @time 2018/6/24
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../constants';
import { isAndroid } from '../utils/utils';
import defaultImage from '../img/404.png';

function getRound(size) {
  return (isAndroid ? size * 2 : `${size / 2}`);
}
function getRadius(size) {
  return (isAndroid ? size * 2 : size);
}
const AvatarImg = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => (props.round ? getRound(props.size) : getRadius(props.borderRadius))}px;
`;

const Thumbnail = ({
  imgUri, size, round, borderRadius, source, resizeMode, style,
}) => {
  return (
    <AvatarImg
      style={style}
      size={size}
      source={imgUri ? { uri: imgUri } : (source || defaultImage)}
      round={round}
      resizeMode={resizeMode}
      borderRadius={borderRadius}
    />
  );
};

Thumbnail.defaultProps = {
  imgUri: '',
  source: null,
  size: theme.avatarSize,
  round: false,
  borderRadius: 0,
  resizeMode: 'contain',
  style: {},
};

Thumbnail.propTypes = {
  imgUri: PropTypes.string,
  source: PropTypes.number,
  size: PropTypes.number,
  round: PropTypes.bool,
  borderRadius: PropTypes.number,
  resizeMode: PropTypes.string,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default Thumbnail;
