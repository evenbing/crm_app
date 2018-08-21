import React from 'react';
import styled from 'styled-components';
import { moderateScale } from '../utils/scale';

const DescriptionContent = styled.TextInput.attrs({
  returnKeyType: 'done',
  returnKeyLabel: 'done',
  clearButtonMode: 'never',
  underlineColorAndroid: 'transparent',
  autoCorrect: false,
  autoCapitalize: 'none',
})`
  height: ${moderateScale(130)};
  margin: 0px ${moderateScale(15)}px;
  padding: ${moderateScale(10)}px ${moderateScale(13)}px;
  border-width: ${moderateScale(1)}px;
  border-radius: ${moderateScale(2)}px;
  border-color: #E9E9E9;
  background-color: ${props => props.backgroundColor || '#F9F9F9'};
`;

const RemarkInput = ({
  numberOfLines = 6,
  placeholder = '请输入内容描述',
  placeholderTextColor = '#c1c1c1',
  onChangeText = null,
}) => (
  <DescriptionContent
    numberOfLines={numberOfLines}
    placeholder={placeholder}
    placeholderTextColor={placeholderTextColor}
    onChangeText={onChangeText}
  />
);

export default RemarkInput;
