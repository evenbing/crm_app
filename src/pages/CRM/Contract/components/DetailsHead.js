/**
 * @component DetailsHead.js
 * @description 详情头部组件
 * @time 2018/8/12
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

const ContainerView = styled.View`
  padding: 0 ${theme.moderateScale(15)}px;
`;

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
  font-size: ${theme.moderateScale(14)};
`;

const PersonText = NameText.extend`
  font-size: ${theme.moderateScale(18)};
  margin-right: ${theme.moderateScale(5)};
`;

const MoneyText = NameText.extend`
  font-size: ${theme.moderateScale(14)};
  margin-left: ${props => theme.moderateScale(props.marginLeft || 0)};
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
    const { item } = this.props;
    return (
      <HeaderBack>
        <ContainerView>
          <ItemView marginTop={51}>
            <NameText>{item.theme}</NameText>
          </ItemView>
          <ItemView marginTop={4}>
            <CompanyText>客户：{item.customerName}</CompanyText>
          </ItemView>
          <ItemView
            marginTop={9}
          >
            <PersonText>负责人: {item.ownerName}</PersonText>
            <Thumbnail
              source={PrincipalIcon}
              size={15}
            />
          </ItemView>
          <ItemView
            marginTop={11}
            marginBottom={20}
          >
            <MoneyText>总金额：¥{item.totalMoney}</MoneyText>
            {/* <MoneyText marginLeft={13}>未回款：¥100,000,000.00</MoneyText> */}
          </ItemView>
        </ContainerView>
        <FooterView>
          <MoneyText>活动状态：</MoneyText>
          <PlanStatusText>{item.status}</PlanStatusText>
          <Thumbnail
            source={PrincipalIcon}
            size={15}
          />
        </FooterView>
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
