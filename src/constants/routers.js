/**
 * @component routers.js
 * @description 路由配置
 * @time 2018/7/30
 * @author JUSTIN XU
 */
export default {
  // root tabView
  rootTabView: 'app.tabView.root',
  // common card
  // home module
  home: 'app.tabView.root.home',
  messageList: 'app.tabView.root.home.messageList',
  upcomingScheduleList: 'app.tabView.root.home.upcomingScheduleList',
  upcomingTaskList: 'app.tabView.root.home.upcomingTaskList',
  notificationList: 'app.tabView.root.home.notificationList',
  addSchedule: 'app.tabView.root.home.addSchedule',
  addTask: 'app.tabView.root.home.addTask',
  // crm module
  crm: 'app.tabView.root.crm',
  // customer module
  customer: 'app.tabView.root.crm.customer',
  createCustomer: 'app.tabView.root.crm.createCustomer',
  createCustomerMore: 'app.tabView.root.crm.createCustomerMore',
  customerDetails: 'app.tabView.root.crm.customerDetails',
  // salesChance module
  salesChance: 'app.tabView.root.crm.salesChance',
  createSalesChance: 'app.tabView.root.crm.createSalesChance',
  salesChanceDetails: 'app.tabView.root.crm.salesChanceDetails',
  // perfStatist module
  perfStatist: 'app.tabView.root.crm.perfStatist',
  // markActivity module
  markActivity: 'app.tabView.root.crm.markActivity',
  markActivityDetails: 'app.tabView.root.crm.markActivityDetails',
  // contacts module
  contacts: 'app.tabView.root.crm.contacts',
  contactDetails: 'app.tabView.root.crm.contactDetails',
  contactsEditor: 'app.tabView.root.crm.contactsEditor',
  // salesClues module
  salesClues: 'app.tabView.root.crm.salesClues',
  createSalesClue: 'app.tabView.root.crm.createSalesClue',
  createSalesClueMore: 'app.tabView.root.crm.createSalesClueMore',
  salesClueDetails: 'app.tabView.root.crm.salesClueDetails',
  // productList module
  productList: 'app.tabView.root.crm.productList',
  modifyProductPrice: 'app.tabView.root.crm.modifyProductPrice',
  // priceList module
  priceList: 'app.tabView.root.crm.priceList',
  internalPriceList: 'app.tabView.root.crm.internalPriceList',
  standardPriceList: 'app.tabView.root.crm.standardPriceList',
  // reimbursementPlan module
  receivablePlan: 'app.tabView.root.crm.receivablePlan',
  receivablePlanDetail: 'app.tabView.root.crm.receivablePlanDetail',
  // common model
  queryBusiness: 'app.tabView.root.model.queryBusiness',
  // common card
  companyDepartment: 'app.tabView.root.card.companyDepartment',
  teamMembers: 'app.tabView.root.card.teamMembers',
  teamRoles: 'app.tabView.root.card.teamRoles',
  // demo
  actionSheetDemo: 'app.tabView.root.demo.actionSheetDemo',
  mobxDemo: 'app.tabView.root.demo.mobxDemo',
};
