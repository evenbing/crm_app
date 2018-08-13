
/**
 * @component NavItem.jsm.js
 * @description navItem
 * @time 2018/6/24
 * @author zhao
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, Text } from 'react-native';
import theme from '../../constants/theme';
import { moderateScale } from '../../utils/scale';
import TouchableView from '../TouchableView';
import TextInput from '../TextInput';

const ContainerView = styled(TouchableView)`
  width: 100%;
  height: ${props => moderateScale(props.height || 60)};
  padding-left: ${moderateScale(15)};
  padding-right: ${moderateScale(15)};
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
  height: 100%;
  flexDirection: row;
  alignItems: center;
`;

const TitleText = styled(Text)`
  width: ${props => moderateScale(props.width || 80)};
  font-family: ${theme.fontRegular};
  font-size: ${theme.moderateScale(16)};
  color: #373737;
  background-color: transparent;
`;

const RightView = styled(View)`
  flex: 1;
  height: 100%;
  alignItems: center;
  flexDirection: row;
`;

const NavIcon = styled.Image`
  width: ${moderateScale(6)};
  height: ${moderateScale(11)};
`;

class NavInputItem extends React.PureComponent {
  render() {
    const {
      leftText,
      leftTextStyle,
      leftWidth,
      onPress,
      isLast,
      showNavIcon,
      height,
      right,
      inputProps,
    } = this.props;
    return (
      <ContainerView onPress={onPress} style={{ height }}>
        <BorderView isLast={isLast}>
          <LeftView>
            <TitleText
              style={leftTextStyle}
              width={leftWidth}
            >
              {leftText}
            </TitleText>
          </LeftView>
          <RightView>
            {
              React.isValidElement(right) ? right : (
                <TextInput {...inputProps} />
              )
            }
          </RightView>
          { showNavIcon ? <NavIcon source={require('../../img/nav.png')} resizeMode="contain" /> : null }
        </BorderView>
      </ContainerView>
    );
  }
}

NavInputItem.defaultProps = {
  leftTextStyle: {},
  leftWidth: 0,
  isLast: false,
  height: 60,
  onPress: () => null,
  inputProps: {},
  right: null,
  showNavIcon: false,
};

NavInputItem.propTypes = {
  leftText: PropTypes.string.isRequired,
  leftWidth: PropTypes.number,
  leftTextStyle: PropTypes.objectOf(PropTypes.any),
  isLast: PropTypes.bool,
  height: PropTypes.number,
  right: PropTypes.element,
  onPress: PropTypes.func,
  inputProps: PropTypes.objectOf(PropTypes.any),
  showNavIcon: PropTypes.bool,
};

export default NavInputItem;
