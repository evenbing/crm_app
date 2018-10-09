/**
 * @component index.js
 * @description 市场活动页面
 * @time 2018/8/6
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { useStrict } from 'mobx';
import { StatusBar } from 'react-native';
import { SwipeRow } from 'native-base';
import { observer } from 'mobx-react/native';
import { routers, theme } from '../../../constants';
import * as drawerUtils from '../../../utils/drawer';
import {
  MarkActivityTimeTypeFilterMap,
  MarkActivityResponsibilityTypeFilterMap,
  DrawerFilterMap,
} from '../../../constants/screenTab';
import { formatDateByMoment, formatDateType } from '../../../utils/base';
import { MarkActivityType, MarketActivityStatus } from '../../../constants/enum';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout/index';
import SearchInput from '../../../components/SearchInput';
import { ContainerView, DefaultHeaderView } from '../../../components/Styles/Layout';
import { ScreenTab, ListItem, ButtonList } from '../../../components/SwipeList';
import FlatListTable from '../../../components/FlatListTable';
import { Drawer, FilterSideBar, UpdateFieldSideBar } from '../../../components/Drawer';

import { FilterList } from './_fieldCfg';
import MarkActivityStore from '../../../logicStores/markActivity';

useStrict(true);

@observer
class MarkActivity extends React.Component {
  state = {
    activeIndex: 0,
    drawerVisible: false,
    filterList: FilterList,
    selectedList: [],
    sideBarType: 0,
    searchValue: null,
    // screenTab
    screenTabList: [
      MarkActivityTimeTypeFilterMap,
      MarkActivityResponsibilityTypeFilterMap,
      DrawerFilterMap,
    ],
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
    this.getData();
  }
  onPressRight = () => {
    this.props.navigation.navigate(routers.markActivityCreate, {
      reFetchDataList: this.getData,
    });
  };
  onChange = ({ index, isLast }) => {
    this.setState({ activeIndex: index });
    if (isLast) {
      // TODO open drawer
      this.onOpenDrawer();
    }
  };
  onPressFilterItem = async ({ index }) => {
    const { screenTabList, activeIndex } = this.state;
    screenTabList[activeIndex].selectedIndex = index;
    await this.setState({ screenTabList });
    this.getData();
  };
  onCloseDrawer = () => {
    StatusBar.setBarStyle('light-content');
    this.setState({ drawerVisible: false });
  };
  onOpenDrawer = () => {
    StatusBar.setBarStyle('dark-content');
    this.setState({ drawerVisible: true });
  };
  onToggleItem = ({ type, currIndex, pareIndex, value }) => {
    const list = drawerUtils.handleToggleItem({
      list: this.state.filterList,
      type,
      currIndex,
      pareIndex,
      value,
    });
    this.setState({
      filterList: list,
    });
  };
  onResetItem = () => {
    const list = drawerUtils.handleRestItem({
      list: this.state.filterList,
    });
    this.setState({
      filterList: list,
    });
  };
  onFilter = () => {
    // TODO
    const list = drawerUtils.handleFilterItem({
      list: this.state.filterList,
    });
    this.setState({
      selectedList: list,
    });
    this.onCloseDrawer();
  };
  onRowOpen = (index) => {
    this.safeCloseOpenRow(index);
    this.prevNodeIndex = index;
  };
  onEndReached = () => {
    const { total, list, pageNumber, loadingMore } = MarkActivityStore.markActivityList;
    if (list.length < total && loadingMore === false) {
      this.getData(pageNumber + 1);
    }
  };
  getData = (pageNumber = 1) => {
    const { screenTabList, searchValue } = this.state;
    const obj = {
      pageNumber,
      name: searchValue,
    };
    // query header tab
    screenTabList.map((v, i) => {
      if (i === screenTabList.length - 1 || !v.list.length) return null;
      return v.list[v.selectedIndex].key;
    }).filter(_ => !!_).forEach((v) => {
      obj[v] = true;
    });
    MarkActivityStore.getMarkActivityListReq(obj);
  };
  safeCloseOpenRow = (index) => {
    if (this.prevNodeIndex !== index && typeof this.prevNodeIndex !== 'undefined') {
      this[`rows.${this.prevNodeIndex}`]._root.closeRow();
    }
  };
  renderItem = (itemProps) => {
    const { index, item: prevItem } = itemProps;
    const statusText = prevItem.status ? MarketActivityStatus[prevItem.status] : null;
    const statusColor = statusText === '已计划' ? theme.primaryColor : null;
    // 格式化item
    const item = {
      ...prevItem,
      key: prevItem.id,
      title: prevItem.name,
      tipList: [
        `开始时间：${formatDateByMoment(prevItem.beginDate, formatDateType)}`,
        `结束时间：${formatDateByMoment(prevItem.endDate, formatDateType)}`,
      ],
      statusText,
      statusColor,
    };
    itemProps.item = item;
    const {
      navigation: { navigate, state, goBack },
    } = this.props;
    return (
      <SwipeRow
        disableRightSwipe
        ref={(row) => { this[`rows.${index}`] = row; }}
        rightOpenValue={-theme.moderateScale(44 + 15 + 15)}
        style={{
          paddingTop: 0,
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 0,
          backgroundColor: '#fff',
          borderBottomWidth: 0,
        }}
        onRowOpen={() => this.onRowOpen(index)}
        body={
          <ListItem
            {...itemProps}
            onPress={() => {
              // from select customer
              if (state.params.type === MarkActivityType) {
                state.params.callback(item);
                goBack();
                return;
              }
              // form nav page
              navigate(routers.markActivityDetails, { item });
            }}
          />
        }
        right={
          <ButtonList
            list={[
              require('../../../img/crm/buttonList/follow.png'),
            ]}
            onPressItem={({ index, item }) => alert(`item:${JSON.stringify(item)}, index: ${index}`)}
          />
        }
      />
    );
  };
  renderSideBar = () => {
    const {
      state: {
        sideBarType,
        filterList,
      },
    } = this;
    if (sideBarType === 0) {
      return (
        <FilterSideBar
          list={filterList}
          onFilter={this.onFilter}
          onToggle={this.onToggleItem}
          onReset={this.onResetItem}
          onPressAdd={() => this.setState({ sideBarType: 1 })}
        />
      );
    }
    return (
      <UpdateFieldSideBar
        selectedList={[
          '回款状态',
          '客户',
          '逾期状态',
        ]}
        optionalList={[
          '计划回款金额',
          '计划回款日期',
          '合同',
        ]}
        onFilter={() => this.setState({ sideBarType: 0 })}
      />
    );
  };
  render() {
    const {
      state: {
        activeIndex,
        drawerVisible,
        selectedList,
        searchValue,
        screenTabList,
      },
    } = this;
    const {
      markActivityList: { list, refreshing, loadingMore },
    } = MarkActivityStore;
    const flatProps = {
      data: list,
      renderItem: this.renderItem,
      onRefresh: this.getData,
      onEndReached: this.onEndReached,
      refreshing,
      noDataBool: !refreshing && list.length === 0,
      loadingMore,
    };
    return (
      <Drawer
        isVisible={drawerVisible}
        content={this.renderSideBar()}
        onPressClose={this.onCloseDrawer}
      >
        <ContainerView
          bottomPadding
        >
          <CommStatusBar />
          <SearchInput
            placeholder="输入客户名称"
            value={searchValue}
            onChangeText={searchValue => this.setState({ searchValue })}
            onSearch={() => this.getData()}
          />
          <ScreenTab
            list={screenTabList}
            activeIndex={activeIndex}
            onChange={this.onChange}
            onPressFilterItem={this.onPressFilterItem}
            selectedList={selectedList}
          />
          <FlatListTable {...flatProps} />
        </ContainerView>
      </Drawer>
    );
  }
}

MarkActivity.navigationOptions = ({ navigation }) => {
  const { onPressRight, type } = navigation.state.params || {};
  const bool = type === MarkActivityType;
  return ({
    title: bool ? '选择市场活动' : '市场活动',
    headerLeft: (
      <LeftBackIcon
        onPress={() => navigation.goBack()}
      />
    ),
    headerRight: (
      bool ? <DefaultHeaderView /> : (
        <RightView
          onPress={onPressRight || null}
          right="新增"
          rightStyle={{
            color: theme.primaryColor,
          }}
        />
      )
    ),
  });
};

MarkActivity.defaultProps = {};

MarkActivity.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.shape({
      key: PropTypes.string,
      routeName: PropTypes.string,
      params: PropTypes.object,
    }),
  }).isRequired,
};

export default MarkActivity;

