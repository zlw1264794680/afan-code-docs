# Promise踩坑

## 未捕获警告

错误：`Possible Unhandled Promise Rejection (id: 0)`

场景：使用rn开发，请求接口时报错，没有catch处理

解决方法：加上了catch，且catch返回的要是Promise.resolve状态

