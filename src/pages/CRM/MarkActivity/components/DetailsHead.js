/**
 * @component DetailsHead.js
 * @description 市场活动详情头部组件
 * @time 2018/8/14
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableView, Thumbnail } from 'xn-react-native-applets';

// static source
import PrincipalIcon from 'img/crm/details/principalGo.png';

// constants
import { theme } from 'constants';
import { MarketActivityStatus } from 'constants/enum';

// utils
import { formatDateByMoment, formatDateType } from 'utils/base';

// components
import { HeaderBack } from 'components/Details';
import { FormActionSheet } from 'components/Modal';

const ContainerView = styled.View``;

const FollowView = styled(TouchableView)`
  min-width: ${theme.moderateScale(54)};
  padding: 0 ${theme.moderateScale(3)}px;
  height: ${theme.moderateScale(22)};
  margin-top: ${theme.moderateScale(15)};
  border: 1px solid ${theme.whiteColor};
  border-radius: ${theme.moderateScale(4)};
  background-color: transparent;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  align-self: flex-end;
  margin-right: ${theme.moderateScale(15)};
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
`;

const NameText = styled.Text`
  font-size: ${theme.moderateScale(20)};
  color: ${theme.whiteColor};
`;

const TimeText = NameText.extend`
  font-size: ${theme.moderateScale(14)};
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

const OwnerUserNameView = styled(TouchableView)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  margin-top: ${props => theme.moderateScale(props.marginTop || 0)};
  margin-bottom: ${props => theme.moderateScale(props.marginBottom || 0)};
`;

class DetailsHead extends React.PureComponent {
  render() {
    const {
      item,
      onPressFollow,
      onPressChoiceTeam,
      onPressStatus,
    } = this.props;
    return (
      <HeaderBack>
        <ContainerView>
          <FollowView
            onPress={onPressFollow}
          >
            <Thumbnail
              source={require('../../../../img/crm/details/follow.png')}
              size={14}
            />
            <FollowText>
              {
                item.follow ? '取消关注' : '关注'
              }
            </FollowText>
          </FollowView>
          <ItemView
            marginTop={10}
          >
            <NameText>{item.name}</NameText>
          </ItemView>
          {/*
          <ItemView marginTop={2}>
            <CompanyText>西风网络</CompanyText>
          </ItemView>
          */}
          <OwnerUserNameView
            marginTop={23}
            onPress={onPressChoiceTeam}
          >
            <PersonText>负责人: {item.ownerUserName}</PersonText>
            <Thumbnail
              source={PrincipalIcon}
              size={15}
            />
          </OwnerUserNameView>
          <ItemView
            marginTop={7}
            marginBottom={34}
          >
            <TimeText>
              { formatDateByMoment(item.beginDate, formatDateType) }
                至
              { formatDateByMoment(item.endDate, formatDateType) }
            </TimeText>
          </ItemView>
          <FormActionSheet
            onConfirm={onPressStatus}
            typeEnum={MarketActivityStatus}
          >
            <FooterView>
              <TimeText>活动状态：</TimeText>
              <PlanStatusText>
                {MarketActivityStatus[item.status] || '--'}
              </PlanStatusText>
              <Thumbnail
                source={PrincipalIcon}
                size={15}
              />
            </FooterView>
          </FormActionSheet>
        </ContainerView>
      </HeaderBack>
    );
  }
}

DetailsHead.defaultProps = {
  item: {},
  onPressFollow: () => null,
  onPressChoiceTeam: () => null,
  onPressStatus: () => null,
};

DetailsHead.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  onPressFollow: PropTypes.func,
  onPressChoiceTeam: PropTypes.func,
  onPressStatus: PropTypes.func,
};

export default DetailsHead;
