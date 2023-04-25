# px2dp尺寸转换

在 RN 中，尺寸单位是 `dp`。而我们开发使用的是`px`设计图，那有没有类似`rpx`的单位，答案是没有，但是可以自己定义一个！！！

## Dimensions API

```jsx
// 本模块用于获取设备屏幕的宽高。
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
```

## px2dp方法定义

```js
const ReferenceWidth = 750;
// 比例 ： windowWidth/ReferenceWidth = dp/px
const px2dp = (px)=>{
  return px * windowWidth / ReferenceWidth;
}
```

## 在 RN 中使用

```jsx
import {  StyleSheet } from "react-native";

const styles = StyleSheet.create({
  width: px2dp(750),
  height: px2dp(500)
})
```
