/**
 * @component TabContainer.js
 * @description TabContainer 容器样式
 * @time 2018/8/12
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../constants';

import TouchableView from './TouchableView';

const ContainerView = styled.View``;

const TabItemView = styled(TouchableView)`
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

class TabContainer extends React.PureComponent {
  render() {
    const {
      list,
      activeIndex,
      onChange,
      isShadow,
    } = this.props;
    return (
      <ContainerView>
        {
          list.map((_, index) => (
            <TabItemView
              key={index}
              onPress={() => {
                if (index === activeIndex) return;
                onChange(index);
              }}
            >
              <HeaderText active={activeIndex === index}>{_}</HeaderText>
            </TabItemView>
          ))
        }
      </ContainerView>
    );
  }
}

TabContainer.defaultProps = {
  onChange: () => null,
  isShadow: true,
  activeIndex: 0,
};

TabContainer.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
  activeIndex: PropTypes.number,
  onChange: PropTypes.func,
  isShadow: PropTypes.bool,
};

export default TabContainer;
