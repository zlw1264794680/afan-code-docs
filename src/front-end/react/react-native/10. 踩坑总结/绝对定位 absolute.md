# 绝对定位 absolute

RN 中的 绝对定位元素是没有办法撑开高度设置自适应（`height:auto;`）的父元素的！！！

## 场景

这里想要实现的一个功能是，折叠组件。特别的是，折叠组件的内容，在展开时，要绝对定位。即覆盖住其他元素的效果，而不是顶开其他元素。

一开始的思路是，类似 `web` 的子绝父相，父级定义 `relative` 即可，子元素定义 `absolute` 、`top`、`left`，并动态设置高度 `height`。

这在 `web` 端是可以实现子元素撑开父元素（实际上父元素没有被撑开，但是视觉上被撑开了，即内容不会被父元素隐藏），且能覆盖住其他元素，非顶开其他元素。

代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .panel{
            width: 600px;
            background-color: aqua;
        }
        .panel-header{
            width: 100%;
            height: 50px;
            text-align: center;
            line-height: 50px;
        }
        .panel-content{
            position:relative;
            border: 1px solid #000;
        }
        .slot-content{
            position:absolute;
            width: 100%;
            height: 0;
            overflow: hidden;
            background-color: pink;
        }
    </style>
</head>
<body>
    <div class="panel">
        <div class="panel-header" onclick="handleExpand()">这是头部</div>
        <div class="panel-content">
            <div id="slot-content" class="slot-content">这是内容</div>
        </div>
    </div>
    <script>
        function handleExpand(){
           const slotContent =  document.getElementById('slot-content')
           console.log(slotContent.style.height);
           slotContent.style.height = slotContent.style.height === 'auto' ?  0 : 'auto'
        }
    </script>
</body>
</html>
```

但是同样的代码，在 RN 中，实现不了！！！原因在于，RN中的绝对定位元素，无法撑开任何父元素。


## 踩坑

- 绝对定位元素，在设置了`border-radius` 或者 `border` 的父元素下，超出边界会隐藏。（需要在测试下！！！）
- 绝对定位元素，无法撑开页面的滚动条，因为页面滚动条必须由`ScrollView`等具备滚动特性的组件实现，而绝对定位元素，无法撑开父容器。
