# transition 的使用

在 RN 中，也可以正常使用 `transform` ，只是使用的方式比较特殊。如下：

```jsx
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  box{
    width: 100,
    height: 100,
    backgroundColor: 'red',
    transform:[
      {
        //  translate:[-50,-50] // 不存在这种写法
         translateX: -50,
         translateY: -50,
      }
    ]
  }
});
```

注意，当前 `react-native` 的版本是 `0.70.6`。该版本下，`translateX` 和 `translateY`只能写 `number` 类型，不能是`string`类型（即不能是百分比）。

但是，之前的版本是可以的。参考：https://github.com/software-mansion/react-native-reanimated/issues/3262


