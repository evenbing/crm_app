/**
 * @component DetailsHead.js
 * @description 详情头部组件
 * @time 2018/8/14
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../../constants';

// static source
import PrincipalIcon from '../../../../img/crm/details/principalGo.png';

// components
import { HeaderBack } from '../../../../components/Details';
import Thumbnail from '../../../../components/Thumbnail';

// padding: 0 ${theme.moderateScale(15)}px;
const ContainerView = styled.View``;

const ItemView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  margin-top: ${props => theme.moderateScale(props.marginTop || 0)};
  margin-bottom: ${props => theme.moderateScale(props.marginBottom || 0)};
`;

const NameText = styled.Text`
  font-size: ${theme.moderateScale(20)};
  color: ${theme.whiteColor};
`;

const CompanyText = NameText.extend`
  margin-top: ${theme.moderateScale(4)};
  font-size: ${theme.moderateScale(14)};
`;

const TimeText = NameText.extend`
  font-size: ${theme.moderateScale(14)};
  margin-left: ${props => props.marginLeft || 0};
`;

const PersonText = NameText.extend`
  font-size: ${theme.moderateScale(18)};
  margin-right: ${theme.moderateScale(5)};
`;

const FooterView = styled.View`
  height: ${theme.moderateScale(36)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .15);
`;

const PlanStatusText = styled.Text`
  color: #e2c244;
  margin-right: ${theme.moderateScale(2)};
`;

class DetailsHead extends React.PureComponent {
  render() {
    return (
      <HeaderBack>
        <ContainerView>
          <ItemView
            marginTop={51}
          >
            <NameText>5.1门店开业活动</NameText>
          </ItemView>
          <ItemView marginTop={2}>
            <CompanyText>西风网络</CompanyText>
          </ItemView>
          <ItemView
            marginTop={9}
          >
            <PersonText>负责人: 张三</PersonText>
            <Thumbnail
              source={PrincipalIcon}
              size={15}
            />
          </ItemView>
          <ItemView
            marginTop={11}
            marginBottom={20}
          >
            <TimeText>销售金额：¥100,000,000.00</TimeText>
            <TimeText marginLeft={13}>结单日期：2018-09-09</TimeText>
          </ItemView>
          <FooterView>
            <TimeText>活动状态：</TimeText>
            <PlanStatusText>已计划</PlanStatusText>
            <Thumbnail
              source={PrincipalIcon}
              size={15}
            />
          </FooterView>
        </ContainerView>
      </HeaderBack>
    );
  }
}

DetailsHead.defaultProps = {
  item: {},
};

DetailsHead.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
};

export default DetailsHead;
