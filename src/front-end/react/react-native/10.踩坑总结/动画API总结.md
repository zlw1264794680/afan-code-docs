# 动画API总结

目前有俩种实现动画的方式：

- Animated API
- LayoutAnimation API

## 实现Tab切换动效

## 实现折叠面板组件

定义折叠面板组件，FoldablePanel

```jsx
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, ScrollView, Button } from 'react-native';
const FoldablePanel = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    setExpand(prevState => {
      Animated.timing(animatedValue, {
        toValue: !prevState ? contentHeight : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      // animatedValue.setValue(!prevState ? contentHeight : 0);
      return !prevState;
    });
  };
  const handleLayout = event => {
    const height = event.nativeEvent.layout.height;
    height !== 0 && (expand || contentHeight === 0) && setContentHeight(height);
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View>
        <Button title="折叠" onPress={handleExpand} />
      </View>
      <Animated.View
        onLayout={handleLayout}
        style={[
          !contentHeight && {
            position: 'absolute',
            left: -9999,
            top: -9999,
          },
          contentHeight && {
            height: animatedValue,
          },
        ]}>
        <Text
          style={{
            wrap: 'wrap',
          }}>
          这是折叠内容这是折叠内容这是折叠内容这是折叠内容这是折叠内容
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default FoldablePanel;

```

使用

```jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import FoldablePanel from './FoldablePanel';

const App = ()=>{
  return {
      <View style={{
        direction: 'row',
        justifyContent: 'flex-start',
      }}>
        <FoldablePanel />
        <FoldablePanel />
      </View>
  }
}
```


## 踩坑总结

### 为什么动画不执行？？？

初始化的那一次，动画是不会被执行的！！！请检查一下，是不是给动画组件如`Animated.View`赋值的时候，一直处于初始化赋值状态（即第一次赋值状态）
