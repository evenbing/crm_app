
/**
 * @component NavItem.jsm.js
 * @description navItem
 * @time 2018/6/24
 * @author zhao
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, Text, Image } from 'react-native';
import theme from '../../constants/theme';
import { moderateScale } from '../../utils/scale';
import TouchableView from '../TouchableView'

const ContainerView = styled(TouchableView)`
width: 100%;
height: 60px;
padding: 0 15px;
`;

const BorderView = styled(View)`
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

const LeftView = styled(View)`
flex: 1;
height: 100%;
flexDirection: row;
alignItems: center;
`;

const IconView = styled(View)`
width: 24px;
height: 24px;
alignItems: center;
justifyContent: center;
`;

const TitleText = styled(Text)`
font-family: ${theme.fontRegular};
font-size: 16px;
color: #373737;
marginLeft: 14px;
background-color: transparent;
`;

const RightView = styled(View)`
height: 100%;
alignItems: center;
justifyContent: center;
flexDirection: row;
`;

const RightText = styled(Text)`
font-family: ${theme.fontRegular};
font-size: 16px;
color: #373737;
background-color: transparent;
margin-right: 5px;
`

const NavIcon = styled.Image`
  width: 6px;
  height: 11px;
`;

class NavItem extends React.PureComponent {
  render() {
    const {
      leftText,
      leftTextStyle,
      icon,
      rightText,
      rightTextStyle,
      onPress,
      isLast,
      height,
      showNavIcon,
    } = this.props;
    return (
      <ContainerView onPress={onPress} style={{height}}>
        <BorderView isLast={isLast}>
          <LeftView>
            { icon ? <IconView><Image source={icon} /></IconView> : null }
            <TitleText style={leftTextStyle}>{leftText}</TitleText>
          </LeftView>
          <RightView>
            <RightText style={rightTextStyle}>{rightText}</RightText>
            { showNavIcon ? <NavIcon source={require('../../img/nav.png')} resizeMode="contain" /> : null }
          </RightView>
        </BorderView>
      </ContainerView>
    );
  }
}

NavItem.defaultProps = {
  leftText: "",
  leftTextStyle: {},
  icon: "",
  rightText: "",
  rightTextStyle: {},
  isLast: false,
  height: 60,
  onPress: () => null,
  showNavIcon: true
};

NavItem.propTypes = {
  leftText: PropTypes.string.isRequired,
  leftTextStyle: PropTypes.object,
  icon: PropTypes.any,
  rightText: PropTypes.string.isRequired,
  rightTextStyle: PropTypes.object,
  isLast: PropTypes.bool,
  height: PropTypes.number,
  onPress: PropTypes.func,
  showNavIcon: PropTypes.bool
};

export default NavItem;
