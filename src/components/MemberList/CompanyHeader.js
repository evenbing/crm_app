/**
 * @component CompanyHeader.js
 * @description 公司头部
 * @time 2018/8/26
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableView, Thumbnail } from 'xn-react-native-applets';

// constants
import { theme } from 'constants';

const ContainerView = styled(TouchableView)`
  height: ${theme.moderateScale(44)};
  background: ${theme.whiteColor};
  padding: 0 ${theme.moderateScale(15)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LeftView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LeftText = styled.Text`
  font-family: ${theme.fontMedium};
  font-size: ${theme.moderateScale(16)};
  color: ${theme.primaryColor};
`;

const RightView = styled.View``;

const NewMember = ({
  title,
  onPress,
}) => (
  <ContainerView onPress={onPress}>
    <LeftView>
      <LeftText>{title}</LeftText>
    </LeftView>
    <RightView>
      <Thumbnail
        size={18}
        source={require('../../img/team/go.png')}
      />
    </RightView>
  </ContainerView>
);

NewMember.defaultProps = {
  onPress: () => null,
};


NewMember.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

export default NewMember;
