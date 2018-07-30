/**
 * @component Header.js
 * @description 头部
 * @time 2018/6/24
 * @author JUSTIN XU
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../constants';
import { goBack } from '../utils/navigationService';
import { getStatusBarHeight } from '../utils/device';
import ButtonWithIcon from './ButtonWithIcon';

const Wrapper = styled.View`
  height: ${getStatusBarHeight() + theme.headerHeight}px;
  background-color: ${props => props.backgroundColor};
  justify-content: flex-end;
  align-items: center;
`;

const ActionBar = styled.View`
  height: 44px;
  width: 100%;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

const LeftArea = styled.View`
  flex: 1;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: 10px;
`;

const CenterArea = styled.View`
  flex: 2;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin: 0 8px;
`;

const RightArea = styled.View`
  flex: 1;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  margin-right: 15px;
`;

const ActionBtn = styled.TouchableOpacity`
  padding: 2px 3px;
`;

const Label = styled.Text.attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
})`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
`;

const BackIcon = styled.Image`
  width: 16px;
  height: 16px;
`;

export default class Header extends PureComponent {
  state = {}

  render() {
    const {
      backgroundColor,
      wrapperStyle,
      centerTitleStyle,
      left,
      center,
      right,
      showBackButton,
      backButtonTitle,
      onLeftPress,
      onRightPress,
    } = this.props;
    return (
      <Wrapper
        backgroundColor={backgroundColor}
        style={wrapperStyle}
      >
        <ActionBar>
          {showBackButton ?
            <LeftArea>
              <ButtonWithIcon
                icon={
                  <BackIcon
                    source={require('../img/back.png')}
                    resizeMode="contain"
                  />
                }
                onPress={onLeftPress || (() => goBack())}
                title={backButtonTitle}
              />
            </LeftArea>
          :
            <LeftArea>
              {typeof left === 'string' ?
                <ActionBtn>
                  <Label>{left}</Label>
                </ActionBtn>
              : left}
            </LeftArea>
          }
          <CenterArea>
            {typeof center === 'string' ?
              <Label style={centerTitleStyle}>{center}</Label>
              : center}
          </CenterArea>
          <RightArea>
            {typeof right === 'string' ?
              <ActionBtn onPress={onRightPress}>
                <Label>{right}</Label>
              </ActionBtn>
              : right}
          </RightArea>
        </ActionBar>
      </Wrapper>
    );
  }
}

Header.defaultProps = {
  backgroundColor: theme.headerBackgroundColor,
  wrapperStyle: null,
  centerTitleStyle: null,
  left: null,
  center: null,
  right: null,
  onLeftPress: null,
  onRightPress: null,
  showBackButton: false,
  backButtonTitle: null,
};

Header.propTypes = {
  backgroundColor: PropTypes.string,
  wrapperStyle: PropTypes.objectOf(PropTypes.any),
  centerTitleStyle: PropTypes.objectOf(PropTypes.any),
  showBackButton: PropTypes.bool,
  backButtonTitle: PropTypes.string,
  left: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  center: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  right: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  onLeftPress: PropTypes.func,
  onRightPress: PropTypes.func,
};
