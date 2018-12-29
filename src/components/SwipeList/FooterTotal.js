/**
 * @component FooterTotal.js
 * @description 底部统计
 * @time 2018/9/4
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DevicesUtil, TouchableView } from 'xn-react-native-applets';

// constants
import { theme } from 'constants';

const { getFooterBottom } = DevicesUtil;

const ContainerView = styled(TouchableView)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${theme.moderateScale(49 + getFooterBottom())};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${theme.whiteColor};
  border: 1px solid ${theme.borderColor};
  padding-bottom: ${getFooterBottom()};
`;

const FooterText = styled.Text`
  color: ${theme.primaryColor};
  font-size: ${theme.moderateScale(18)};
  font-family: ${theme.fontMedium};
`;

class FooterTotal extends React.PureComponent {
  render() {
    const {
      onPress,
    } = this.props;
    return (
      <ContainerView onPress={onPress}>
        <FooterText>数据合计</FooterText>
      </ContainerView>
    );
  }
}

FooterTotal.defaultProps = {
  onPress: () => null,
};

FooterTotal.propTypes = {
  onPress: PropTypes.func,
};

export default FooterTotal;
