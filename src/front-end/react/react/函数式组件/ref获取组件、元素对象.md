# ref获取组件、元素对象

## forwardRef使用

`forwardRef` 是 React 中的一个高阶函数，它主要用于在组件之间转发 refs。通过使用 `forwardRef` 函数，我们可以在父组件中直接操作子组件内部的 DOM 元素或组件实例。

通常情况下，在 React 组件中要访问子组件内部的 DOM 元素或组件实例，我们需要将 ref 传递给子组件，然后通过 `this.refs` 或 `React.createRef()` 来获取子组件的实例。而使用 `forwardRef` 函数可以使我们忽略这些步骤，从而更加方便地操作子组件。

以下是一个示例代码：

```jsx
const Child = React.forwardRef((props, ref) => {
  return <input type="text" ref={ref} />;
});

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    return <Child ref={this.inputRef} />;
  }
}
```

在上面的代码中，我们首先定义了一个名为 Child 的子组件，并通过 `React.forwardRef()` 函数将其转发 ref。然后，在父组件 Parent 中，我们创建了一个名为 inputRef 的 Ref 对象，并将其通过 props 属性传递给子组件 Child。

在挂载父组件时，我们使用 `this.inputRef.current.focus()` 方法来聚焦到子组件 Child 中的输入框，而无需在 Child 的回调函数中手动获取 ref。这是因为我们在 Child 组件中使用了 `React.forwardRef()` 函数，并将其转发给子元素，使得 inputRef 对象可以直接被操作。

需要注意的是，在使用 `forwardRef` 函数时，我们需要将其作为子组件的第一个参数，并将 ref 传递到组件内部所渲染的 DOM 元素或组件上。另外，我们还需要在父组件中通过 `React.createRef()` （或其他方式）创建 Ref 对象，并将其传递给子组件的 `ref` 属性。这样做才能确保 ref 能够正确地被转发到子组件的真实 DOM 元素或组件上。


## useImperativeHandle使用

`forwardRef`是用来转发 `refs` 的，如果我们需要暴露的是定义ref属性的组件本身，而不是让用来转发的呢？？？

```jsx
const Child = React.forwardRef((props, ref) => {

  const reset = () => {}
  
  // 暴露指定方法，到ref
  useImperativeHandle(ref, () => ({
    reset: reset,
  }));

  return <div>
    <input type="text" />
    <input type="text" />
    <input type="text" />
  </div>;
});

const Parent = ()=>{
  const childRef = useRef();
  const reset = ()=>{
    childRef.current.reset();
  }
  return <Child ref={childRef} />;
}
```

