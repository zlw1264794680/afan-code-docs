# Promise踩坑

## 未捕获警告

场景：请求接口时报错，在 `catch` 进行逻辑错误处理后，再 `Project.reject` 出去，这样是确保不会“错误转移”

但是会导致控制台警告 `Possible Unhandled Promise Rejection (id: 0)`，但不会影响程序运行

## 实际应用

对于程序运行产生的不必要的、意外的错误，直接抛出 `throw` ，由全局错误事件控制错误。

对于业务逻辑返回的错误处理，在 `catch` 处理完后，不做任何处理，返回的是 `Project.resolve(undefined)`，使用时需要判空处理。


