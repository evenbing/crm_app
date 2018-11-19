/**
 * @component NavItem.js
 * @description navItem
 * @time 2018/6/24
 * @author zhao
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image } from 'react-native';

// constants
import { theme } from 'constants';

// utils
import { moderateScale } from 'utils/scale';

// components
import TouchableView from '../TouchableView';

const ContainerView = styled(TouchableView)`
  width: 100%;
  height: ${props => moderateScale(props.height || 60)};
  padding: 0 ${moderateScale(15)}px;
`;

const BorderView = styled.View`
  flex: 1;
  height: 100%;
  borderTopWidth: 1px;
  borderTopColor: #F6F6F6;
  borderBottomWidth: ${props => (props.isLast ? '1px' : 0)};
  borderBottomColor: #F6F6F6;
  flexDirection: row;
  alignItems: center;
  justifyContent: space-between;
`;

const LeftView = styled.View`
  flex: 1;
  height: 100%;
  flexDirection: row;
  alignItems: center;
`;

const IconView = styled.View`
  width: ${moderateScale(24)};
  height: ${moderateScale(24)};
  alignItems: center;
  justifyContent: center;
  margin-right: ${moderateScale(14)};
`;

const TitleText = styled.Text`
  font-family: ${theme.fontRegular};
  font-size: ${moderateScale(16)};
  color: #373737;
  background-color: transparent;
`;

const RightView = styled.View`
  height: 100%;
  flex: 2;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
`;

const RightText = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  font-family: ${theme.fontRegular};
  font-size: ${moderateScale(16)};
  color: #373737;
  background-color: transparent;
  margin-right: ${moderateScale(5)};
`;

const NavIcon = styled.Image`
  width: ${moderateScale(6)};
  height: ${moderateScale(11)};
`;

class NavItem extends React.PureComponent {
  renderRight = () => {
    const {
      right,
      rightText,
      rightTextStyle,
      showNavIcon,
      rightSuffix,
    } = this.props;
    if (React.isValidElement(right)) return right;
    return (
      <RightView>
        <RightText
          style={rightTextStyle}
        >
          {rightText}
        </RightText>
        { showNavIcon ? <NavIcon source={require('../../img/nav.png')} resizeMode="contain" /> : null }
        { rightSuffix }
      </RightView>
    );
  };
  render() {
    const {
      leftText,
      leftTextStyle,
      icon,
      onPress,
      isLast,
      height,
    } = this.props;
    return (
      <ContainerView onPress={onPress} height={height}>
        <BorderView isLast={isLast}>
          <LeftView>
            { icon ? <IconView><Image source={icon} /></IconView> : null }
            <TitleText style={leftTextStyle}>{leftText}</TitleText>
          </LeftView>
          {this.renderRight()}
        </BorderView>
      </ContainerView>
    );
  }
}

NavItem.defaultProps = {
  leftTextStyle: {},
  icon: null,
  rightText: null,
  rightTextStyle: {},
  isLast: false,
  height: 60,
  onPress: () => null,
  showNavIcon: true,
  rightSuffix: null,
  right: null,
};

NavItem.propTypes = {
  leftText: PropTypes.string.isRequired,
  leftTextStyle: PropTypes.objectOf(PropTypes.any),
  icon: PropTypes.number,
  rightText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  rightTextStyle: PropTypes.objectOf(PropTypes.any),
  isLast: PropTypes.bool,
  height: PropTypes.number,
  onPress: PropTypes.func,
  showNavIcon: PropTypes.bool,
  rightSuffix: PropTypes.node,
  right: PropTypes.element,
};

export default NavItem;
