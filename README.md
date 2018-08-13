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
    |--CRM          首页CRM
      |--Contacts           联系人模块
        |--Details.js       联系人详情页面
        |--index.js         列表页面
      |--Customer           客户模块
        |--index.js         列表页面
      |--MarkActivity       市场活动模块
        |--index.js         列表页面
      |--ModifyProductPrice 修改产品模块
        |--index.js         列表页面
      |--PerfStatist        业绩统计模块
        |--index.js         列表页面
      |--PriceList          价格表模块
        |--index.js         列表页面
      |--ProductList        产品目录模块
        |--index.js         列表页面
      |--ReimbursementPlan  回款计划模块
        |--detail           回款计划资料
        |--index.js         列表页面
      |--SalesChance        销售机会模块
        |--index.js         列表页面  
      |--SalesClues         销售线索模块
        |--index.js         列表页面 
      |--card         多个tabBar公用页面
      |--...          更多
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
