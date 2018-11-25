/**
 * @component Styles.js
 * @description 详情样式
 * @time 2018/9/27
 * @author JUSTIN XU
 */
import React from 'react';
import styled from 'styled-components';
import NavItemComponent from '../NavItem';
import theme from '../../constants/theme';

export const renderBasicItem = (leftText, rightText, rightSuffix, rightStyle = {}, isLast = false) => (
  <NavItemComponent
    height={44}
    leftText={leftText}
    rightText={rightText}
    showNavIcon={false}
    isLast={isLast}
    rightTextStyle={{
      color: theme.textGrayColor,
      ...rightStyle,
    }}
    rightSuffix={rightSuffix}
  />
);

export const RemarkView = styled.View`
  padding: 0 ${theme.moderateScale(15)}px;
`;

export const ImageTitleView = styled.View`
  padding: 0 ${theme.moderateScale(15)}px;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const RemarkText = styled.Text`
  font-size: ${theme.moderateScale(16)};
  color: #AEAEAE;
`;

export const RightSuffix = styled.Text`
  margin-left: ${theme.moderateScale(13)};
  color: #373737;
  font-size: ${theme.moderateScale(16)};
`;
