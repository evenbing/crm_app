/**
 * @component routers.js
 * @description 路由配置
 * @time 2018/7/30
 * @author JUSTIN XU
 */
export default {
  // initial loading Stack
  authLoading: 'app.authLoading',
  // tabView
  tabView: 'app.root.tabView',
  // home module
  home: 'app.tabView.root.home',
  messageList: 'app.tabView.root.home.messageList',
  upcomingScheduleList: 'app.tabView.root.home.upcomingScheduleList',
  upcomingTaskList: 'app.tabView.root.home.upcomingTaskList',
  addSchedule: 'app.tabView.root.home.addSchedule',
  addTask: 'app.tabView.root.home.addTask',
  taskDetails: 'app.tabView.root.home.taskDetails',
  scheduleDetails: 'app.tabView.root.home.scheduleDetails',
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
  salesChanceEditorMore: 'app.tabView.root.crm.salesChanceDetails.salesChanceEditorMore',
  salesChanceModifyProductPrice: 'app.tabView.root.crm.salesChance.salesChanceModifyProductPrice',
  // perfStatist module
  perfStatist: 'app.tabView.root.crm.perfStatist',
  followUpStat: 'app.tabView.root.crm.followUpStat',
  // markActivity module
  markActivity: 'app.tabView.root.crm.markActivity',
  markActivityDetails: 'app.tabView.root.crm.markActivityDetails',
  markActivityCreate: 'app.tabView.root.crm.markActivityCreate',
  markActivityEditorMore: 'app.tabView.root.crm.markActivityEditorMore',
  // contacts module
  contacts: 'app.tabView.root.crm.contacts',
  contactDetails: 'app.tabView.root.crm.contactDetails',
  contactCreate: 'app.tabView.root.crm.contactCreate',
  contactEditorMore: 'app.tabView.root.crm.contactsEditorMore',
  // contract module
  contract: 'app.tabView.root.crm.contract',
  contractDetails: 'app.tabView.root.crm.contractDetails',
  contractCreate: 'app.tabView.root.crm.contractCreate',
  contractEditorMore: 'app.tabView.root.crm.contractEditorMore',
  receivable: 'app.tabView.root.crm.contract.receivable',
  // salesClues module
  salesClues: 'app.tabView.root.crm.salesClues',
  salesClueDetails: 'app.tabView.root.crm.salesClueDetails',
  createSalesClue: 'app.tabView.root.crm.createSalesClue',
  createSalesClueMore: 'app.tabView.root.crm.createSalesClueMore',
  // productList module
  productList: 'app.tabView.root.crm.productList',
  modifyProductPrice: 'app.tabView.root.crm.modifyProductPrice',
  // priceList module
  priceList: 'app.tabView.root.crm.priceList',
  priceProductList: 'app.tabView.root.crm.priceProductList',
  // receivablePlan module
  receivablePlan: 'app.tabView.root.crm.receivablePlan',
  receivablePlanDetails: 'app.tabView.root.crm.receivablePlanDetail',
  receivablePlanCreate: 'app.tabView.root.crm.receivablePlanCreate',
  receivablePlanEditorMore: 'app.tabView.root.crm.receivablePlanEditorMore',
  // receivableRecord module
  receivableRecord: 'app.tabView.root.crm.receivableRecord',
  receivableRecordDetails: 'app.tabView.root.crm.receivableRecordDetail',
  receivableRecordCreate: 'app.tabView.root.crm.receivableRecordCreate',
  receivableRecordEditorMore: 'app.tabView.root.crm.receivableRecordEditorMore',
  // common model
  queryBusiness: 'app.tabView.root.model.queryBusiness',
  selectYear: 'app.tabView.root.model.selectYear',
  typePicker: 'app.tabView.root.model.typePicker',
  moduleTypePicker: 'app.tabView.root.model.moduleTypePicker',
  cityPicker: 'app.tabView.root.model.cityPicker',
  salesPhasePicker: 'app.tabView.root.model.salesPhasePicker',
  productPicker: 'app.tabView.root.model.productPicker',
  // common card
  companyDepartment: 'app.tabView.root.card.companyDepartment',
  teamRoles: 'app.tabView.root.card.teamRoles',
  relatedDocs: 'app.tabView.root.card.relatedDocs',
  selectDepartment: 'app.tabView.root.card.selectDepartment',
  moduleList: 'app.tabView.root.card.moduleList',
  selectEmployee: 'app.tabView.root.card.selectEmployee',
};
