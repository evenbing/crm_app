/**
 * @component index.js
 * @description 客户页面
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
import { SelectType } from '../../../constants/enum';
import * as drawerUtils from '../../../utils/drawer';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import SearchInput from '../../../components/SearchInput';
import { ContainerView } from '../../../components/Styles/Layout';
import { ScreenTab, ListItem, ButtonList } from '../../../components/SwipeList';
import FlatListTable from '../../../components/FlatListTable';
import { Drawer, FilterSideBar, UpdateFieldSideBar } from '../../../components/Drawer';

import { FilterList } from './_fieldCfg';
import CustomerStore from '../../../logicStores/customer';
import {
  CustomerTimeTypeFilterMap,
  CustomerResponsibilityTypeFilterMap,
  DrawerFilterMap,
} from '../../../constants/screenTab';

useStrict(true);


@observer
class Customer extends React.Component {
  state = {
    activeIndex: 0,
    drawerVisible: false,
    filterList: FilterList,
    selectedList: [],
    sideBarType: 0,
    screenTabList: [
      CustomerTimeTypeFilterMap,
      CustomerResponsibilityTypeFilterMap,
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
    this.props.navigation.navigate(routers.createCustomer);
  };
  onChange = ({ index, isLast }) => {
    this.setState({ activeIndex: index });
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
    this.safeCloseOpenRow(index);
    this.prevNodeIndex = index;
  };

  onEndReached = () => {
    const { total, list, pageNumber, loadingMore } = CustomerStore.customerList;
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
    CustomerStore.getCustomerListReq({ pageNumber });
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
        ref={(row) => { this[`rows.${index}`] = row; }}
        rightOpenValue={-theme.moderateScale((44 * 3) + 15 + 15)}
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
            onPress={() => {
              // from select customer
              if (state.params.type === SelectType) {
                state.params.callback(item);
                goBack();
                return;
              }
              // form nav page
              navigate(routers.customerDetails, { item });
            }}
          />
        }
        right={
          <ButtonList
            list={[
              require('../../../img/crm/buttonList/follow.png'),
              require('../../../img/crm/buttonList/address.png'),
              require('../../../img/crm/buttonList/phone.png'),
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
        screenTabList,
      },
    } = this;
    const {
      customerList: { list, refreshing, loadingMore },
    } = CustomerStore;
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
          <FlatListTable {...flatProps} />
        </ContainerView>
      </Drawer>
    );
  }
}

Customer.navigationOptions = ({ navigation }) => {
  const { onPressRight, type } = navigation.state.params || {};
  const bool = type === SelectType;
  return {
    title: bool ? '选择客户' : '客户',
    headerLeft: (
      <LeftBackIcon
        onPress={() => navigation.goBack()}
      />
    ),
    headerRight: (
      bool ? null : (
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

Customer.defaultProps = {
};

Customer.propTypes = {
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

export default Customer;
