# Decorators

With the introduction of Classes in TypeScript and ES6, there now exist certain scenarios that require additional features to support annotating or modifying classes and class members.

现在存在场景去给 class 和 class member 去增加注解或修改。

说实在的，只能用于class和class member.

Decorators provide a way to add both annotations and a meta-programming syntax for class declarations and members. Decorators are a `stage 2 proposal` for JavaScript and are available as an experimental feature of TypeScript.

现在装饰器在 JavaScript 里面是提案阶段，在 TypeScript 里面是个实验特性。

To enable experimental support for decorators, you must enable the `experimentalDecorators` compiler option either on the command line or in your `tsconfig.json`:

```
tsc --target ES5 --experimentalDecorators
```

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```



A Decorator is a special kind of declaration that can be attached to a `class declaration`, `method`, `accessor`, `property`, or `parameter`.



## Class Decorators

A *Class Decorator* is declared just before a class declaration. 

The class decorator is applied to the constructor of the class and can be used to observe, modify, or replace a class definition. 

类装饰器被应用于类的构造器，可以被用来观察，修改或者代替一个类的定义。

A class decorator cannot be used in a declaration file, or in any other ambient context (such as on a `declare` class).

The expression for the class decorator will be called as a function at runtime, with the constructor of the decorated class as its only argument.

类装饰器表达式会在运行时被当作函数调用。





看一下底层原理

https://blog.csdn.net/qq_41614928/article/details/111085571



https://www.typescriptlang.org/play?#code/PTAEAEFMA8AdIE4EsC2kB2AXAhgGwCKQDGA9gtpmQM4BQAZgK7pGZInqgYNrkBGukABQA3PA0gAuULxIkB2dAEpQAbxqhQCSJgYIOjZq3ahBOBAHNtUhQE8ANLAQl4CTDYDSkG1KqZk6czsAE0gqImRYSgQpAAUnFzdCMIio5TUNDRDkpEiyADouHmx+SFAAXlBRXHEAbnVQAF86hpoQUABaTqIGTE72miJcbCoqUABxLW1EVXrzSdYAnz8kALqNUnRfBAYWMkE0EexLJf9zNPqNTAALJCo8uchtFfNy0AOqI8g1xpp6qHRuIhigJBHQ8FRIIpZvNBOcMpptLoOAAiAASkFwuBIdlAyNAAGpQNdbvd5s9vi0GkA



```typescript
// @experimentalDecorators
function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}
// ---cut---
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  @enumerable(false)
  greet() {
    return "Hello, " + this.greeting;
  }
}
```



```typescript
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// @experimentalDecorators
function enumerable(value) {
    return function (target, propertyKey, descriptor) {
        descriptor.enumerable = value;
    };
}
// ---cut---
class Greeter {
    constructor(message) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
__decorate([
    enumerable(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Greeter.prototype, "greet", null);
```



AOP

装饰器设计模式

与java注解不同

HOC

使用场景：



实战看一下

前端的js decorator



Node的decorator



## Decorator Composition



```typescript
// @experimentalDecorators
function first() {
  console.log("first(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("first(): called");
  };
}

function second() {
  console.log("second(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): called");
  };
}

class ExampleClass {
  @first()
  @second()
  method() { console.log("method called") }
}

const exampleInstance = new ExampleClass();
exampleInstance.method();

// [LOG]: "first(): factory evaluated"
// [LOG]: "second(): factory evaluated"
// [LOG]: "second(): called"
// [LOG]: "first(): called"
// [LOG]: "method called"

```



## Method Decorators 

A *Method Decorator* is declared just before a method declaration. 

The decorator is applied to the *Property Descriptor* for the method, and can be used to observe, modify, or replace a method definition. 

这个装饰器会被应用到这个方法的Property Descriptor里面，

A method decorator cannot be used in a declaration file, on an overload, or in any other ambient context (such as in a `declare` class).

### 代码示例

装饰器如何获取方法的参数？

这个还挺有意思的，因为入

```typescript
/**
 * 控制接口的调用频率
 * 仅用于controller
 */
export function frequent({
  key,
  interval,
}: {
  key: string;
  interval: number;
}): MethodDecorator {
  return (
    _target: any,
    _key: string | symbol,
    descriptor: PropertyDescriptor	// 这个类型与javascript的Object.getOwnPropertyDescriptor()有关
  ) => {
    const { value } = descriptor;
    // 先把被装饰的函数的property descriptors获取出来
    const originDescriptors = Object.getOwnPropertyDescriptors(
      descriptor.value
    );
    // 直接改写被装饰的函数，这样自然而然就能获取到被装饰函数的入参
    descriptor.value = async function dv(ctx: HttpContext, ...args: any[]) {
      const employeeId = ctx.userinfo?.operator?.employee_id;
      if (!employeeId) {
        throw new BaseException(
          StatusCode.ERROR_UNAUTHORIZED.code,
          '未找到用户信息'
        );
      }
      const redisKey = genKey(employeeId, key);
      const now = +new Date();
      const lastTime = Number(await ctx.redis.op_config.get(redisKey));
      if (!lastTime || now - lastTime > interval) {
        await ctx.redis.op_config.set(redisKey, now);
        return value.call(this, ctx, ...args);	// 如果调用没有太频繁，就可以开始调用被装饰的函数了
      } else {
        throw new InnerException('调用过于频繁，请稍后再试');
      }
    };
    Object.defineProperties(descriptor.value, {
      ...originDescriptors,
    });
    return descriptor;
  };
}

```



### Object.getOwnPropertyDescriptor()

The **`Object.getOwnPropertyDescriptor()`** method returns an object describing the configuration of a specific property on a given object (that is, one directly present on an object and not in the object's prototype chain). The object returned is mutable but mutating it has no effect on the original property's configuration.

这个方法会返回一个对象，这个对象描述了指定对象某个属性的配置，但所返回的对象是新的对象，修改它不会影响到对象的原型链。

```typescript
const object1 = {
  property1: 42
};

const descriptor1 = Object.getOwnPropertyDescriptor(object1, 'property1');

console.log(descriptor1.configurable);
// expected output: true

console.log(descriptor1.value);
// expected output: 42
```

入参

`obj`：你想查看的某个对象

The object in which to look for the property.

`prop`：你想看这个对象的哪个属性的描述符

The name or [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) of the property whose description is to be retrieved.

出参

A property descriptor of the given property if it exists on the object, [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) otherwise.

函数描述













