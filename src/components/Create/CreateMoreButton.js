/**
 * @component CreateMoreButton.js
 * @description 创建更多按钮组件
 * @time 2018/8/15
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableView, Thumbnail } from 'xn-react-native-applets';

import { theme } from '../../constants';

const ContainerView = styled.View`
  height: ${theme.moderateScale(49)};
  padding: 0 ${theme.moderateScale(15)}px;
`;

const FooterButtonView = styled(TouchableView)`
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid ${theme.primaryColor};
  border-radius: ${theme.moderateScale(4)};
  background-color: ${theme.whiteColor};
`;

const FooterText = styled.Text`
  margin-left: ${theme.moderateScale(10)};
  font-size: ${theme.moderateScale(16)};
  color: ${theme.primaryColor};
`;

class CreateMoreButton extends React.PureComponent {
  render() {
    const {
      onPress,
    } = this.props;
    return (
      <ContainerView>
        <FooterButtonView
          onPress={onPress}
        >
          <Thumbnail
            source={require('../../img/crm/create/add.png')}
            size={20}
          />
          <FooterText>添加更多信息</FooterText>
        </FooterButtonView>
      </ContainerView>
    );
  }
}

CreateMoreButton.defaultProps = {
  onPress: () => null,
};

CreateMoreButton.propTypes = {
  onPress: PropTypes.func,
};

export default CreateMoreButton;
