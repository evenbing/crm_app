/**
 * @component index.js
 * @description 联系人页面
 * @time 2018/8/6
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { useStrict } from 'mobx';
import { SwipeRow } from 'native-base';
import { observer } from 'mobx-react/native';
import { CommStatusBar, LeftBackIcon, RightView, NativeUtil } from 'xn-react-native-applets';

// static source
import AddressIcon from 'img/crm/buttonList/address.png';
import PhoneIcon from 'img/crm/buttonList/phone.png';

// constants
import { theme, routers } from 'constants';
import { ContactsType } from 'constants/enum';

// utils
import { filterObject } from 'utils/base';
import * as drawerUtils from 'utils/drawer';

// components
import SearchInput from 'components/SearchInput';
import { ContainerView, DefaultHeaderView } from 'components/Styles/Layout';
import { ScreenTab, ListItem, ButtonList } from 'components/SwipeList/index';
import FlatListTable from 'components/FlatListTable';
import { Drawer, FilterSideBar, UpdateFieldSideBar } from 'components/Drawer';
import LeftItem from './components/LeftItem';

import ContactsModel from '../../../logicStores/contacts';

// constants config
import {
  DrawerFilterMap,
} from '../../../constants/screenTab';
import {
  ContactsTimeTypeFilterMap,
  ContactsResponsibilityTypeFilterMap,
  FilterList,
} from './_fieldCfg';


useStrict(true);

const { nativeCallPhone } = NativeUtil;

@observer
class Contacts extends React.Component {
  state = {
    activeIndex: 0,
    drawerVisible: false,
    filterList: FilterList,
    selectedList: [],
    sideBarType: 0,
    searchValue: null,
    // screenTab
    screenTabList: [
      ContactsTimeTypeFilterMap,
      ContactsResponsibilityTypeFilterMap,
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
    this.props.navigation.navigate(routers.contactCreate);
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
    const { total, list, pageNumber, loadingMore } = ContactsModel.contactList;
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
    const { customerId } = state.params || {};
    const obj = {
      pageNumber,
      companyName: searchValue,
    };
    if (customerId) {
      obj.customerId = customerId;
    }
    // query header tab
    screenTabList.map((v, i) => {
      if (i === screenTabList.length - 1 || !v.list.length) return null;
      return v.list[v.selectedIndex].key;
    }).filter(_ => !!_).forEach((v, i) => {
      if (i === 0) {
        obj.sortColumn = v;
      } else {
        obj[v] = true;
      }
    });
    // query sideBar
    selectedList.forEach((v) => {
      obj[v.key] = v.value;
    });
    ContactsModel.getContactListReq(filterObject(obj));
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
            onPress={() => {
              // from select customer
              if (state.params && state.params.type === ContactsType) {
                state.params.callback(item);
                goBack();
                return;
              }
              // form nav page
              navigate(routers.contactDetails, { item });
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
                nativeCallPhone(item.mobilePhone || item.phoneNumber);
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
      contactList: { list, refreshing, loadingMore },
    } = ContactsModel;
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
        onPressClose={this.onFilter}
      >
        <ContainerView
          bottomPadding
        >
          <CommStatusBar />
          <SearchInput
            placeholder="输入客户名称"
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

Contacts.navigationOptions = ({ navigation }) => {
  const { onPressRight, type } = navigation.state.params || {};
  const bool = type === ContactsType;
  return {
    title: bool ? '选择联系人' : '联系人',
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

Contacts.defaultProps = {};

Contacts.propTypes = {
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

export default Contacts;

