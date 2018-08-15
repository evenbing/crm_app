/**
 * @component ScanCard.js
 * @description 扫描名片组合
 * @time 2018/8/15
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../constants';

import TouchableView from '../TouchableView';

const ContainerView = styled.View`
  padding-top: ${theme.moderateScale(11)};
  padding-left: ${theme.moderateScale(15)};
  padding-right: ${theme.moderateScale(15)};
  padding-bottom: ${theme.moderateScale(17)};
  background-color: ${theme.titleBackColor};
`;

const BackImage = styled.ImageBackground`
  width: 100%;
  height: ${theme.moderateScale(184)};
  display: flex;
  border-radius: ${theme.moderateScale(8)};
  justify-content: center;
  align-items: center;
`;

const ButtonView = styled(TouchableView)`
  width: ${theme.moderateScale(280)};
  height: ${theme.moderateScale(53)};
  border: 1px solid ${theme.primaryColor};
  border-radius: ${theme.moderateScale(8)};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const ButtonText = styled.Text`
  font-size: ${theme.moderateScale(16)};
  color: ${theme.primaryColor};
`;

class ScanCard extends React.PureComponent {
  render() {
    const {
      onPress,
    } = this.props;
    return (
      <ContainerView>
        <BackImage
          source={require('../../img/crm/create/cardBack.png')}
        >
          <ButtonView onPress={onPress}>
            <ButtonText>扫描名片</ButtonText>
          </ButtonView>
        </BackImage>
      </ContainerView>
    );
  }
}

ScanCard.defaultProps = {
  onPress: () => null,
};

ScanCard.propTypes = {
  onPress: PropTypes.func,
};

export default ScanCard;
