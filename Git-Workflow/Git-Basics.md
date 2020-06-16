# Git Basics

![alt text](./images/git-transport.png)

## Introduction
Push data to remote repository.
1. git add 
2. git commit
3. git push

Pull data from remote repository.
1. git stash
2. git pull
3. git stash pop
4. 本地冲突处理

## Git Branches
Branches in Git are incredibly lightweight as well. They are simply pointers to a specific commit -- nothing more. 

This is why many Git enthusiasts chant the mantra:

`
branch early, and branch often
`


```
$ git branch BranchName
```

如果现在git commit,这个刚刚开的branch不会跟着master走。

That's because we weren't "on" the new branch, which is why the asterisk (*) was on master.

*星号star sign代表什么？代表当前工作的branch吗？

这样搞
```
$ git checkout <name>
```

## Git Merging
Now we need to learn some kind of way of **combining the work from two different branches together**.

This will allow us to branch off, develop a new feature, and then combine it back in.

### git merge
Merging in Git creates a special commit that has two unique parents. 

A commit with two parents essentially means "I want to include all the work from this parent over here and this one over here, and the set of all their parents."

#### We will merge the branch bugFix into master.
![alt text](./images/git-merge.png)

```
$ git merge bugFix
```

![alt text](./images/merge-fixBug.png)

// TODO
How about confliction? 冲突了怎么办？
#### We will merge the branch bugFix into master.
![alt text](./images/merge-master-into-bugFix.png)

Since bugFix was an ancestor of master, git didn't have to do any work; it simply just moved bugFix to the same commit master was attached to.

```
git checkout bugFix;
git merge master;
```

Now all the commits are the same color, which means each branch contains all the work in the repository! Woohoo!

![alt text](./images/merge-master-into-bugFix-2.png)

#### Practice
1. Make a new branch called `bugFix`
2. Checkout the `bugFix` branch with `git checkout bugFix`
3. Commit once
4. Go back to `master` with `git checkout`
5. Commit another time
6. Merge the branch `bugFix` into `master` with `git merge`

```
$ git branch checkout
$ git checkout branch
$ git commit

$ git checkout master
$ git commit
$ git merge bugFix
```

![alt text](./images/merge-pracitce.png)

### git rebase

![alt text](./images/git-rebase-1.png)

We would like to move our work from bugFix directly onto the work from master. That way it would look like these two features were developed sequentially, when in reality they were developed in parallel.

```
$ git rebase master
```

![alt text](./images/git-rebase-2.png)

```
$ git rebase bugFix
```

![alt text](./images/git-rebase-3.png)

