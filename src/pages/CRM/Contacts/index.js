/**
 * @component index.js
 * @description 联系人页面
 * @time 2018/8/6
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { StatusBar } from 'react-native';
import { useStrict } from 'mobx';
import { SwipeRow } from 'native-base';
import { observer } from 'mobx-react/native';
import { theme, routers } from '../../../constants';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout/index';
import SearchInput from '../../../components/SearchInput';
import { ContainerView } from '../../../components/Styles/Layout';
import { ScreenTab, ListItem, ButtonList } from '../../../components/SwipeList/index';
import FlatListTable from '../../../components/FlatListTable';
import LeftItem from './components/LeftItem';
import { Drawer } from '../../../components/Drawer';
import SideBar from './components/SideBar';

useStrict(true);

@observer
class Contacts extends React.Component {
  state = {
    activeIndex: 0,
    drawerVisible: false,
    filterList: [],
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }
  onPressRight = () => {
    this.props.navigation.navigate(routers.contactEditor);
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
  onFilter = (list = []) => {
    // TODO
    this.setState({
      filterList: list,
    });
    this.onCloseDrawer();
  }
  onRowOpen = (index) => {
    console.log(index);
    this.safeCloseOpenRow(index);
    this.prevNodeIndex = index;
  };
  safeCloseOpenRow = (index) => {
    if (this.prevNodeIndex !== index && typeof this.prevNodeIndex !== 'undefined') {
      this[`rows.${this.prevNodeIndex}`]._root.closeRow();
    }
  };
  renderItem = (props) => {
    const { index } = props;
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
            {...props}
            right="hidden"
            left={
              <LeftItem {...props} />
            }
            onPress={() => navigate(routers.contactDetails)}
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
  render() {
    const {
      state: {
        activeIndex,
        drawerVisible,
        filterList,
      },
    } = this;
    return (
      <Drawer
        isVisible={drawerVisible}
        content={
          <SideBar
            firstList={[
              { name: '不限' },
              { name: '本月' },
              { name: '本季' },
              { name: '本年' },
              { name: '已计划' },
              { name: '进行中' },
              { name: '已完成' },
            ]}
            onFilter={this.onFilter}
          />
        }
        onPressClose={this.onCloseDrawer}
      >
        <ContainerView
          bottomPadding
        >
          <CommStatusBar />
          <SearchInput placeholder="输入客户名称" />
          <ScreenTab
            data={['跟进时间', '我负责的', '筛选']}
            activeIndex={activeIndex}
            onChange={this.onChange}
            filterList={filterList}
          />
          <FlatListTable
            data={[
            { title: '李总', job: '市场总监', company: '阿里巴巴' },
            { title: '张总', job: '销售总监', company: '字节跳动' },
            { title: '何总', job: '人力总监', company: '腾讯科技' },
          ]}
            keyExtractor={item => item.title}
            renderItem={this.renderItem}
          />
        </ContainerView>
      </Drawer>
    );
  }
}

Contacts.navigationOptions = ({ navigation, screenProps }) => ({
  title: '联系人',
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

