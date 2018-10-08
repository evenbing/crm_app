/**
 * @component index.js
 * @description 销售机会页面
 * @time 2018/8/6
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { useStrict } from 'mobx';
import { SwipeRow } from 'native-base';
import { observer } from 'mobx-react/native';
import { routers, theme } from '../../../constants';
import { SalesChanceType } from '../../../constants/enum';
import * as drawerUtils from '../../../utils/drawer';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import SearchInput from '../../../components/SearchInput';
import { ContainerView, DefaultHeaderView } from '../../../components/Styles/Layout';
import { ScreenTab, ListItem, ButtonList } from '../../../components/SwipeList';
import FlatListTable from '../../../components/FlatListTable';
import { Drawer, FilterSideBar, UpdateFieldSideBar } from '../../../components/Drawer';
import LeftItem from './components/LeftItem';
import BoardList from './components/BoardList';

// static source
import listIcon from '../../../img/crm/screenTab/list.png';
import boardIcon from '../../../img/crm/screenTab/board.png';

import { FilterList } from './_fieldCfg';
import SalesChanceStore from '../../../logicStores/salesChance';
import {
  SalesChanceAmountTypeFilterMap,
  SalesChanceResponsibilityTypeFilterMap,
  IsBoardTypeMap,
  DrawerFilterMap,
} from '../../../constants/screenTab';

useStrict(true);

@observer
class SalesChance extends React.Component {
  state = {
    activeIndex: 0,
    isBoard: false,
    drawerVisible: false,
    filterList: FilterList,
    selectedList: [],
    sideBarType: 0,
    screenTabList: [
      SalesChanceAmountTypeFilterMap,
      SalesChanceResponsibilityTypeFilterMap,
      IsBoardTypeMap,
      DrawerFilterMap,
    ],
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
    this.getData();
  }
  onToggleType = () => {
    this.setState({ isBoard: !this.state.isBoard });
  };
  onPressRight = () => alert('right');
  onChange = ({ index, isLast }) => {
    this.setState({ activeIndex: index });
    if (index === 2) {
      this.onToggleType();
    }
    if (isLast) {
      // TODO open drawer
      this.onOpenDrawer();
    }
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
    console.log(index);
    this.safeCloseOpenRow(index);
    this.prevNodeIndex = index;
  };
  onEndReached = () => {
    const { total, list, pageNumber, loadingMore } = SalesChanceStore.salesChanceList;
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
    // ContractModel.getContactListReq(obj);
    SalesChanceStore.getSalesChanceListReq({ pageNumber });
  };

  safeCloseOpenRow = (index) => {
    if (this.prevNodeIndex !== index && typeof this.prevNodeIndex !== 'undefined') {
      this[`rows.${this.prevNodeIndex}`]._root.closeRow();
    }
  };

  keyExtractor = item => item.key;

  renderItem = (itemProps) => {
    const { index, item } = itemProps;
    const {
      navigation: { navigate, state, goBack },
    } = this.props;
    return (
      <SwipeRow
        disableRightSwipe
        ref={(row) => { this[`rows.${itemProps.index}`] = row; }}
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
            right="hidden"
            left={
              <LeftItem />
            }
            onPress={() => {
              // from select salesChance
              if (state.params.type === SalesChanceType) {
                state.params.callback(item);
                goBack();
                return;
              }
              // form nav page
              navigate(routers.salesChanceDetails, { item });
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
  renderSection = () => {
    const {
      salesChanceList: { list, refreshing, loadingMore },
    } = SalesChanceStore;
    const data = list.map((item) => {
      const { id, name, pinyin } = item;
      return ({
        key: id,
        title: name,
        tipList: [`最近跟进时间：${pinyin}`],
      });
    });
    const flatProps = {
      data,
      renderItem: this.renderItem,
      keyExtractor: this.keyExtractor,
      onRefresh: this.getData,
      onEndReached: this.onEndReached,
      refreshing,
      noDataBool: !refreshing && list.length === 0,
      loadingMore,
    };
    if (!this.state.isBoard) {
      return (
        <FlatListTable {...flatProps} />
      );
    }
    return (
      <BoardList />
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
        screenTabList,
        isBoard,
      },
    } = this;
    screenTabList[2].icon = !isBoard ? listIcon : boardIcon;
    screenTabList[2].focusIcon = !isBoard ? listIcon : boardIcon;
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
          <SearchInput placeholder="输入客户名称" />
          <ScreenTab
            list={screenTabList}
            activeIndex={activeIndex}
            onChange={this.onChange}
            selectedList={selectedList}
          />
          {this.renderSection()}
        </ContainerView>
      </Drawer>
    );
  }
}

SalesChance.navigationOptions = ({ navigation }) => {
  const { onPressRight, type } = navigation.state.params || {};
  const bool = type === SalesChanceType;
  return {
    title: bool ? '选择销售机会' : '销售机会',
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
  };
};

SalesChance.defaultProps = {};

SalesChance.propTypes = {
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

export default SalesChance;
