# node版本管理工具

介绍使用过的俩个，`nvm`、`volta`

## nvm 

[nvm-windows的github地址](https://github.com/coreybutler/nvm-windows/releases) ，node版本管理工具，在`window`上无法设置默认版本，但是在`mac`上，可以设置。

### 常用命令

```shell
# 查看版本
nvm --version

# 查看版本
nvm list
nvm ls

# 下载版本
nvm install xxx

# 卸载版本
nvm uninstall xxx

# 使用版本
nvm use xxx

# 查看当前版本
nvm current
node -v

# mac设置默认版本
nvm alias default xxx

# 查看api
nvm help
```

## volta

[volta官方文档](https://volta.sh/)，推荐使用该node版本管理工具，在`window`上可以设置默认版本。window系统，可以通过exe文件，下一步到底安装完成。

### 推荐的原因

跨平台支持、工具安装稳定。。。


### 常用命令

```shell
# 查看版本
volta --version

# 将工具缓存到本地，方便使用，下次不用重新下载
volta fetch       

# 下载一个工具例如 volta install node@14(自动下载稳定版本)   切换node版本也可以使用此命令
volta install   

# 卸载一个工具，指定详细名称如node/npm/cnpm/yarn   （暂不支持，只能暴力删除）
volta uninstall    

# 将使用的工具版本固定到json中
volta pin        

# 查看当前使用工具的版本,后面加上工具名称如node/npm/cnpm/yarn都可以  
volta list       

# 不知道有啥用
volta completions  

# 查看volta安装目录
volta which   

# 切换当前使用的用户,没啥用     
volta setup      

# 没啥用
volta help         
```

## 暴力删除

[Support volta uninstall for node and yarn ](https://github.com/volta-cli/volta/issues/327)


## 参考资料

[还在用nvm做node管理工具？快来试试Volta吧！](https://juejin.cn/post/7085383981100695565#heading-2)


## node版本

node版本，默认14，这是公认比较稳定的。


## 技巧

[使用Volta进行版本管理](https://js-mark.com/%E5%89%8D%E7%AB%AF/%E4%BD%BF%E7%94%A8Volta%E8%BF%9B%E8%A1%8C%E7%89%88%E6%9C%AC%E7%AE%A1%E7%90%86/)

`volta install <package name>` 安装 `tools` 时与网络有关系，有时会死活下载不下来（主要应该是国内网络环境的原因），可以将自己手动下载的压缩包，或者其他机器上已经使用 `volta` 安装过该工具所下载的压缩包（在 `%VOLTA_HOME%\tools\inventory\` 目录中），拷贝到 `%VOLTA_HOME%\tools\inventory\` 下对应的文件夹内，比如将 `node-v12.18.2-win-x64.zip` 复制到 `%VOLTA_HOME%\tools\inventory\node\` 目录下，然后再重新执行 `install` 命令。



