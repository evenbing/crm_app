/**
 * @component index.js
 * @description 销售线索页面
 * @time 2018/8/6
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { useStrict } from 'mobx';
import { SwipeRow } from 'native-base';
import { observer } from 'mobx-react/native';
import { CommStatusBar, LeftBackIcon, NativeUtil, RightView } from 'xn-react-native-applets';

// static source
import AddressIcon from 'img/crm/buttonList/address.png';
import PhoneIcon from 'img/crm/buttonList/phone.png';

// constants
import { routers, theme } from 'constants';
import { SalesClueType, LeadsStatus } from 'constants/enum';

// utils
import * as drawerUtils from 'utils/drawer';
import { filterObject } from 'utils/base';

// logicStores
import SalesCluesStore from 'logicStores/salesClues';

// components
import SearchInput from 'components/SearchInput';
import { ContainerView, DefaultHeaderView } from 'components/Styles/Layout';
import { ScreenTab, ListItem, ButtonList } from 'components/SwipeList';
import FlatListTable from 'components/FlatListTable';
import { Drawer, FilterSideBar, UpdateFieldSideBar } from 'components/Drawer';

// constants config
import {
  DrawerFilterMap,
} from '../../../constants/screenTab';
import {
  SalesCluesTimeTypeFilterMap,
  SalesCluesResponsibilityTypeFilterMap,
  FilterList,
} from './_fieldCfg';

const { nativeCallPhone } = NativeUtil;

useStrict(true);

@observer
class SalesClues extends React.Component {
  state = {
    activeIndex: 0,
    drawerVisible: false,
    filterList: FilterList,
    selectedList: [],
    sideBarType: 0,
    searchValue: null,
    // screenTab
    screenTabList: [
      SalesCluesTimeTypeFilterMap,
      SalesCluesResponsibilityTypeFilterMap,
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
    this.props.navigation.navigate(routers.createSalesClue);
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
    this.setState({ drawerVisible: false });
  };
  onOpenDrawer = () => {
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
  onFilter = async () => {
    const list = drawerUtils.handleFilterItem({
      list: this.state.filterList,
    });
    await this.setState({
      selectedList: list,
    });
    this.onCloseDrawer();
    this.getData();
  };
  onRowOpen = (index) => {
    this.safeCloseOpenRow(index);
    this.prevNodeIndex = index;
  };
  onEndReached = () => {
    const { total, list, pageNumber, loadingMore } = SalesCluesStore.salesClueList;
    if (list.length < total && loadingMore === false) {
      this.getData(pageNumber + 1);
    }
  };
  getData = (pageNumber = 1) => {
    const {
      state: {
        screenTabList,
        searchValue,
        selectedList,
      },
      props: {
        navigation: { state },
      },
    } = this;
    const params = state.params || {};
    let obj = {
      pageNumber,
      name: searchValue,
    };
    if (Object.keys(params).length) {
      obj = { ...obj, ...params };
    }
    // query header tab
    screenTabList.map((v, i) => {
      if (i === screenTabList.length - 1 || !v.list.length) return null;
      return v.list[v.selectedIndex].key;
    }).filter(_ => !!_).forEach((v, i) => {
      if (i === 0) {
        // obj.sortColumn = v;
      } else {
        obj[v] = true;
      }
    });
    // query sideBar
    selectedList.forEach((v) => {
      obj[v.key] = v.value;
    });
    console.log(obj);
    SalesCluesStore.getSalesClueListReq(filterObject(obj));
  };
  safeCloseOpenRow = (index) => {
    if (this.prevNodeIndex !== index && typeof this.prevNodeIndex !== 'undefined') {
      if (!this[`rows.${this.prevNodeIndex}`]) return;
      this[`rows.${this.prevNodeIndex}`]._root.closeRow();
    }
  };
  renderItem = (itemProps) => {
    const { index, item: prevItem } = itemProps;
    const statusText = prevItem.status ? LeadsStatus[prevItem.status] : null;
    const statusColor = statusText === '已联系' ? theme.primaryColor : null;
    // 格式化item
    const item = {
      ...prevItem,
      key: prevItem.id,
      title: prevItem.name,
      tipList: [prevItem.companyName],
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
            onPress={() => {
              // from select customer
              if (state.params && state.params.type === SalesClueType) {
                state.params.callback(item);
                goBack();
                return;
              }
              // form nav page
              navigate(routers.salesClueDetails, { item });
            }}
          />
        }
        right={
          <ButtonList
            list={[
              AddressIcon,
              PhoneIcon,
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
      salesClueList: { list, refreshing, loadingMore },
    } = SalesCluesStore;
    const flatProps = {
      data: list,
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
        onPressClose={this.onFilter}
      >
        <ContainerView
          bottomPadding
        >
          <CommStatusBar />
          <SearchInput
            placeholder="输入销售线索名称"
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
        </ContainerView>
      </Drawer>
    );
  }
}

SalesClues.navigationOptions = ({ navigation }) => {
  const { onPressRight, type } = navigation.state.params || {};
  const bool = type === SalesClueType;
  return {
    title: bool ? '选择销售线索' : '销售线索',
    headerLeft: (
      <LeftBackIcon
        onPress={() => navigation.goBack()}
      />
    ),
    headerRight: (
      bool ? <DefaultHeaderView /> : (
        <RightView
          onPress={onPressRight || (() => null)}
          right="新增"
          rightStyle={{
            color: theme.primaryColor,
          }}
        />
      )
    ),
  };
};

SalesClues.propTypes = {
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

export default SalesClues;
