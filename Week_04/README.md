# 学习笔记

## Atom

Grammar

- Literal
- Variable
- Keywords
- Whitespace
- Line Terminator



Runtime

- Types
- Execution Context



## Types

七种基本类型

- Number
- String
- Boolean
- Object
- Null（实际上是有值，为空）
  - typeof 是 Object（bug）
- Undefined
- Symbol
  - 一定程度上替代了 String 的作用，用于 Object 的索引
  - 专门用于 Object 属性名的特殊变量



## Number

- IEEE 754 Double Float
  - Sign (1)
  - Exponent (11)
  - Fraction (52)

小数点可以来回浮动

> 0.1 + 0.2 !== 0.3 由于三次转换，加上一次运算的精度损失造成的

### Grammar

- DecimalLiteral
  - 0
  - 0.
  - .2
  - 1e3
- BinaryIntegerLiteral
  - 0b111
- OctalIntegerLiteral
  - 0o10
- HexIntegerLiteral
  - 0xFF



## String

- Character
- Code Point
- Encoding

a => 97 => 01100001



### Encoding

- ASCII
- Unicode
- UCS
- GB
- ISO-8859
- BIG5

#### UTF8

`0110 0001 a` 

`0110 0010 b`

`1110 0100 1011 1000 1000 0000 一`

#### UTF16

`0000 0000 0110 0001 a`

`0000 0000 0110 0010 b`

`0100 1110 0000 0000 一`



## Null & Undefined

- null
- undefined
- void 0



## Object

任何一个对象都是唯一的，与它本身的状态无关。

即使状态完全一致的两个对象，也并不相等。

用状态来描述对象。

状态的改变即是行为。

对象三要素

- state
- identifier
- behavior



### Class

类是一种常见的描述对象的方式。

两个主要的流派

- 归类
  - 多继承非常自然，例如 C++
- 分类
  - 单继承，且有一个基类 Object，例如 Java



### Prototype

原型是一种更接近人类原始认知的描述对象的方法。采用“相似”这样的方法去描述对象。任何对象仅仅需要描述自己与原型的区别即可。



## Object in JavaScript

原生对象只需要关心**原型**和**属性**两个部分。

JS 里的原型一般会描述为原型链 

JS 的属性是 KV 对儿。

K 可以是 Symbol 也可以是 String。

- String 不管怎么复杂，只有看过源代码就能从任何一个地方拿到这个属性。
- Symbol 在内存里创建后只能通过变量去获取，很好的实现属性访问的权限控制。



两种属性，数据属性、访问器属性。

- Data Property
- Accessor Property
  - 至少有 get、set 之一
  - 多数用来描述行为



### Object API/Grammar

- {} . [] Object.defineProperty
- Object.create / Object.setPrototypeOf / Object.getPrototypeOf
- new / class / extends
- new / function / prototype



### Function Object

凡是使用双方括号定义的都是对象的一个内置行为。



### 特殊行为的对象

它们常见的下标运算（就是使用中括号或者点来做属性访问）或者设置原型跟普通对象不同。

- Array：Array 的 length 属性根据最大的下标自动发生变化。
- Object.prototype：作为所有正常对象的默认原型，不能再给它设置原型了。
- String：为了支持下标运算，String 的正整数属性访问会去字符串里查找。
- Arguments：arguments 的非负整数型下标属性跟对应的变量联动。
- 模块的 namespace 对象：特殊的地方非常多，跟一般对象完全不一样，尽量只用于 import 吧。
- 类型数组和数组缓冲区：跟内存块相关联，下标运算比较特殊。
- bind 后的 function：跟原来的函数相关联。





