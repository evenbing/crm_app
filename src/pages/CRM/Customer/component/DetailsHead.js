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

// components
import { HeaderBack } from '../../../../components/Details';
import { VerticalDivider } from '../../../../components/Styles/Divider';
import Thumbnail from '../../../../components/Thumbnail';

const ContainerView = styled.View``;

const FollowView = styled.View`
  width: ${theme.moderateScale(54)};
  height: ${theme.moderateScale(22)};
  margin-top: ${theme.moderateScale(15)};
  border: 1px solid ${theme.whiteColor};
  border-radius: ${theme.moderateScale(4)};
  background-color: transparent;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  align-self: flex-end;
  margin-right: ${theme.moderateScale(16)};
`;

const FollowText = styled.Text`
  margin-left: ${theme.moderateScale(4)};
  color: ${theme.whiteColor};
`;

const ItemView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  margin-top: ${props => theme.moderateScale(props.marginTop || 0)};
  margin-bottom: ${props => theme.moderateScale(props.marginBottom || 0)};
  position: relative;
`;

const DecorationView = styled.View`
  position: absolute;
  width: 100%;
  height: 1px;
  left: 0;
  bottom: ${theme.moderateScale(-4)};
  background-color: ${theme.whiteColor};
`;

const NameText = styled.Text`
  font-size: ${theme.moderateScale(20)};
  color: ${theme.whiteColor};
`;

const PersonText = NameText.extend`
  font-size: ${theme.moderateScale(18)};
  margin-right: ${theme.moderateScale(5)};
`;

const FooterView = styled.View`
  height: ${theme.moderateScale(55)};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, .15);
`;

const FooterItemView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const VerticalStyle = {
  width: 3,
  height: 28,
  backgroundColor: theme.whiteColor,
};

class DetailsHead extends React.PureComponent {
  render() {
    return (
      <HeaderBack>
        <ContainerView>
          <FollowView>
            <Thumbnail
              source={require('../../../../img/crm/details/follow.png')}
              size={14}
            />
            <FollowText>关注</FollowText>
          </FollowView>
          <ItemView
            marginTop={10}
          >
            <ItemView>
              <NameText>网络技术研讨会</NameText>
              <DecorationView />
            </ItemView>
          </ItemView>
          <ItemView
            marginTop={23}
            marginBottom={42}
          >
            <PersonText>负责人: 张三</PersonText>
            <Thumbnail
              source={require('../../../../img/crm/details/principalGo.png')}
              size={15}
            />
          </ItemView>
          <FooterView>
            <FooterItemView>
              <Thumbnail
                source={require('../../../../img/crm/details/phone.png')}
                size={22}
              />
            </FooterItemView>
            <VerticalDivider {...VerticalStyle} />
            <FooterItemView>
              <Thumbnail
                source={require('../../../../img/crm/details/phone.png')}
                size={22}
              />
            </FooterItemView>
            <VerticalDivider {...VerticalStyle} />
            <FooterItemView>
              <Thumbnail
                source={require('../../../../img/crm/details/phone.png')}
                size={22}
              />
            </FooterItemView>
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
