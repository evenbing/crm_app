/**
 * @component ScreenTab.js
 * @description 筛选头部
 * @time 2018/8/7
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { View } from 'react-native';
import { theme } from '../../constants';
// import { deviceHeight, deviceWidth } from '../../utils/utils';
import { getHeaderHeight, getHeaderPadding } from '../../utils/utils';

// components
import TouchableView from '../TouchableView';
import Thumbnail from '../Thumbnail';
import FilterList from '../Modal/FilterList';

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
  state = {
    isVisible: false,
    headerList: [], // 头部显示List
    filterMap: {}, // 下拉菜单Map
  };
  componentDidMount() {
    this.initState(this.props);
  }
  componentWillReceiveProps(nextProps) {
    const { list = [], activeIndex } = nextProps;
    if (list.length && activeIndex !== -1) {
      this.initState(nextProps);
    }
  }
  onHideVisible = () => {
    this.setState({
      isVisible: false,
    });
  };
  onShowVisible = () => {
    this.setState({
      isVisible: true,
    });
  };
  onPressItem = ({ index, isLast }) => {
    const { activeIndex } = this.props;
    const { isVisible } = this.state;
    this.props.onChange({ index, isLast });
    if (activeIndex !== index) {
      isVisible ? this.onShowVisible() : this.onHideVisible();
    }
    if (isLast) {
      this.onHideVisible();
    } else {
      this.onShowVisible();
    }
  };
  initState = (props) => {
    const { list = [], activeIndex } = props;
    let filterMap = {};
    const headerList = [];
    list.forEach((_, i) => {
      const { selectedIndex = 0, list = [] } = _;
      if (!list.length) return;
      if (activeIndex === i) {
        filterMap = _;
      }
      headerList.push(list[selectedIndex].name);
    });
    if (activeIndex === list.length - 1) {
      filterMap = {};
    }
    this.setState({
      headerList,
      filterMap,
    });
  };
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
      state: {
        headerList,
      },
      props: {
        activeIndex,
      },
    } = this;
    if (!(headerList && headerList.length)) return null;
    const dataLen = headerList.length;
    return headerList.map((_, index) => {
      const active = activeIndex === index;
      const isLast = dataLen - 1 === index;
      return (
        <HeaderItemView
          onPress={() => this.onPressItem({ index, isLast })}
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
      selectedList,
    } = this.props;
    if (!selectedList.length) return null;
    return (
      <FilterView>
        {
          selectedList.map((_, i) => {
            if (!_.name) return null;
            return (
              <FilterItemView
                key={`${_.name}.${i}`}
                isFirst={i === 0}
              >
                <FilterItemText>{_.name}</FilterItemText>
              </FilterItemView>
            );
          })
        }
      </FilterView>
    );
  };
  render() {
    const {
      state: {
        isVisible,
        filterMap: { selectedIndex, list },
      },
      props: {
        onPressFilterItem,
      },
    } = this;
    return (
      <ContainerView>
        <FilterList
          isVisible={isVisible}
          onPressClose={this.onHideVisible}
          selectedIndex={selectedIndex}
          onPressItem={onPressFilterItem}
          position={getHeaderHeight() + getHeaderPadding() + 88}
          list={list}
        />
        <HeaderView>
          {this.renderTab()}
        </HeaderView>
        {this.renderFilterList()}
      </ContainerView>
    );
  }
}

ScreenTab.defaultProps = {
  onChange: () => null,
  onPressFilterItem: () => null,
  activeIndex: 0,
  selectedList: [],
};

ScreenTab.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
  activeIndex: PropTypes.number,
  onChange: PropTypes.func,
  onPressFilterItem: PropTypes.func,
  selectedList: PropTypes.arrayOf(PropTypes.any),
};

export default ScreenTab;
