/**
 * @component index.js
 * @description 回款计划页面
 * @time 2018/8/6
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StatusBar } from 'react-native';
import { useStrict } from 'mobx';
import { SwipeRow } from 'native-base';
import { observer } from 'mobx-react/native';
import { routers, theme } from '../../../constants';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout/index';
import SearchInput from '../../../components/SearchInput';
import { ContainerView } from '../../../components/Styles/Layout';
import { ScreenTab, ListItem, ButtonList } from '../../../components/Customer/index';
import FlatListTable from '../../../components/FlatListTable';
import TouchableView from '../../../components/TouchableView';
import { ActionSheet, Drawer } from '../../../components/Modal';
import LeftItem from './component/LeftItem';
import SideBar from './component/SideBar';

const FooterView = styled(TouchableView)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${theme.moderateScale(49)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${theme.whiteColor};
  border: 1px solid ${theme.borderColor};
`;

const FooterText = styled.Text`
  color: ${theme.primaryColor};
  font-size: ${theme.moderateScale(18)};
  font-family: ${theme.fontMedium};
`;

useStrict(true);

@observer
class ReceivablePlan extends React.Component {
  state = {
    activeIndex: 0,
    amountVisible: false,
    drawerVisible: false,
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }
  onCloseDrawer = () => {
    StatusBar.setBarStyle('light-content');
    this.setState({ drawerVisible: false });
  };
  onOpenDrawer = () => {
    StatusBar.setBarStyle('dark-content');
    this.setState({ drawerVisible: true });
  };
  onFilter = () => {
    // TODO
    this.onCloseDrawer();
  }
  onToggleAmountVisible = () => {
    this.setState({
      amountVisible: !this.state.amountVisible,
    });
  };
  onPressRight = () => alert('right');
  onChange = ({ index, isLast }) => {
    this.setState({ activeIndex: index });
    if (isLast) {
      this.onOpenDrawer();
    }
  };
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
            onPress={() => navigate(routers.receivablePlanDetail)}
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
        amountVisible,
        drawerVisible,
      },
    } = this;
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
    return (
      <Drawer
        isVisible={drawerVisible}
        content={
          <SideBar
            statusList={[{
              name: '不限',
            }, {
              name: '已计划',
            }, {
              name: '进行中',
            }, {
              name: '已完成',
            }]}
            navigator={this.navigator}
            timeList={[{
              name: '不限',
            }, {
              name: '已计划',
            }, {
              name: '进行中',
            }, {
              name: '已完成',
            }, {
              name: '本月',
            }, {
              name: '本季',
            }, {
              name: '本年',
            }]}
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
          />
          <FlatListTable
            data={[
              {
                time: '20180909-0001',
                customer: '客户：西风网络',
                contract: '合同：西风网络销售合同',
                returnMoney: '计划回款：¥10,000.00',
                returnTime: '计划日期：2018-09-09',
              },
              {
                time: '20180909-0002',
                customer: '客户：阿里巴巴',
                contract: '合同：西风网络销售合同',
                returnMoney: '计划回款：¥10,000.00',
                returnTime: '计划日期：2018-09-09',
              },
              {
                time: '20180909-0003',
                customer: '客户：字节跳动',
                contract: '合同：西风网络销售合同',
                returnMoney: '计划回款：¥10,000.00',
                returnTime: '计划日期：2018-09-09',
              },
            ]}
            keyExtractor={item => item.time}
            renderItem={this.renderItem}
          />
          <ActionSheet {...amountActionSheetProps} />
          <FooterView onPress={this.onToggleAmountVisible}>
            <FooterText>数据合计</FooterText>
          </FooterView>
        </ContainerView>
      </Drawer>
    );
  }
}

ReceivablePlan.navigationOptions = ({ navigation, screenProps }) => ({
  title: '回款计划',
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

