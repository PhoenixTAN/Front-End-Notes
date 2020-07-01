# Git Workflow
参考：

https://github.com/gienah-studio/Fafnir/wiki/%E7%90%A6%E5%A7%90%E7%9A%84%E5%A4%A7%E5%AE%9D%E5%89%91-%E2%80%94%E2%80%94-Git-Workflow

## flow

1. fork一个remote develop库，称为remote origin.

2. git clone你的remote orgin，得到local repo.
    ```
    $ git clone ssh-url
    ```

好了，现在一共有三个库.
1. upstream: 比如说master，或者develop.
2. origin: 你自己fork出来的repo.
3. local repo: 本地计算机。

好了，过了一段时间，有个队友提交了Merge Request，然后组长把remote develop库，也就是upstream更新了。那么我们就要把自己的local repo跟upstream库同步一下。


### 将 local repo 跟 remote develop库 同步
1. 查看当前分指。
    ```
    $ git branch --all

    * develop
    remotes/origin/HEAD -> origin/develop
    remotes/origin/develop
    remotes/origin/master
    ```
    现在在local develop分支。

2. 查看当前remote库都有哪些。
    ```
    $ git remote -v

    origin  git@gitlab.local.pinon.io:ziqitan/psr-frontend-sis.git (fetch)
    origin  git@gitlab.local.pinon.io:ziqitan/psr-frontend-sis.git (push)
    ```
    并没有远程的upstream库。

3. 将upstream加入local的remote repos里面。
    ```
    $ git remote add upstream ssh-url
    ```
    upstream是自定义的名字，ssh-url就是remote repo的url.

4. 查看remote库。
    ```
    $ git remote -v
    origin  git@gitlab.local.pinon.io:ziqitan/psr-frontend-sis.git (fetch)
    origin  git@gitlab.local.pinon.io:ziqitan/psr-frontend-sis.git (push)
    upstream        git@gitlab.local.pinon.io:web/psr-frontend-sis.git (fetch)
    upstream        git@gitlab.local.pinon.io:web/psr-frontend-sis.git (push)
    ```
    现在remote加进去了。
5. 把远程库的分支添加到本地库。
    ```
    $ git fetch upstream
    From gitlab.local.pinon.io:web/psr-frontend-sis
    * [new branch]      develop    -> upstream/develop
    * [new branch]      master     -> upstream/master
    ```

    ```
    $ git branch --all
    * develop
    remotes/origin/HEAD -> origin/develop
    remotes/origin/develop
    remotes/origin/master
    remotes/upstream/develop
    remotes/upstream/master
    ```
    好了，远程库的分支都已经加进来了。

6. rebase大法，别用merge了。
    ```
    $ git rebase develop upstream/develop
    Successfully rebased and updated detached HEAD.
    
    $ git branch --all
    * (no branch)
    develop
    remotes/origin/HEAD -> origin/develop
    remotes/origin/develop
    remotes/origin/master
    remotes/upstream/develop
    remotes/upstream/master
    
    $ git checkout develop
    # 你需要将upstrem新的东西保存到新的branch里面
    Warning: you are leaving 1 commit behind, not connected to any of your branches:

        93fc294 Fix share picture adaptation problem.

    If you want to keep it by creating a new branch, this may be a good time
    to do so with:

    git branch \<new-branch-name> 93fc294

    Switched to branch 'develop'
    Your branch is up to date with 'origin/develop'.
    
    $ git branch --all
    * develop
    remotes/origin/HEAD -> origin/develop
    remotes/origin/develop
    remotes/origin/master
    remotes/upstream/develop
    remotes/upstream/master

    $ git branch new-branch 93fc294
    
    $ git branch --all
    * develop
    new-branch
    remotes/origin/HEAD -> origin/develop
    remotes/origin/develop
    remotes/origin/master
    remotes/upstream/develop
    remotes/upstream/master

    $ git checkout new-brach
    # 切换到新的branch,你会发现已经得到最新的upstream了。

    $ git push origin new-branch
    就可以了
    ```
### 开始写代码
1. git add .
2. git commit

### 提交Merge Request之前，还要继续将你的branch rebase到最新的upstream里面，把之前的commit都合并成1个

继续将你的branch rebase到最新的upstream里面:
1. git fetch upstream
2. git rebase develop upstream/develop
3. git checkout develop
4. git branch new-branch commit-id
5. 冲突处理


把之前的commit都合并成1个:
1. git log
2. git reset HEAD~3 --soft 
    比如你commit了三次
3. git add .
4. git commit
5. git push orgin new-branch


## 有了fork为什么要有branch
方便管理和可视化。

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

## 其他
