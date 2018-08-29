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
import { getHeaderHeight, getHeaderPadding } from '../utils/utils';

import TouchableView from './TouchableView';

const Wrapper = styled.View`
  height: ${theme.moderateScale(getHeaderHeight() + getHeaderPadding())}px;
  background-color: ${props => props.backgroundColor};
  justify-content: flex-end;
  align-items: center;
`;

const ActionBar = styled.View`
  height: ${theme.moderateScale(44)}px;
  width: 100%;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

const LeftArea = styled(TouchableView)`
  flex: 1;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-left: ${theme.moderateScale(10)}px;
`;

const CenterArea = styled.View`
  flex: 2;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin: 0 ${theme.moderateScale(8)}px;
`;

const RightArea = styled.View`
  flex: 1;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  padding-right: ${theme.moderateScale(10)}px;
`;

const ActionBtn = styled.TouchableOpacity`
  padding: 2px 3px;
`;

const Label = styled.Text.attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
})`
  font-size: ${theme.moderateScale(18)};
  font-weight: 700;
  color: #ffffff;
`;

const BackIcon = styled.Image`
  width: ${theme.moderateScale(18)};
  height: ${theme.moderateScale(18)};
`;

export default class Header extends PureComponent {
  state = {}

  render() {
    const {
      backgroundColor,
      wrapperStyle,
      centerTitleStyle,
      center,
      right,
      onLeftPress,
      onRightPress,
      rightTitleStyle,
    } = this.props;
    return (
      <Wrapper
        backgroundColor={backgroundColor}
        style={wrapperStyle}
      >
        <ActionBar>
          <LeftArea
            onPress={onLeftPress || (() => goBack())}
          >
            <BackIcon
              source={require('../img/back.png')}
              resizeMode="contain"
            />
          </LeftArea>
          <CenterArea>
            {typeof center === 'string' ?
              <Label style={centerTitleStyle}>{center}</Label>
              : center}
          </CenterArea>
          <RightArea>
            {typeof right === 'string' ?
              <ActionBtn onPress={onRightPress}>
                <Label style={rightTitleStyle}>{right}</Label>
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
  centerTitleStyle: {
    fontSize: theme.moderateScale(18),
  },
  center: null,
  right: null,
  rightTitleStyle: {
    fontSize: theme.moderateScale(16),
    color: theme.primaryColor,
  },
  onLeftPress: null,
  onRightPress: null,
};

Header.propTypes = {
  backgroundColor: PropTypes.string,
  wrapperStyle: PropTypes.objectOf(PropTypes.any),
  centerTitleStyle: PropTypes.objectOf(PropTypes.any),
  rightTitleStyle: PropTypes.objectOf(PropTypes.any),
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
