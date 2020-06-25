# Git Workflow
https://github.com/gienah-studio/Fafnir/wiki/%E7%90%A6%E5%A7%90%E7%9A%84%E5%A4%A7%E5%AE%9D%E5%89%91-%E2%80%94%E2%80%94-Git-Workflow

## fork to get your origin repo
Deep copy a repo of someone else.

## git clone your origin repo to your local
git clone with ssh or https

Now in your view, you have three repo:
1. upstream: the repo from someone else.比如说组里面的库。
2. origin: 你自己fork出来的repo.
3. local repo: 本地计算机。

## 在本地加入upstream repo
查看你的remote repo.
```
$ git remote -v
$ git remote --help
```

```
# git remote add custom-repo-name-like-upstream repo-ssh-url
$ git remote add upstream url
```

```
$ git remote -v
```

## 有了fork为什么要有branch
方便管理和可视化。

## new a branch
1. 首先要确保你的branch是最新的。
```
$ git fetch upstream
```
2. 新建分支
```
$ git branch your-branch-name
```
3. 切换分支
```
$ git switch your-branch-name
``` 

## 从本地push到你的fork
- git status
- git commit
- git push ziqitan new-branch

## create merge request或者叫pull request
告诉自己的组长，你写完了，可以merge了。

提交的request有可能有冲突，自己在本地进行冲突处理。

这时候就要用rebase
```
$ git rebase master your-branch
```
这时候就要把新的branch，重新base于master，本地处理冲突，再提交。

## 查看修改了什么
```
$ git diff HEAD^
```

## Branch Visualization
```
$ git branc --grap
```
