/**
 * @component index.js
 * @description 销售线索页面
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

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout/index';
import SearchInput from '../../../components/SearchInput';
import { ContainerView } from '../../../components/Styles/Layout';
import { ScreenTab, ListItem, ButtonList } from '../../../components/SwipeList/index';
import FlatListTable from '../../../components/FlatListTable';
import { Drawer, FilterSideBar, UpdateFieldSideBar } from '../../../components/Drawer';

import { FilterList } from './_fieldCfg';
import MarkActivityStore from '../../../logicStores/markActivity';
import {
  MarkActivityTimeTypeFilterMap,
  MarkActivityResponsibilityTypeFilterMap,
  DrawerFilterMap,
} from '../../../constants/screenTab';
import { formatDate } from '../../../utils/base';

useStrict(true);

@observer
class SalesClues extends React.Component {
  state = {
    activeIndex: 0,
    drawerVisible: false,
    filterList: FilterList,
    selectedList: [],
    sideBarType: 0,
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
    this.props.navigation.navigate(routers.markActivityEditor);
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
    console.log(index);
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
    // ContractModel.getContactListReq(obj);
    MarkActivityStore.getMarkActivityListReq({ pageNumber });
  };

  safeCloseOpenRow = (index) => {
    if (this.prevNodeIndex !== index && typeof this.prevNodeIndex !== 'undefined') {
      this[`rows.${this.prevNodeIndex}`]._root.closeRow();
    }
  };

  keyExtractor = item => item.key;

  renderItem = (props) => {
    const { index } = props;
    const {
      navigation: { navigate },
    } = this.props;
    return (
      <SwipeRow
        disableRightSwipe
        ref={(row) => { this[`rows.${props.index}`] = row; }}
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
            {...props}
            onPress={() => navigate(routers.markActivityDetails)}
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
        screenTabList,
      },
    } = this;
    const {
      markActivityList: { list, refreshing, loadingMore },
    } = MarkActivityStore;
    const data = list.map((item) => {
      const {
        id,
        name,
        beginDate,
        endDate = '1535990400000',
        status = 0,
      } = item;
      return ({
        key: id,
        title: name,
        tipList: [
          `开始时间：${formatDate(new Date(parseInt(beginDate, 10)), 'yyyy-MM-dd')}`,
          `结束时间：${formatDate(new Date(parseInt(endDate, 10)), 'yyyy-MM-dd')}`,
        ],
        status,
      });
    });
    const flatProps = {
      data,
      renderItem: this.renderItem,
      keyExtractor: this.keyExtractor,
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

SalesClues.navigationOptions = ({ navigation }) => ({
  title: '市场活动',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: (
    <RightView
      onPress={() => { navigation.navigate(routers.markActivityEditor); }}
      right="新增"
      rightStyle={{
        color: theme.primaryColor,
      }}
    />
  ),
});

SalesClues.defaultProps = {
  index: '',
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
  index: PropTypes.string,
};

export default SalesClues;

