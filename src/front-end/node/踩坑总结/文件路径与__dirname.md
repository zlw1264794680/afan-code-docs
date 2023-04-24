# 文件路径与__dirname

在 node 中，拼接 or 解析路径的是 path 库。 而读取文件的是 fs 库。

## files.ts 工具文件

```ts
import fs from 'fs'
import path from 'path'

// 获取当前路径下的文件夹
export function getCurDir(relativePath:string){
  return getFilesDir(relativePath,{
    type:'dir'
  })
}
// 获取当前路径下的文件，没有后缀，只处理md文件
export function getCurFile(relativePath:string){
  return getFilesDir(relativePath,{
    type:'file',
    include:['md'],
    showSuffix:false
  })
}

// 获取当前路径下的文件、文件夹名称
type Type = 'all' | 'dir' | 'file'
interface IOptions {
  type?:Type;
  showSuffix?: boolean;
  include?:string[];
}
export function getFilesDir(absPath: string,{
  type  = 'all',
  showSuffix = true,
  include= [],
}:IOptions) {
  const files = fs.readdirSync(absPath);

  let fileNames: string[] = [];

  // 遍历文件夹下的文件和子文件夹
  files.forEach(function(file) {
    const fullPath = path.resolve(absPath, file);

    if ((type === 'all' || type === 'dir') && fs.statSync(fullPath).isDirectory()) {
      // 如果是子文件夹，则将其加入到数组中
      fileNames.push(file);
    } else if (type === 'all' || type === 'file' && (!include?.length || include.some(suffix => file.includes(suffix)))) {
      // 如果是文件，则将其加入到数组中
      const name = showSuffix ? file : getFileName(file)
      fileNames.push(name);
    }
  });

  return fileNames;
}

// 获取文件名，不包含后缀
export function getFileName(filePath:string) {
  const { name, ext } = path.parse(filePath);
  return name;
}

```

其中，`__dirname`变量，是 `node` 内置变量，用来获取当前文件的路径的。

## __dirname 的 注意点

定义在 `files.ts` 文件下的函数，在别的文件中调用，内部的 `__dirname` 还是指向 `files.ts` 文件的路径。

## path.resolve 和 path.join 的区别

在`Node.js`中，`path.resolve()` 和 `path.join()` 方法都可以用来拼接文件路径，但它们的实现方式有所不同。

### path.resolve()

`path.resolve()` 方法会将传入的路径解析为绝对路径。如果参数是一个绝对路径，则直接返回该路径；否则，将参数从右到左依次进行拼接，构建出完整的绝对路径。同时，`path.resolve()`方法还可用于判断两个路径之间的相对位置关系。

**注意：参数顺序是从右到左！且返回的一定是绝对路径！**

例如：

```javascript
const path = require('path');

console.log(path.resolve('/foo/bar', './baz')); // 输出：/foo/bar/baz
console.log(path.resolve('/foo/bar', '/tmp/file/')); // 输出：/tmp/file
console.log(path.resolve('/foo/bar', '/tmp/file/','./af')); // 输出：/tmp/file/af
```

在以上代码中，`path.resolve()` 方法分别将 `/foo/bar` 和 `./baz、/foo/bar` 和 `/tmp/file/` 进行拼接，得到了两个路径的绝对路径。第二个示例中传入的是一个绝对路径，因此直接返回该路径。

### path.join()

`path.join()` 方法也可以用来拼接文件路径，但与 `path.resolve()` 不同的是，它只是简单地将参数按顺序进行拼接，并返回拼接后的新路径。如果某个参数是绝对路径，则之前的参数均会被忽略。

**注意：参数顺序是从右到左！且返回的不一定是绝对路径！**

例如：

```javascript
const path = require('path');

console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')); // 输出：/foo/bar/baz/asdf
```

在以上代码中，`path.join()` 方法将 `/foo`、`bar`、`baz/asdf`、`quux` 和 `..` 依次进行拼接，并返回新路径 `/foo/bar/baz/asdf`。

因此，`path.resolve()` 和 `path.join()` 在实现方式上有所不同，应视情况而选择合适的方法。

## 拓展

在 `Node.js` 中，可以使用 `process.cwd()` 方法获取当前进程的工作目录，即项目的根目录！！！


