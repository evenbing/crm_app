/**
 * @component Editor.js
 * @description 编辑样式
 * @time 2018/9/1
 * @author JUSTIN XU
 */
import styled from 'styled-components';
import { Textarea } from 'native-base';
import theme from '../../constants/theme';

export const TextareaGroup = styled.View`
  padding: 0 ${theme.moderateScale(15)}px;
`;

export const TextareaView = styled(Textarea)`
  margin-top: 0;
  padding: ${theme.moderateScale(10)}px ${theme.moderateScale(13)}px;
  font-size: ${theme.moderateScale(16)};
  height: ${theme.moderateScale(130)};
  background-color: ${theme.pageBackColor};
`;
