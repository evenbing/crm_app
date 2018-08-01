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
import { registerTopNavigator } from './utils/navigationService';
// root model
// import HomeModel from './logicStores/home';
// import MemberModel from './logicStores/member';
// root page -> common card
// import CardPerformanceScreen from './pages/card/performance';
// import MemberRecordScreen from './pages/card/memberRecord';
// import MemberDetailScreen from './pages/card/memberDetail';
// import MemberSignListScreen from './pages/card/memberSignList';
// root page -> home
import HomeScreen from './pages/Home';
// root page -> member
import DemoScreen from './pages/Demo';

const DefaultHeaderView = styled.View`
  flex: 1;
  flex-direction: row;
`;

const HomeRouteConfig = {
  [routers.home]: { screen: HomeScreen },
};

const HomeNavigatorConfig = {
  initialRouteName: routers.home,
  cardStyle: { shadowColor: 'transparent' },
  navigationOptions: {
    // // 设置导航条的样式。如果想去掉安卓导航条底部阴影可以添加elevation: 0,iOS去掉阴影是。
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
      fontSize: 16,
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
        style={{ width: 24, height: 22 }}
        resizeMode="contain"
      />
    ) : (
      <Image
        source={require('./img/rootTabBar/home.png')}
        style={{ width: 24, height: 22 }}
        resizeMode="contain"
      />
    )
  ),
});

const CrmRouteConfig = {
  [routers.crm]: { screen: DemoScreen },
};

const CrmNavigatorConfig = {
  ...HomeNavigatorConfig,
  initialRouteName: routers.demo,
};

const CrmStack = StackNavigator(CrmRouteConfig, CrmNavigatorConfig);

CrmStack.navigationOptions = ({ navigation }) => {
  const { index, params } = navigation.state;
  return {
    tabBarVisible: (params && params.hide) ? !params.hide : index === 0,
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
  initialRouteName: routers.home,
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
