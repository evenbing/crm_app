/**
 * @component index.js
 * @description navItem
 * @time 2018/6/24
 * @author zhao
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../constants/theme';
import { moderateScale } from '../../utils/scale';
import TouchableView from '../TouchableView';
import TextInput from '../TextInput';

const ContainerTouchableView = styled(TouchableView)`
  width: 100%;
  height: ${props => moderateScale(props.height || 60)};
  padding-left: ${moderateScale(15)};
  padding-right: ${moderateScale(15)};
`;

const ContainerView = styled.View`
  width: 100%;
  height: ${props => moderateScale(props.height || 60)};
  padding-left: ${moderateScale(15)};
  padding-right: ${moderateScale(15)};
`;

const BorderView = styled.View`
  flex: 1;
  height: 100%;
  border-top-width: 1px;
  border-top-color: #F6F6F6;
  border-bottom-width: ${props => (props.isLast ? '1px' : 0)};
  border-bottom-color: #F6F6F6;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LeftView = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
`;

const TitleText = styled.Text`
  width: ${props => moderateScale(props.width || 80)};
  font-family: ${theme.fontRegular};
  font-size: ${theme.moderateScale(16)};
  color: #373737;
  background-color: transparent;
`;

const CenterView = styled.View`
  flex: 1;
  height: 100%;
  align-items: center;
  flex-direction: row;
`;

const RightView = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
`;

const NavIcon = styled.Image`
  width: ${moderateScale(6)};
  height: ${moderateScale(11)};
`;

class NavInputItem extends React.PureComponent {
  renderCenter = () => {
    const {
      center,
      showInput,
      inputProps,
    } = this.props;
    if (React.isValidElement(center)) return center;
    if (showInput) {
      return (
        <TextInput {...inputProps} />
      );
    }
    return null;
  };
  renderRight = () => {
    const {
      right,
      showNavIcon,
    } = this.props;
    if (React.isValidElement(right)) return right;
    if (showNavIcon) {
      return (
        <NavIcon source={require('../../img/nav.png')} resizeMode="contain" />
      );
    }
    return null;
  };
  renderSection = () => {
    const {
      leftText,
      leftTextStyle,
      leftWidth,
      isLast,
    } = this.props;
    return (
      <BorderView isLast={isLast}>
        <LeftView>
          <TitleText
            style={leftTextStyle}
            width={leftWidth}
          >
            {leftText}
          </TitleText>
        </LeftView>
        <CenterView>
          {this.renderCenter()}
        </CenterView>
        <RightView>
          {this.renderRight()}
        </RightView>
      </BorderView>
    );
  };
  render() {
    const {
      onPress,
      height,
      needPress,
    } = this.props;
    if (needPress) {
      return (
        <ContainerTouchableView onPress={onPress} style={{ height }}>
          {this.renderSection()}
        </ContainerTouchableView>
      );
    }
    // 处理当前组件在父组件有事件不能触发
    return (
      <ContainerView style={{ height }}>
        {this.renderSection()}
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
  center: null,
  right: null,
  showInput: true,
  showNavIcon: false,
  needPress: true,
};

NavInputItem.propTypes = {
  leftText: PropTypes.string.isRequired,
  leftWidth: PropTypes.number,
  leftTextStyle: PropTypes.objectOf(PropTypes.any),
  isLast: PropTypes.bool,
  height: PropTypes.number,
  center: PropTypes.element,
  right: PropTypes.element,
  onPress: PropTypes.func,
  inputProps: PropTypes.objectOf(PropTypes.any),
  showInput: PropTypes.bool,
  showNavIcon: PropTypes.bool,
  needPress: PropTypes.bool,
};

export default NavInputItem;
