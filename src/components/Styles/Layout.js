/**
 * @component Layout.js
 * @description 布局相关
 * @time 2018/8/7
 * @author JUSTIN XU
 */
import styled from 'styled-components';
import theme from '../../constants/theme';

// divider styles
export const ContainerView = styled.View`
  flex: 1;
  background-color: ${props => props.backgroundColor || theme.pageBackColor};
`;
