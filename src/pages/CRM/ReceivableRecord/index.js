/**
 * @component index.js
 * @description 回款记录页面
 * @time 2018/9/2
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { useStrict } from 'mobx/';
import { SwipeRow } from 'native-base';
import { observer } from 'mobx-react/native';
import { routers, theme } from '../../../constants';
import * as drawerUtils from '../../../utils/drawer';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import SearchInput from '../../../components/SearchInput';
import { ContainerView } from '../../../components/Styles/Layout';
import { ScreenTab, ListItem, ButtonList, FooterTotal } from '../../../components/SwipeList';
import FlatListTable from '../../../components/FlatListTable';
import { ActionSheet } from '../../../components/Modal';
import { Drawer, FilterSideBar, UpdateFieldSideBar } from '../../../components/Drawer';
import LeftItem from './components/LeftItem';

import { FilterList } from './_fieldCfg';
import ReceivableRecordModel from '../../../logicStores/receivableRecord';

// screenTab
import {
  ReceivablePlanTimeType,
  ParticipateType,
  DrawerFilterMap,
} from '../../../constants/screenTab';

useStrict(true);

@observer
class ReceivableRecord extends React.Component {
  state = {
    activeIndex: 0,
    amountVisible: false,
    drawerVisible: false,
    filterList: FilterList,
    selectedList: [],
    sideBarType: 0,
    searchValue: null,
    // screenTab
    screenTabList: [ReceivablePlanTimeType, ParticipateType, DrawerFilterMap],
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
    this.getData();
  }
  onPressRight = () => {
    this.props.navigation.navigate(routers.receivableRecordEditor);
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
    // ReceivablePlanModel.getReceivablePlanListReq(obj);
    ReceivableRecordModel.getReceivableRecordListReq({ pageNumber });
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
            onPress={() => navigate(routers.receivableRecordDetails, { item })}
          />
        }
        right={
          <ButtonList
            list={[
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
        amountVisible,
        drawerVisible,
        selectedList,
        searchValue,
        screenTabList,
      },
    } = this;
    const {
      receivableRecordList: { list, refreshing, loadingMore },
    } = ReceivableRecordModel;
    const amountActionSheetProps = {
      isVisible: amountVisible,
      onPressClose: this.onToggleAmountVisible,
      itemNeedPress: false,
      list: [
        { leftText: '总金额', rightText: '¥100,000,00', rightStyle: { color: theme.dangerColor } },
        { leftText: '计划回款金额', rightText: '¥90,000,00' },
        { leftText: '实际回款金额', rightText: '¥70,000,00' },
        { leftText: '未回款金额', rightText: '¥100,000,00' },
        { leftText: '逾期未回款金额', rightText: '¥100,000,00' },
      ],
    };
    const flatProps = {
      data: list,
      //     data={[
      //         {
      //           time: '20180909-0001',
      //           customer: '客户：西风网络',
      //           contract: '合同：西风网络销售合同',
      //           returnMoney: '实际回款：¥10,000.00',
      //           returnTime: '实际日期：2018-09-09',
      //         }
      // ]}
      keyExtractor: item => `${item.id}.${item.issueId}`,
      renderItem: this.renderItem,
      ItemSeparatorComponent: null,
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
          <ActionSheet {...amountActionSheetProps} />
          <FooterTotal onPress={this.onToggleAmountVisible} />
        </ContainerView>
      </Drawer>
    );
  }
}

ReceivableRecord.navigationOptions = ({ navigation }) => ({
  title: '回款记录',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: (
    <RightView
      onPress={navigation.state.params ? navigation.state.params.onPressRight : null}
      right="新增"
      rightStyle={{
        color: theme.primaryColor,
      }}
    />
  ),
});

ReceivableRecord.defaultProps = {
  index: '',
};

ReceivableRecord.propTypes = {
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

export default ReceivableRecord;
