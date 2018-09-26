/**
 * @component router.js
 * @description 路由配置
 * @time 2018/6/23
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import RootModal from 'js-root-toast';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import { Root } from 'native-base';
import { Image } from 'react-native';
import { observer } from 'mobx-react/native';
import styled from 'styled-components';
import { routers, theme } from './constants';
import { getHeaderPadding, getHeaderHeight } from './utils/utils';
import { moderateScale } from './utils/scale';
import { registerTopNavigator } from './utils/navigationService';
// root page -> common card
import CompanyDepartmentScreen from './pages/Card/CompanyDepartment';
import TeamMembersScreen from './pages/Card/TeamMembers';
import TeamRolesScreen from './pages/Card/TeamRoles';
import SelectDepartmentScreen from './pages/Card/SelectDepartment';
// root page -> common modal
import QueryBusinessScreen from './pages/Modal/QueryBusiness';
import TypePickerScreen from './pages/Modal/TypePicker';
// root page -> home
import HomeScreen from './pages/Home';
// root page -> home -> SelectYear
import SelectYear from './pages/Modal/SelectYear';
// root page -> home -> MessageList
import MessageList from './pages/Home/MessageList';
// root page -> home -> UpcomingScheduleList
import UpcomingScheduleList from './pages/Home/UpcomingScheduleList';
// root page -> home -> UpcomingTaskList
import UpcomingTaskList from './pages/Home/UpcomingTaskList';
// root page -> home -> NotificationList
import NotificationList from './pages/Home/NotificationList';
// root page -> home -> AddSchedule
import AddSchedule from './pages/Home/AddSchedule';
// root page -> home -> AddTask
import AddTask from './pages/Home/AddTask';
// root page -> CRM
import CRMScreen from './pages/CRM';
// root page -> CRM -> 客户 module
import CustomerScreen from './pages/CRM/Customer';
import CustomerDetailsScreen from './pages/CRM/Customer/Details';
import CustomerDetailsMoreScreen from './pages/CRM/Customer/CreateCustomerMore';
import CreateCustomerScreen from './pages/CRM/Customer/CreateCustomer';
// root page -> CRM -> 合同 module
import ContractScreen from './pages/CRM/Contract';
import ContractDetailsScreen from './pages/CRM/Contract/Details';
import ContractCreateScreen from './pages/CRM/Contract/Create';
import ContractEditorMoreScreen from './pages/CRM/Contract/EditorMore';
import ReceivableScreen from './pages/CRM/Contract/Receivable';
// root page -> CRM -> 销售机会 module
import SalesChanceScreen from './pages/CRM/SalesChance';
import CreateSalesChanceScreen from './pages/CRM/SalesChance/CreateSalesChance';
import SalesChanceDetailsScreen from './pages/CRM/SalesChance/Details';
import SalesChanceEditorMoreScreen from './pages/CRM/SalesChance/EditorMore';
// root page -> CRM -> 业绩统计 module
import PerfStatistScreen from './pages/CRM/PerfStatist';
// root page -> CRM -> 市场活动 module
import MarkActivityScreen from './pages/CRM/MarkActivity';
import MarkActivityDetailsScreen from './pages/CRM/MarkActivity/Details';
import MarkActivityEditorScreen from './pages/CRM/MarkActivity/Editor';
import MarkActivityEditorMoreScreen from './pages/CRM/MarkActivity/EditorMore';
// root page -> CRM -> 联系人 module
import ContactsScreen from './pages/CRM/Contacts';
import ContactDetailsScreen from './pages/CRM/Contacts/Details';
import ContactCreateScreen from './pages/CRM/Contacts/Create';
import ContactEditorMoreScreen from './pages/CRM/Contacts/EditorMore';
// root page -> CRM -> 销售线索 module
import SalesCluesScreen from './pages/CRM/SalesClues';
import SalesClueDetailsScreen from './pages/CRM/SalesClues/Details';
import CreateSalesClueScreen from './pages/CRM/SalesClues/CreateSalesClue';
import CreateSalesClueMoreScreen from './pages/CRM/SalesClues/CreateSalesClueMore';
// root page -> CRM -> 产品目录
import ProductListScreen from './pages/CRM/ProductList';
import ModifyProductPriceScreen from './pages/CRM/ProductList/ModifyProductPrice';
// root page -> CRM -> 价格表
import PriceListScreen from './pages/CRM/PriceList';
import PriceProductListScreen from './pages/CRM/PriceList/PriceProductList';
// root page -> CRM -> 回款计划 module
import ReceivablePlanPlanScreen from './pages/CRM/ReceivablePlan';
import ReceivablePlanPlanDetailsScreen from './pages/CRM/ReceivablePlan/Details';
import ReceivablePlanPlanCreateScreen from './pages/CRM/ReceivablePlan/Create';
import ReceivablePlanPlanEditorMoreScreen from './pages/CRM/ReceivablePlan/EditorMore';
// root page -> CRM -> 回款记录 module
import ReceivableRecordScreen from './pages/CRM/ReceivableRecord';
import ReceivableRecordDetailsScreen from './pages/CRM/ReceivableRecord/Details';
import ReceivableRecordCreateScreen from './pages/CRM/ReceivableRecord/Create';
import ReceivableRecordEditorMoreScreen from './pages/CRM/ReceivableRecord/EditorMore';
// root page -> Card -> RelatedDocs
import RelatedDocs from './pages/Card/RelatedDocs';
// root page -> Modal
import ModuleTypePickerScreen from './pages/Modal/ModuleTypePicker';
import ModuleListScreen from './pages/Modal/ModuleTypePicker/ModuleList';
import CityPickerScreen from './pages/Modal/CityPicker';
// root page -> Demo page
import MobxDemoScreen from './pages/Demo/MobxDemo';
import ActionSheetDemoScreen from './pages/Demo/ActionSheetDemo';

const DefaultHeaderView = styled.View`
  flex: 1;
  flex-direction: row;
`;

const HomeRouteConfig = {
  [routers.home]: { screen: HomeScreen },
  [routers.selectYear]: { screen: SelectYear },
  [routers.actionSheetDemo]: { screen: ActionSheetDemoScreen },
  [routers.mobxDemo]: { screen: MobxDemoScreen },
  [routers.messageList]: { screen: MessageList },
  [routers.upcomingScheduleList]: { screen: UpcomingScheduleList },
  [routers.upcomingTaskList]: { screen: UpcomingTaskList },
  [routers.notificationList]: { screen: NotificationList },
  [routers.addSchedule]: { screen: AddSchedule },
  [routers.addTask]: { screen: AddTask },

  // common
  [routers.typePicker]: { screen: TypePickerScreen },
  [routers.teamMembers]: { screen: TeamMembersScreen },
  [routers.companyDepartment]: { screen: CompanyDepartmentScreen },
  [routers.teamRoles]: { screen: TeamRolesScreen },
  [routers.moduleTypePicker]: { screen: ModuleTypePickerScreen },
  [routers.moduleList]: { screen: ModuleListScreen },
  [routers.cityPicker]: { screen: CityPickerScreen },
};

const HomeNavigatorConfig = {
  initialRouteName: routers.home,
  cardStyle: { shadowColor: 'transparent' },
  navigationOptions: {
    headerStyle: {
      paddingTop: getHeaderPadding(true),
      backgroundColor: '#333238',
      elevation: 0, // 去掉阴影
      height: getHeaderHeight() - getHeaderPadding(),
    },
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

const homeTabBarIcon = ({ focused }) => (
  <Image
    source={focused ?
      require('./img/rootTabBar/home-focus.png') :
      require('./img/rootTabBar/home.png')
    }
    style={{ width: 24, height: 22 }}
    resizeMode="contain"
  />
);

homeTabBarIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
};

HomeStack.navigationOptions = ({ navigation }) => ({
  tabBarVisible: navigation.state.index === 0,
  tabBarLabel: '主页',
  tabBarIcon: homeTabBarIcon,
});

const CrmRouteConfig = {
  [routers.crm]: { screen: CRMScreen },

  [routers.customer]: { screen: CustomerScreen },
  [routers.createCustomer]: { screen: CreateCustomerScreen },
  [routers.createCustomerMore]: { screen: CustomerDetailsMoreScreen },
  [routers.customerDetails]: { screen: CustomerDetailsScreen },

  [routers.contract]: { screen: ContractScreen },
  [routers.contractDetails]: { screen: ContractDetailsScreen },
  [routers.contractCreate]: { screen: ContractCreateScreen },
  [routers.contractEditorMore]: { screen: ContractEditorMoreScreen },
  [routers.receivable]: { screen: ReceivableScreen },

  [routers.salesChance]: { screen: SalesChanceScreen },
  [routers.createSalesChance]: { screen: CreateSalesChanceScreen },
  [routers.salesChanceDetails]: { screen: SalesChanceDetailsScreen },
  [routers.salesChanceEditorMore]: { screen: SalesChanceEditorMoreScreen },

  [routers.perfStatist]: { screen: PerfStatistScreen },

  [routers.markActivity]: { screen: MarkActivityScreen },
  [routers.markActivityDetails]: { screen: MarkActivityDetailsScreen },
  [routers.markActivityEditor]: { screen: MarkActivityEditorScreen },
  [routers.markActivityEditorMore]: { screen: MarkActivityEditorMoreScreen },

  [routers.salesClues]: { screen: SalesCluesScreen },
  [routers.createSalesClue]: { screen: CreateSalesClueScreen },
  [routers.createSalesClueMore]: { screen: CreateSalesClueMoreScreen },
  [routers.salesClueDetails]: { screen: SalesClueDetailsScreen },

  [routers.contacts]: { screen: ContactsScreen },
  [routers.contactDetails]: { screen: ContactDetailsScreen },
  [routers.contactCreate]: { screen: ContactCreateScreen },
  [routers.contactEditorMore]: { screen: ContactEditorMoreScreen },

  [routers.priceList]: { screen: PriceListScreen },
  [routers.priceProductList]: { screen: PriceProductListScreen },

  [routers.productList]: { screen: ProductListScreen },
  [routers.modifyProductPrice]: { screen: ModifyProductPriceScreen },

  [routers.receivablePlan]: { screen: ReceivablePlanPlanScreen },
  [routers.receivablePlanDetails]: { screen: ReceivablePlanPlanDetailsScreen },
  [routers.receivablePlanCreate]: { screen: ReceivablePlanPlanCreateScreen },
  [routers.receivablePlanEditorMore]: { screen: ReceivablePlanPlanEditorMoreScreen },

  [routers.receivableRecord]: { screen: ReceivableRecordScreen },
  [routers.receivableRecordDetails]: { screen: ReceivableRecordDetailsScreen },
  [routers.receivableRecordCreate]: { screen: ReceivableRecordCreateScreen },
  [routers.receivableRecordEditorMore]: { screen: ReceivableRecordEditorMoreScreen },

  // common
  [routers.queryBusiness]: { screen: QueryBusinessScreen },
  [routers.companyDepartment]: { screen: CompanyDepartmentScreen },
  [routers.relatedDocs]: { screen: RelatedDocs },
  [routers.teamMembers]: { screen: TeamMembersScreen },
  [routers.teamRoles]: { screen: TeamRolesScreen },
  [routers.selectDepartment]: { screen: SelectDepartmentScreen },
  [routers.typePicker]: { screen: TypePickerScreen },
  [routers.cityPicker]: { screen: CityPickerScreen },
};

const CrmNavigatorConfig = {
  ...HomeNavigatorConfig,
  initialRouteName: routers.crm,
};

const CrmStack = StackNavigator(CrmRouteConfig, CrmNavigatorConfig);

const crmTabBarIcon = ({ focused }) => (
  <Image
    source={focused ?
      require('./img/rootTabBar/rank-focus.png') :
      require('./img/rootTabBar/rank.png')
    }
    style={{ width: 22, height: 20 }}
    resizeMode="contain"
  />
);

crmTabBarIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
};

CrmStack.navigationOptions = ({ navigation }) => ({
  tabBarVisible: navigation.state.index === 0,
  tabBarLabel: 'CRM',
  tabBarIcon: crmTabBarIcon,
});

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
            // const { routeName } = action;
            // if (routers.home === routeName) {
            //   // HomeModel.getHomeDataReq();
            //   return false;
            // }
            // 插件toast
            global.$RootToast && RootModal.hide(global.$RootToast);
          }}
        />
      </Root>
    );
  }
}

export default Routers;
