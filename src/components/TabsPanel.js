/**
 * @component TabsPanel.js
 * @description Tabs panel 容器样式
 * @time 2018/6/25
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, View, TouchableOpacity } from 'react-native';

import { theme } from '../constants/index';
import BorderShadow from './BorderShadow';

const TabsPanelView = styled(View)`
  background: #FFFFFF;
  height: 44px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
`;

const HeaderContainer = styled(TouchableOpacity)`
  height: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HeaderText = styled(Text)`
  margin-top: 3px;
  font-family:${theme.fontMedium};
  font-size: 18px;
  color: #4F4F4F;
`;
const ActiveBoard = styled(View)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  border-radius: 4px;
  width: 100%;
  background-color: ${theme.primaryColor};
`;

class PanelHeader extends React.PureComponent {
  render() {
    const shadowOpt = {
      width: 750,
      color: '#CBD5F1',
      border: 4,
      opacity: 0.3,
      side: 'bottom',
      style: { width: '100%', marginTop: 4 },
    }

    const {
      data,
      activeIndex,
      onChange,
      isShadow,
    } = this.props;
    return (
      <View>
        <TabsPanelView>
          {
            data.map((obj, index) => (
              <HeaderContainer
                onPress={() => onChange && onChange(index)}
                key={index}
              >
                <HeaderText active={activeIndex === index}>{obj}</HeaderText>
                {activeIndex === index && <ActiveBoard />}
              </HeaderContainer>
            ))
          }

        </TabsPanelView>
        { isShadow ? <BorderShadow setting={shadowOpt} /> : null}
      </View>
    );
  }
}

PanelHeader.defaultProps = {
  onChange: () => null,
  isShadow: true,
};

PanelHeader.propTypes = {
  data: PropTypes.array.isRequired,
  activeIndex: PropTypes.number,
  onChange: PropTypes.func,
  isShadow: PropTypes.bool,
};

export default PanelHeader;
