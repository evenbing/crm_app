/**
 * @component TabsPanel.js
 * @description Tabs panel 容器样式
 * @time 2018/8/12
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../constants';

import BorderShadow from './Shadow/BorderShadow';
import TouchableView from './TouchableView';

// shadow-opacity: 0.2;
// shadow-radius: 2px;
// shadow-color: #999;
// shadow-offset: 0px 1.5px;
// elevation: 2;
const TabsHeaderView = styled.View`
  background: ${theme.whiteColor};
  height: ${theme.moderateScale(44)};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${theme.moderateScale(15)}px;
`;

const HeaderContainer = styled(TouchableView)`
  height: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HeaderText = styled.Text`
  margin-top:  ${theme.moderateScale(3)};
  font-family:${theme.fontMedium};
  font-size:  ${theme.moderateScale(18)};
  color: ${theme.listTitleColor};
`;

const ActiveBoard = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  height: ${theme.moderateScale(4)};
  border-radius: ${theme.moderateScale(4)};
  width: 100%;
  background-color: ${theme.primaryColor};
`;

const ContainerView = styled.View`
  flex: 1;
`;

class TabsPanel extends React.PureComponent {
  renderHeaderItem = () => {
    const {
      list,
      activeIndex,
      onChange,
    } = this.props;
    if (!list) return null;
    return list.map((_, index) => (
      <HeaderContainer
        key={`header.item.${_}`}
        onPress={() => {
          if (index === activeIndex) return;
          onChange(index);
        }}
      >
        <HeaderText active={activeIndex === index}>{_}</HeaderText>
        {activeIndex === index && <ActiveBoard />}
      </HeaderContainer>
    ));
  };
  renderShadow = () => {
    const shadowOpt = {
      width: theme.moderateScale(750),
      color: '#979797',
      border: theme.moderateScale(4),
      opacity: 0.5,
      side: 'bottom',
      style: { width: '100%', marginTop: theme.moderateScale(4) },
    };

    const {
      isShadow,
    } = this.props;
    if (isShadow) {
      return (
        <BorderShadow setting={shadowOpt} key="board.shadow" />
      );
    }
    return null;
  };
  renderBody = () => {
    const {
      children,
      activeIndex,
    } = this.props;
    if (!children) return null;
    return React.Children.map(children, (_, i) => {
      if (i === activeIndex) {
        return (
          <ContainerView key={`children.${i}`}>{_}</ContainerView>
        );
      }
      return null;
    });
  };
  render() {
    return ([
      <TabsHeaderView key="tabs.header.view">
        {this.renderHeaderItem()}
      </TabsHeaderView>,
      this.renderShadow(),
      this.renderBody(),
    ]);
  }
}

TabsPanel.defaultProps = {
  onChange: () => null,
  isShadow: true,
  activeIndex: 0,
  children: null,
};

TabsPanel.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
  activeIndex: PropTypes.number,
  onChange: PropTypes.func,
  isShadow: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default TabsPanel;
