# EventBus消息传递


在 `Vue` 中，常用的消息传递方式有四种：

- 组件属性、事件
- `provider` 和 `inject` 
- `vuex` 数据状态管理
- `EventBus`


`vuex` 一般配合 `localStorage` 实现本地化存储

## bus.js

```js
import Vue from 'vue'
const Bus = new Vue()
export default Bus
```

## 局部使用

父组件

```vue
import $bus from 'bus.js'
<!-- 监听事件触发 -->
$bus.$on('事件名称',(res)=>{
  console.log('事件参数',res)
})
```

子组件

```vue
import $bus from 'bus.js'
<!-- 事件触发 -->
$bus.$emit('事件名称',事件参数)
```

## 全局使用


main.js入口文件

```js
import $bus from 'bus.js'
Vue.prototype.$bus = $bus
```

父组件

```vue
<!-- 监听事件触发 -->
this.$bus.$on('事件名称',(res)=>{
  console.log('事件参数',res)
})
```

子组件

```vue
<!-- 事件触发 -->
this.$bus.$emit('事件名称',事件参数)
```
