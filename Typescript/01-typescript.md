# Typescript Introduction

总则：进行类型的定义声明，使得js变成一门静态类型语言，使得大多数错误能在编译期间发现。

1. 不允许使用ts-ignore.
2. 使用as代替类型转换。
3. 函数参数和返回值都要进行类型声明。
4. 如果某个interface定义的值间接或直接导出了，那么interface也需要导出。如果一个值导出，但定义它的interface没有导出，在开启declaration=true的时候会导致一个TS4023的错误，如果不想导出这个interface，就改成type.
5. 不允许使用any.

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



