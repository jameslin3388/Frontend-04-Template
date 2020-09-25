# 学习笔记

## 运算符和表达式

### Expressions

#### Member

- a.b
- a[b]
- foo\`string\`
  - 反引号前面加函数名，字符串会拆开传入
- super.b
- super['b']
- new.target
- new Foo()

#### New

- New Foo

> Example:
>
> new a()() 第一个括号跟着 new 运算
>
> new new a() 括号优先和第二个 new 相结合

#### Call

- foo()
- super()
- foo()['b']
- foo().b
- foo()\`abc\`

> Example:
>
> new a()['b']
>
> 跟 new 现结合，圆括号与 new 结合是 member expression 优先级高于 call expression

#### Left Handsite and Right Handside

只有 left handsite expression 才能放到等号左边



#### Update

- a++
- ++a
- a--
- --a

> Example:
>
> ++a++
>
> ++(a++)
>
> 都是不合法的

#### Unary（单目运算符）

- delete a.b
- void foo()
- typeof a
- +a
- -a
- ~a
- !a
- await a

#### Exponential

- **

> 唯一一个右结合的运算符

#### Multiplicative

- \* / %

#### Additive

- \+ -

#### Shift

- << >> >>>

#### Relationship

- < > <= >= instanceof in

#### Equality

- ==
- !=
- ===
- !==

#### Bitwise

- & ^ |

#### Logical

- &&
- ||

#### Conditional

- ? :
  - 三目运算符，也有断路原则

#### Reference

引用类型存在于运行时中，称作标准中的类型，而不是语言中的类型。

一个 Reference 类型，取出来的是一个 Object 和一个 Key。

member 表达式如果放在 `delete` 之后，就需要用到引用的特性。因为需要知道我们删除对象的哪一个 `key`。

assign 也是一样，当赋值的时候，将 member 表达式放在一个等号的左边，同样也需要知道右边的表达式赋值给哪一个对象的哪一个属性。

JS 就是利用引用类型在运行时处理**删除**或者**赋值**这样的写操作的。



## 类型转换

`==` 双等号一般基本上是把两侧元素转换为 `Number` 进行比较。



### Unboxing

把 `Object` 转换成普通类型进行比较。

- ToPremitive
- toStirng vs valueOf
- Symbol.toPrimitive

```js
var x = {}
x[o] = 1

var o = {
  toString() {
    return "2"
  },
  valueOf() {
    return 1
  },
  [Symbol.toPrimitive]() {
    return 3
  }
}

console.log("x" + o)
```

`+` 加法优先调用 `valueOf` 即使是调用字符串做加法。例如上方 `"x" + o` 会调用 `valueOf` 得到 `1`。如果把 `valueOf` 和 `toPrimitive` 都注释掉，结果就会得到 `x2`。只要有 `Symbol.toPrimitive` 则一定会得到 `x3`。

当 `o` 作为属性名时，则会优先调用 `toString`。



### Boxing

`Object` 是可以有类概念的。对每个基础类型，`Object` 都提供了一个包装的类。

| 类型    | 对象                    | 值          |
| ------- | ----------------------- | ----------- |
| Number  | new Number(1)           | 1           |
| String  | new String("a")         | "a"         |
| Boolean | new Boolean(true)       | true        |
| Symbol  | new Object(Symbol("a")) | Symbol("a") |

直接调用返回的 `1` 和使用 `new` 调用返回的 `Number` 对象之间存在一个装箱关系。`String` 和 `Boolean` 同理。

`Symbol` 是无法被 `new` 调用的，需要用 `Object` 构造器再包一层。



## 运行时相关概念

### Statement

Grammar

- 简单语句
- 组合语句
- 声明



Runtime

- Completion Record（语句执行结果的记录）
- Lexical Environment



### Completion Record

- [[type]]: normal, break, continue, return, or throw
- [[value]]: 基本类型
- [[target]]: label

> break 和 continue 往往会带一个 target 出来



## 简单语句和复合语句

### 简单语句

- ExpressionStatement
  - 表达式后面加一个分号
  - 核心语句
- EmptyStatement
  - 单独的一个分号，没什么作用
- DebuggerStatement
  - debugger 关键字接一个分号
- ThrowStatement
  - throw 接一个表达式来抛出异常  
- ContinueStatement
  - 结束当前循环，继续之后的循环
- BreakStatement
  - 结束整个循环
- ReturnStatement
  - 一定得在函数里面去用



### 复合语句

- BlockStatement
  - 一对花括号中间一个语句的列表
- IfStatement
  - 条件语句
- SwitchStatement
  - 不推荐，性能与 if 差不多
- IterationStatement
  - while，do-while，for
- WithStatement
  - 通过 with 打开一个对象，将该对象的所有属性放进作用域中
  - 不确定性高，大部分规范拒绝使用
- LabelledStatement
  - 在语句前面加上 label
- TryStatement
  - 三段结构 try、catch、finally
  - try 里面不是 BlockStatement，花括号由 try 语句定义的，无法省略



#### Block

- BlockStatement
  - [[type]]: normal
  - [[value]]: --
  - [[target]]: --



#### Iteration

- while (xxx)
- do xxx while (xxx)
- for (xxx; xxx; xxx) xxx
- for (xxx in xxx) xxx
- for (xxx of xxx) xxx
- ~~for await (of)~~



- var
- const / let
- in



for 语句是会产生一个独立的 let 的声明的作用域



#### 标签、循环、break、continue

- LabelledStatement
- IterationStatement
- ContinueStatement
- BreakStatement
- SwitchStatement



- [[type]]: break continue
- [[value]]: --
- [[target]]: label



#### try

```js
try {
	xxx
} catch(xxx) {
	xxx
} finally {
	xxx
}
```

- [[type]]: return
- [[value]]: --
- [[target]]: label



即使在 try 里面 return 了，finally 里面的语句还是会执行。



## 声明

- FunctionDeclaration
  - function 声明有四种形态
- GeneratorDeclaration
  - function 后面加 * 就是一个 Generator 声明
- AsyncFunctionDeclaration
  - function 前面加 async 就是一个 AsyncFunction 声明
- AsyncGeneratorDeclaration
  - 两个都加，就是一个 AsyncGenerator 声明
- VariableStatement
  - 既有声明的作用，又有实际的计算能力
  - 在 JS 标准中，把它划为了语句
- ClassDeclaration
- LexicalDeclaration
  - const、let



- function
- function *
- async function
- async function *
- var



这五个的共同特点，只认 function body 且没有先后关系。永远会被当做出现在函数的第一行一样去处理。

var 声明的作用是相当于出现在函数头部，声明的变量已变为一个函数级的局部变量。但是后面的赋值并没有发生。



- class
- const
- let

这三个的共同特点，在声明之前使用就会报错。function 和 var 的行为是一种历史包袱，新的这三个才是现代的 JS 的语言编委会希望的样子。



### 预处理（pre-process）

```js
var a = 2;
void function() {
	a = 1;
	return;
	var a; // 不管写在那里，都会被预处理挑出来，声明到这个函数的作用级别
}();
console.log(a); // 2
```



```js
var a = 2;
void function() {
	a = 1; // 抛出错误
	return;
	const a;
}();
console.log(a); // 2
```

 所有声明都会有预处理。



### 作用域

```js
var a = 2;
void function() {
	a = 1;
	{
    var a;
  }
}();
console.log(a);
```

```js
var a = 2;
void function() {
	a = 1;
	{
    const a;
  }
}();
console.log(a);
```

const 作用域范围是自己外层的 block 语句。



## 宏任务与微任务

### JS 执行粒度（运行时）

- 宏任务
  - 传给 JS 引擎的任务
- 微任务（Promise）
  - 在 JS 引擎内部的任务
- 函数调用（Execution Context）
- 语句/声明（Completion Record）
- 表达式（Reference）
- 直接量/变量/this ......



```js
var x = 1;
var p = new Promise(resolve => resolve());
p.then(() => x = 3);
x = 2;

# x = 1
# p = ...
# x = 2

# x = 3
```

这两个异步任务称作一个 MicroTask(Job)
将这两个异步塞给 JS Engine 并进行执行的过程称作 MacroTask

### 事件循环

wait、get code、execute



## JS 函数调用

执行上下文栈（Execution Context Stack）保存了运行所需要的所有信息。栈顶有个特殊元素 Running Execution Context 为当前可以访问的变量。

### Execution Context

- code evaluation state
  - 用于 async 和 generator 函数
- Function
  - Function 初始化的 Execution Context 会有
- Script or Module
- Generator
  - Generator 初始化的 Execution Context 会有
- Realm
- LexicalEnvironment
- VariableEnvironment

#### LexicalEnvironment

- this
- new.target
- super
- 变量

### Environment Record

- Environment Records
- Declarative Environment Records（花括号定义作用域就会生成）
  - Function Environment Records
  - module Environment Records
- Global Environment Records
- Object Environment Records





