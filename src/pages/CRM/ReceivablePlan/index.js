/**
 * @component index.js
 * @description 回款计划页面
 * @time 2018/8/6
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { useStrict } from 'mobx/';
import { SwipeRow } from 'native-base';
import { observer } from 'mobx-react/native';

// constants
import { routers, theme } from '../../../constants';
import { CustomerType } from '../../../constants/enum';

// utils
import * as drawerUtils from '../../../utils/drawer';
import { filterObject, nativeCallPhone } from '../../../utils/base';

// components
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import SearchInput from '../../../components/SearchInput';
import { ContainerView } from '../../../components/Styles/Layout';
import { ScreenTab, ListItem, ButtonList, FooterTotal } from '../../../components/SwipeList';
import FlatListTable from '../../../components/FlatListTable';
import { ActionSheet } from '../../../components/Modal';
import { Drawer, FilterSideBar, UpdateFieldSideBar } from '../../../components/Drawer';
import LeftItem from './components/LeftItem';

import ReceivablePlanModel from '../../../logicStores/receivablePlan';

// constants config
import {
  DrawerFilterMap,
} from '../../../constants/screenTab';
import {
  ReceivablePlanTimeTypeFilterMap,
  ReceivablePlanResponsibilityTypeFilterMap,
  FilterList,
} from './_fieldCfg';

useStrict(true);

@observer
class ReceivablePlan extends React.Component {
  state = {
    activeIndex: 0,
    amountVisible: false,
    drawerVisible: false,
    filterList: FilterList,
    selectedList: [],
    sideBarType: 0,
    searchValue: null,
    // screenTab
    screenTabList: [
      ReceivablePlanTimeTypeFilterMap,
      ReceivablePlanResponsibilityTypeFilterMap,
      DrawerFilterMap,
    ],
  };
  componentDidMount() {
    this.getData();
  }
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
  onFilter = () => {
    const list = drawerUtils.handleFilterItem({
      list: this.state.filterList,
    });
    this.setState({
      selectedList: list,
    });
    this.onCloseDrawer();
    this.getData();
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
  onPressAddItem = async ({ type, currIndex, pareIndex }) => {
    await this.onCloseDrawer();
    const {
      state: {
        filterList,
      },
      props: {
        navigation: { navigate },
      },
    } = this;
    navigate(routers.customer, {
      type: CustomerType,
      callback: async (item) => {
        if (!Object.keys(item).length) return;
        const list = drawerUtils.handleAddItem({
          list: filterList,
          type,
          currIndex,
          pareIndex,
          hashMap: {
            key: item.key,
            name: item.title,
          },
        });
        await this.setState({
          filterList: list,
        });
        this.onOpenDrawer();
      },
    });
  };
  onPressRemoveItem = ({ type, currIndex, pareIndex }) => {
    const list = drawerUtils.handleRemoveItem({
      list: this.state.filterList,
      type,
      currIndex,
      pareIndex,
    });
    this.setState({
      filterList: list,
    });
  };
  onToggleAmountVisible = () => {
    this.setState({
      amountVisible: !this.state.amountVisible,
    });
  };
  onChange = ({ index, isLast }) => {
    this.setState({ activeIndex: index });
    if (isLast) {
      this.onOpenDrawer();
    }
  };
  onRowOpen = (index) => {
    this.safeCloseOpenRow(index);
    this.prevNodeIndex = index;
  };
  getData = (pageNumber = 1) => {
    const {
      state: {
        screenTabList,
        searchValue,
        selectedList,
      },
    } = this;
    const obj = {
      pageNumber,
      code: searchValue,
    };
    // query header tab
    screenTabList.map((v, i) => {
      if (i === screenTabList.length - 1 || !v.list.length) return null;
      return v.list[v.selectedIndex].key;
    }).filter(_ => !!_).forEach((v, i) => {
      if (i === 0) {
        obj.sortColumn = v;
      } else if (i === 1) {
        obj.participateType = v;
      }
    });
    // query sideBar
    selectedList.forEach((v) => {
      obj[v.key] = v.value;
    });
    console.log(obj);
    ReceivablePlanModel.getReceivablePlanListReq(filterObject(obj));
  };
  safeCloseOpenRow = (index) => {
    if (this.prevNodeIndex !== index && typeof this.prevNodeIndex !== 'undefined') {
      this[`rows.${this.prevNodeIndex}`]._root.closeRow();
    }
  };
  renderItem = (itemProps) => {
    const { index, item } = itemProps;
    const {
      navigation: { navigate },
    } = this.props;
    return (
      <SwipeRow
        disableRightSwipe
        ref={(row) => { this[`rows.${index}`] = row; }}
        rightOpenValue={-theme.moderateScale((44 * 2) + 15 + 15)}
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
              <LeftItem {...itemProps} />
            }
            onPress={() => navigate(routers.receivablePlanDetails, { item })}
          />
        }
        right={
          <ButtonList
            list={[
              require('../../../img/crm/buttonList/address.png'),
              require('../../../img/crm/buttonList/phone.png'),
            ]}
            onPressItem={({ index }) => {
              if (index === 1) {
                nativeCallPhone(item.mobilePhone || item.phone);
                return false;
              }
              return false;
            }}
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
          onPressAddItem={this.onPressAddItem}
          onPressRemoveItem={this.onPressRemoveItem}
          // onPressAdd={() => this.setState({ sideBarType: 1 })}
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
        // onFilter={() => this.setState({ sideBarType: 0 })}
      />
    );
  };
  render() {
    const {
      state: {
        activeIndex,
        amountVisible,
        drawerVisible,
        selectedList,
        searchValue,
        screenTabList,
      },
    } = this;
    const {
      receivablePlanList: {
        list,
        refreshing,
        loadingMore,
        totalFactPrice,
        totalOverTimePrice,
        totalPlanPrice,
        totalPrice,
        totalUnreceivablePrice,
      },
    } = ReceivablePlanModel;
    const amountActionSheetProps = {
      isVisible: amountVisible,
      onPressClose: this.onToggleAmountVisible,
      itemNeedPress: false,
      list: [
        { leftText: '总金额', rightText: `¥${totalPrice}`, rightStyle: { color: theme.dangerColor } },
        { leftText: '计划回款金额', rightText: `¥${totalPlanPrice}` },
        { leftText: '实际回款金额', rightText: `¥${totalFactPrice}` },
        { leftText: '未回款金额', rightText: `¥${totalUnreceivablePrice}` },
        { leftText: '逾期未回款金额', rightText: `¥${totalOverTimePrice}` },
      ],
    };
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
            placeholder="输入计划编号"
            value={searchValue}
            onChangeText={async (searchValue) => {
              await this.setState({ searchValue });
              if (!searchValue) this.getData();
            }}
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
          <ActionSheet {...amountActionSheetProps} />
          <FooterTotal onPress={this.onToggleAmountVisible} />
        </ContainerView>
      </Drawer>
    );
  }
}

ReceivablePlan.navigationOptions = ({ navigation }) => ({
  title: '回款计划',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

ReceivablePlan.defaultProps = {};

ReceivablePlan.propTypes = {
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

export default ReceivablePlan;

