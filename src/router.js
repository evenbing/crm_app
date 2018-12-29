/**
 * @component router.js
 * @description 路由配置
 * @time 2018/6/23
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import { Image } from 'react-native';
import { AboutScreen, DevicesUtil } from 'xn-react-native-applets';
import { routers, theme } from './constants';
import { DefaultHeaderView } from './components/Styles/Layout';
import { moderateScale } from './utils/scale';

// root page -> loading
import AuthLoadingScreen from './pages/AuthLoading';

// root page -> common card
import CompanyDepartmentScreen from './pages/Card/CompanyDepartment';
import TeamRolesScreen from './pages/Card/TeamRoles';
import SelectDepartmentScreen from './pages/Card/SelectDepartment';
import SelectEmployeeScreen from './pages/Card/SelectEmployee';
// root page -> common modal
import QueryBusinessScreen from './pages/Modal/QueryBusiness';
import TypePickerScreen from './pages/Modal/TypePicker';
// root page -> home
import HomeScreen from './pages/Home';
// root page -> home -> SelectYear
import SelectYearScreen from './pages/Modal/SelectYear';
// root page -> home -> MessageList
import MessageListScreen from './pages/Home/MessageList';
// root page -> home -> UpcomingScheduleList
import UpcomingScheduleListScreen from './pages/Home/UpcomingScheduleList';
// root page -> home -> UpcomingTaskList
import UpcomingTaskListScreen from './pages/Home/UpcomingTaskList';
// root page -> home -> AddSchedule
import AddScheduleScreen from './pages/Home/AddSchedule';
// root page -> home -> AddTask
import AddTaskScreen from './pages/Home/AddTask';
// root page -> home -> TaskDetails
import TaskDetailsScreen from './pages/Home/TaskDetails';
// root page -> home -> ScheduleDetails
import ScheduleDetailsScreen from './pages/Home/ScheduleDetails';
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
import SalesChanceModifyProductPriceScreen from './pages/CRM/SalesChance/ModifyProductPrice';
// root page -> CRM -> 业绩统计 module
import PerfStatistScreen from './pages/CRM/PerfStatist';
import FollowUpStatScreen from './pages/CRM/PerfStatist/FollowUpStat';
// root page -> CRM -> 市场活动 module
import MarkActivityScreen from './pages/CRM/MarkActivity';
import MarkActivityDetailsScreen from './pages/CRM/MarkActivity/Details';
import MarkActivityCreateScreen from './pages/CRM/MarkActivity/Create';
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
import SalesPhasePickerScreen from './pages/Modal/SalesPhasePicker';
import ProductPickerScreen from './pages/Modal/ProductPicker';

const { getStatusBarHeight } = DevicesUtil;

const HomeRouteConfig = {
  [routers.home]: { screen: HomeScreen },
  [routers.selectYear]: { screen: SelectYearScreen },
  [routers.messageList]: { screen: MessageListScreen },
  [routers.upcomingScheduleList]: { screen: UpcomingScheduleListScreen },
  [routers.upcomingTaskList]: { screen: UpcomingTaskListScreen },
  [routers.addSchedule]: { screen: AddScheduleScreen },
  [routers.addTask]: { screen: AddTaskScreen },
  [routers.taskDetails]: { screen: TaskDetailsScreen },
  [routers.scheduleDetails]: { screen: ScheduleDetailsScreen },

  // common
  [routers.typePicker]: { screen: TypePickerScreen },
  [routers.selectEmployee]: { screen: SelectEmployeeScreen },
  [routers.companyDepartment]: { screen: CompanyDepartmentScreen },
  [routers.teamRoles]: { screen: TeamRolesScreen },
  [routers.moduleTypePicker]: { screen: ModuleTypePickerScreen },
  [routers.moduleList]: { screen: ModuleListScreen },
  [routers.cityPicker]: { screen: CityPickerScreen },
};

const HomeNavigatorConfig = {
  initialRouteName: routers.home,
  cardStyle: { shadowColor: 'transparent' },
  mode: 'card',
  transitionConfig: theme.transitionConfig,
  navigationOptions: {
    headerStyle: {
      paddingTop: getStatusBarHeight(true),
      backgroundColor: '#ffffff',
      height: theme.headerHeight + getStatusBarHeight(true),
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      color: '#333238',
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
  [routers.salesChanceModifyProductPrice]: { screen: SalesChanceModifyProductPriceScreen },

  [routers.perfStatist]: { screen: PerfStatistScreen },
  [routers.followUpStat]: { screen: FollowUpStatScreen },

  [routers.markActivity]: { screen: MarkActivityScreen },
  [routers.markActivityDetails]: { screen: MarkActivityDetailsScreen },
  [routers.markActivityCreate]: { screen: MarkActivityCreateScreen },
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
  [routers.teamRoles]: { screen: TeamRolesScreen },
  [routers.selectDepartment]: { screen: SelectDepartmentScreen },
  [routers.typePicker]: { screen: TypePickerScreen },
  [routers.salesPhasePicker]: { screen: SalesPhasePickerScreen },
  [routers.cityPicker]: { screen: CityPickerScreen },
  [routers.selectEmployee]: { screen: SelectEmployeeScreen },
  [routers.productPicker]: { screen: ProductPickerScreen },
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

const TabBarRouteConfig = {
  [routers.home]: { screen: HomeStack },
  [routers.crm]: { screen: CrmStack },
};

const TabBarNavigatorConfig = {
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

const TabBarStack = TabNavigator(TabBarRouteConfig, TabBarNavigatorConfig);

const RootRouteConfig = {
  [routers.authLoading]: { screen: AuthLoadingScreen },
  [routers.about]: { screen: AboutScreen },
  [routers.tabView]: { screen: TabBarStack },
  // common
};

const RootNavigatorConfig = {
  initialRouteName: routers.authLoading,
  cardStyle: { shadowColor: 'transparent' },
  mode: 'modal',
  headerMode: 'none',
};

export default StackNavigator(RootRouteConfig, RootNavigatorConfig);
