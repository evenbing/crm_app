/**
 * @component DetailsHead.js
 * @description 详情头部组件
 * @time 2018/8/12
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableView, Thumbnail } from 'xn-react-native-applets';

import { theme } from 'constants';

// components
import { HeaderBack } from 'components/Details';

const ContainerView = styled.View`
  padding: 0 ${theme.moderateScale(15)}px;
`;

const PhoneView = styled(TouchableView)`
  width: ${theme.moderateScale(82)};
  height: ${theme.moderateScale(22)};
  margin-top: ${theme.moderateScale(20)};
  border: 1px solid ${theme.whiteColor};
  border-radius: ${theme.moderateScale(4)};
  background-color: transparent;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  align-self: flex-end;
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

const CompanyText = NameText.extend`
  font-size: ${theme.moderateScale(14)};
`;

const PersonText = NameText.extend`
  font-size: ${theme.moderateScale(18)};
  margin-right: ${theme.moderateScale(5)};
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
      onPressPhone,
      onPressChoiceTeam,
    } = this.props;
    return (
      <HeaderBack>
        <ContainerView>
          <PhoneView
            onPress={onPressPhone}
          >
            <Thumbnail
              source={require('../../../../img/crm/details/phone.png')}
              size={14}
            />
            <PhoneText>电话联系</PhoneText>
          </PhoneView>
          <ItemView>
            <NameText>{item.name}</NameText>
          </ItemView>
          <ItemView marginTop={2}>
            <CompanyText>{item.companyName}</CompanyText>
          </ItemView>
          <OwnerUserNameView
            marginTop={12}
            marginBottom={41}
            onPress={onPressChoiceTeam}
          >
            <PersonText>负责人: {item.ownerUserName || '--'}</PersonText>
            <Thumbnail
              source={require('../../../../img/crm/details/principalGo.png')}
              size={15}
            />
          </OwnerUserNameView>
        </ContainerView>
      </HeaderBack>
    );
  }
}

DetailsHead.defaultProps = {
  item: {},
  onPressPhone: () => null,
  onPressChoiceTeam: () => null,
};

DetailsHead.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  onPressPhone: () => null,
  onPressChoiceTeam: PropTypes.func,
};

export default DetailsHead;
