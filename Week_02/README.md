# 学习笔记

1. 正则表达式 `exec` 的用法

   ```javascript
   let re = /quick\s(brown).+?(jumps)/ig;
   let result = re.exec('The Quick Brown Fox Jumps Over The Lazy Dog');
   ```

   `result[0]` 是完整匹配上的字符串，`result[1]` ... `result[n]` 为对应括号匹配到的字符串，上方例子结果为：

   ```javascript
   result[0] === "Quick Brown Fox Jumps"
   result[1] === "Brown"
   result[2] === "Jumps"
   ```

