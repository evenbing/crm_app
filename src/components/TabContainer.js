/**
 * @component TabContainer.js
 * @description TabContainer 容器样式
 * @time 2018/8/12
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableView } from 'xn-react-native-applets';

import { moderateScale } from '../utils/scale';
import { theme } from '../constants';

import BorderShadow from './Shadow/BorderShadow';

const ContainerView = styled.View``;

const TabView = styled.View`
  height: ${moderateScale(50)};
  background-color: #fff;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const TabItemView = styled(TouchableView)`
  flex: 1;
  height: ${moderateScale(26)};
  align-items: center;
  justify-content: center;
  borderRightWidth: ${props => props.isLast ? '0' : '1px' };
  borderRightColor: #F6F6F6;
`;

const HeaderText = styled.Text`
  font-family:${theme.fontMedium};
  font-size:  ${theme.moderateScale(16)};
  color: ${props => props.active ? '#18B548' : '#696969' };
`;

class TabContainer extends React.PureComponent {
  render() {
    const {
      list,
      activeIndex,
      onChange,
      isShadow,
      style,
      children,
    } = this.props;

    const shadowOpt = {
      width: theme.moderateScale(750),
      color: '#979797',
      border: theme.moderateScale(4),
      opacity: 0.5,
      side: 'bottom',
      style: { width: '100%', marginTop: theme.moderateScale(4) },
    };


    return (
      <ContainerView>
        <TabView style={style}>
          {
            list.map((_, index) => (
              <TabItemView
                key={index}
                isLast={index === list.length - 1}
                onPress={() => {
                  if (index === activeIndex) return;
                  onChange(index);
                }}
              >
                <HeaderText active={activeIndex === index}>{_}</HeaderText>
              </TabItemView>
            ))
          }
        </TabView>

        { isShadow ? <BorderShadow setting={shadowOpt} /> : null}
        {
          React.Children.map(children, (_, index) => {
            if (index === activeIndex) return _;
          })
        }
      </ContainerView>
    );
  }
}

TabContainer.defaultProps = {
  onChange: () => null,
  isShadow: true,
  activeIndex: 0,
  style: {},
  children: null,
};

TabContainer.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
  activeIndex: PropTypes.number,
  onChange: PropTypes.func,
  isShadow: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default TabContainer;
