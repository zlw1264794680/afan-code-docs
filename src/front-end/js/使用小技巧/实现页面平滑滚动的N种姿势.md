# 实现页面平滑滚动的N种姿势

[实现页面平滑滚动的N种姿势](https://juejin.cn/post/6898670533567578125)

## css scroll-behavior

`scroll-bahavior: smooth;` 添加在滚动容器元素上，可以让容器的滚动变得平滑。例如在PC浏览器中，网页默认滚动是在  标签上的，移动端大多数在  标签上，我们可以给 `html` 和 `body` 都加上，在点击页面上的【返回顶部】按钮时，就可以实现页面的平滑滚动。

```css
html, body {
    scroll-bahavior: smooth;
}
```

到目前为止，并非所有的浏览器都支持该属性


## window.scrollTo()

`window.scrollTo(x, y)` 可以通过传入文档(HTML 中的 document)中的x轴坐标和y轴坐标将页面滚动到某个位置。该 API 还支持传入一个 `options` `对象，其中left属性等同于x轴坐标；top属性等同于y轴坐标；behavior` 属性表示滚动行为，其类型为 `String` ，可选值有 3 个： `smooth` (平滑滚动 )、 `instant` (瞬间滚动)、 `auto` (默认值)。 `auto` 实测效果等同于 `instant` 。


```js
window.scrollTo({
  left: 0, // x坐标
  top: 0,  // y 坐标
  behavior: 'smooth' // 可选值：smooth、instant、auto
})
```

所有主要浏览器都支持该 API ，但 IE浏览器和 Safari 浏览器不支持 options 选项


## Element.scrollIntoView()

DOM 元素的 `scrollIntoView()` 方法让当前的元素滚动到浏览器窗口的可视区域内。该方法支持传入一个 `scrollIntoViewOptions` 对象，其中的 `behavior` 属性定义滚动时的动画过渡效果，可选值为 `auto` 或 `smooth` ，默认值为 `auto` ，无动画效果； `smooth` 可使页面平滑滚动。

```js
target.scrollIntoView({
    behavior: "smooth"
});
```

我们随便打开一个有链接的页面，把首个链接滚动到屏幕外，然后控制台输入类似下面代码，我们就可以看到页面平滑滚动定位了：

```js
document.links[0].scrollIntoView({
    behavior: "smooth"
});
```

所有浏览器都支持该 API，但 IE浏览器 和 Safari 浏览器不支持 `scrollIntoViewOptions` 选项


## requestAnimationFrame

`requestAnimationFrame` 是浏览器用于定时循环操作的一个接口，类似于 `setTimeout` ，主要用途是按帧对网页进行重绘。这个API就是告诉浏览器，希望执行一个动画，让浏览器在下次重绘之前调用指定的回调函数更新动画。

`requestAnimationFrame` 使用一个回调函数作为参数，这个回调函数会在浏览器下一次重绘之前执行。

```js
requestID = window.requestAnimationFrame(callback);
```

`requestAnimationFrame` 的返回值是一个 `long 整数`，是回调列表中唯一的标识。可以将这个值传给 `window.cancelAnimationFrame()` 以取消回调函数。

我们使用 `requestAnimationFrame()` 来是实现返回页面顶部的效果：

```js
const backToTop = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop > 0) {
    window.scrollTo(0, scrollTop - scrollTop / 8);
    window.requestAnimationFrame(backToTop);
  }
}

window.requestAnimationFrame(backToTop);
```

需要注意的是， `requestAnimationFrame` 是在主线程上完成的。这意味着，如果主线程非常繁忙， `requestAnimationFrame` 的动画效果会大打折扣。

几乎所有的主流浏览器都支持 `window.requestAnimationFrame`



