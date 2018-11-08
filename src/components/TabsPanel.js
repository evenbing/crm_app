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
  font-size:  ${props => theme.moderateScale(props.fontSize)};
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
  flex: ${props => props.flex || 'none'};
`;

class TabsPanel extends React.PureComponent {
  render() {
    const shadowOpt = {
      width: theme.moderateScale(750),
      color: '#979797',
      border: theme.moderateScale(4),
      opacity: 0.5,
      side: 'bottom',
      style: { width: '100%', marginTop: theme.moderateScale(4) },
    };

    const {
      list,
      activeIndex,
      onChange,
      isShadow,
      children,
      headerTextSize,
    } = this.props;
    return (
      <ContainerView flex={children ? 1 : null}>
        <TabsHeaderView>
          {
            list.map((_, index) => (
              <HeaderContainer
                key={_.name}
                onPress={() => {
                  if (index === activeIndex) return;
                  onChange(index);
                }}
              >
                <HeaderText
                  active={activeIndex === index}
                  fontSize={headerTextSize}
                >
                  {_.name}
                </HeaderText>
                {activeIndex === index && <ActiveBoard />}
              </HeaderContainer>
            ))
          }

        </TabsHeaderView>
        {
          isShadow ? (
            <BorderShadow setting={shadowOpt} />
          ) : null
        }
        {
          React.Children.map(children, (_, index) => {
            if (index === activeIndex) return _;
          })
        }
      </ContainerView>
    );
  }
}

TabsPanel.defaultProps = {
  onChange: () => null,
  isShadow: true,
  activeIndex: 0,
  children: null,
  headerTextSize: 18,
};

TabsPanel.propTypes = {
  list: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  activeIndex: PropTypes.number,
  onChange: PropTypes.func,
  isShadow: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  headerTextSize: PropTypes.number,
};

export default TabsPanel;
