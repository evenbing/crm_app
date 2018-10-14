### 接口注意事项

> (1) 平台接口, find接口查询list
当需要分页, 默认传入:
 *   pageNumber 页码 默认1开始
 *   pageSize 每页数量 传入0为全部
 
> (2) 平台接口list，

  当没有数据 不会返回result字段, errors 为list 并且index为0 会返回错误
  导致rpc不能通用处理，建议结构解构值操作。页面展示无数据
  
