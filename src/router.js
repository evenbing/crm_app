/**
 * @component router.js
 * @description 路由配置
 * @time 2018/6/23
 * @author JUSTIN XU
 */
import React from 'react';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import { Root } from 'native-base';
import { Image } from 'react-native';
import { observer } from 'mobx-react/native';
import styled from 'styled-components';
import { routers, theme } from './constants';
import { getHeaderPadding, getHeaderHeight } from './utils/utils';
import { moderateScale } from './utils/scale';
import { registerTopNavigator } from './utils/navigationService';
// root model
// import HomeModel from './logicStores/home';
// import MemberModel from './logicStores/member';
// root page -> common card
// import MemberRecordScreen from './pages/card/memberRecord';
// import MemberDetailScreen from './pages/card/memberDetail';
// import MemberSignListScreen from './pages/card/memberSignList';
// root page -> home
import HomeScreen from './pages/Home';
// root page -> CRM
import CRMScreen from './pages/CRM';
// root page -> CRM -> 客户 module
import CustomerScreen from './pages/CRM/Customer';
// root page -> CRM -> 销售机会 module
import SalesChanceScreen from './pages/CRM/SalesChance';
// root page -> CRM -> 业绩统计 module
import PerfStatistScreen from './pages/CRM/PerfStatist';
// root page -> CRM -> 市场活动 module
import MarkActivityScreen from './pages/CRM/MarkActivity';
// root page -> CRM -> 联系人 module
import ContactsScreen from './pages/CRM/Contacts';
import ContactDetailsScreen from './pages/CRM/Contacts/Details';
// root page -> CRM -> 销售线索 module
import SalesCluesScreen from './pages/CRM/SalesClues';
// root page -> CRM -> 产品目录
import ProductListScreen from './pages/CRM/ProductList';
// root page -> CRM -> 修改产品报价
import MidifyProductPriceScreen from './pages/CRM/ModifyProductPrice'
// root page -> CRM -> 价格表
import PriceListScreen from './pages/CRM/PriceList';
// root page -> CRM -> 回款计划
import ReimbursementPlanScreen from './pages/CRM/ReimbursementPlan';
// root page -> CRM -> 回款计划资料
import ReimbursementPlanDetailScreen from './pages/CRM/ReimbursementPlan/Detail';

// root page -> Demo page
import MobxDemoScreen from './pages/Demo/MobxDemo';
import ActionSheetDemoScreen from './pages/Demo/ActionSheetDemo';

const DefaultHeaderView = styled.View`
  flex: 1;
  flex-direction: row;
`;

const HomeRouteConfig = {
  [routers.home]: { screen: HomeScreen },
  [routers.actionSheetDemo]: { screen: ActionSheetDemoScreen },
  [routers.mobxDemo]: { screen: MobxDemoScreen },
};

const HomeNavigatorConfig = {
  initialRouteName: routers.home,
  cardStyle: { shadowColor: 'transparent' },
  navigationOptions: {
    // 设置导航条的样式。如果想去掉安卓导航条底部阴影可以添加elevation: 0,iOS去掉阴影是。
    headerStyle: {
      paddingTop: getHeaderPadding(),
      backgroundColor: '#333238',
      elevation: 0, // 去掉阴影
      height: getHeaderHeight(),
    },
    // 设置导航条文字样式。安卓上如果要设置文字居中，只要添加alignSelf:'center'就可以了
    headerTitleStyle: {
      color: 'white',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontSize: moderateScale(18),
      fontWeight: 'bold',
      textAlign: 'center',
    },
    headerLeft: (
      <DefaultHeaderView />
    ),
    headerRight: (
      <DefaultHeaderView />
    ),
  },
};

const HomeStack = StackNavigator(HomeRouteConfig, HomeNavigatorConfig);

HomeStack.navigationOptions = ({ navigation }) => ({
  tabBarVisible: navigation.state.index === 0,
  tabBarLabel: '主页',
  tabBarIcon: ({ focused }) => (
    focused ? (
      <Image
        source={require('./img/rootTabBar/home-focus.png')}
        style={{ width: moderateScale(24), height: moderateScale(22) }}
        resizeMode="contain"
      />
    ) : (
      <Image
        source={require('./img/rootTabBar/home.png')}
        style={{ width: moderateScale(24), height: moderateScale(22) }}
        resizeMode="contain"
      />
    )
  ),
});

const CrmRouteConfig = {
  [routers.crm]: { screen: CRMScreen },
  [routers.customer]: { screen: CustomerScreen },
  [routers.salesChance]: { screen: SalesChanceScreen },
  [routers.perfStatist]: { screen: PerfStatistScreen },
  [routers.markActivity]: { screen: MarkActivityScreen },
  [routers.salesClues]: { screen: SalesCluesScreen },
  [routers.contacts]: { screen: ContactsScreen },
  [routers.contactDetails]: { screen: ContactDetailsScreen },
  [routers.priceList]: { screen: PriceListScreen },
  [routers.productList]: { screen: ProductListScreen },
  [routers.modifyProductPrice]: { screen: MidifyProductPriceScreen },
  [routers.reimbursementPlan]: { screen: ReimbursementPlanScreen },
  [routers.reimbursementPlanDetail]: { screen: ReimbursementPlanDetailScreen },
};

const CrmNavigatorConfig = {
  ...HomeNavigatorConfig,
  initialRouteName: routers.crm,
};

const CrmStack = StackNavigator(CrmRouteConfig, CrmNavigatorConfig);

CrmStack.navigationOptions = ({ navigation }) => {
  const { index, params } = navigation.state;
  return {
    tabBarVisible: (params && params.hide) ? !params.hide : index === 1,
    tabBarLabel: 'CRM',
    tabBarIcon: ({ focused }) => (
      focused ? (
        <Image
          source={require('./img/rootTabBar/rank-focus.png')}
          style={{ width: 22, height: 20 }}
          resizeMode="contain"
        />
      ) : (
        <Image
          source={require('./img/rootTabBar/rank.png')}
          style={{ width: 22, height: 20 }}
          resizeMode="contain"
        />
      )
    ),
  };
};

const RootRouteConfig = {
  [routers.home]: { screen: HomeStack },
  [routers.crm]: { screen: CrmStack },
};

const RootNavigatorConfig = {
  initialRouteName: routers.crm,
  tabBarOptions: {
    activeTintColor: theme.primaryColor,
    inactiveTintColor: '#AAAAAA',
    labelStyle: {
      fontSize: 13,
    },
    style: {
      backgroundColor: '#FFFFFF',
      borderTopWidth: 0,
      shadowOpacity: 0.5,
      shadowRadius: 4,
      shadowColor: '#D2D2D2',
      shadowOffset: { width: 0, height: -3 },
      elevation: 2,
    },
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  lazy: true,
};

const RootNavigator = TabNavigator(RootRouteConfig, RootNavigatorConfig);

@observer
class Routers extends React.Component {
  render() {
    return (
      <Root>
        <RootNavigator
          ref={navigatorRef => registerTopNavigator(navigatorRef)}
          onNavigationStateChange={(prevNav, nav, action) => {
            const { routeName } = action;
            if (routers.home === routeName) {
              // HomeModel.getHomeDataReq();
              return false;
            }
            if (routers.crm === routeName) {
              // MemberModel.getMemberDataReq();
              return false;
            }
          }}
        />
      </Root>
    );
  }
}

export default Routers;
