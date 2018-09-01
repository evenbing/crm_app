/**
 * @component Styles.js
 * @description 抽屉通用样式组件
 * @time 2018/9/1
 * @author JUSTIN XU
 */
import styled from 'styled-components';
import { theme } from '../../constants';

export const ContainerView = styled.View`
  background-color: ${theme.whiteColor};
  flex: 1;
  justify-content: space-between;
`;

export const HeaderView = styled.ScrollView``;

export const TopTitleText = styled.Text`
  font-size: ${theme.moderateScale(18)};
  margin-top: ${theme.moderateScale(15)};
  color: #373737;
  padding: 0 ${theme.moderateScale(10)}px;
`;

export const HeaderTitleText = styled.Text`
  margin-top: ${props => theme.moderateScale(props.marginTop || 17)};
  font-family: ${theme.fontRegular};
  font-size: ${theme.moderateScale(16)};
  color: #7B7B7B;
  padding: 0 ${theme.moderateScale(10)}px;
`;

export const HeaderLabelView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
