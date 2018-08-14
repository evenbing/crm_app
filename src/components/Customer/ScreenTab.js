/**
 * @component ScreenTab.js
 * @description 筛选头部
 * @time 2018/8/7
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'react-native';
import { theme } from '../../constants/';

import BorderShadow from '../Shadow/BorderShadow';
import TouchableView from '../TouchableView';
import Thumbnail from '../Thumbnail';

const TabsPanelView = styled.View`
  background: ${theme.pageBackColor};
  height: ${theme.moderateScale(44)};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${theme.moderateScale(15)};
  padding-right: ${theme.moderateScale(15)};
  border: 1px red;
`;

const HeaderContainer = styled(TouchableView)`
  align-items: center;
  flex-direction: row;
`;

const HeaderText = styled.Text`
  font-family:${theme.fontMedium};
  font-size: ${theme.moderateScale(16)};
  color: ${props => props.color || '#7A7A7A'};
`;

const IconView = styled.View`
  width: ${theme.moderateScale(8)};
  height: ${theme.moderateScale(5)};
  margin-left: ${theme.moderateScale(4)};
  background-color: ${props => props.color || '#7A7A7A'};
`;

class ScreenTab extends React.PureComponent {
  renderIcon = (node, isLast, active) => {
    if (React.isValidElement(node)) return null;
    if (isLast) {
      return (
        <Thumbnail
          source={require('../../img/crm/screen.png')}
          size={20}
        />
      );
    }
    if (active) {
      return (
        <Thumbnail
          source={require('../../img/crm/triangle-focus.png')}
          size={9}
        />
      );
    }
    return (
      <Thumbnail
        source={require('../../img/crm/triangle.png')}
        size={9}
      />
    );
  };
  renderTab = () => {
    const {
      data,
      activeIndex,
      onChange,
    } = this.props;
    if (!(data && data.length)) return null;
    const dataLen = data.length;
    return data.map((_, index) => {
      const active = activeIndex === index;
      const isLast = dataLen - 1 === index;
      return (
        <HeaderContainer
          onPress={() => onChange({ index, isLast })}
          key={index}
        >
          {
            React.isValidElement(_) ? _ : (
              <HeaderText color={active && theme.primaryColor}>{_}</HeaderText>
            )
          }
          {this.renderIcon(_, isLast, active)}
        </HeaderContainer>
      );
    });
  };
  render() {
    const shadowOpt = {
      width: 750,
      color: '#CBD5F1',
      border: 4,
      opacity: 0.3,
      side: 'bottom',
      style: { width: '100%', marginTop: 4 },
    };
    const {
      isShadow,
    } = this.props;
    return (
      <View>
        <TabsPanelView>
          {this.renderTab()}
        </TabsPanelView>
        { isShadow ? <BorderShadow setting={shadowOpt} /> : null}
      </View>
    );
  }
}

ScreenTab.defaultProps = {
  data: [],
  onChange: () => null,
  isShadow: false,
  activeIndex: 0,
};

ScreenTab.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  activeIndex: PropTypes.number,
  onChange: PropTypes.func,
  isShadow: PropTypes.bool,
};

export default ScreenTab;
