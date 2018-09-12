## react-native

###版本环境
```html
node 8.0+(v8.11.1)
npm 5.0+(v5.6.0)
java (v1.8.0_172)
```
### 安装依赖
* Run 'yarn setup'

### 开发环境 ios/ android
* Run 'yarn ios'
* OR
* Run 'yarn android'

### 项目结构
```html
|--src     源文件
  |--components     组件
  |--constants      常量
  |--img            静态资源
  |--logicStores    mobx modal数据
  |--pages          页面(一个tabBar一个文件夹.)
    |--Card         共用 card
      |--CompanyDepartment          公司部门
      |--TeamMembers                团队成员
      |--TeamRoles                  团队成员2
    |--CRM          CRM tab
      |--Contacts                   联系人模块（Justin）
        |--Details.js               联系人详情页面
        |--Create.js                编辑联系人资料页面
        |--EditorMore.js            编辑更多联系人资料页面
        |--index.js                 列表页面
      |--Contract                   合同模块（Justin）
        |--Details.js               合同详情页面
        |--Create.js                编辑合同资料页面
        |--EditorMore.js            编辑更多合同资料页面
        |--index.js                 列表页面
      |--Customer                   客户模块
        |--CreateCustomer.js        新建客户页面
        |--CreateCustomerMore.js    新建客户更多页面
        |--Details.js               客户资料详情页面
        |--index.js                 列表页面
      |--MarkActivity               市场活动模块
        |--Details.js               市场活动详情页面
        |--index.js                 列表页面
      |--ModifyProductPrice         修改产品模块
        |--index.js                 列表页面
      |--PerfStatist                业绩统计模块（Justin）
        |--index.js                 列表页面
      |--PriceList                  价格表模块
        |--index.js                 列表页面
        |--InternalPriceList.js     内部价格表页面 ( 两个价格表一样, 需要优化 )
        |--StandardPriceList.js     标准价格表页面
      |--ProductList                产品目录模块
        |--index.js                 列表页面
      |--ReceivablePlan             回款计划模块（Justin）
        |--Create.js                编辑回款计划资料页面
        |--EditorMore.js            编辑更多回款计划资料页面
        |--Details.js               回款计划资料
        |--index.js                 列表页面
      |--ReceivableRecord           回款记录模块（Justin）
        |--Create.js                编辑回款记录资料页面
        |--EditorMore.js            编辑更多回款记录资料页面
        |--Details.js               回款计划资料
        |--index.js                 列表页面
      |--SalesChance                销售机会模块
        |--CreateSalesChance.js     新建销售机会页面
        |--Details.js               销售机会详情页面
        |--index.js                 列表页面  
      |--SalesClues                 销售线索模块
        |--CreateSalesClue.js       新增线索页面
        |--CreateSalesClueMore.js   新增线索更多页面
        |--Details.js               销售线索详情页面
        |--index.js                 列表页面
    |--Home        Home tab
    |--Modal       共用modal
      |--QueryBusiness              工商信息查询
    |-- 未完成
       添加产品
       相关文档
       关联业务
  |--service        服务API
  |--utils          工具文件夹
  |--app.js         
  |--config         xhr环境配置        
  |--router.js      路由配置        
  |--setup.js       全局入口js

|--package.json
|--install.sh       打包脚本
|--PROGRESS.md      进度md
|--README.md
```
