
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

const ContainerView = styled(View)`
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
width: 8px;
height: 100%;
alignItems: center;
justifyContent: center;
`;

const NavIcon = styled.Image`
  width: 6px;
  height: 11px;
`;

class NavItem extends React.PureComponent {
  render() {
    const { data, onPress, isLast } = this.props;
    return (
      <ContainerView onPress={onPress}>
        <BorderView isLast={isLast}>
          <LeftView>
            <IconView>
              <Image source={data.icon} />
            </IconView>
            <TitleText>{data.title}</TitleText>
          </LeftView>
          <RightView>
            <NavIcon
              source={require('../../img/nav.png')}
              resizeMode="contain"
            />
          </RightView>
        </BorderView>
      </ContainerView>
    );
  }
}

NavItem.defaultProps = {
  data: {},
  isLast: false,
  onPress: () => null,
};

NavItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  isLast: PropTypes.bool,
  onPress: PropTypes.func,
};

export default NavItem;
