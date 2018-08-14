/**
 * @component Divider.js
 * @description 分割样式css
 * @time 2018/8/5
 * @author JUSTIN XU
 */
import styled from 'styled-components';
import theme from '../../constants/theme';

// divider styles
export const HorizontalDivider = styled.View`
  width: 100%;
  height: ${props => props.height || 10};
  background-color: ${props => props.backgroundColor || theme.pageBackColor};
`;

export const VerticalDivider = styled.View`
  width: 1px;
  height: ${props => props.height || 43};
  background-color: ${props => props.backgroundColor || theme.borderColor};
`;
