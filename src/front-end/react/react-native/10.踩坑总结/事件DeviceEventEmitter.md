# 事件DeviceEventEmitter

```jsx
import { DeviceEventEmitter } from 'react-native';

// 触发
DeviceEventEmitter.emit('EVENT');
// 监听
const listener = DeviceEventEmitter.addListener( 'EVENT', () => {});
// 移除
listener.remove()
```

使用案例：[自定义折叠面板](./%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8A%98%E5%8F%A0%E9%9D%A2%E6%9D%BF.md)
