/**
 * @component SilderItem.js
 * @description 侧边栏组件
 * @time 2018/8/28
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../constants';

// font-size: 10px;
const SilderText = styled.Text`
  font-family: ${theme.fontRegular};
  color: ${props => props.active ? '#ffffff' : '#575757'};
  height: ${theme.moderateScale(14)};
  width: ${theme.moderateScale(14)};
  border-radius: ${theme.moderateScale(7)};
  overflow: hidden;
  padding-left: ${theme.moderateScale(2)};
  padding-right: ${theme.moderateScale(2)};
  text-align: center;
  font-size: ${theme.moderateScale(10)};
  background-color: ${props => props.active ? theme.primaryColor : 'transparent'};
`;

const SilderItem = ({
  active,
  title,
}) => {
  return (
    <SilderText
      active={active}
    >
      {title}
    </SilderText>
  );
};

SilderItem.defaultProps = {
};

SilderItem.propTypes = {
  active: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default SilderItem;
