/**
 * @component SalesFunnel.js
 * @description 销售漏斗组件
 * @time 2018/8/12
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../../constants/index';

const ContainerView = styled.View`
  padding-left: ${theme.moderateScale(15)};
  padding-right: ${theme.moderateScale(15)};
`;

const FunnelView = styled.View`
  align-items: center;
  padding-bottom: ${theme.moderateScale(12)};
`;

const FunnelItem = styled.View`
  background-color: ${props => props.backgroundColor || '#7ADFD6'};
  width: ${props => theme.moderateScale(props.width || 300)};
  height: ${theme.moderateScale(22)};
  border-radius: ${theme.moderateScale(4)};
  margin-bottom: ${props => theme.moderateScale(props.marginBottom || 6)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const FunnelText = styled.Text`
  color: ${theme.whiteColor};
  font-family: ${theme.fontRegular};
`;

const ItemView = styled.View`
  height: ${theme.moderateScale(44)};
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: ${props => props.border ? '1px' : 0};
  border-bottom-color: ${props => props.border ? theme.borderColor : 'transparent'};
`;

const ItemLeftText = styled.Text`
  color: #494949;
  font-family: ${theme.fontMedium};
  font-size: ${theme.moderateScale(16)};
`;

const ItemRightText = styled.Text`
  font-family: ${theme.fontMedium};
  color: #999999;
`;

const BGColorList = ['#7ADFD6', '#7AD0DF', '#72B3E0', '#7291E0', '#5374C7'];

class SalesFunnel extends React.PureComponent {
  renderFunnelItem = ({ width, backgroundColor, text } = {}) => (
    <FunnelItem
      width={width}
      key={text}
      backgroundColor={backgroundColor}
    >
      <FunnelText>{text}</FunnelText>
    </FunnelItem>
  );
  renderNavItem = (title, text, border) => (
    <ItemView border={border}>
      <ItemLeftText>{title}</ItemLeftText>
      <ItemRightText>{text}</ItemRightText>
    </ItemView>
  );
  render() {
    const { list } = this.props;
    return (
      <ContainerView>
        <FunnelView>
          {
            list.map((_, i) => this.renderFunnelItem({
              width: 300 - (i * 40),
              backgroundColor: BGColorList[i],
              text: `${_.salesPhaseName}:${_.sumPlanAmount}/${_.salesPhaseCount}个`,
            }))
          }
        </FunnelView>
        {/* {this.renderNavItem('漏斗总值', `${salesSumMap.completedSalesSum}元／${salesSumMap.funnelSalesSum}个'`, 1)} */}
        {/* {this.renderNavItem('预计完成', `${salesSumMap.expectSalesSum}元`, 0)} */}
      </ContainerView>
    );
  }
}

SalesFunnel.defaultProps = {
  list: [],
};

SalesFunnel.propTypes = {
  list: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default SalesFunnel;
