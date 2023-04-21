# git配置ssh

当https拉取仓库的方式，太慢时，可以配置ssh，进行拉取。

## git config --global xxx

打开 `git bash`，分别执行以下两句命令：用户名和邮箱，尽量与仓库的保持一致。（用户名是可以随便起的，邮箱就尽量保持一致）

通过 `git config --list`查看配置信息。

```shell
git config --global user.name “用户名”
git config --global user.email “邮箱”
```

## 执行生成公钥和私钥的命令

```shell
# 执行命令后，一直按回车到生成
ssh-keygen -t rsa
```

## 执行查看公钥的命令

`.ssh` 如果不做特殊处理的话，`window`下，一般是在`C:\Users\Administrator`目录下。如果看不到`.ssh`文件，可以使用`ls -ah`指令查看隐藏文件夹即可，这是存放秘钥的文件，打开这个文件会看到`id_rsa`和`id_rsa.pub`。`id_rsa` 是私钥文件，`id_rsa.pub`是公钥文件。

```shell
cat ~/.ssh/id_rsa.pub
```

## 仓库配置

在仓库设置上，将公钥信息配置到ssh即可