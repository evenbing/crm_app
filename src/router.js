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
import { routers, theme } from './constants';
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

const HomeStack = StackNavigator({
  [routers.home]: { screen: HomeScreen },
}, {
  initialRouteName: routers.home,
  cardStyle: { shadowColor: 'transparent' },
  headerMode: 'none',
});

HomeStack.navigationOptions = ({ navigation }) => {
  const { index } = navigation.state;
  return {
    tabBarVisible: index === 0,
    tabBarLabel: '首页',
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
  };
};

const MemberStack = StackNavigator({
  [routers.member]: { screen: DemoScreen },
}, {
  initialRouteName: routers.member,
  cardStyle: { shadowColor: 'transparent' },
  headerMode: 'none',
});

MemberStack.navigationOptions = ({ navigation }) => {
  const { index, params } = navigation.state;
  return {
    tabBarVisible: (params && params.hide) ? !params.hide : index === 0,
    tabBarLabel: '会员',
    tabBarIcon: ({ focused }) => (
      focused ? (
        <Image
          source={require('./img/rootTabBar/member-focus.png')}
          style={{ width: 22, height: 20 }}
          resizeMode="contain"
        />
      ) : (
        <Image
          source={require('./img/rootTabBar/member.png')}
          style={{ width: 22, height: 20 }}
          resizeMode="contain"
        />
      )
    ),
  };
};

const RootRouteConfig = {
  [routers.home]: { screen: HomeStack },
  [routers.member]: { screen: MemberStack },
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
            if (routers.member === routeName) {
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
