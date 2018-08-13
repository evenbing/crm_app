
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
import TextInput from '../TextInput'

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
width: ${moderateScale(80)};
font-family: ${theme.fontRegular};
font-size: 16px;
color: #373737;
background-color: transparent;
`;

const RightView = styled(View)`
flex: 1;
height: 100%;
alignItems: center;
justifyContent: center;
flexDirection: row;
`;

class NavInputItem extends React.PureComponent {
  render() {
    const {
      leftText,
      leftTextStyle,
      onPress,
      isLast,
      height,
      inputProps,
    } = this.props;
    return (
      <ContainerView onPress={onPress} style={{height}}>
        <BorderView isLast={isLast}>
          <LeftView>
            <TitleText style={leftTextStyle}>{leftText}</TitleText>
          </LeftView>
          <RightView>
            <TextInput {...inputProps} />
          </RightView>
        </BorderView>
      </ContainerView>
    );
  }
}

NavInputItem.defaultProps = {
  leftText: "",
  leftTextStyle: {},
  isLast: false,
  height: 60,
  onPress: () => null,
  inputProps: {}
};

NavInputItem.propTypes = {
  leftText: PropTypes.string.isRequired,
  leftTextStyle: PropTypes.object,
  isLast: PropTypes.bool,
  height: PropTypes.number,
  onPress: PropTypes.func,
  inputProps: PropTypes.object
};

export default NavInputItem;
