/**
 * @component index.js
 * @description 销售机会页面
 * @time 2018/8/6
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { useStrict, toJS } from 'mobx';
import { SwipeRow } from 'native-base';
import { observer } from 'mobx-react/native';
import { CommStatusBar, LeftBackIcon, RightView } from 'xn-react-native-applets';

// static source
import FollowIcon from 'img/crm/buttonList/follow.png';
import UnFollowIcon from 'img/crm/buttonList/unFollow.png';
import listIcon from 'img/crm/screenTab/list.png';
import boardIcon from 'img/crm/screenTab/board.png';

// constants
import { routers, theme } from 'constants';
import { CustomerType, ModuleType, SalesChanceType } from 'constants/enum';
import { TYPE_CUSTOMER_LIST } from 'constants/drawer';

// utils
import * as drawerUtils from 'utils/drawer';
import { filterObject, formatDateByMoment, getUserId } from 'utils/base';

// logicStores
import SalesChanceStore from 'logicStores/salesChance';

// components
import SearchInput from 'components/SearchInput';
import { ContainerView, DefaultHeaderView } from 'components/Styles/Layout';
import { ScreenTab, ListItem, ButtonList } from 'components/SwipeList';
import FlatListTable from 'components/FlatListTable';
import { Drawer, FilterSideBar, UpdateFieldSideBar } from 'components/Drawer';
import LeftItem from './components/LeftItem';
import BoardList from './components/BoardList';

// constants config
import {
  DrawerFilterMap,
} from '../../../constants/screenTab';
import {
  SalesChanceAmountTypeFilterMap,
  SalesChanceResponsibilityTypeFilterMap,
  IsBoardTypeMap,
  FilterList,
} from './_fieldCfg';

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
    searchValue: null,
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
    SalesChanceStore.findSalesPhaseReq({});
    this.getData();
  }
  onToggleType = () => {
    this.setState({ isBoard: !this.state.isBoard });
  };
  onPressRight = () => {
    this.props.navigation.navigate(routers.createSalesChance);
  }
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
  onRowOpen = (index) => {
    this.safeCloseOpenRow(index);
    this.prevNodeIndex = index;
  };
  onEndReached = () => {
    const {
      total,
      list,
      pageNumber,
      loadingMore,
    } = SalesChanceStore.salesChanceList;
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
    } = this;
    const obj = {
      pageNumber,
      name: searchValue,
    };
    // query header tab
    screenTabList.map((v, i) => {
      if (i === screenTabList.length - 1 || !v.list.length) return null;
      return v.list[v.selectedIndex].key;
    }).filter(_ => !!_).forEach((v, i) => {
      if (i === 0) {
        obj.sortColumn = v;
      } else if (i === 1) {
        obj[v] = true;
      }
    });
    // query sideBar
    selectedList.forEach((v) => {
      if (v.type === TYPE_CUSTOMER_LIST) {
        obj[v.key] = [v.value];
      } else {
        obj[v.key] = v.value;
      }
    });
    console.log(obj);
    SalesChanceStore.getSalesChanceListReq(filterObject(obj));
  };

  safeCloseOpenRow = (index) => {
    if (this.prevNodeIndex !== index && typeof this.prevNodeIndex !== 'undefined') {
      if (!this[`rows.${this.prevNodeIndex}`]) return;
      this[`rows.${this.prevNodeIndex}`]._root.closeRow();
    }
  };
  renderItem = (itemProps) => {
    const { index, item } = itemProps;
    const {
      navigation: { navigate, state, goBack },
    } = this.props;
    const FollowImage = item.follow ? FollowIcon : UnFollowIcon;
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
              <LeftItem {...item} />
            }
            onPress={() => {
              // from select salesChance
              if (state.params && state.params.type === SalesChanceType) {
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
              FollowImage,
            ]}
            onPressItem={({ index }) => {
              if (index === 0) {
                SalesChanceStore.updateFollowStatusReq({
                  objectType: ModuleType.opportunity,
                  objectId: item.id,
                  objectName: item.name,
                  followTime: formatDateByMoment(new Date()),
                  userId: getUserId(),
                  //
                  follow: item.follow,
                  followId: item.followId,
                });
                return false;
              }
              return false;
            }}
          />
        }
      />
    );
  };
  renderSection = () => {
    const {
      salesChanceList: { list, refreshing, loadingMore },
    } = SalesChanceStore;
    const salesPhases = SalesChanceStore.salesPhaseList.list.map(item => ({ ...item }));
    const flatProps = {
      data: list,
      renderItem: this.renderItem,
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
      <BoardList data={toJS(list)} salesPhases={salesPhases} />
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
        drawerVisible,
        selectedList,
        screenTabList,
        isBoard,
        searchValue,
      },
    } = this;
    screenTabList[2].icon = !isBoard ? listIcon : boardIcon;
    screenTabList[2].focusIcon = !isBoard ? listIcon : boardIcon;
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
            placeholder="输入机会名称"
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
