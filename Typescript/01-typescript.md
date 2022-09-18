# Typescript Introduction

## Introduction 

TypeScript is an open-source programming language developed and maintained by Microsoft.

It is a strict syntactical superset of JavaScript and adds optional static typing to the language. 

```
$ npm install -g typescript
```

新建一个文件ts,写js代码。
```
tsc index.ts
```
得到一个js文件。

```javascript
interface IShareWithFriendsProps {
  text: string;
  date?: string;    // 问号表示可选参数
  onDismissSharePopup: () => void;
  onProceedSharePicturePopup: () => void;
}

const ShareWithFriends: React.FC<IShareWithFriendsProps> = ({ 
    // 设置默认值
    text, 
    onDismissSharePopup = () => {}, onProceedSharePicturePopup }) => {
    return (<div></div>);
}
```

<<<<<<< Updated upstream:Typescript/Typescript-Introduction.md
=======
# The Basics

## Static type-checking

静态的类型检查，运行代码前就告诉你哪里可能会有问题。

```typescript
const message = "hello!";
message();	// 这一行会飘红
```

## Non-exception Failures



## Types for Tooling

联想提示，告诉你这个对象有什么属性，提升编程体验。

## tsc, the TypeScript compiler

## Emitting with Errors

## Explicit Types

## Erased Types

## Downleveling

## Strictness

## noImplicitAny

## strictNullChecks


>>>>>>> Stashed changes:Typescript/01-typescript.md

