# Java实现Javascript闭包

Java 8函数式接口functional interface的秘密

```java
// 用户类
public class User {
	private int age;
    private String name;

    public User() {
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "User{" +
                "age=" + age +
                ", name='" + name + '\'' +
                '}';
    }
}
```

```java
// 接口
public interface IncreaseAge {
	 void increaseAge();
}
```

```java
// 测试
public class ClosureDemo {
	
	// 定义一个函数，返回一个接口
	// Java可以返回一个类，当然也可以返回一个接口
	private IncreaseAge defineUser() {
        // 函数内部定义一个局部变量user
        User user = new User();
        user.setName("老王");
        user.setAge(66);

        // 返回一个(函数式)接口，该接口可以实现增加用户年龄
        return () -> {
            user.setAge(user.getAge() + 1);
            System.out.println(user);
        };
    }

	public static void main(String[] args) {
		ClosureDemo closureDemo = new ClosureDemo();
        
		// 获取年龄增加器
        IncreaseAge increaser = closureDemo.defineUser();

        increaser.increaseAge();	// age = 67
        increaser.increaseAge();	// age = 68
        increaser.increaseAge();	// age = 69
        increaser.increaseAge();	// age = 70
	}
}
```

输出
```
User{age=67, name='老王'}
User{age=68, name='老王'}
User{age=69, name='老王'}
User{age=70, name='老王'}
```
