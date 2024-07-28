

# Python

视频链接：https://www.bilibili.com/video/BV1qW4y1a7fU?p=14&vd_source=58161f8e8dab38b1ec22c77ea9cc9e71

官网文档：https://docs.python.org/

仅供参考

#### 集成开发环境 - PyCharm

## 1 基础语法

### 1.0 字面量 

​		字面量：在代码中，被**写下来**的的固定的**值**，称之为字面量

```python
print('hello world') 	此处的	'hello world'	就是string 字面量
```

​		注释 

​		单行注释与多行注释

```python
# a = 10 单行注释
# print(a);
""" print('1111')
    print('2222')
    print('3333')
"""
```

### 1.1 变量和类型

#### 类型

在编程语言中，**变量是数据的载体**，简单的说就是一块用来保存数据的内存空间，**变量的值可以被读取和修改**，这是所有运算和控制的基础

Python 语言中预设了多种数据类型，也允许我们自定义新的数据类型，这一点在后面会讲到。我们首先来了解几种 Python 中最为常用的数据类型。

1. 整型（`int`）：Python 中可以处理任意大小的整数，而且支持二进制（如`0b100`，换算成十进制是4）、八进制（如`0o100`，换算成十进制是64）、十进制（`100`）和十六进制（`0x100`，换算成十进制是256）的表示法

   ```python
   print(0b100)  # 二进制整数 4
   print(0o100)  # 八进制整数 64
   print(100)    # 十进制整数 100
   print(0x100)  # 十六进制整数 256
   ```

2. 浮点型（`float`）：浮点数也就是小数，之所以称为浮点数，是因为按照科学记数法表示时，一个浮点数的小数点位置是可变的，浮点数除了数学写法（如`123.456`）之外还支持科学计数法（如`1.23456e2`，表示$\small{1.23456 \times 10^{2}}$）。

   ```python
   print(123.456)    # 数学写法
   ```

3. 字符串型（`str`）：字符串是以单引号或双引号包裹起来的任意文本，比如`'hello'`和`"hello"`。

4. 布尔型（`bool`）：布尔型只有`True`、`False`两种值，要么是`True`，要么是`False`，可以用来表示现实世界中的“是”和“否”，命题的“真”和“假”，状况的“好”与“坏”，水平的“高”与“低”等等。如果一个变量的值只有两种状态，我们就可以使用布尔型。

#### 变量

对于每个变量，我们都需要给它取一个名字，就如同我们每个人都有自己的名字一样。在 Python 中，变量命名需要遵循以下的规则和惯例。

- 规则部分：
  - 规则1：变量名由**字母**、**数字**和**下划线**构成，数字不能开头。需要说明的是，这里说的字母指的是 Unicode 字符，Unicode 称为万国码，囊括了世界上大部分的文字系统，这也就意味着中文、日文、希腊字母等都可以作为变量名中的字符，但是一些特殊字符（如：`！`、`@`、`#`等）是不能出现在变量名中的。我们强烈建议大家把这里说的字母理解为**尽可能只使用英文字母**。
  - 规则2：Python 是**大小写敏感**的编程语言，简单的说就是大写的`A`和小写的`a`是两个不同的变量，这一条其实并不算规则，而是需要大家注意的地方。
  - 规则3：变量名**不要跟 Python 的关键字重名**，**尽可能避开 Python 的保留字**。这里的关键字是指在 Python 程序中有特殊含义的单词（如：`is`、`if`、`else`、`for`、`while`、`True`、`False`等），保留字主要指 Python 语言内置函数、内置模块等的名字（如：`int`、`print`、`input`、`str`、`math`、`os`等）。
- 惯例部分：
  - 惯例1：变量名通常使用小写英文字母，多个单词用下划线进行连接。
  - 惯例2：受保护的变量用单个下划线开头。
  - 惯例3：私有的变量用两个下划线开头。

#### 变量的使用

```python
a = 45
b = 40

print(a, b)  # 45 40
print(a + b) # 85
print(a - b) # 5
print(a * b) # 1800
print(a / b) # 1.125
```

#### 检验变量类型

```python
a = 100
b = 123.45
c = 'hello, world'
d = True
print(type(a))  # <class 'int'>
print(type(b))  # <class 'float'>
print(type(c))  # <class 'str'>
print(type(d))  # <class 'bool'>
```

可以通过 Python 内置的函数来改变变量的类型，下面是一些常用的和变量类型相关的函数。

- `int()`：将一个数值或字符串转换成整数，可以指定进制。
- `float()`：将一个字符串（在可能的情况下）转换成浮点数。
- `str()`：将指定的对象转换成字符串形式，可以指定编码方式。
- `chr()`：将整数（字符编码）转换成对应的（一个字符的）字符串。
- `ord()`：将（一个字符的）字符串转换成对应的整数（字符编码）。 

```python
a = 100
b = 123.55
c = '1231'
d = '100'
e = '123.45'
f = 'hello, world'
g = True

print(float(a)) # int类型的100转成float，输出100.0
print(int(b))  # float类型的123.45转成int，输出123 直接省略后面小数点
print(int(c))  # str类型的'123'转成int，输出123 --int() 函数在将字符串转换为整数时，要求字符串必须是有效的整数形式 否则会引发 ValueError
print(int(c, base=16))  # str类型的'123'按十六进制转成int，输出291
print(int(d, base=2))   # str类型的'100'按二进制转成int，输出4
print(float(e))         # str类型的'123.45'转成float，输出123.45
print(bool(f))          # str类型的'hello, world'转成bool，输出True
print(int(g))           # bool类型的True转成int，输出1
print(chr(a))           # int类型的100转成str，输出'd'
print(ord('d'))         # str类型的'd'转成int，输出100
```

> **说明**：`str`类型转`int`类型时可以通过`base`参数来指定进制，可以将字符串视为对应进制的整数进行转换。`str`类型转成`bool`类型时，只要字符串有内容，不是`''`或`""`，对应的布尔值都是`True`。`bool`类型转`int`类型时，`True`会变成`1`，`False`会变成`0`。在 ASCII 字符集和 Unicode 字符集中， 字符`'d'`对应的编码都是`100`。

### 1.2  运算符

| 运算符                                                | 描述                           |
| ----------------------------------------------------- | ------------------------------ |
| `[]`、`[:]`                                           | 索引、切片                     |
| `**`                                                  | 幂                             |
| `~`、`+`、`-`                                         | 按位取反、正号、负号           |
| `*`、`/`、`%`、`//`                                   | 乘、除、模、整除               |
| `+`、`-`                                              | 加、减                         |
| `>>`、`<<`                                            | 右移、左移                     |
| `&`                                                   | 按位与                         |
| `^`、`                                                | `                              |
| `<=`、`<`、`>`、`>=`                                  | 小于等于、小于、大于、大于等于 |
| `==`、`!=`                                            | 等于、不等于                   |
| `is`、`is not`                                        | 身份运算符                     |
| `in`、`not in`                                        | 成员运算符                     |
| `not`、`or`、`and`                                    | 逻辑运算符                     |
| `=`、`+=`、`-=`、`*=`、`/=`、`%=`、`//=`、`**=`、`&=` | 赋值运算符                     |

> **说明**： 所谓优先级就是在一个运算的表达式中，如果出现了多个运算符，应该先执行什么再执行什么的顺序。编写代码的时候，如果搞不清楚一个表达式中运算符的优先级，可以使用圆括号来确保运算的执行顺序。

 `&=` 是按位与赋值运算符，用于对变量进行按位与操作并将结果赋回给变量本身

#### 1.2.1 算术运算符

```python
print(132 // 10)    # 整除运算，输出13 也就是商取整的意思
print(321 % 12)     # 求模运算，输出9
print(2 ** 2)    # 求幂运算，输出4
```

#### 1.2.2 赋值运算符

作用是将右边的值赋给左边的变量。赋值运算符还可以跟上面的算术运算符放在一起，组合成复合赋值运算符

```python
a = 10
b = 4
a += b        # 相当于：a = a + b
a *= a + 2    # 相当于：a = a * (a + 2)
print(a)      # 224
```

#### 1.2.3 比较运算符和逻辑运算符

比较运算符也称为关系运算符，包括`==`、`!=`、`<`、`>`、`<=`、`>=`，我相信大家一看就能懂。需要提醒的是比较相等用的是`==`，请注意这里是两个等号，因为`=`是赋值运算符，我们在上面刚刚讲到过。比较不相等用的是`!=`，跟数学课本中使用的$\small{\neq}$并不相同，Python 2中曾经使用过`<>`来表示不等于，在 Python 3中使用`<>`会引发`SyntaxError`（语法错误）。比较运算符会产生布尔值，要么是`True`，要么是`False`。

`and`运算符

- 连接两个布尔值或者产生布尔值的表达式，如果两边的布尔值都是`True`，那么运算的结果就是`True`；
- 左右两边的布尔值有一个是`False`，最终的运算结果就是`False`。
- 如果`and`运算符左边的布尔值是`False`，不管右边的布尔值是什么，最终的结果都是`False`，这时运算符右边的布尔值会被跳过（专业的说法叫短路处理，如果`and`右边是一个表达式，那么这个表达式不会执行）

`or`字面意思是“或者”，所以`or`运算符也会连接两个布尔值或产生布尔值的表达式，如果两边的布尔值有任意一个是`True`，那么最终的结果就是`True`。当然，`or`运算符也是有短路功能的，当它左边的布尔值为`True`的情况下，右边的布尔值会被短路（如果`or`右边是一个表达式，那么这个表达式不会执行）。

not 后面可以跟一个布尔值，如果`not`后面的布尔值或表达式是`True`，那么运算的结果就是`False`；如果`not`后面的布尔值或表达式是`False`，那么运算的结果就是`True`

```python
flag0 = 1 == 1
flag1 = 3 > 2
flag2 = 2 < 1
flag3 = flag1 and flag2
flag4 = flag1 or flag2
flag5 = not flag0
print('flag0 =', flag0)     # flag0 = True
print('flag1 =', flag1)     # flag1 = True
print('flag2 =', flag2)     # flag2 = False
print('flag3 =', flag3)     # flag3 = False
print('flag4 =', flag4)     # flag4 = True
print('flag5 =', flag5)     # flag5 = False
# print(flag1 and not flag2)  # True
print(1 > 2 or print('wwww'))      # False 短路运算
```

**说明**：比较运算符的优先级高于赋值运算符，所以上面的`flag0 = 1 == 1`先做`1 == 1`产生布尔值`True`，再将这个值赋值给变量`flag0`。`print`函数可以输出多个值，多个值之间可以用`,`进行分隔，输出的内容默认以空格分开。

### 运算符和表达式应用举例

#### 例子1：华氏温度转摄氏温度

要求：输入华氏温度将其转换为摄氏温度，华氏温度到摄氏温度的转换公式为：$\small{C = (F - 32) / 1.8}$。

```python
f = float(input('请输入华氏温度: '))
# print(f)
c = (f - 32) / 1.8
print('%.1f华氏度 = %.1f摄氏度' % (f, c))
```

**说明**：上面代码中的`input`函数用于从键盘接收用户输入，由于输入的都是字符串，如果想处理成浮点小数来做后续的运算，可以用我们上一课讲解的类型转换的方法，用`float`函数将`str`类型处理成`float`类型。

上面的代码中，我们对`print`函数输出的内容进行了格式化处理，`print`输出的字符串中有两个`%.1f`占位符，这两个占位符会被`%`之后的`(f, c)`中的两个`float`类型的变量值给替换掉，浮点数小数点后保留1位有效数字。如果字符串中有`%d`占位符，那么我们会用`int`类型的值替换掉它，如果字符串中有`%s`占位符，那么它会被`str`类型的值替换掉。

除了上面格式化输出的方式外，Python 中还可以用下面的办法来格式化输出，我们给出一个带占位符的字符串，字符串前面的`f`表示这个字符串是需要格式化处理的，其中的`{f:.1f}`和`{c:.1f}`可以先看成是`{f}`和`{c}`，表示输出时会用变量`f`和变量`c`的值替换掉这两个占位符，后面的`:.1f`表示这是一个浮点数，小数点后保留1位有效数字。

```python
f = float(input('请输入华氏温度: '))
# print(f)
c = (f - 32) / 1.8
print('%.1f华氏度 = %.1f摄氏度' % (f, c))
print(f'{f:.1f}华氏度 = {c:.1f}摄氏度') # {f:.1f} 表示法
```

#### 例子2：计算圆的周长和面积

要求：输入一个圆的半径，计算出它的周长（$\small{2 \pi r}$）和面积（$\small{\pi r^{2}}$）。

```python
radius = float(input('请输入圆的半径: '))
perimeter = 2 * 3.1416 * radius
area = 3.1416 * radius * radius
print('周长: %.2f' % perimeter)
print('面积: %.2f' % area)
```

增加了math

```python
import math
radius = float(input('请输入圆的半径: '))
perimeter = 2 * math.pi * radius
area = math.pi * radius * radius
print('周长: %.2f' % perimeter)
print('面积: %.2f' % area)
```

这里其实还有一种格式化输出的方式，是 Python 3.8 中增加的新特性，大家直接看下面的代码就明白了。

```python
import math
radius = float(input('请输入圆的半径: '))
perimeter = 2 * math.pi * radius
area = math.pi * radius * radius
print(f'周长：{perimeter = }')
print(f'面积：{area = :.2f}')
```

说明：假如变量`a`的值是`9.87`，那么字符串`f'{a = }'`的值是`a = 9.87`；而字符串`f'{a = :.1f}'`的值是`a = 9.9`。这种格式化输出的方式会同时输出变量名和变量值。

#### 例子3：判断闰年

要求：输入一个1582年以后的年份，判断该年份是不是闰年。

```python
year = int(input('请输入年份: '))
is_leap = year % 4 == 0 and year % 100 != 0 or year % 400 == 0
print(f'{is_leap = }')
```

**说明**：对于格里历（Gregorian calendar），即今天我们使用的公历，判断闰年的规则是：1. 公元年份非4的倍数是平年；2. 公元年份为4的倍数但非100的倍数是闰年；3. 公元年份为400的倍数是闰年。格里历是由教皇格里高利十三世在1582年10月引入的，作为对儒略历（Julian calendar）的修改和替代，我们在输入年份时要注意这一点。上面的代码通过`%`来判断`year`是不是`4`的倍数、`100`的倍数、`400`的倍数，然后用`and`和`or`运算符将三个条件组装在一起，前两个条件要同时满足，第三个条件跟前两个条件的组合只需满足其中之一。

### 1.3 分支结构

#### 1.3.1 使用if和else构造分支结构

我们来写一个身体质量指数（BMI）的计算器。身体质量质数也叫体质指数，是国际上常用的衡量人体胖瘦程度以及是否健康的一个标准，计算公式如下所示。通常认为$\small{18.5 \le BMI < 24}$是正常范围，$\small{BMI < 18.5}$说明体重过轻，$\small{BMI \ge 24}$说明体重过重，$\small{BMI \ge 27}$就属于肥胖的范畴了。

BMI = 体重 / 身高^2

如果要给出更为准确的提示信息，我们可以再次修改上面的代码，通过`elif`关键字为上面的分支结构增加更多的分支，如下所示

```python
height = float(input('请输入你的身高: '))
weight = float(input('请输入你的体重: '))

print(weight, height)

BMI = weight / (height / 100) ** 2

print('BMI = %.1f' % BMI)

# if 18.5 < BMI < 24:
#     print('身体正常')
# else:
#     print('身体不正常')
if BMI < 18.5:
    print('你的体重过轻')
elif BMI < 24:
    print('你的身材很棒')
elif BMI < 27:
    print('你的体重过重')
elif BMI < 30:
    print('你已轻度肥胖')
elif BMI < 35:
    print('你已中度肥胖')
else:
    print('你已重度肥胖')
```

#### 1.3.2 使用math和case构造分支结构

Python 3.10 中增加了一种新的构造分支结构的方式，通过使用`match`和`case` 关键字，我们可以轻松的构造出多分支结构。Python 的官方文档在介绍这个新语法时，举了一个 HTTP 响应状态码识别的例子，非常有意思。

```python
status_code = int(input('响应状态码: '))
match status_code:
    case 400: description = 'Bad Request'
    case 401: description = 'Unauthorized'
    case 403: description = 'Forbidden'
    case 404: description = 'Not Found'
    case 405: description = 'Method Not Allowed'
    case _: description = 'Unknown Status Code'
print('状态码描述:', description)
```

**说明**：带有`_`的`case`语句在代码中起到通配符的作用，如果前面的分支都没有匹配上，代码就会来到`case _`。`case _`的使用是可选的，并非每种分支结构都要给出通配符选项。如果分支中出现了`case _`，它只能放在分支结构的最后面，如果它的后面还有其他的分支，那么这些分支将是不可达的。

`match-case`语法还有很多高级玩法，我们等用到时候再为大家讲解，有一个合并模式可以在这里分享给大家

```python
status_code = float(input('请输入您的状态码'))
match status_code:
    case 404:
        print('Bad Request')
    case 401 | 402:
        print('Payment Required' + 'Unauthorized')
    case _:
        print('other')
```

### 1.4 循环结构

#### for-in循环

```python
import time

for i in range(3600):
    print('hello, world')
    time.sleep(1)
```

需要说明的是，上面代码中的`range(3600)`可以构造出一个从`0`到`3599`的范围，当我们把这样一个范围放到`for-in`循环中，就可以通过前面的循环变量`i`依次取出从`0`到`3599`的整数，这就让`for-in`代码块中的语句可以重复3600次。当然，`range`的用法非常灵活，下面的清单给出了使用`range`函数的例子：

- `range(101)`：可以用来产生`0`到`100`范围的整数，需要注意的是取不到`101`。
- `range(1, 101)`：可以用来产生`1`到`100`范围的整数，相当于是左闭右开的设定，即`[1, 101)`。
- `range(1, 101, 2)`：可以用来产生`1`到`100`的奇数，其中`2`是步长（跨度），即每次递增的值，`101`取不到。
- `range(100, 0, -2)`：可以用来产生`100`到`1`的偶数，其中`-2`是步长（跨度），即每次递减的值，`0`取不到。

大家可能已经注意到了，上面的输出和休眠操作都没有用到循环变量`i`，对于不需要用到循环变量的`for-in`循环结构，按照 Python 的编程惯例，我们通常把循环变量命名为`_`，修改后的代码如下所示。虽然结果没什么变化，但是这样写显得你更专业。

```python
import time

for _ in range(3600):
    print('hello, world')
    time.sleep(1)
```

#### while循环

如果要构造循环结构但是又不能确定循环重复的次数，我们推荐使用`while`循环。`while`循环通过布尔值或能产生布尔值的表达式来控制循环，当布尔值或表达式的值为`True`时，循环体（`while`语句下方保持相同缩进的代码块）中的语句就会被重复执行，当表达式的值为`False`时，结束循环。

下面我们用`while`循环来实现从1到100的整数求和，代码如下所示。

```python
total = 0
i = 1
while i <= 100:
    total += i
    i += 1
print(total)
```

#### break和continue

我们再来看一个极端的场景，把`while`循环的条件直接设置为布尔值`True`，还是从1到100的偶数求和。

那我们就可以使用break语句

需要注意的是，`break`只能终止它所在的那个循环，这一点在使用嵌套循环结构时需要引起注意，后面我们会讲到什么是嵌套的循环结构

```python
total = 0
i = 1

while True:
    i += 1
    if i % 2 == 0:
        total += i
    if i > 100:
        break
print(total)
```

除了`break`之外，还有另一个在循环结构中可以使用的关键字`continue`，它可以用来放弃本次循环后续的代码直接让循环进入下一轮

```python
total = 0
for i in range(1, 101):
    if i % 2 != 0:
        print('000')
        continue
        print('111')
    total += i
print(total)
```

**说明**：上面的代码使用`continue`关键字跳过了`i`是奇数的情况，只有在`i`是偶数的前提下，才会执行到`total += i`。

#### 嵌套的循环结构

和分支结构一样，循环结构也是可以嵌套的，也就是说在循环结构中还可以构造循环结构。下面的例子演示了如何通过嵌套的循环来输出一个乘法口诀表（九九表)

```python
for i in range(1, 10):
    for j in range(1, i+1):
        print('%.f * %.f = %.f' % ( j, i, i*j), end="\t")
    print()
```

`for-in`循环的循环体中又用到了`for-in`循环，外面的循环用来控制产生`i`行的输出，而里面的循环则用来控制在一行中输出`j`列。显然，里面的`for-in`循环的输出就是乘法口诀表中的一整行。所以在里面的循环完成时，我们用了一个`print()`来实现换行的效果，最后的输出如下所示。

1 * 1 = 1	
1 * 2 = 2	2 * 2 = 4	
1 * 3 = 3	2 * 3 = 6	3 * 3 = 9	
1 * 4 = 4	2 * 4 = 8	3 * 4 = 12	4 * 4 = 16	
1 * 5 = 5	2 * 5 = 10	3 * 5 = 15	4 * 5 = 20	5 * 5 = 25	
1 * 6 = 6	2 * 6 = 12	3 * 6 = 18	4 * 6 = 24	5 * 6 = 30	6 * 6 = 36	
1 * 7 = 7	2 * 7 = 14	3 * 7 = 21	4 * 7 = 28	5 * 7 = 35	6 * 7 = 42	7 * 7 = 49	
1 * 8 = 8	2 * 8 = 16	3 * 8 = 24	4 * 8 = 32	5 * 8 = 40	6 * 8 = 48	7 * 8 = 56	8 * 8 = 64	
1 * 9 = 9	2 * 9 = 18	3 * 9 = 27	4 * 9 = 36	5 * 9 = 45	6 * 9 = 54	7 * 9 = 63	8 * 9 = 72	9 * 9 = 81	

#### 结尾 案例 CRAPS赌博游戏

**说明**：CRAPS又称花旗骰，是美国拉斯维加斯非常受欢迎的一种的桌上赌博游戏。该游戏使用两粒骰子，玩家通过摇两粒骰子获得点数进行游戏。简化后的规则是：玩家第一次摇骰子如果摇出了`7`点或`11`点，玩家胜；玩家第一次如果摇出`2`点、`3`点或`12`点，庄家胜；玩家如果摇出其他点数则游戏继续，玩家重新摇骰子，如果玩家摇出了`7`点，庄家胜；如果玩家摇出了第一次摇的点数，玩家胜；其他点数玩家继续摇骰子，直到分出胜负。为了增加代码的趣味性，我们设定游戏开始时玩家有`1000`元的赌注，每局游戏开始之前，玩家先下注，如果玩家获胜就可以获得对应下注金额的奖励，如果庄家获胜，玩家就会输掉自己下注的金额。游戏结束的条件是玩家破产（输光所有的赌注）。

```python
import random
total = 1000
while (total > 0):
    print(f'你的总资产为: {total}元')
    debltValue = int(input('请输入你下注的金额：'))
    # print() 玩家第一次摇筛
    first_point = random.randrange(1, 7) + random.randrange(1, 7)
    print(f'\n玩家摇出了{first_point}点')
    while True:
        if first_point == 7 or first_point == 11:
            print('玩家胜!\n')
            total += debltValue
            break
        elif first_point == 2 or first_point == 3 or first_point == 12:
            print('庄家胜!\n')
            total -= debltValue
            break
        else:
            second_point = random.randrange(1, 7) + random.randrange(1, 7)  # 继续玩法
            print(f'玩家摇出了{second_point}点')
            if second_point == 7:
                print('庄家胜!\n')
                total -= debltValue
                break
            elif second_point == first_point:
                print('玩家胜!\n')
                total += debltValue
                break


print('玩家破产')
```

### 1.5 常用数据结构之列表-1

##### 创建列表

在 Python 中，**列表是由一系元素按特定顺序构成的数据序列**，这就意味着如果我们定义一个列表类型的变量，**可以用它来保存多个数据**。在 python 中，可以使用`[]`字面量语法来定义列表，列表中的多个元素用逗号进行分隔

```python
items1 = [35, 12, 99, 68, 55, 35, 87]
items2 = ['Python', 'Java', 'Go', 'Kotlin']
items3 = [100, 12.3, 'Python', True]
print(items1)  # [35, 12, 99, 68, 55, 35, 87]
print(items2)  # ['Python', 'Java', 'Go', 'Kotlin']
print(items3)  # [100, 12.3, 'Python', True]
```

> **说明**：列表中可以有重复元素，例如`items1`中的`35`；列表中可以有不同类型的元素，例如`items3`中有`int`类型、`float`类型、`str`类型和`bool`类型的元素，但是我们通常并不建议将不同类型的元素放在同一个列表中，主要是操作起来极为不方便。

除此以外，还可以通过 Python 内置的`list`函数将其他序列变成列表。准确的说，`list`并不是一个普通的函数，它是创建列表对象的构造器，

```python
# 列表
items1 = [35, 12, 99, 68, 55, 35, 87]
items2 = ['Python', 'Java', 'Go', 'Kotlin']
items3 = [100, 12.3, 'Python', True]

print(type(items1)) 

items4 = list(range(1, 10))
items5 = list('hello')
print(type(items4))
```

运行结果

```js
// <class 'list'>
// <class 'list'>
```

> **说明**：`range(1, 10)`会产生`1`到`9`的整数序列，给到`list`构造器中，会创建出由`1`到`9`的整数构成的列表。字符串是字符构成的序列，上面的`list('hello')`用字符串`hello`的字符作为列表元素，创建了列表对象。

##### 列表的运算

我们可以使用`+`运算符实现两个列表的拼接，拼接运算会将两个列表中的元素连接起来放到一个列表中，代码如下所示。

```python
items5 = [35, 12, 99, 45, 66]
items6 = [45, 58, 29]
items7 = ['Python', 'Java', 'JavaScript']
print(items5 + items6)  # [35, 12, 99, 45, 66, 45, 58, 29]
print(items6 + items7)  # [45, 58, 29, 'Python', 'Java', 'JavaScript']
items5 += items6
print(items5)  # [35, 12, 99, 45, 66, 45, 58, 29]
```

我们可以使用`*`运算符实现列表的重复运算，`*`运算符会将列表元素重复指定的次数，我们在上面的代码中增加两行，如下所示。

```python
print(items6 * 3)  # [45, 58, 29, 45, 58, 29, 45, 58, 29]
print(items7 * 2)  # ['Python', 'Java', 'JavaScript', 'Python', 'Java', 'JavaScript']
```

我们可以使用`in`或`not in`运算符判断一个元素在不在列表中

```python
print(29 in items6)  # True
print(99 in items6)  # False
print('C++' not in items7)     # True
print('Python' not in items7)  # False
```

使用`[]`运算符，通过在`[]`中指定元素的位置来访问该元素，这种运算称为索引运算。需要说明的是，`[]`的元素位置可以是`0`到`N - 1`的整数，也可以是`-1`到`-N`的整数，分别称为正向索引和反向索引，其中`N`代表列表元素的个数。对于正向索引，`[0]`可以访问列表中的第一个元素，`[N - 1]`可以访问最后一个元素；对于反向索引，`[-1]`可以访问列表中的最后一个元素，`[-N]`可以访问第一个元素

```python
items8 = ['apple', 'waxberry', 'pitaya', 'peach', 'watermelon']
print(items8[0])   # apple
print(items8[2])   # pitaya
print(items8[4])   # watermelon
print(items8[-5])  # 'apple'
print(items8[-4])  # 'waxberry'
print(items8[-1])  # watermelon
items8[-4] = 'strawberry'
print(items8)      # ['apple', 'strawberry', 'durian', 'peach', 'watermelon']
```

在使用索引运算的时候要避免出现索引越界的情况，对于上面的`items8`，如果我们访问`items8[5]`或`items8[-6]`，就会引发`IndexError`错误，导致程序崩溃，对应的错误信息是：*list index out of range*，翻译成中文就是“数组索引超出范围”。因为对于只有五个元素的列表`items8`，有效的正向索引是`0`到`4`，有效的反向索引是`-1`到`-5`。

如果希望一次性访问列表中的多个元素，我们可以使用切片运算。切片运算是形如`[start:end:stride]`的运算符，其中`start`代表访问列表元素的起始位置，`end`代表访问列表元素的终止位置（终止位置的元素无法访问），而`stride`则代表了跨度

**核心**：比如我们访问的第一个元素在`start`位置，那么第二个元素就在`start + stride`位置，当然`start + stride`要小于`end`。

如果`start`值等于`0`，那么在使用切片运算符时可以将其省略；如果`end`值等于`N`，`N`代表列表元素的个数，那么在使用切片运算符时可以将其省略；如果`stride`值等于`1`，那么在使用切片运算符时也可以将其省略。所以，下面的代码跟上面的代码作用完全相同。

```python
print(items8[1:3])     # ['strawberry', 'durian']
print(items8[:3:1])    # ['apple', 'strawberry', 'durian']
print(items8[::2])     # ['apple', 'durian', 'watermelon']
print(items8[-4:-2])   # ['strawberry', 'durian']
print(items8[-2::-1])  # ['peach', 'durian', 'strawberry', 'apple']
```

事实上，我们还可以通过切片操作修改列表中的元素，例如我们给上面的代码再加上一行，大家可以看看这里的输出

```python
items7 = ['Python', 'Java', 'JavaScript']
items7[1:3] = ['x', 'o']
print(items7) # ['Python', 'x', 'o']
```

两个列表还可以做关系运算，我们可以比较两个列表是否相等，也可以给两个列表比大小，代码如下所示

```python
nums1 = [1, 2, 3, 4]
nums2 = list(range(1, 5))
nums3 = [3, 2, 1]
print(nums1 == nums2)  # True
print(nums1 != nums2)  # False
print(nums1 <= nums3)  # True
print(nums2 >= nums3)  # False
```

> **说明**：上面的`nums1`和`nums2`对应元素完全相同，所以`==`运算的结果是`True`。`nums2`和`nums3`的比较，由于`nums2`的第一个元素`1`小于`nums3`的第一个元素`3`，所以`nums2 >= nums3`比较的结果是`False`。两个列表的关系运算在实际工作并不那么常用，如果实在不理解就下面放放吧，不用纠结。

##### 元素的遍历

方法一：在循环结构中通过索引运算，遍历列表元素

```python
languages = ['Python', 'Java', 'C++', 'Kotlin']
for index in range(len(languages)):
    print(languages[index])
```

输出：

```
Python
Java
C++
Kotlin
```

方法二：直接对列表做循环，循环变量就是列表元素的代表。

```python
languages = ['Python', 'Java', 'C++', 'Kotlin']
for language in languages:
    print(language)
```

```
Python
Java
C++
Kotlin
```

### 1.6 常用数据结构之列表-2

#### 列表的方法

##### 添加和删除元素

列表是一种可变容器，可变容器指的是我们可以向容器中添加元素、可以从容器移除元素，也可以修改现有容器中的元素。我们可以使用列表的`append`方法向列表中追加元素，使用`insert`方法向列表中插入元素。追加指的是将元素添加到列表的末尾，而插入则是在指定的位置添加新元素，大家可以看看下面的代码。

```python
languages = ['Python', 'Java', 'C++']
languages.append('JavaScript')
print(languages)  # ['Python', 'Java', 'C++', 'JavaScript']
languages.insert(1, 'SQL')
print(languages)  # ['Python', 'SQL', 'Java', 'C++', 'JavaScript']
```

我们可以用列表的`remove`方法从列表中删除指定元素，需要注意的是，如果要删除的元素并不在列表中，会引发`ValueError`错误导致程序崩溃，所以建议大家在删除元素时，先用之前讲过的成员运算做一个判断。我们还可以使用`pop`方法从列表中删除元素，`pop`方法默认删除列表中的最后一个元素，当然也可以给一个位置，删除指定位置的元素。在使用`pop`方法删除元素时，如果索引的值超出了范围，会引发`IndexError`异常，导致程序崩溃。除此之外，列表还有一个`clear`方法，可以清空列表中的元素，代码如下所示。

```python
languages = ['Python', 'SQL', 'Java', 'C++', 'JavaScript']
if 'Java' in languages:
    languages.remove('Java')
if 'Swift' in languages:
    languages.remove('Swift')
print(languages)  # ['Python', 'SQL', C++', 'JavaScript']
languages.pop()
temp = languages.pop(1)
print(temp)       # SQL
languages.append(temp)
print(languages)  # ['Python', C++', 'SQL']
languages.clear()
print(languages)  # []
```

注意： languages`列表中有多个`'Python'`，那么我们用`languages.remove('Python')`是`删除第一个`'Python'

```python
languages = ['Python', 'SQL', 'Java', 'C++', 'JavaScript', 'Python']
languages.remove('Python')  # ['SQL', 'Java', 'C++', 'JavaScript', 'Python']
```

##### 元素位置和频次

列表的`index`方法可以查找某个元素在列表中的索引位置，如果找不到指定的元素，`index`方法会引发`ValueError`错误；列表的`count`方法可以统计一个元素在列表中出现的次数，代码如下所示。

```python
items = ['Python', 'Java', 'Java', 'C++', 'Kotlin', 'Python']
print(items.index('Python'))     # 0
# 从索引位置1开始查找'Python'
print(items.index('Python', 1))  # 5
print(items.count('Python'))     # 2
print(items.count('Kotlin'))     # 1
print(items.count('Swfit'))      # 0
# 从索引位置3开始查找'Java'
print(items.index('Java', 3))    # ValueError: 'Java' is not in list
```

##### 元素排序和反转

列表的`sort`操作可以实现列表元素的排序，而`reverse`操作可以实现元素的反转，代码如下所示。

```python
items = ['Python', 'Java', 'C++', 'Kotlin', 'Swift']
itemsnum = ['1', '2', '3', '5', '4']
items.sort()
itemsnum.sort()
print(itemsnum) # ['1', '2', '3', '4', '5']
print(items)  # ['C++', 'Java', 'Kotlin', 'Python', 'Swift']
items.reverse()
print(items)  # ['Swift', 'Python', 'Kotlin', 'Java', 'C++']
```

##### 列表生成式

在 Python 中，列表还可以通过一种特殊的字面量语法来创建，这种语法叫做生成式。下面，我们通过例子来说明使用列表生成式创建列表到底有什么好处。

场景一：创建一个取值范围在`1`到`99`且能被`3`或者`5`整除的数字构成的列表。

```
items = []
for i in range(1, 100):
    if i % 3 == 0 or i % 5 == 0:
        items.append(i)
print(items)
```

使用列表生成式做同样的事情，代码如下所示。

```
items = [i for i in range(1, 100) if i % 3 == 0 or i % 5 == 0]
print(items)
# 第一个i就是展示的
```

场景二：有一个整数列表`nums1`，创建一个新的列表`nums2`，`nums2`中的元素是`nums1`中对应元素的平方。

```
nums1 = [35, 12, 97, 64, 55]
nums2 = []
for num in nums1:
    nums2.append(num ** 2)
print(nums2)
```

使用列表生成式做同样的事情，代码如下所示。

```
nums1 = [35, 12, 97, 64, 55]
nums2 = [num ** 2 for num in nums1]
print(nums2)
```

场景三： 有一个整数列表`nums1`，创建一个新的列表`nums2`，将`nums1`中大于`50`的元素放到`nums2`中。

```python
nums1 = [35, 12, 97, 64, 55]
nums2 = []
for num in nums1:
    if num > 50:
        nums2.append(num)
print(nums2)
```

使用列表生成式做同样的事情，代码如下所示。

```
nums1 = [35, 12, 97, 64, 55]
nums2 = [num for num in nums1 if num > 50]
print(nums2)
```

记住“**强烈建议用生成式语法来创建列表**”这个结论就可以了

因为使用列表生成式创建列表不仅代码简单优雅，而且性能上也优于使用`for-in`循环和`append`方法向空列表中追加元素的方式。为什么说生成式有更好的性能呢，那是因为 Python 解释器的字节码指令中有专门针对生成式的指令（`LIST_APPEND`指令）；而`for`循环是通过方法调用（`LOAD_METHOD`和`CALL_METHOD`指令）的方式为列表添加元素，方法调用本身就是一个相对比较耗时的操作。对这一点不理解也没有关系，。

##### 嵌套列表

Python 语言没有限定列表中的元素必须是相同的数据类型，也就是说一个列表中的元素可以任意的数据类型，当然也包括列表本身。如果列表中的元素也是列表，那么我们可以称之为嵌套的列表。嵌套的列表可以用来表示表格或数学上的矩阵，例如：我们想保存5个学生3门课程的成绩，可以用如下所示的列表。

```
scores = [[95, 83, 92], [80, 75, 82], [92, 97, 90], [80, 78, 69], [65, 66, 89]]
print(scores[0])
print(scores[0][1])
```

对于上面的嵌套列表，每个元素相当于就是一个学生3门课程的成绩，例如`[95, 83, 92]`，而这个列表中的`83`代表了这个学生某一门课的成绩，如果想访问这个值，可以使用两次索引运算`scores[0][1]`，其中`scores[0]`可以得到`[95, 83, 92]`这个列表，再次使用索引运算`[1]`就可以获得该列表中的第二个元素。

如果想通过键盘输入的方式来录入5个学生3门课程的成绩并保存在列表中，可以使用如下所示的代码。

```python
scores = []
for _ in range(5):
    temp = []
    for _ in range(3):
        score = int(input('请输入: '))
        temp.append(score)
    scores.append(temp)
print(scores)
```

如果想通过产生随机数的方式来生成5个学生3门课程的成绩并保存在列表中，我们可以使用列表生成式，代码如下所示。

```python
import random

scores = [[random.randrange(60, 101) for _ in range(3)] for _ in range(5)]
print(scores)
```

> **说明**：上面的代码`[random.randrange(60, 101) for _ in range(3)] `可以产生由3个随机整数构成的列表，我们把这段代码又放在了另一个列表生成式中作为列表的元素，这样的元素一共生成5个，最终得到了一个嵌套列表。

### 1.7 常用数据结构之元组

元组也是多个元素按照一定顺序构成的序列。元组和列表的不同之处在于，**元组是不可变类型**，这就意味着元组类型的变量一旦定义，其中的元素不能再添加或删除，而且元素的值也不能修改。如果试图修改元组中的元素，将引发`TypeError`错误，导致程序崩溃。定义元组通常使用形如`(x, y, z)`的字面量语法，元组类型支持的运算符跟列表是一样的

```python
# 定义一个三元组
t1 = (35, 12, 98)
# 查看变量的类型
print(type(t1))  # <class 'tuple'>
```

```python
# 定义一个三元组
t1 = (35, 12, 98)
# 定义一个四元组
t2 = ('骆昊', 43, True, '四川成都')

# 查看变量的类型
print(type(t1))  # <class 'tuple'>
print(type(t2))  # <class 'tuple'>

# 查看元组中元素的数量
print(len(t1))  # 3
print(len(t2))  # 4

# 索引运算
print(t1[0])    # 35
print(t1[2])    # 98
print(t2[-1])   # 四川成都

# 切片运算
print(t2[:2])   # ('骆昊', 43)
print(t2[::3])  # ('骆昊', '四川成都')

# 循环遍历元组中的元素
for elem in t1:
    print(elem)

# 成员运算
print(12 in t1)         # True
print(99 in t1)         # False
print('Hao' not in t2)  # False

# 拼接运算
t3 = t1 + t2
print(t3)  # (35, 12, 98, '骆昊', 43, True, '四川成都')

# 比较运算
print(t1 == t3)            # False
print(t1 >= t3)            # False
print(t1 <= (35, 11, 99))  # False
```

个元组中如果有两个元素，我们就称之为二元组；一个元组中如果五个元素，我们就称之为五元组。需要提醒大家注意的是，`()`表示空元组，但是如果元组中只有一个元素，需要加上一个逗号，否则`()`就不是代表元组的字面量语法，而是改变运算优先级的圆括号，所以`('hello', )`和`(100, )`才是一元组，而`('hello')`和`(100)`只是字符串和整数

```python
a = ()
print(type(a))  # <class 'tuple'>
b = ('hello')
print(type(b))  # <class 'str'>
c = (100)
print(type(c))  # <class 'int'>
d = ('hello', )
print(type(d))  # <class 'tuple'>
e = (100, )
print(type(e))  # <class 'tuple'>
```

#### 打包和解包操作

当我们把多个用逗号分隔的值赋给一个变量时，多个值会打包成一个元组类型；当我们把一个元组赋值给多个变量时，元组会解包成多个值然后分别赋给对应的变量，如下面的代码所示。

```python
# 打包操作
a = 1, 10, 100
print(type(a))  # <class 'tuple'>
print(a)        # (1, 10, 100)
# 解包操作
i, j, k = a
print(i, j, k)  # 1 10 100
```

在解包时，如果解包出来的元素个数和变量个数不对应，会引发`ValueError`异常，错误信息为：`too many values to unpack`（解包的值太多）或`not enough values to unpack`（解包的值不足）。

```python
a = 1, 10, 100, 1000
# i, j, k = a             # ValueError: too many values to unpack (expected 3)
# i, j, k, l, m, n = a    # ValueError: not enough values to unpack (expected 6, got 4)
```

有一种解决变量个数少于元素的个数方法，就是使用星号表达式。通过星号表达式，我们可以让一个变量接收多个值，代码如下所示。需要注意两点：首先，用星号表达式修饰的变量会变成一个列表，列表中有0个或多个元素；其次，在解包语法中，星号表达式只能出现一次。

```python
a = 1, 10, 100, 1000
i, j, *k = a
print(i, j, k)        # 1 10 [100, 1000]
i, *j, k = a
print(i, j, k)        # 1 [10, 100] 1000
*i, j, k = a
print(i, j, k)        # [1, 10] 100 1000
*i, j = a
print(i, j)           # [1, 10, 100] 1000
i, *j = a
print(i, j)           # 1 [10, 100, 1000]
i, j, k, *l = a
print(i, j, k, l)     # 1 10 100 [1000]
i, j, k, l, *m = a
print(i, j, k, l, m)  # 1 10 100 1000 []
```

需要说明一点，解包语法对所有的序列都成立，这就意味着我们之前讲的列表、`range`函数构造的范围序列甚至字符串都可以使用解包语法。大家可以尝试运行下面的代码，看看会出现怎样的结果。

```python
a, b, *c = range(1, 10)
print(a, b, c) # 1 2 [3, 4, 5, 6, 7, 8, 9]
a, b, c = [1, 10, 100]
print(a, b, c) # 1 10 100
a, *b, c = 'hello'
print(a, b, c) # h ['e', 'l', 'l'] o
```

#### 交换变量的值

交换变量的值是写代码时经常用到的一个操作，但是在很多编程语言中，交换两个变量的值都需要借助一个中间变量才能做到，如果不用中间变量就需要使用比较晦涩的位运算来实现。在 Python 中，交换两个变量`a`和`b`的值只需要使用如下所示的代码。

```
a, b = b, a
```

同理，如果要将三个变量`a`、`b`、`c`的值互换，即`b`的值赋给`a`，`c`的值赋给`b`，`a`的值赋给`c`，也可以如法炮制。

```
a, b, c = b, c, a
```

需要说明的是，上面的操作并没有用到打包和解包语法，Python 的字节码指令中有`ROT_TWO`和`ROT_THREE`这样的指令可以直接实现这个操作，效率是非常高的。但是如果有多于三个变量的值要依次互换，这个时候是没有直接可用的字节码指令的，需要通过打包解包的方式来完成变量之间值的交换。

#### 元组和列表的比较

这里还有一个非常值得探讨的问题，Python 中已经有了列表类型，为什么还需要元组这样的类型呢？这个问题对于初学者来说似乎有点困难，不过没有关系，我们先抛出观点，大家可以一边学习一边慢慢体会。

1. 元组是不可变类型，**不可变类型更适合多线程环境**，因为它降低了并发访问变量的同步化开销。关于这一点，我们会在后面讲解并发编程的时候跟大家一起探讨。

2. 元组是不可变类型，通常**不可变类型在创建时间上优于对应的可变类型**。我们可以使用`timeit`模块的`timeit`函数来看看创建保存相同元素的元组和列表各自花费的时间，`timeit`函数的`number`参数表示代码执行的次数。下面的代码中，我们分别创建了保存`1`到`9`的整数的列表和元组，每个操作执行`10000000`次，统计运行时间。

   ```
   import timeit
   
   print('%.3f 秒' % timeit.timeit('[1, 2, 3, 4, 5, 6, 7, 8, 9]', number=10000000))
   print('%.3f 秒' % timeit.timeit('(1, 2, 3, 4, 5, 6, 7, 8, 9)', number=10000000))
   ```

   输出：

   ```
   0.495 秒
   0.091 秒
   ```

当然，Python 中的元组和列表类型是可以相互转换的，我们可以通过下面的代码来完成该操作。

```
infos = ('骆昊', 43, True, '四川成都')
# 将元组转换成列表
print(list(infos))  # ['骆昊', 43, True, '四川成都']

frts = ['apple', 'banana', 'orange']
# 将列表转换成元组
print(tuple(frts))  # ('apple', 'banana', 'orange')
```

#### 总结

**列表和元组都是容器型的数据类型**，即一个变量可以保存多个数据，而且它们都是按一定顺序组织元素的有序容器。**列表是可变数据类型**，**元组是不可变数据类型**，所以列表可以添加元素、删除元素、清空元素、排序反转，但这些操作对元组来说是不成立的。列表和元组都可以支持**拼接运算**、**成员运算**、**索引运算**、**切片运算**等操作，后面我们要讲到的字符串类型也支持这些运算，因为字符串就是字符按一定顺序构成的序列，在这一点上三者并没有什么区别。我们**推荐大家使用列表的生成式语法来创建列表**，它不仅好用而且效率很高，是 Python 语言中非常有特色的语法。

### 1.8 字符串

#### 字符串的定义

所谓**字符串**，就是**由零个或多个字符组成的有限序列**，一般记为： $$ s = a_1a_2 \cdots a_n ,,,,, (0 \le n \le \infty) $$ 在 Python 程序中，我们把单个或多个字符用单引号或者双引号包围起来，就可以表示一个字符串。字符串中的字符可以是特殊符号、英文字母、中文字符、日文的平假名或片假名、希腊字母、Emoji 字符（如：💩、🐷、🀄️）等。

```
s1 = 'hello, world!'
s2 = "你好，世界！❤️"
s3 = '''hello,
wonderful
world!'''
print(s1)
print(s2)
print(s3)
```

#### 转义字符

我们可以在字符串中使用`\`（反斜杠）来表示转义，也就是说`\`后面的字符不再是它原来的意义，例如：`\n`不是代表字符`\`和字符`n`，而是表示换行；`\t`也不是代表字符`\`和字符`t`，而是表示制表符。所以如果字符串本身又包含了`'`、`"`、`\`这些特殊的字符，必须要通过`\`进行转义处理。例如要输出一个带单引号或反斜杠的字符串，需要用如下所示的方法。

```
s1 = '\'hello, world!\''
s2 = '\\hello, world!\\'
print(s1)
print(s2)
```

#### 原始字符串

Python 中有一种以`r`或`R`开头的字符串，这种字符串被称为原始字符串，意思是字符串中的每个字符都是它本来的含义，没有所谓的转义字符。例如，在字符串`'hello\n'`中，`\n`表示换行；而在`r'hello\n'`中，`\n`不再表示换行，就是字符`\`和字符`n`。大家可以运行下面的代码，看看会输出什么。

```
s1 = '\it \is \time \to \read \now'
s2 = r'\it \is \time \to \read \now'
print(s1)
print(s2)
```

> **说明**：上面的变量`s1`中，`\t`、`\r`和`\n`都是转义字符。`\t`是制表符（table），`\n`是换行符（new line），`\r`是回车符（carriage return）相当于让输出回到了行首。对比一下两个`print`函数的输出，看看到底有什么区别！

#### 字符的特殊表示

Python 中还允许在`\`后面还可以跟一个八进制或者十六进制数来表示字符，例如`\141`和`\x61`都代表小写字母`a`，前者是八进制的表示法，后者是十六进制的表示法。另外一种表示字符的方式是在`\u`后面跟 Unicode 字符编码，例如`\u9a86\u660a`代表的是中文“骆昊”。运行下面的代码，看看输出了什么。

```
s1 = '\141\142\143\x61\x62\x63'
s2 = '\u9a86\u660a'
print(s1)
print(s2)
```

#### 字符串的运算

Python 语言为字符串类型提供了非常丰富的运算符，有很多运算符跟列表类型的运算符作用类似。例如，我们可以使用`+`运算符来实现字符串的拼接，可以使用`*`运算符来重复一个字符串的内容，可以使用`in`和`not in`来判断一个字符串是否包含另外一个字符串，我们也可以用`[]`和`[:]`运算符从字符串取出某个字符或某些字符。

#### 拼接和重复

下面的例子演示了使用`+`和`*`运算符来实现字符串的拼接和重复操作。

```
s1 = 'hello' + ', ' + 'world'
print(s1)    # hello, world
s2 = '!' * 3
print(s2)    # !!!
s1 += s2
print(s1)    # hello, world!!!
s1 *= 2
print(s1)    # hello, world!!!hello, world!!!
```

用`*`实现字符串的重复是非常有意思的一个运算符，在很多编程语言中，要表示一个有10个`a`的字符串，你只能写成`'aaaaaaaaaa'`，但是在 Python 中，你可以写成`'a' * 10`。你可能觉得`'aaaaaaaaaa'`这种写法也没有什么不方便的，但是请想一想，如果字符`a`要重复100次或者1000次又会如何呢？

#### 比较运算

对于两个字符串类型的变量，可以直接使用比较运算符来判断两个字符串的相等性或比较大小。需要说明的是，因为字符串在计算机内存中也是以二进制形式存在的，那么字符串的大小比较比的是每个字符对应的编码的大小。例如`A`的编码是`65`， 而`a`的编码是`97`，所以`'A' < 'a'`的结果相当于就是`65 < 97`的结果，这里很显然是`True`；而`'boy' < 'bad'`，因为第一个字符都是`'b'`比不出大小，所以实际比较的是第二个字符的大小，显然`'o' < 'a'`的结果是`False`，所以`'boy' < 'bad'`的结果是`False`。如果不清楚两个字符对应的编码到底是多少，可以使用`ord`函数来获得，之前我们有提到过这个函数。例如`ord('A')`的值是`65`，而`ord('昊')`的值是`26122`。下面的代码展示了字符串的比较运算，请大家仔细看看。

```
s1 = 'a whole new world'
s2 = 'hello world'
print(s1 == s2)             # False
print(s1 < s2)              # True
print(s1 == 'hello world')  # False
print(s2 == 'hello world')  # True
print(s2 != 'Hello world')  # True
s3 = '骆昊'
print(ord('骆'))            # 39558
print(ord('昊'))            # 26122
s4 = '王大锤'
print(ord('王'))            # 29579
print(ord('大'))            # 22823
print(ord('锤'))            # 38180
print(s3 >= s4)             # True
print(s3 != s4)             # True
```

#### 成员运算

可以用`in`和`not in`判断一个字符串中是否包含另外一个字符或字符串，跟列表类型一样，`in`和`not in`称为成员运算符，会产生布尔值`True`或`False`，代码如下所示。

```
s1 = 'hello, world'
s2 = 'goodbye, world'
print('wo' in s1)      # True
print('wo' not in s2)  # False
print(s2 in s1)        # False
```

#### 获取字符串长度

获取字符串长度跟获取列表元素个数一样，使用内置函数`len`，代码如下所示。

```
s = 'hello, world'
print(len(s))                 # 12
print(len('goodbye, world'))  # 14
```

#### 索引和切片

字符串的索引和切片操作跟列表几乎区别，因为字符串也是一种有序序列，可以通过正向或反向的整数索引访问其中的元素。但是有一点需要注意，因为**字符串是不可变类型**，所以**不能通过索引运算修改字符串中的字符**。

```
s = 'abc123456'
n = len(s)
print(s[0], s[-n])    # a a
print(s[n-1], s[-1])  # 6 6
print(s[2], s[-7])    # c c
print(s[5], s[-4])    # 3 3
print(s[2:5])         # c12
print(s[-7:-4])       # c12
print(s[2:])          # c123456
print(s[:2])          # ab
print(s[::2])         # ac246
print(s[::-1])        # 654321cba
```

需要再次提醒大家注意的是，在进行索引运算时，如果索引越界，会引发`IndexError`异常，错误提示信息为：`string index out of range`（字符串索引超出范围）。

#### 字符的遍历

如果希望遍历字符串中的每个字符，可以使用`for-in`循环，有如下所示的两种方式。

方式一：

```python
s = 'hello'
for i in range(len(s)):
    print(s[i])
```

方式二：

```python
s = 'hello'
for elem in s:
    print(elem)
```

#### 字符串的方法

##### 大小写相关操作

```python
s1 = 'hello, world!'
# 字符串首字母大写
print(s1.capitalize())  # Hello, world!
# 字符串每个单词首字母大写
print(s1.title())       # Hello, World!
# 字符串变大写
print(s1.upper())       # HELLO, WORLD!
s2 = 'GOODBYE'
# 字符串变小写
print(s2.lower())       # goodbye
# 检查s1和s2的值
print(s1)               # hello, world
print(s2)               # GOODBYE
```

> **说明**：由于字符串是不可变类型，使用字符串的方法对字符串进行操作会产生新的字符串，但是原来变量的值并没有发生变化。所以上面的代码中，当我们最后检查`s1`和`s2`两个变量的值时，`s1`和`s2` 的值并没有发生变化。

##### 查找操作

如果想在一个字符串中从前向后查找有没有另外一个字符串，可以使用字符串的`find`或`index`方法。在使用`find`和`index`方法时还可以通过方法的参数来指定查找的范围，也就是查找不必从索引为`0`的位置开始

```python
s = 'hello, world!'
print(s.find('or'))      # 8
print(s.find('or', 9))   # -1
print(s.find('of'))      # -1
print(s.index('or'))     # 8
print(s.index('or', 9))  # ValueError: substring not found
```

> **说明**：`find`方法找不到指定的字符串会返回`-1`，`index`方法找不到指定的字符串会引发`ValueError`错误。

`find`和`index`方法还有逆向查找（从后向前查找）的版本，分别是`rfind`和`rindex`，代码如下所示。

```python
s = 'hello world!'
print(s.find('o'))       # 4
print(s.rfind('o'))      # 7
print(s.rindex('o'))     # 7
# print(s.rindex('o', 8))  # ValueError: substring not found
```

##### 性质判断

可以通过字符串的`startswith`、`endswith`来判断字符串是否以某个字符串开头和结尾；还可以用`is`开头的方法判断字符串的特征，这些方法都返回布尔值，代码如下所示。

```python
s1 = 'hello, world!'
print(s1.startswith('He'))   # False
print(s1.startswith('hel'))  # True
print(s1.endswith('!'))      # True
s2 = 'abc123456'
print(s2.isdigit())  # False
print(s2.isalpha())  # False
print(s2.isalnum())  # True
```

> **说明**：上面的`isdigit`用来判断字符串是不是完全由数字构成的，`isalpha`用来判断字符串是不是完全由字母构成的，这里的字母指的是 Unicode 字符但不包含 Emoji 字符，`isalnum`用来判断字符串是不是由字母和数字构成的

##### 格式化字符串

在 Python 中，字符串类型可以通过`center`、`ljust`、`rjust`方法做居中、左对齐和右对齐的处理。如果要在字符串的左侧补零，也可以使用`zfill`方法。

```python
s = 'hello, world'
print(s.center(20, '*'))  # ****hello, world****
print(s.rjust(20))        #         hello, world
print(s.ljust(20, '~'))   # hello, world~~~~~~~~
print('33'.zfill(5))      # 00033
print('-33'.zfill(5))     # -0033
```

我们之前讲过，在用`print`函数输出字符串时，可以用下面的方式对字符串进行格式化。

```python
a = 321
b = 123
print('%d * %d = %d' % (a, b, a * b))
```

当然，我们也可以用字符串的`format`方法来完成字符串的格式，代码如下所示。

```python
a = 321
b = 123
print('{0} * {1} = {2}'.format(a, b, a * b))
```

从 Python 3.6 开始，格式化字符串还有更为简洁的书写方式，就是在字符串前加上`f`来格式化字符串，在这种以`f`打头的字符串中，`{变量名}`是一个占位符，会被变量对应的值将其替换掉，代码如下所示。

```python
a = 321
b = 123
print(f'{a} * {b} = {a * b}')
```

如果需要进一步控制格式化语法中变量值的形式，可以参照下面的表格来进行字符串格式化操作。

| 变量值      | 占位符     | 格式化结果      | 说明                   |
| ----------- | ---------- | --------------- | ---------------------- |
| `3.1415926` | `{:.2f}`   | `'3.14'`        | 保留小数点后两位       |
| `3.1415926` | `{:+.2f}`  | `'+3.14'`       | 带符号保留小数点后两位 |
| `-1`        | `{:+.2f}`  | `'-1.00'`       | 带符号保留小数点后两位 |
| `3.1415926` | `{:.0f}`   | `'3'`           | 不带小数               |
| `123`       | `{:0>10d}` | `'0000000123'`  | 左边补`0`，补够10位    |
| `123`       | `{:x<10d}` | `'123xxxxxxx'`  | 右边补`x` ，补够10位   |
| `123`       | `{:>10d}`  | `'       123'`  | 左边补空格，补够10位   |
| `123`       | `{:<10d}`  | `'123       '`  | 右边补空格，补够10位   |
| `123456789` | `{:,}`     | `'123,456,789'` | 逗号分隔格式           |
| `0.123`     | `{:.2%}`   | `'12.30%'`      | 百分比格式             |
| `123456789` | `{:.2e}`   | `'1.23e+08'`    | 科学计数法格式         |

##### 修剪操作

字符串的`strip`方法可以帮我们获得将原字符串修剪掉左右两端指定字符之后的字符串，默认是修剪空格字符。这个方法非常有实用价值，可以用来将用户输入时不小心键入的头尾空格等去掉，`strip`方法还有`lstrip`和`rstrip`两个版本，相信从名字大家已经猜出来这两个方法是做什么用的。

```python
s1 = '   jackfrued@126.com  '
print(s1.strip())      # jackfrued@126.com
s2 = '~你好，世界~'
print(s2.lstrip('~'))  # 你好，世界~
print(s2.rstrip('~'))  # ~你好，世界
```

##### 替换操作

如果希望用新的内容替换字符串中指定的内容，可以使用`replace`方法，代码如下所示。`replace`方法的第一个参数是被替换的内容，第二个参数是替换后的内容，还可以通过第三个参数指定替换的次数。

```python
s = 'hello, good world'
print(s.replace('o', '@'))     # hell@, g@@d w@rld
print(s.replace('o', '@', 1))  # hell@, good world
```

##### 拆分与合并

可以使用字符串的`split`方法将一个字符串拆分为多个字符串（放在一个列表中），也可以使用字符串的`join`方法将列表中的多个字符串连接成一个字符串，代码如下所示。

```python
s = 'I love you'
words = s.split()
print(words)            # ['I', 'love', 'you']
print('~'.join(words))  # I~love~you
```

需要说明的是，`split`方法默认使用空格进行拆分，我们也可以指定其他的字符来拆分字符串，而且还可以指定最大拆分次数来控制拆分的效果，代码如下所示。

```python
s = 'I#love#you#so#much'
words = s.split('#')
print(words)  # ['I', 'love', 'you', 'so', 'much']
words = s.split('#', 2)
print(words)  # ['I', 'love', 'you#so#much']
```

##### 编码和解码

Python 中除了字符串`str`类型外，还有一种表示二进制数据的字节串类型（`bytes`）。所谓字节串，就是**由零个或多个字节组成的有限序列**。通过字符串的`encode`方法，我们可以按照某种编码方式将字符串编码为字节串，我们也可以使用字节串的`decode`方法，将字节串解码为字符串，代码如下所示。

```python
a = '张三'
b = a.encode('utf-8')
c = a.encode('gbk')
print(b) #  b'\xe5\xbc\xa0\xe4\xb8\x89'
print(c) # b'\xd5\xc5\xc8\xfd'
print(b.decode('utf-8')) # 张三
print(c.decode('gbk')) # 张三
```

### 1. 9 常用数据结构之集合

​	在学习了列表和元组之后，我们再来学习一种容器型的数据类型，它的名字叫集合（set）。说到集合这个词大家一定不会陌生，在数学课本上就有这个概念。如果我们**把一定范围的、确定的、可以区别的事物当作一个整体来看待**，那么这个整体就是集合，集合中的各个事物称为集合的**元素**。通常，集合需要满足以下特性：

1. **无序性**：一个集合中，每个元素的地位都是相同的，元素之间是无序的。
2. **互异性**：一个集合中，任何两个元素都是不相同的，即元素在集合中只能出现一次。
3. **确定性**：给定一个集合和一个任意元素，该元素要么属这个集合，要么不属于这个集合，二者必居其一，不允许有模棱两可的情况出现。

Python 程序中的集合跟数学上的集合没有什么本质区别，需要强调的是上面所说的无序性和互异性。无序性说明集合中的元素并不像列中的元素那样存在某种次序，可以通过索引运算就能访问任意元素，**集合并不支持索引运算**。另外，集合的互异性决定了**集合中不能有重复元素**，这一点也是集合区别于列表的地方，我们无法将重复的元素添加到一个集合中。集合类型必然是支持`in`和`not in`成员运算的，这样就可以确定一个元素是否属于集合，也就是上面所说的集合的确定性。**集合的成员运算在性能上要优于列表的成员运算**，这是集合的底层存储特性决定的，此处我们暂时不做讨论，大家记住这个结论即可。

#### 	1 创建集合

创建集合可以使用`{}`字面量语法， `{}`中需要至少有一个元素，因为没有元素的`{}`并不是空集合而是一个空字典

也可以使用 Python 内置函数`set`来创建一个集合，准确的说`set`并不是一个函数，而是创建集合对象的构造器

```python
set1 = {1, 2, 3, 3, 3, 2}
print(set1) # {1, 2, 3, 4, 5}

set2 = {'banana', 'pitaya', 'apple', 'apple', 'banana', 'grape'}
print(set2)

set3 = set('hello')
print(set3)

set4 = set([1, 2, 2, 3, 3, 3, 2, 1])
print(set4)

set5 = {num for num in range(1, 20) if num % 3 == 0 or num % 7 == 0}
print(set5)
```

说明：集合中的元素必须是`hashable`（可散列的）类型，使用哈希存储的容器都会对元素提出这一要求，通常不可变类型都是`hashable`类型，如整数（`int`）、浮点小数（`float`）、布尔值（`bool`）、字符串（`str`）、元组（`tuple`）等。可变类型都不是`hashable`类型，因为可变类型无法计算出确定的哈希码，所以它们不能放到集合中;同理，由于集合本身也是可变类型，所以集合也不能作为集合中的元素。我们可以创建出嵌套的列表，但是我们不能创建出嵌套的集合，这一点在使用集合的时候一定要引起注意

#### 2 集合的遍历

我们可以通过`len`函数来获得集合中有多少个元素，但是我们不能通过索引运算来遍历集合中的元素，因为集合元素并没有特定的顺序。当然，要实现对集合元素的遍历，我们仍然可以使用`for-in`循环

```python
set11 = {'Python', 'C++', 'Java', 'Kotlin', 'Swift'}
for i in set11:
    print(i)
```

#### 3 集合的运算

##### 3.1 成员运算

```python
set1 = {11, 12, 13, 14, 15}
print(10 in set1)      # False 
print(15 in set1)      # True
set2 = {'Python', 'Java', 'C++', 'Swift'}
print('Ruby' in set2)  # False
print('Java' in set2)  # True
```

##### 3.2 二元运算

```python
set1 = {1, 2, 3, 4, 5, 6, 7}
set2 = {2, 4, 6, 8, 10}
# 交集
print(set1 & set2)                      # {2, 4, 6}
print(set1.intersection(set2))          # {2, 4, 6}
# 并集
print(set1 | set2)  # {1, 2, 3, 4, 5, 6, 7, 8, 10}
print(set1.union(set2)) # {1, 2, 3, 4, 5, 6, 7, 8, 10}

# 差集 也就是set1 里的元素存在于set2中得去掉 形成新的集合
print(set1 - set2)
print(set1.difference(set2))
# 对称差  symmetric_difference() 方法返回两个集合中不重复的元素集合，即会移除两个集合中都存在的元素。
print(set1 ^ set2)                      # {1, 3, 5, 7, 8, 10}
print(set1.symmetric_difference(set2))  # {1, 3, 5, 7, 8, 10}
```

​	集合的二元运算还可以跟赋值运算一起构成复合赋值运算

​		例如：`set1 |= set2`相当于`set1 = set1 | set2`

​					`|=`作用相同的方法是`update`；

​					`set1 &= set2`相当于`set1 = set1 & set2`，

​					`&=`作用相同的方法是`intersection_update`

​	代码如下所示

```python
set1 = {1, 3, 5, 7}
set2 = {2, 4, 6}

set1 |= set2 # set1.update(set2)
print(set1)  # {1, 2, 3, 4, 5, 6, 7}

set3 = {3, 6, 9}

set1 &= set3 # set1.intersection_update(set3)
print(set1)  # {3, 6}

set2 -= set1 # set2.difference_update(set1)
print(set2)  # {2, 4}
```

##### 3.3 比较运算

两个集合可以用`==`和`!=`进行相等性判断，如果两个集合中的元素完全相同，那么`==`比较的结果就是`True`，否则就是`False`,如果集合`A`的任意一个元素都是集合`B`的元素，那么集合`A`称为集合`B`的子集,`A`是`B`的子集，反过来也可以称`B`是`A`的超集。如果`A`是`B`的子集且`A`不等于`B`，那么`A`就是`B`的真子集。Python 为集合类型提供了判断子集和超集的运算符，其实就是我们非常熟悉的`<`、`<=`、`>`、`>=`这些运算符

```python
set1 = {1, 3, 5}
set2 = {1, 2, 3, 4, 5}
set3 = {5, 4, 3, 2, 1}

print(set1 < set2)   # True
print(set1 <= set2)  # True
print(set2 < set3)   # False
print(set2 <= set3)  # True
print(set2 > set1)   # True
print(set2 == set3)  # True

print(set1.issubset(set2))    # True
print(set2.issuperset(set1))  # True
```

> **说明**：上面的代码中，`set1 < set2`判断`set1`是不是`set2`的真子集，`set1 <= set2`判断`set1`是不是`set2`的子集，`set2 > set1`判断`set2`是不是`set1`的超集。当然，我们也可以通过`set1.issubset(set2)`判断`set1`是不是`set2`的子集；通过`set2.issuperset(set1)`判断`set2`是不是`set1`的超集。

#### 4 集合的方法

Python 中的集合是可变类型，我们可以通过集合类型的方法向集合添加元素或从集合中删除元素

```python
set1 = {1, 10, 100}
# 添加元素
set1.add(1000)
set1.add(10000)
set1.add(10099)
print(set1)

# 删除元素
set1.discard(10)
if 100 in set1:
    set1.remove(100)
print(set1)  # {1, 1000, 10000}

# 清空元素
set1.clear()
print(set1)  # set() 为啥不是{} 这是字典
```

> **说明**：删除集合元素的`remove`方法在元素不存在时会引发`KeyError`错误，所以上面的代码中我们先通过成员运算判断元素是否在集合中。集合类型还有一个`pop`方法可以从集合中随机删除一个元素，该方法在删除元素的同时会获得被删除的元素，而`remove`和`discard`方法仅仅是删除元素，不会获得被删除的元素。

集合类型还有一个名为`isdisjoint`的方法可以判断两个集合有没有相同的元素，如果没有相同元素，该方法返回`True`，否则该方法返回`False`

```python
set1 = {'Java', 'Python', 'C++', 'Kotlin'}
set2 = {'Kotlin', 'Swift', 'Java', 'Dart'}
set3 = {'HTML', 'CSS', 'JavaScript'}
print(set1.isdisjoint(set2))  # False
print(set1.isdisjoint(set3))  # True
```

#### 5 不可变集合

Python 中还有一种不可变类型的集合，名字叫`frozenset`。`set`跟`frozenset`的区别就如同`list`跟`tuple`的区别，`frozenset`由于是不可变类型，能够计算出哈希码，因此它可以作为`set`中的元素。除了不能添加和删除元素，`frozenset`在其他方面跟`set`是一样的，下面的代码简单的展示了`frozenset`的用法。

```python
fset1 = frozenset({1, 3, 5, 7})
fset2 = frozenset(range(1, 6))
print(fset1)          # frozenset({1, 3, 5, 7})
print(fset2)          # frozenset({1, 2, 3, 4, 5})
print(fset1 & fset2)  # frozenset({1, 3, 5})
print(fset1 | fset2)  # frozenset({1, 2, 3, 4, 5, 7})
print(fset1 - fset2)  # frozenset({7})
print(fset1 < fset2)  # False
```

last

Python 中的**集合类型是一种无序容器**，**不允许有重复运算**，由于底层使用了哈希存储，集合中的元素必须是`hashable`类型。集合与列表最大的区别在于**集合中的元素没有顺序**、所以**不能够通过索引运算访问元素**、但是集合可以执行交集、并集、差集等二元运算，也可以通过关系运算符检查两个集合是否存在超集、子集等关系。

### 1.10 常用数据结构之字典(dictionary)

例如，我们需要一个变量来保存一个人的多项信息，包括：姓名、年龄、身高、体重、家庭住址、本人手机号、紧急联系人手机号，此时你会发现，我们之前学过的列表、元组和集合类型都不够好使。

```python
person1 = ['王大锤', 55, 168, 60, '成都市武侯区科华北路62号1栋101', '13122334455', '13800998877']
person2 = ('王大锤', 55, 168, 60, '成都市武侯区科华北路62号1栋101', '13122334455', '13800998877')
person3 = {'王大锤', 55, 168, 60, '成都市武侯区科华北路62号1栋101', '13122334455', '13800998877'}
```

#### 1 创建和使用字典

Python 中创建字典可以使用`{}`字面量语法，这一点跟上一节课讲的集合是一样的。但是字典的`{}`中的元素是以键值对的形式存在的，每个元素由`:`分隔的两个值构成，`:`前面是键，`:`后面是值，代码如下所示。

```python
xinhua = {
    '麓': '山脚下',
    '路': '道，往来通行的地方；方面，地区：南～货，外～货；种类：他俩是一～人',
    '蕗': '甘草的别名',
    '潞': '潞水，水名，即今山西省的浊漳河；潞江，水名，即云南省的怒江'
}
print(xinhua)
person = {
    'name': '王大锤',
    'age': 55,
    'height': 168,
    'weight': 60,
    'addr': '成都市武侯区科华北路62号1栋101', 
    'tel': '13122334455',
    'emergence contact': '13800998877'
}
print(person)
```

当然，如果愿意，我们也可以使用内置函数`dict`或者是字典的生成式语法来创建字典，代码如下所示。

```python
# dict函数(构造器)中的每一组参数就是字典中的一组键值对
person = dict(name='王大锤', age=55, height=168, weight=60, addr='成都市武侯区科华北路62号1栋101')
print(person)  # {'name': '王大锤', 'age': 55, 'height': 168, 'weight': 60, 'addr': '成都市武侯区科华北路62号1栋101'}

# 可以通过Python内置函数zip压缩两个序列并创建字典
items1 = dict(zip('ABCDE', '12345'))
print(items1)  # {'A': '1', 'B': '2', 'C': '3', 'D': '4', 'E': '5'}
items2 = dict(zip('ABCDE', range(1, 10)))
print(items2)  # {'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5}

# 用字典生成式语法创建字典
items3 = {x: x ** 3 for x in range(1, 6)}
print(items3)  # {1: 1, 2: 8, 3: 27, 4: 64, 5: 125}
```

字典遍历

```python
person = dict(name='王大锤', age=55, height=168, weight=60, addr='成都市武侯区科华北路62号1栋101')
print(person)
print(len(person))
for key in person:
    print(person[key])
```

#### 2 字典的运算

对于字典类型来说，成员运算和索引运算肯定是很重要的，前者可以判定指定的键在不在字典中，后者可以通过键获取对应的值或者向字典中添加新的键值对。值得注意的是，字典的索引不同于列表的索引，列表中的元素因为有属于自己有序号，所以列表的索引是一个整数；字典中因为保存的是键值对，所以字典需要用键去索引对应的值。需要**特别提醒**大家注意的是，**字典中的键必须是不可变类型**，例如整数（`int`）、浮点数（`float`）、字符串（`str`）、元组（`tuple`）等类型，这一点跟集合类型对元素的要求是一样的；很显然，之前我们讲的列表（`list`）和集合（`set`）不能作为字典中的键，字典类型本身也不能再作为字典中的键，因为字典也是可变类型，但是字典可以作为字典中的值。大家可以先看看下面的代码，了解一下字典的成员运算和索引运算。

```python
person = {'name': '王大锤', 'age': 55, 'height': 168, 'weight': 60, 'addr': '成都市武侯区科华北路62号1栋101'}

# 成员运算
print('name' in person)  # True
print('tel' in person)   # False

# 索引运算
print(person['name'])
print(person['addr'])
person['age'] = 25
person['height'] = 178
person['tel'] = '13122334455'
person['signature'] = '你的男朋友是一个盖世垃圾，他会踏着五彩祥云去迎娶你的闺蜜'
print(person)

# 循环遍历
for key in person:
    print(f'{key}:\t{person[key]}')
```

需要注意，在通过索引运算获取字典中的值时，如指定的键没有在字典中，将会引发`KeyError`异常。

#### 3 字典的方法

字典类型的方法基本上都跟字典的键值对操作相关，其中`get`方法可以通过键来获取对应的值。跟索引运算不同的是，`get`方法在字典中没有指定的键时不会产生异常，而是返回`None`或指定的默认值，代码如下所示。

```python
person = dict(name='王大锤', age=55, height=168, weight=60, addr='成都市武侯区科华北路62号1栋101')

print(person.get('name'))       # 王大锤
print(person.get('sex'))        # None
print(person.get('sex', True))  # True 指定默认值
```

如果需要获取字典中所有的键，可以使用`keys`方法；如果需要获取字典中所有的值，可以使用`values`方法。字典还有一个名为`items`的方法，它会将键和值组装成二元组，通过该方法来遍历字典中的元素也是非常方便的

```python
print(person.keys()) # dict_keys(['name', 'age', 'height', 'weight', 'addr'])
print(person.values())  # dict_values(['王大锤', 25, 178])
print(person.items())   # dict_items([('name', '王大锤'), ('age', 25), ('height', 178)])
for key, value in person.items():
    print(key, value)
for key in person.keys():
    print(key)
```

字典的`update`方法会用一个字典更新另一个字典中的键值对。例如，有两个字典`x`和`y`，当执行`x.update(y)`操作时，`x`跟`y`相同的键对应的值会`y`中的值被更新，而`y`中有但`x`中没有的键值对会直接添加到`x`中，代码如下所示。

```python
person1 = {'name': '王大锤', 'age': 55, 'height': 178}
person2 = {'age': 25, 'addr': '成都市武侯区科华北路62号1栋101'}
person1.update(person2)
print(person1)  # {'name': '王大锤', 'age': 25, 'height': 178, 'addr': '成都市武侯区科华北路62号1栋101'}
```

可以通过`pop`或`popitem`方法从字典中删除元素，前者会返回键对应的值，但是如果字典中不存在指定的键，会引发`KeyError`错误；后者在删除元素时，会返回键和值组成的二元组。字典的`clear`方法会清空字典中所有的键值对，代码如下所示。

```python
person = {'name': '王大锤', 'age': 25, 'height': 178, 'addr': '成都市武侯区科华北路62号1栋101'}
print(person.pop('age'))  # 25
print(person)             # {'name': '王大锤', 'height': 178, 'addr': '成都市武侯区科华北路62号1栋101'}
print(person.popitem())   # ('addr', '成都市武侯区科华北路62号1栋101')
print(person)             # {'name': '王大锤', 'height': 178}
person.clear()
print(person)             # {}
```

跟列表一样，从字典中删除元素也可以使用`del`关键字，在删除元素的时候如果指定的键索引不到对应的值，一样会引发`KeyError`错误，具体的做法如下所示。

```python
person = {'name': '王大锤', 'age': 25, 'height': 178, 'addr': '成都市武侯区科华北路62号1栋101'}
del person['age']
del person['addr']
print(person)  # {'name': '王大锤', 'height': 178}
```

#### 4 字典的应用

**例子1**：输入一段话，统计每个英文字母出现的次数，按出现次数从高到低输出。

```python
sentence = input('请输入一段话: ')
dian = {}
for ch in sentence:
    if word in dian:
        dian[word] += 1
    else:
        dian[word] = 1
sorted_keys = sorted(dian, key=dian.get, reverse=True)
for key in sorted_keys:
    print(f'{key} 出现了 {dian[key]} 次.')
```

**例子2**：在一个字典中保存了股票的代码和价格，找出股价大于100元的股票并创建一个新的字典

> **说明**：可以用字典的生成式语法来创建这个新字典。

```python

stocks = {
    'AAPL': 191.88,
    'GOOG': 1186.96,
    'IBM': 149.24,
    'ORCL': 48.44,
    'ACN': 166.89,
    'FB': 208.09,
    'SYMC': 21.29
}
print(stocks)
item3 = {x: stocks[x] for x in stocks if stocks[x] > 100}
print(item3)
或
stocks = {
    'AAPL': 191.88,
    'GOOG': 1186.96,
    'IBM': 149.24,
    'ORCL': 48.44,
    'ACN': 166.89,
    'FB': 208.09,
    'SYMC': 21.29
}
stocks2 = {key: value for key, value in stocks.items() if value > 100}
print(stocks2)
```

last

Python 程序中的字典跟现实生活中字典非常像，允许我们**以键值对的形式保存数据**，再**通过键索引对应的值**。这是一种非常**有利于数据检索**的数据类型。再次提醒大家注意，**字典中的键必须是不可变类型**，字典中的值可以是任意类型。

## 2 函数与模块

我们先来研究一道数学题，请说出下面的方程有多少组正整数解。 $$ x_1 + x_2 + x_3 + x_4 = 8 $$

你可能已经想到了，这个问题其实等同于将8个苹果分成四组且每组至少一个苹果有多少种方案，也等价于在分隔8个苹果的7个间隙之间放入三个隔断将苹果分成四组有多少种方案，所以答案是$ C_7^3=35 $，其中，$C_{7}^{3}$代表7选3的组合数，其计算公式如下所示。 $$ C_m^n = \frac {m!} {n!(m-n)!} $$

根据之前学习的知识，我们可以用循环做累乘的方式分别计算出$m!$、$n!$和$(m-n)!$，然后再通过除法运算得到组合数$C_m^n$，代码如下所示。

```
"""
输入m和n，计算组合数C(m,n)的值
"""

m = int(input('m = '))
n = int(input('n = '))
# 计算m的阶乘
fm = 1
for num in range(1, m + 1):
    fm *= num
# 计算n的阶乘
fn = 1
for num in range(1, n + 1):
    fn *= num
# 计算m-n的阶乘
fk = 1
for num in range(1, m - n + 1):
    fk *= num
# 计算C(M,N)的值
print(fm // fn // fk)
```

输入：

```
m = 7
n = 3
```

输出：

```
35
```

不知大家是否注意到，上面的代码中我们做了三次求阶乘的操作，虽然$m$、$n$、$m - n$的值各不相同，但是三段代码并没有实质性的区别，属于重复代码。世界级的编程大师*Martin Fowler*曾经说过：“**代码有很多种坏味道，重复是最坏的一种！**”。要写出高质量的代码，首先就要解决重复代码的问题。对于上面的代码来说，我们可以将求阶乘的功能封装到一个称为“函数”的代码块中，在需要计算阶乘的地方，我们只需“调用函数”即可实现对求阶乘功能的复用。

##### 1 定义函数

```
def(关键字) function（函数名）(arg1, arg2):
	return "Something"（返回结果： 没有的话则返回None）
```

##### 2 函数的参数

位置参数和关键字参数

我们再来写一个函数，根据给出的三条边的长度判断是否可以构成三角形，如果可以构成三角形则返回`True`，否则返回`False`，代码如下所示。

```
def make_judgement(a, b, c):
    """判断三条边的长度能否构成三角形"""
    return a + b > c and b + c > a and a + c > b
```

上面`make_judgement`函数有三个参数，这种参数叫做位置参数，在调用函数时通常按照从左到右的顺序依次传入，而且传入参数的数量必须和定义函数时参数的数量相同，如下所示。

```
print(make_judgement(1, 2, 3))  # False
print(make_judgement(4, 5, 6))  # True
```

如果不想按照从左到右的顺序依次给出`a`、`b`、`c` 三个参数的值，也可以使用关键字参数，通过“参数名=参数值”的形式为函数传入参数，如下所示。

```
print(make_judgement(b=2, c=3, a=1))  # False
print(make_judgement(c=6, b=4, a=5))  # True
```

在定义函数时，我们可以在参数列表中用`/`设置**强制位置参数**（*positional-only arguments*），用`*`设置**命名关键字参数**。所谓强制位置参数，就是调用函数时只能按照参数位置来接收参数值的参数；而命名关键字参数只能通过“参数名=参数值”的方式来传递和接收参数,可以看看下面代码

```python
# /前面的参数是强制位置参数
def make_judgement(a, b, c, /):
    """判断三条边的长度能否构成三角形"""
    return a + b > c and b + c > a and a + c > b
# 下面的代码会产生TypeError错误，错误信息提示“强制位置参数是不允许给出参数名的”
# TypeError: make_judgement() got some positional-only arguments passed as keyword arguments
# print(make_judgement(b=2, c=3, a=1))
```

> **说明**：强制位置参数是 Python 3.8 引入的新特性，在使用低版本的 Python 解释器时需要注意。

```python
# *后面的参数是命名关键字参数
def make_judgement(*, a, b, c):
    """判断三条边的长度能否构成三角形"""
    return a + b > c and b + c > a and a + c > b
# 下面的代码会产生TypeError错误，错误信息提示“函数没有位置参数但却给了3个位置参数”
# TypeError: make_judgement() takes 0 positional arguments but 3 were given
# print(make_judgement(1, 2, 3))
```

参数的默认值

```python
def add(a=0, b=0, c=0):
    """三个数相加求和"""
    return a + b + c
# 调用add函数，没有传入参数，那么a、b、c都使用默认值0
print(add())         # 0
# 调用add函数，传入一个参数，该参数赋值给变量a, 变量b和c使用默认值0
print(add(1))        # 1
# 调用add函数，传入两个参数，分别赋值给变量a和b，变量c使用默认值0
print(add(1, 2))     # 3
# 调用add函数，传入三个参数，分别赋值给a、b、c三个变量
print(add(1, 2, 3))  # 6
```

需要注意的是，**带默认值的参数必须放在不带默认值的参数之后**，否则将产生`SyntaxError`错误，错误消息是：`non-default argument follows default argument`，翻译成中文的意思是“没有默认值的参数放在了带默认值的参数后面”。

可变参数

Python 语言中可以通过星号表达式语法让函数支持可变参数。所谓可变参数指的是在调用函数时，可以向函数传入`0`个或任意多个参数

```python
# 用星号表达式来表示args可以接收0个或任意多个参数
# 调用函数时传入的n个参数会组装成一个n元组赋给args
# 如果一个参数都没有传入，那么args会是一个空元组
def add(*args):
    total = 0
    # 对保存可变参数的元组进行循环遍历
    for val in args:
        # 对参数进行了类型检查（数值型的才能求和）
        if type(val) in (int, float):
            total += val
    return total


# 在调用add函数时可以传入0个或任意多个参数
print(add())         # 0
print(add(1))        # 1
print(add(1, 2, 3))  # 6
print(add(1, 2, 'hello', 3.45, 6))  # 12.45
```

如果我们希望通过“参数名=参数值”的形式传入若干个参数，具体有多少个参数也是不确定的，我们还可以给函数添加可变关键字参数，把传入的关键字参数组装到一个字典中，代码如下所示。

```python
# 参数列表中的**kwargs可以接收0个或任意多个关键字参数
# 调用函数时传入的关键字参数会组装成一个字典（参数名是字典中的键，参数值是字典中的值）
# 如果一个关键字参数都没有传入，那么kwargs会是一个空字典
def foo(*args, **kwargs):
    print(args)
    print(kwargs)


foo(3, 2.1, True, name='骆昊', age=43, gpa=4.95)
# (3, 2.1, True)
# {'name': '骆昊', 'age': 43, 'gpa': 4.95}
```

##### 3 用模块管理函数

不管用什么样的编程语言来写代码，给变量、函数起名字都是一个让人头疼的问题，因为我们会遇到**命名冲突**这种尴尬的情况。最简单的场景就是在同一个`.py`文件中定义了两个同名的函数，如下所示。

```
def foo():
    print('hello, world!')


def foo():
    print('goodbye, world!')

    
foo()  # 大家猜猜调用foo函数会输出什么 goodbye, world!
```

Python 中每个文件就代表了一个模块（module），我们在不同的模块中可以有同名的函数，在使用函数的时候，我们通过`import`关键字导入指定的模块再使用**完全限定名**（`模块名.函数名`）的调用方式，就可以区分到底要使用的是哪个模块中的`foo`函数，代码如下所示。

module1.py

```python
def foo():
    print('hello, world!')
```

module2.py

```python
def foo():
    print('goodbye, world!')
```

test.py

```python
import module1
import module2
# 用“模块名.函数名”的方式（完全限定名）调用函数，
module1.foo()  # hello, world!
module2.foo()  # goodbye, world
```

在导入模块时，还可以使用`as`关键字对模块进行别名，这样我们可以使用更为简短的完全限定名。

test.py

```python
import module1 as m1
import module2 as m2

m1.foo()  # hello, world!
m2.foo()  # goodbye, world!
```

上面两段代码，我们导入的是定义函数的模块，我们也可以使用`from...import...`语法从模块中直接导入需要使用的函数，代码如下所示。

```python
test.py
from module1 import foo

foo()  # hello, world!

from module2 import foo

foo()  # goodbye, world!
```

但是，如果我们如果从两个不同的模块中导入了同名的函数，后面导入的函数会替换掉之前的导入，就像下面的代码，调用`foo`会输出`goodbye, world!`，因为我们先导入了`module1`的`foo`，后导入了`module2`的`foo` 。如果两个`from...import...`反过来写，那就是另外一番光景了。

```python
test.py
from module1 import foo
from module2 import foo

foo()  # goodbye, world!
```

如果想在上面的代码中同时使用来自两个模块的`foo`函数还是有办法的，大家可能已经猜到了，还是用`as`关键字对导入的函数进行别名，代码如下所示。

```python
test.py
from module1 import foo as f1
from module2 import foo as f2

f1()  # hello, world!
f2()  # goodbye, world!
```

### 标准库中的模块和函数

Python 标准库中提供了大量的模块和函数来简化我们的开发工作，我们之前用过的`random`模块就为我们提供了生成随机数和进行随机抽样的函数；而`time`模块则提供了和时间操作相关的函数；我们之前用到过的`math`模块中还包括了计算正弦、余弦、指数、对数等一系列的数学函数。随着我们深入学习 Python 语言，我们还会用到更多的模块和函数。

Python 标准库中还有一类函数是不需要`import`就能够直接使用的，我们将其称之为**内置函数**，这些内置函数不仅有用而且还很常用，下面的表格列出了一部分的内置函数。

| 函数    | 说明                                                         |
| ------- | ------------------------------------------------------------ |
| `abs`   | 返回一个数的绝对值，例如：`abs(-1.3)`会返回`1.3`。           |
| `bin`   | 把一个整数转换成以`'0b'`开头的二进制字符串，例如：`bin(123)`会返回`'0b1111011'`。 |
| `chr`   | 将Unicode编码转换成对应的字符，例如：`chr(8364)`会返回`'€'`。 |
| `hex`   | 将一个整数转换成以`'0x'`开头的十六进制字符串，例如：`hex(123)`会返回`'0x7b'`。 |
| `input` | 从输入中读取一行，返回读到的字符串。                         |
| `len`   | 获取字符串、列表等的长度。                                   |
| `max`   | 返回多个参数或一个可迭代对象中的最大值，例如：`max(12, 95, 37)`会返回`95`。 |
| `min`   | 返回多个参数或一个可迭代对象中的最小值，例如：`min(12, 95, 37)`会返回`12`。 |
| `oct`   | 把一个整数转换成以`'0o'`开头的八进制字符串，例如：`oct(123)`会返回`'0o173'`。 |
| `open`  | 打开一个文件并返回文件对象。                                 |
| `ord`   | 将字符转换成对应的Unicode编码，例如：`ord('€')`会返回`8364`。 |
| `pow`   | 求幂运算，例如：`pow(2, 3)`会返回`8`；`pow(2, 0.5)`会返回`1.4142135623730951`。 |
| `print` | 打印输出。                                                   |
| `range` | 构造一个范围序列，例如：`range(100)`会产生`0`到`99`的整数序列。 |
| `round` | 按照指定的精度对数值进行四舍五入，例如：`round(1.23456, 4)`会返回`1.2346`。 |
| `sum`   | 对一个序列中的项从左到右进行求和运算，例如：`sum(range(1, 101))`会返回`5050`。 |
| `type`  | 返回对象的类型，例如：`type(10)`会返回`int`；而` type('hello')`会返回`str`。 |