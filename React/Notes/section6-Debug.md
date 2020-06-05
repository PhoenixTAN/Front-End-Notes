# Debugging React Apps

## Understanding Error
### Syntax Error
看报错

### Logic Error
用Browser里面的Source

## React App Developer Tool (Chrome Extension)
Offered by: Facebook

Add to Chrome

使用你的React项目
```
$ npm start
```

## Using Error Boundaries
```javascript
throw new Error("Something goes wrong!");
```

别的方法
```javascript
import React, {Component} from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ''
    }

    // 官方文档这么说
    // class component becomes an error boundary if it defines either (or both) of the lifecycle methods static getDerivedStateFromError() or componentDidCatch(). 
    componentDidCatch = (error, info) => {
        this.setState({hasError:true, errorMessage: error});
    }

    render() {
        if (this.state.hasError) {
            return <h1>{this.state.errorMessage}</h1>;
        }
        else {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;
```

用这个ErrorBoundary包着你想要检测的tag.
