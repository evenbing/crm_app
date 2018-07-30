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
import { isAndroid } from '../utils/device';
import defaultAvatar from '../img/default_avatar.png';

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

const Thumbnail = (props) => {
  const {
    imgUri, size, round, borderRadius,
  } = props;
  return (
    <AvatarImg
      size={size}
      source={imgUri ? { uri: imgUri } : defaultAvatar}
      round={round}
      borderRadius={borderRadius}
    />
  );
};

Thumbnail.defaultProps = {
  imgUri: '',
  size: theme.avatarSize,
  round: false,
  borderRadius: 0,
};

Thumbnail.propTypes = {
  imgUri: PropTypes.string,
  size: PropTypes.number,
  round: PropTypes.bool,
  borderRadius: PropTypes.number,
};

export default Thumbnail;
