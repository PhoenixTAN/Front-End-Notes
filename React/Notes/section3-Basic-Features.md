# Understanding the basic features and syntax

## Build Workflow

### npm node package management

### Bundler 
Recommended: Webpack

### Complier (Next-Gen Javascript)
Babel + Preset

## Creating a React app
https://github.com/facebook/create-react-app
1. Download node.js just for the npm tool.
2. 
```
$ npm install create-react-app -g
```
-g means install globally in your machine.

```
$ npm install create-react-app -g
C:\Users\tanzi\AppData\Roaming\npm\create-react-app -> C:\Users\tanzi\AppData\Roaming\npm\node_modules\create-react-app\index.js
+ create-react-app@3.4.1
added 98 packages from 46 contributors in 5.558s

```

3. 
```
$ create-react-app ReactHelloApp
```

会遇到问题
```
create-react-app : File C:\Users\tanzi\AppData\Roaming\npm\create-react-app.ps1 cannot be loaded because running 
scripts is disabled on this system.
```

怎么解决：
- Run the window powershell as an administrator.
```
$ set-executionpolicy remotesigned
```

4. 
```
$ npm start
```

## Folder Structure


