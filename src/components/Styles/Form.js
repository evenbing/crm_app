/**
 * @component Form.js
 * @description 表单样式
 * @time 2018/9/14
 * @author JUSTIN XU
 */
import styled from 'styled-components';
import theme from '../../constants/theme';
import { moderateScale } from '../../utils/scale';

export const ListView = styled.View`
  background: ${theme.whiteColor};
`;

export const CenterText = styled.Text`
  font-size: ${moderateScale(16)};
  color: ${props => props.active ? theme.textColor : '#AEAEAE'};
  font-family: ${theme.fontRegular};
`;

export const RightText = CenterText.extend`
  color: ${theme.textColor};
`;
