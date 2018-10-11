/**
 * @component FooterGroup.js
 * @description 底部组件
 * @time 2018/8/31
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../constants';
import { getFooterBottom } from '../../utils/utils';

// components
import TouchableView from '../TouchableView';

const ContainerView = styled.View`
  height: ${theme.moderateScale(49 + getFooterBottom())};
  background-color: #F7F7F7;
  padding: 0 ${theme.moderateScale(15)}px;
  padding-bottom: ${getFooterBottom()};
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const FooterButtonView = styled(TouchableView)`
  width: ${theme.moderateScale(72)}px;
  background-color:  ${props => props.active ? theme.primaryColor : '#ffffff'};
  border-width: 1px;
  border-color: ${theme.primaryColor};
  border-radius: ${theme.moderateScale(4)}px;
  height: ${theme.moderateScale(30)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-right: ${props => props.marginRight || 0};
`;

const FooterButtonText = styled.Text`
  color: ${props => props.active ? '#ffffff' : theme.primaryColor};
  font-family: ${theme.fontRegular};
  font-size: ${theme.moderateScale(13)}px;
`;

class FooterGroup extends React.PureComponent {
  render() {
    const {
      onReset,
      onSubmit,
    } = this.props;
    return (
      <ContainerView>
        <FooterButtonView
          onPress={onReset}
          marginRight={20}
        >
          <FooterButtonText>重置</FooterButtonText>
        </FooterButtonView>
        <FooterButtonView
          onPress={onSubmit}
          active
        >
          <FooterButtonText active>确定</FooterButtonText>
        </FooterButtonView>
      </ContainerView>
    );
  }
}

FooterGroup.defaultProps = {
  onReset: () => null,
  onSubmit: () => null,
};

FooterGroup.propTypes = {
  onReset: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default FooterGroup;
