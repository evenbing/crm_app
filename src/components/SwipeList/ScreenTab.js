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
import { theme } from '../../constants';

// components
import TouchableView from '../TouchableView';
import Thumbnail from '../Thumbnail';

const ContainerView = styled.View``;

const HeaderView = styled.View`
  background: ${theme.pageBackColor};
  height: ${theme.moderateScale(44)};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${theme.moderateScale(15)};
  padding-right: ${theme.moderateScale(15)};
`;

const HeaderItemView = styled(TouchableView)`
  align-items: center;
  flex-direction: row;
`;

const HeaderText = styled.Text`
  font-family:${theme.fontMedium};
  font-size: ${theme.moderateScale(16)};
  color: ${props => props.color || '#7A7A7A'};
`;

const FilterView = HeaderView.extend`
  justify-content: center;
`;

const FilterItemView = styled.View`
  padding: ${theme.moderateScale(3)}px ${theme.moderateScale(8)}px;
  overflow: hidden;
  border: 1px solid ${theme.primaryColor};
  border-radius: ${theme.moderateScale(4)};
  margin-left: ${props => props.isFirst ? 0 : theme.moderateScale(15)};
`;

const FilterItemText = styled.Text`
  color: ${theme.primaryColor};
  font-size: ${theme.moderateScale(13)};
`;

const IconStyle = {
  marginLeft: theme.moderateScale(3),
};

class ScreenTab extends React.PureComponent {
  renderIcon = (node, isLast, active) => {
    if (React.isValidElement(node)) return null;
    if (isLast && active) {
      return (
        <Thumbnail
          source={require('../../img/crm/screenTab/screen-focus.png')}
          size={18}
          style={IconStyle}
        />
      );
    }
    if (isLast) {
      return (
        <Thumbnail
          source={require('../../img/crm/screenTab/screen.png')}
          size={18}
          style={IconStyle}
        />
      );
    }
    if (active) {
      return (
        <Thumbnail
          source={require('../../img/crm/screenTab/triangle-focus.png')}
          size={9}
          style={IconStyle}
        />
      );
    }
    return (
      <Thumbnail
        source={require('../../img/crm/screenTab/triangle.png')}
        size={9}
        style={IconStyle}
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
        <HeaderItemView
          onPress={() => onChange({ index, isLast })}
          key={index}
        >
          {
            React.isValidElement(_) ? _ : (
              <HeaderText color={active && theme.primaryColor}>{_}</HeaderText>
            )
          }
          {this.renderIcon(_, isLast, active)}
        </HeaderItemView>
      );
    });
  };
  renderFilterList = () => {
    const {
      filterList,
    } = this.props;
    if (!filterList.length) return null;
    return (
      <FilterView>
        {
          filterList.map((_, i) => (
            <FilterItemView
              key={_.name}
              isFirst={i === 0}
            >
              <FilterItemText>{_.name}</FilterItemText>
            </FilterItemView>
          ))
        }
      </FilterView>
    );
  };

  render() {
    // const {
    //   isShadow,
    // } = this.props;
    return (
      <View>
        <ContainerView>
          <HeaderView>
            {this.renderTab()}
          </HeaderView>
          {this.renderFilterList()}
        </ContainerView>
      </View>
    );
  }
}

ScreenTab.defaultProps = {
  data: [],
  onChange: () => null,
  activeIndex: 0,
  filterList: [],
};

ScreenTab.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  activeIndex: PropTypes.number,
  onChange: PropTypes.func,
  filterList: PropTypes.arrayOf(PropTypes.any),
};

export default ScreenTab;
