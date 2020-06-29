# Typescript

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

## Type assertion

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