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
    |--ProductList  产品目录
    |--PriceList    价格表
    |--card         多个tabBar公用页面
    |--...          更多
  |--service        服务API
  |--utils          工具文件夹
  |--app.js         
  |--config         xhr环境配置        
  |--router.js      路由配置        
  |--setup.js       全局入口js

|--package.json
|--README.md
```
