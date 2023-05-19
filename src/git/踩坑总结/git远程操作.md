# git 远程操作


## 切换远程仓库

```shell
# 删除原仓库地址
git remote rm origin

# 添加新仓库地址
git remote add origin （仓库地址）

# 直接修改
git remote set-url origin （仓库地址）
```

## 更新远程分支列表

```shell
# 更新远程分支列表
git remote update origin --prune

# 简写
git remote update origin --p
```
