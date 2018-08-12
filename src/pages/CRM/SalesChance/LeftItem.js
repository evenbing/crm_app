/**
 * @component LeftItem.js
 * @description 左边条目组件
 * @time 2018/8/11
 * @author JUSTIN XU
 */
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../constants';

const ContainerView = styled.View`
  flex: 1;
`;

const TitleView = styled.View`
  margin-bottom: ${theme.moderateScale(5)};
  flex-direction: row;
  align-items: center;
`;

const TitleText = styled.Text`
  font-size: ${theme.moderateScale(16)};
  font-family: ${theme.fontMedium};
  color: ${theme.listTitleColor};
`;

const TitleIcon = styled.Text`
  margin-left: ${theme.moderateScale(15)};
  padding: ${theme.moderateScale(2)}px ${theme.moderateScale(6)}px;
  color: ${theme.primaryColor};
  border: 1px solid ${theme.primaryColor};
  border-radius: ${theme.moderateScale(4)};
`;

const TipText = styled.Text`
  color: ${props => props.color || theme.textGrayColor};
`;

const DetailsView = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

class LeftItem extends React.PureComponent {
  render() {
    return (
      <ContainerView>
        <TitleView>
          <TitleText>5.1门店开业</TitleText>
          <TitleIcon>方案报价</TitleIcon>
        </TitleView>
        <TipText color={theme.listTipColor}>西风网络</TipText>
        <DetailsView>
          <TipText>销售金额：¥ 20,000,000.00</TipText>
          <TipText>结单日期：2018-09-09</TipText>
        </DetailsView>
      </ContainerView>
    );
  }
}

LeftItem.defaultProps = {};

LeftItem.propTypes = {};

export default LeftItem;
