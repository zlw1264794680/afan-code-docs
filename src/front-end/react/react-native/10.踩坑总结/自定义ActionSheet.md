# 自定义ActionSheet

根据 原生 `ios` 的 `ActionSheet`样式，写一个兼容俩端的`ActionSheet`组件。

## 定义index.js

```jsx
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import ActionSheetIos from './ActionSheetIos';
import ActionSheetCustom from './ActionSheetCustom';
const ActionSheet = props => {
  return (
    <View>{Platform.OS === 'ios' ? <ActionSheetIos {...props} /> : <ActionSheetCustom {...props} />}</View>
  );
};

const styles = StyleSheet.create({});

export default ActionSheet;

```

## 定义props.js

```js
import PropTypes from 'prop-types';
export default {
  title: PropTypes.string,
  message: PropTypes.string,
  tintColor: PropTypes.string,
  onPress: PropTypes.func,
  cancelButtonIndex: PropTypes.number,
  destructiveButtonIndex: PropTypes.number,
  options: PropTypes.array,
};

```

## ios组件

ios端，使用原生的

```jsx
import React, { forwardRef, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, ActionSheetIOS } from 'react-native';
import propTypes from './props';
const ActionSheetIos = forwardRef((props, ref) => {
  const {
    title,
    message,
    tintColor = '#007AFF',
    onPress = () => {},
    cancelButtonIndex,
    destructiveButtonIndex,
    options,
  } = props;

  useImperativeHandle(ref, () => ({
    open: show,
  }));

  const show = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex,
        cancelButtonIndex,
        title,
        message,
        tintColor,
      },
      onPress,
    );
  };

  return (
    <View>
      <Text />
    </View>
  );
});
ActionSheetIos.propTypes = propTypes;
const styles = StyleSheet.create({});

export default ActionSheetIos;
```




## android组件

```jsx
import React, { useEffect, useState, useRef, isValidElement, forwardRef, useImperativeHandle } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import propTypes from './props';

const WARN_COLOR = '#FF3B30';
const MAX_HEIGHT = Dimensions.get('window').height * 0.7;

const isset = prop => {
  return typeof prop !== 'undefined';
};

const merge = (target, source) => {
  Object.keys(source).forEach(key => {
    if (Object.prototype.toString.call(source).slice(8, -1) === 'Object') {
      target[key] = merge(target[key] || {}, source[key]);
    } else {
      target[key] = source[key];
    }
  });
  return target;
};

const ActionSheetCustom = forwardRef((props, ref) => {
  const {
    title,
    message,
    tintColor = '#007AFF',
    onPress = () => {},
    cancelButtonIndex,
    destructiveButtonIndex,
    options,
  } = props;
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [translateY, setTranslateY] = useState(0);
  const [visible, setVisible] = useState(false);
  const [selectIndex, setSelectIndex] = useState({
    value: -1,
  });
  const sheetAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const height = _calculateHeight(props);
    setTranslateY(height);
    sheetAnim.setValue(height);
  }, [props]);

  useEffect(() => {
    if (visible) {
      _showSheet();
    } else {
      selectIndex.value > -1 && onPress(selectIndex.value);
    }
  }, [visible]);

  useEffect(() => {
    if (selectIndex.value > -1) {
      _hideSheet(() => {
        setVisible(false);
      });
    }
  }, [selectIndex]);

  useImperativeHandle(ref, () => ({
    open: show,
  }));

  const _calculateHeight = props => {
    const getHeight = name => {
      const style = styles[name];
      let h = 0;
      ['height', 'marginTop', 'marginBottom'].forEach(attrName => {
        if (typeof style[attrName] !== 'undefined') {
          h += style[attrName];
        }
      });
      return h;
    };

    let height = 0;
    if (props.title) height += getHeight('titleBox');
    if (props.message) height += getHeight('messageBox');
    if (isset(props.cancelButtonIndex)) {
      height += getHeight('cancelButtonBox');
      height += (props.options.length - 1) * getHeight('buttonBox');
    } else {
      height += props.options.length * getHeight('buttonBox');
    }

    if (height > MAX_HEIGHT) {
      setScrollEnabled(true);
      height = MAX_HEIGHT;
    } else {
      setScrollEnabled(false);
    }

    return height;
  };

  const show = () => {
    setVisible(true);
  };

  const hide = index => {
    setSelectIndex({
      value: index,
    });
  };

  const _showSheet = () => {
    Animated.timing(sheetAnim, {
      toValue: 0,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const _hideSheet = callback => {
    Animated.timing(sheetAnim, {
      toValue: translateY,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start(callback);
  };

  const _cancel = () => {
    // 保持和 ActionSheetIos 一致，
    // 未设置 cancelButtonIndex 时，点击背景不隐藏 ActionSheetCustom
    if (isset(cancelButtonIndex)) {
      hide(cancelButtonIndex);
    }
  };

  const _renderTitle = () => {
    if (!title) return null;
    return (
      <View style={styles.titleBox}>
        {isValidElement(title) ? title : <Text style={styles.titleText}>{title}</Text>}
      </View>
    );
  };

  const _renderMessage = () => {
    if (!message) return null;
    return (
      <View style={styles.messageBox}>
        {isValidElement(message) ? message : <Text style={styles.messageText}>{message}</Text>}
      </View>
    );
  };

  const _renderCancelButton = () => {
    if (!isset(cancelButtonIndex)) return null;
    return _createButton(options[cancelButtonIndex], cancelButtonIndex);
  };

  const _createButton = (title, index) => {
    const fontColor = destructiveButtonIndex === index ? WARN_COLOR : tintColor;
    const buttonBoxStyle = cancelButtonIndex === index ? styles.cancelButtonBox : styles.buttonBox;
    return (
      <TouchableOpacity key={index} style={buttonBoxStyle} onPress={() => hide(index)}>
        {isValidElement(title) ? (
          title
        ) : (
          <Text style={[styles.buttonText, { color: fontColor }]}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const _renderOptions = () => {
    return props.options.map((title, index) => {
      return cancelButtonIndex === index ? null : _createButton(title, index);
    });
  };

  return (
    <Modal visible={visible} animationType="none" transparent onRequestClose={_cancel}>
      <View style={[styles.wrapper]}>
        <Text style={[styles.overlay]} onPress={_cancel} />
        <Animated.View style={[styles.body, { height: translateY, transform: [{ translateY: sheetAnim }] }]}>
          <View
            style={{
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            {_renderTitle()}
            {_renderMessage()}
            <ScrollView scrollEnabled={scrollEnabled}>{_renderOptions()}</ScrollView>
          </View>
          {_renderCancelButton()}
        </Animated.View>
      </View>
    </Modal>
  );
});

ActionSheetCustom.propTypes = propTypes;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.4,
    backgroundColor: '#000',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  body: {
    flex: 1,
    alignSelf: 'flex-end',
  },
  titleBox: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  titleText: {
    color: '#757575',
    fontSize: 14,
  },
  messageBox: {
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  messageText: {
    color: '#9a9a9a',
    fontSize: 12,
  },
  buttonBox: {
    height: 50,
    borderTopWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 18,
  },
  cancelButtonBox: {
    height: 50,
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});

export default ActionSheetCustom;

```


## 第三方Actionsheet库

[react-native-actionsheet](https://github.com/beefe/react-native-actionsheet)
