/**
 * @component ListHeader.jsr.js
 * @description 头部组件
 * @time 2018/8/28
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../constants';

const HeaderView = styled.View`
  background-color: ${theme.pageBackColor};
`;

const HeaderText = styled.Text`
  height: ${theme.moderateScale(20)};
  padding-left:  ${theme.moderateScale(15)};
  font-family: ${theme.fontRegular};
  font-size: ${theme.moderateScale(14)};
  color: #7A7A7A;
  letter-spacing: -0.47px;
`;

const ListHeader = ({ title }) => {
  return (
    <HeaderView>
      <HeaderText>{title}</HeaderText>
    </HeaderView>
  );
};

ListHeader.defaultProps = {};

ListHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ListHeader;
