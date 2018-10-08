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
import { MarketActivityStatus } from '../../../../constants/enum';
import { formatDateByMoment, formatDateType } from '../../../../utils/base';

// static source
import PrincipalIcon from '../../../../img/crm/details/principalGo.png';

// components
import { HeaderBack } from '../../../../components/Details';
import Thumbnail from '../../../../components/Thumbnail';
import TouchableView from '../../../../components/TouchableView';

// padding: 0 ${theme.moderateScale(15)}px;
const ContainerView = styled.View``;

const PhoneView = styled(TouchableView)`
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
  margin-right: ${theme.moderateScale(15)};
`;

const PhoneText = styled.Text`
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
    } = this.props;
    return (
      <HeaderBack>
        <ContainerView>
          <PhoneView
            onPress={onPressFollow}
          >
            <Thumbnail
              source={require('../../../../img/crm/details/follow.png')}
              size={14}
            />
            <PhoneText>
              {
                item.follow ? '取消关注' : '关注'
              }
            </PhoneText>
          </PhoneView>
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
          <FooterView>
            <TimeText>活动状态：</TimeText>
            <PlanStatusText>
              {item.status ? MarketActivityStatus[item.status] : null}
            </PlanStatusText>
            {/* <Thumbnail
              source={PrincipalIcon}
              size={15}
            /> */}
          </FooterView>
        </ContainerView>
      </HeaderBack>
    );
  }
}

DetailsHead.defaultProps = {
  item: {},
  onPressChoiceTeam: () => null,
  onPressFollow: () => null,
};

DetailsHead.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  onPressChoiceTeam: PropTypes.func,
  onPressFollow: PropTypes.func,
};

export default DetailsHead;
