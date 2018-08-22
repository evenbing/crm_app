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
    |--CRM          CRM tab
      |--Contacts               联系人模块
        |--Details.js           联系人详情页面
        |--Editor.js            编辑联系人资料页面
        |--index.js             列表页面
      |--Customer               客户模块
        |--CreateCustomer.js    新建客户页面
        |--**                   新建客户更多页面
        |--Details.js           客户资料详情页面
        |--index.js             列表页面
      |--MarkActivity           市场活动模块
        |--Details.js           市场活动详情页面
        |--index.js             列表页面
      |--ModifyProductPrice     修改产品模块
        |--index.js             列表页面
      |--PerfStatist            业绩统计模块
        |--index.js             列表页面
      |--PriceList              价格表模块
        |--index.js             列表页面
      |--ProductList            产品目录模块
        |--index.js             列表页面
      |--ReimbursementPlan      回款计划模块
        |--Details.js           回款计划资料
        |--index.js             列表页面
      |--SalesChance            销售机会模块
        |--***                  新建销售机会页面
        |--Details.js           销售机会详情页面
        |--index.js             列表页面  
      |--SalesClues             销售线索模块
        |--CreateClues.js       新增线索页面
        |--**                   新增线索更多页面（未完成）
        |--Details.js           销售线索详情页面
        |--index.js             列表页面
    |--Home        Home tab
    |--Modal       共用modal
      |--QueryBusiness          工商信息查询
    |--跟进统计(顺数第18个, 未完成。19-27 为列表筛选相关，待需求确定)
       名片识别（未完成）
       编辑资料（未完成，待需求确定详情是否一致）
       团队成员（未完成）
       添加产品（未完成）
       回款   （未完成）
       相关文档（未完成）
       内部价格表（未完成）
       关联业务（未完成）
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
