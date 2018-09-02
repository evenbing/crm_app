/**
 * @component DetailsHead.js
 * @description 详情头部组件
 * @time 2018/9/2
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../../constants';

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

class DetailsHead extends React.PureComponent {
  render() {
    return (
      <HeaderBack>
        <ContainerView>
          <ItemView marginTop={50}>
            <NameText>20180909-0001</NameText>
          </ItemView>
          <ItemView marginTop={2}>
            <CompanyText>客户：西风网络</CompanyText>
          </ItemView>
          <ItemView
            marginTop={8}
          >
            <PersonText>负责人: 张三</PersonText>
            <Thumbnail
              source={require('../../../../img/crm/details/principalGo.png')}
              size={15}
            />
          </ItemView>
          <ItemView
            marginTop={11}
            marginBottom={56}
          >
            <CompanyText>计划回款金额：¥100,000,000.00</CompanyText>
          </ItemView>
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
