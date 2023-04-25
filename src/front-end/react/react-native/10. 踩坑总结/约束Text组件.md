# 约束Text组件

原生的Text组件，在跨端的差异比较大，且一般需要更改交多的属性默认值。所以约束Text组件，自定义Text组件。

## 差异

- `Text` 的 `fontSize` 默认值会跟随系统字体大小设置，需要设置。 
- 在 RN 中，默认的 `Text` 组件字体大小对于 iOS 和 Android 平台是不同的。
  - 在 iOS 平台上，Text 组件的默认字体大小为 17 磅（pt），而在 Android 平台上默认值为 14 磅（sp）。 
  - 同样的，最小字体大小也可能因为平台而有所不同。在 iOS 平台上，默认情况下文本不会缩小到 11 磅以下，而在 Android 平台上，文本不会缩小到 12 磅以下。这些大小限制可能会因特定设备和用户设置而变化。 
  - 总之，在设置文本字体大小时，请根据你的目标平台正确设置大小，并避免使用过小的字体，以确保应用程序的可读性和易用性。
- RN 标签元素默认不具备css继承性，但是`Text`组件具备。

## Text 的 小技巧

- 在 `View` 下的 `Text` 相当于 `p` 标签。 
- 在 `Text` 下的 `Text` 相当于 `span` 标签。
- `Text`下，通过 `{'\n'}` 实现 `<br/>` 的行换效果。

## 封装AText组件

目的：约束、统一 `Text` 样式

```jsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const AText = ({ children, style, ...restProps }) => {
  return (
    <Text style={[styles.text, style]} {...restProps}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    // 其他通用字体样式属性
  },
});

export default AText;
```

这样子写，有以下优点：
- 可以在整个应用程序中使用这个自定义的 `AText` 组件，而不需要重复编写相同的字体和样式属性。
- 通过传递 `style` 属性，可以覆盖默认样式，从而实现更细粒度的控制。
- `restProps` 参数允许我们传递任意其他属性到原始的 Text 组件中。



