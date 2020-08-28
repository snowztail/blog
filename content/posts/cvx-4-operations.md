---
title: "凸优化 4 - 运算"
author: "SnowzTail"
date: 2020-07-10T21:23:09Z
math: true
draft: false
categories:
 - Optimization
tags:
 - Convex Optimization
featured_image:
---

## 集合运算
下面介绍一些保持集合凸性的运算.

### 交集
如果集合 \\({S_1}\\) 和 \\({S_2}\\) 都是凸的, 那么它们的交集 \\({S_1} \cap {S_2}\\) 也是凸的. 这个结论可以扩展到无数个集合的情况: 如果对于每个 \\(\alpha  \in A\\) 集合 \\({S _ \alpha }\\) 都是凸的, 那么 \\({ \cap _ {\alpha  \in A}}{S _\alpha }\\) 也是凸的. 比如, 半空间和超平面都是凸集, 多面体作为它们的交集也是凸集.

- 半正定锥

    半正定锥 \\(\mathbb{S}_ + ^n\\) 可以表示成一些集合的交集:

    \\[\mathop  \cap \limits_{z \ne 0} \\{ {X \in {\mathbb{S}^n} \mid {z^T}Xz \ge 0} \\}\\]

    对于任意 \\({z \ne 0}\\), \\({{z^T}Xz}\\) 都是关于 \\(X\\) 的线性函数, 所以每个集合实例都是 \\({{\mathbb{S}^n}}\\) 中的半空间. 半正定锥是凸集, 因为它可以写成这些凸集的交集.

我们后面会看到这个结论反过来也成立: 任何封闭的凸集 \\(S\\) 都可以写成半空间群的交集, 其中每个半空间都包含了集合 \\(S\\).

### 仿射函数
定义 __仿射函数 (affine function)__ \\(f:{\mathbb{R}^n} \to {\mathbb{R}^m}\\) 为:

\\[f(x) = Ax + b\\]

其中 \\(A \in {\mathbb{R}^{m \times n}},b \in {\mathbb{R}^m}\\). 也就是说, 仿射函数是线性函数和常数的和.

如果存在凸集 \\(S \subseteq {\mathbb{R}^n}\\) 和仿射函数 \\(f:{\mathbb{R}^n} \to {\mathbb{R}^m}\\), 那么原集合 \\(S\\) 在函数 \\(f\\) 下的 __像 (image)__

\\[f(S) = \\{ {f(x) \mid x \in S} \\} = \\{ {x \mid {f^{ - 1}}(x) \in S} \\}\\]

是凸集. 类似的,如果 \\(f:{\mathbb{R}^k} \to {\mathbb{R}^n}\\) 是仿射函数, 那么原集合 \\(S\\) 在函数 \\(f\\) 下的 __原像 (inverse image)__

\\[{f^{ - 1}}(S) = \\{ {x \mid f(x) \in S} \\}\\]

也是凸的. 对比像和原像可以知道, \\(\\{ {x \mid {f^{ - 1}}(x) \in S} \\}\\) 和 \\(\\{ {x \mid f(x) \in S} \\}\\) 是两个构造凸集. 下面是一些常见的仿射函数:

- 伸缩, 平移

    已知凸集 \\(S \subseteq {\mathbb{R}^n}\\), 对于伸缩系数 \\(\alpha  \in \mathbb{R}\\) 和平移系数 \\(a \in {\mathbb{R}^n}\\), 集合 \\(\alpha S = \\{ {\alpha x \mid x \in S} \\}\\) 和 \\(S + a = \\{ {x + a \mid x \in S} \\}\\) 都是凸集.

- 投影

    已知凸集 \\(S \subseteq {\mathbb{R}^m} \times {\mathbb{R}^n}\\), 它向某几个坐标的投影 \\(T = \\{ {{x_1} \in {\mathbb{R}^m} \mid \( {{x_1},{x_2}} \) \in S} \\}\\) 也是凸集.

- 和, 笛卡尔积

    已知凸集 \\({S_1},{S_2} \subseteq {\mathbb{R}^n}\\), 那么它们的和 \\({S_1} + {S_2} = \\{ {x + y \mid x \in {S_1},y \in {S_2}} \\}\\) 是凸集.

- 笛卡尔积
    __笛卡尔积 (Cartesian product)__ \\({S_1} \times {S_2} = \\{ {\( {{x_1},{x_2}} \) \mid {x_1} \in {S_1},{x_2} \in {S_2}} \\}\\) 是凸集. 笛卡尔积也称为直积, 它包含了两个集合所有可能的有序对.

- 部分和

    已知凸集 \\({S_1},{S_2} \subseteq {\mathbb{R}^n} \times {\mathbb{R}^m}\\), 那么它们的部分和 \\(S = \\{ {\( {x,{y_1} + {y_2}} \) \mid \( {x,{y_1}} \) \in {S_1},\( {x,{y_2}} \) \in {S_2}} \\}\\) 是凸集, 其中 \\(x \in {\mathbb{R}^n},y \in {\mathbb{R}^m}\\). 这里集合 \\(S\\) 的维度同样是 \\({\mathbb{R}^n} \times {\mathbb{R}^m}\\), 其中前 \\(n\\) 项是 \\({S_1},{S_2}\\) 的前 \\(n\\) 项的交集, 后 \\(m\\) 项是 \\({S_1},{S_2}\\) 的后 \\(m\\) 项的和. 当 \\(m = 0\\) 时, 部分和退化为 \\({S_1},{S_2}\\) 的交集; 当 \\(n = 0\\) 时, 部分和退化为 \\({S_1},{S_2}\\) 的和.


### 透视函数
__透视函数 (perspective function)__ 对于原向量进行归一化使得最后一维的长度为 1, 然后舍弃最后一维: \\(P:{\mathbb{R}^{n + 1}} \to {\mathbb{R}^n}\\), \\(P(z,t) = z/t\\), 其中 \\(z \in {\mathbb{R}^n},t \in {\mathbb{R}_{ +  + }}\\).

<blockquote cite="透视函数与小孔成像">
小孔成像把三维物体投影到两维平面上. 位于坐标 \(( {{x_1},{x_2},{x_3}} )\) 的原物体经由一个位于原点的小孔被投影到像平面上的 \( - ( {{x_1}/{x_3},{x_2}/{x_3},1} )\). 最后一维不包含信息所以可以被忽略.
</blockquote>

{{< figure src="/figures/cvx-4-operations/1-pin-hole-camera.jpg" title="原位置向像位置的映射对应于透视函数" >}}

如果 \\(C \subseteq {\mathbb{R}^n} \times {\mathbb{R}_{ +  + }}\\) 是凸集, 那么它在透视函数下的像

\\[P( C ) = \\{ {P(x) \mid x \in C} \\}\\]

也是凸集.

<details>
    <summary>证明: 凸集的像也是凸集</summary>
    <p>假设 \(x = (\tilde x,{x _ {n + 1}}),y = (\tilde y,{y _ {n + 1}}) \in {\mathbb{R}^{n + 1}}\) 并且 \({x _ {n + 1}} > 0,{y _ {n + 1}} > 0\), 那么 \(P(x) = \tilde x/{x _ {n + 1}},P(y) = \tilde y/{y _ {n + 1}}\). 对于 \(0 \le \theta  \le 1\),</p>
    <p>\[P\left( {\theta x + (1 - \theta )y} \right) = \frac{{\theta \tilde x + (1 - \theta )\tilde y}}{{\theta {x _ {n + 1}} + (1 - \theta ){y _ {n + 1}}}} = \mu P(x) + (1 - \mu )P(y)\]</p>
    <p>其中 \(\mu  \in [0,1]\):</p>
    <p>\[\mu  = \frac{{\theta {x _ {n + 1}}}}{{\theta {x _ {n + 1}} + (1 - \theta ){y _ {n + 1}}}}\]</p>
    <p>\(\theta \) 和 \(\mu \) 是单调的: 当 \(\theta \) 在 0, 1 间变化时形成线段 \([x,y]\), \(\mu \) 也在 0, 1 间变化形成线段 \([P(x),P(y)]\), 所以 \(P\left( {[x,y]} \right) = [P(x),P(y)]\). 由于线段在透视函数下的像 \(P\left( {[x,y]} \right)\) 属于 \(P( C )\), 所以 \([P(x),P(y)]\) 也在 \(P( C )\) 中, 即 \(P( C )\) 是凸集.</p>
</details>

反过来, 凸集 \\(C \subseteq {\mathbb{R}^n}\\) 在透视函数下的原像

\\[{P^{ - 1}}( C ) = \\{ {(x,t) \in {\mathbb{R}^{n + 1}} \mid x/t \in C,t > 0} \\}\\]

也是凸集.

<details>
    <summary>证明: 凸集的原像也是凸集</summary>
    <p>假设 \((x,t) \in {P^{ - 1}}( C ),(y,s) \in {P^{ - 1}}( C )\) 并且 \(0 \le \theta  \le 1\). 可知 \((x,t) \in {P^{ - 1}}( C ) \Leftrightarrow P(x,t) \in C \Leftrightarrow x/t \in C\). 我们需要证明</p>
    <p>\[\theta (x,t) + (1 - \theta )(y,s) \in {P^{ - 1}}( C ) \Leftrightarrow \frac{{\theta x + (1 - \theta )y}}{{\theta t + (1 - \theta )s}} \in C\]</p>
    <p>上式成立因为</p>
    <p>\[\frac{{\theta x + (1 - \theta )y}}{{\theta t + (1 - \theta )s}} = \mu (x/t) + (1 - \mu )(y/s)\]</p>
    <p>显然等式右边两项都属于 \(C\), 其中 \(\mu  \in [0,1]\):</p>
    <p>\[\mu  = \frac{{\theta t}}{{\theta t + (1 - \theta )s}}\]</p>
</details>

### 线性分式函数
__线性分式函数 (linear-fractional function)__ 由透视函数和仿射函数组成. 将仿射函数 \\(g:{\mathbb{R}^n} \to {\mathbb{R}^{m + 1}}\\) 写成以下形式:

\\[g(x) = \begin{bmatrix} A \\\ c^T \end{bmatrix} x + \begin{bmatrix} b \\\ d \end{bmatrix} \\]

其中 \\(A \in {\mathbb{R}^{m \times n}},b \in {\mathbb{R}^m},c \in {\mathbb{R}^n},d \in \mathbb{R}\\). 定义线性分式函数 \\(f:{\mathbb{R}^n} \to {\mathbb{R}^m}\\), \\(f = P \circ g\\) (其中 \\( \circ \\) 为复合符号, 表示将仿射函数 \\(g\\) 的输出用作透视函数 \\(P\\) 的输入: \\((P \circ g)(x) = P\left( {g(x)} \right)\\)):

\\[f(x) = \frac{{Ax + b}}{{{c^T}x + d}}\\]

定义域为 \\({\rm{dom}}(f) = \\{ {x \mid {c^T}x + d > 0} \\}\\). 从代数角度来看, 它是系数矩阵

\\[Q = \begin{bmatrix} A & b \\\ c^T & d \end{bmatrix} \in {\mathbb{R}^{(m + 1)(n + 1)}}\\]

左乘于点 \\((x,1)\\) 得到 \\((Ax + b,{c^T}x + d)\\) 之后归一化的结果 \\(\left( {f(x),1} \right)\\). 从几何意义上说, 这个表达式通过 \\({\mathbb{R}^n}\\) 中的任意一个点 \\(z\\) 构造了一个 \\({\mathbb{R}^{n + 1}}\\) 中的 (最后一个分量为正的) 开射线 \\(\mathcal{P}(z) = \\{ {t(z,1) \mid t > 0} \\}\\); 反过来, \\({\mathbb{R}^{n + 1}}\\) 中的任意一条 (最后一个分量为正的) 射线都可以通过一些 \\(z \in {\mathbb{R}^n}\\) 表示为 \\(\mathcal{P}(z) = \\{ {t(z,1) \mid t \ge 0} \\}\\). \\(\mathcal{P}\\) 表示了 \\({\mathbb{R}^n}\\) 和 (最后一个分量为正的) 射线之间的一一对应的关系. 这样一来, 线性分式函数可以表示为:

\\[f(x) = {\mathcal{P}^{ - 1}}\( {Q\mathcal{P}(x)} \)\\]

也就是说, 从 \\(\\{ {x \in {\mathbb{R}^n} \mid {c^T}x + d > 0} \\}\\) 出发, 我们可以得到 \\({\mathbb{R}^{n + 1}}\\) 中的一条射线 \\({\mathcal{P}(x)}\\). 将线性变换矩阵 \\(Q\\) 作用于这条射线, 得到一条新的 (最后一个分量为正的) 射线 \\({Q\mathcal{P}(x)}\\). 最后, \\(f(x)\\) 可以通过逆透射变换恢复出来. 由于其中每个步骤 (投射, 线性变换, 逆投射) 都是保凸的, 所以线性分式函数也是保凸函数: 对于任意 \\(x \in C\\) 满足 \\({{c^T}x + d > 0}\\), \\(C\\) 的像 \\(f\(C)\\) 和原像 \\({f^{ - 1}}\(C)\\) 都是凸的.

- 条件概率

    对于随机变量 \\(u,v\\), 已知联合分布概率 \\({p _ {ij}} = {\rm{prob}}(u = i,v = j)\\), 那么条件概率 \\({f _ {ij}} = {\rm{prob}}(u = i \mid v = j)\\) 可以写成

    \\[{f _ {ij}} = \frac{{{p _ {ij}}}}{{\sum\limits _ k {{p _ {kj}}} }}\\]

    我们发现 \\(f\\) 可以通过一个线性分式映射从 \\(p\\) 得到. 所以, 如果 \\(C\\) 是一个关于 \\((u,v)\\) 的联合分布概率的凸集, 那么 \\(u\\) 在给定 \\(v\\) 下的条件概率也是凸集.

    {{< figure src="/figures/cvx-4-operations/2-set-image-and-doms.jpg" title="对于集合 \(C \subseteq {\mathbb{R}^2}\) 和线性分式函数 \(f(x) = x/({x_1} + {x_2} + 1)\), 左: \(C\) 和 \(f\) 的定义域的边界 (定义域为虚线右上部分); 右: \(C\) 在 \(f\) 下的像 和 \({f^{ - 1}}\) 的定义域的边界 (定义域为虚线左下部分)" >}}

---

## 函数运算

下面介绍一些保持函数凹凸性的运算.

### 非负加权求和

凸函数的非负伸缩 \\(\alpha f, \alpha \ge 0\\) 以及求和 \\(\sum _ {i=1} ^ m f _ i\\) 都是凸函数. 所以, 凸函数的非负加权求和

\\[f = \sum _ {i=1} ^ m {w _ i f _ i}\\]

也是凸函数. 也就是说, 凸函数的集合是一个凸锥. 类似地, 凹函数的非负加权求和也是凹函数; 严格凸 (凹) 函数的非负加权求和也是凸 (凹) 函数. 这些性质可以扩展到无限项求和以及积分. 如果 \\(f(x, y)\\) 对于任意 \\(y \in \mathcal{A}\\) 是关于 \\(x\\) 的凸函数, 那么函数

\\[g(x) = \int _ {\mathcal{A}} w(y) f(x, y) dy\\]

当积分存在时也是关于 \\(x\\) 的凸函数.

<details>
    <summary>证明: 凸函数的非负加权求和是凸函数</summary>
    <p>对于凸函数 \(f\) 和非负系数 \(w\), 有</p>
    \begin{align}
        \mathrm{epi}(f) &= \{(x, t) \mid x \in \mathrm{dom}(f), f(x) \le t\}\\
        \mathrm{epi}(wf) &= \{(x, t) \mid x \in \mathrm{dom}(f), f(x) \le wt\}\\
            &= \begin{bmatrix}I & 0 \\\ 0 & w\end{bmatrix}\mathrm{epi}(f)
    \end{align}
    其中 \(\mathrm{epi}(f)\) 是凸集, \(\left[\begin{smallmatrix}I & 0 \\\ 0 & w\end{smallmatrix}\right]\) 是仿射变换, 所以 \(\mathrm{epi}(wf)\) 是凸集, \(wf\) 是凸函数.
</details>

### 复合仿射映射

假设函数 \\(f \colon \mathbb{R} ^ n \to \mathbb{R}\\), 其中 \\(A \in \mathbb{R} ^ {n \times m}\\), \\(b \in \mathbb{R} ^ n\\). 定义函数 \\(g \colon \mathbb{R} ^ m \to \mathbb{R}\\)

\\[g(x) = f(Ax + b)\\]

其中 \\(\mathrm{dom}(g) = \\{x \mid Ax + b \in \mathrm{dom}(f)\\}\\). 在复合仿射映射下, \\(g(x)\\) 继承了 \\(f(x)\\) 的凹凸性.

### 逐点最大值

凸函数 \\(f _ 1, \dots, f _ m\\) 的逐点最大值

\\[f(x) = \max\\{f _ 1 (x), \dots, f _ m (x)\\}\\]

在定义域 \\(\mathrm{dom}(f) = \bigcup _ {i=1} ^ m \mathrm{dom}(f _ i)\\) 上也是凸函数. 反过来, 凹函数的逐点最小值在对应定义域上也是凹函数.

{{< figure src="/figures/cvx-4-operations/3-pointwise-maximum.png" title="凸函数的逐点最大值构成的凸函数" >}}

<details>
    <summary>证明: 凸函数的逐点最大值是凸函数</summary>
    对于任意 \(0 \le \theta \le 1\) 和 \(x, y \in \mathrm{dom}(f)\),
    \begin{align}
        f(\theta x + (1 - \theta) y)
        &= \max\{f _ 1(\theta x + (1 - \theta) y), \dots, f _ m(\theta x + (1 - \theta) y)\}\\
        &\le \max\{\theta f _ 1 (x) + (1 - \theta) f _ 1 (y), \dots, \theta f _ m (x) + (1 - \theta) f _ m (y)\}\\
        &\le \theta \max\{f _ 1 (x), \dots, f _ m (x)\} + (1 - \theta) \max\{f _ 1 (y) , \dots, f _ m (y)\}\\
        &= \theta f(x) + (1 - \theta) f(y)
    \end{align}
</details>

这个性质可以扩展到无数个凸函数的逐点上确界. 如果 \\(f(x, y)\\) 对于任意 \\(y \in \mathcal{A}\\) 是关于 \\(x\\) 的凸函数, 那么函数

\\[g(x) = \sup _ {y \in \mathcal{A}} f(x, y)\\]

在 \\(\mathrm{dom}(g) = \\{x \mid (x, y) \in \mathrm{dom}(f), \forall y \in \mathcal{A}, \sup _ {y \in \mathcal{A}} f(x, y) < \infty\\}\\) 是关于 \\(x\\) 的凸函数. 反过来, 凹函数的逐点下确界在对应定义域上也是凹函数.

从上境图的角度来看, 逐点上确界函数的上境图对应的是原函数上境图的交集.

\\[\mathrm{epi}(g) = \bigcap _ {y \in \mathcal{A}} \mathrm{epi} f(\cdot, y)\\]

因为交集是集合的保凸运算, 所以 \\(\mathrm{epi}(g)\\) 是凸集. 很多凸函数都可以表示成一系列凸函数的逐点上确界, 下面是几个例子:

- 分段线性函数

    段数为 \\(L\\) 的分段线性函数可以表示成
    \\[f(x) = \max\left\\{\sum _ {i=1} ^ L {a _ i ^ T x + b _ i}\right\\}\\]
    注意这里的定义域是 \\(\mathrm{dom}(f) = \bigcap _ {i=1} ^ L {\mathrm{dom}{f _ i}}\\). 分段线性函数是仿射函数的逐点上确界, 因此是凸函数.

- 集合的支撑函数

    集合 \\(C \subseteq \mathbb{R} ^ n, C \ne \emptyset\\) 的 __支撑函数 (support function)__ \\(S _ C\\) 定义为
    \\[S _ C (x) = \sup\\{x ^ T y \mid y \in C\\}\\]
    其中 \\(\mathrm{dom}(S _ C) = \\{x \mid \sup _ {y \in C} x ^ T y < \infty\\}\\). 支撑函数是仿射函数的逐点上确界, 因此是凸函数.

- 到集合中最远点的距离

    到集合 \\(C \in \mathbb{R} ^ n\\) 中最远点的距离是
    \\[f(x) = \sup _ {y \in C} \\{\lVert{x - y}\rVert\\}\\]
    其中距离函数 \\(\lVert{x - y}\rVert\\) 对于给定的 \\(y\\) 是关于 \\(x\\) 的凸函数, 所以到集合中最远点的距离也是凸函数.

- 对称矩阵的最大特征值

    对称矩阵 \\(X \in \mathbb{S} ^ m\\) 的最大特征值是
    \\[f(X) = \lambda _ {\max} (X) = \sup\\{y ^ T X y \mid \lVert{y}\rVert _ 2 = 1\\}\\]
    其中 \\(y ^ T X y\\) 对于给定的 \\(y\\) 是关于 \\(X\\) 的凸函数, 所以对称矩阵的最大特征值也是凸函数.

- 矩阵范数

    矩阵 \\(X \in \mathbb{R} ^ {p \times q}\\) 的范数是
    \\[f(X) = \sup\\{u ^ T X v \mid \lVert{u}\rVert _ 2 = \lVert{v}\rVert _ 2 = 1\\}\\]
    其中 \\(u ^ T X v\\) 对于给定的 \\(u, v\\) 是关于 \\(X\\) 的凸函数, 所以矩阵范数也是凸函数.

- 诱导范数

    假设 \\(\lVert{\cdot}\rVert _ a, \lVert{\cdot}\rVert _ b\\) 分别是 \\(\mathbb{R} ^ p, \mathbb{R} ^ q\\) 上的范数. 矩阵 \\(X \in \mathbb{R} ^ {p \times q}\\) 关于 \\(\lVert{\cdot}\rVert _ a, \lVert{\cdot}\rVert _ b\\) 的 __诱导范数 (induced norm)__ 是
    \begin{align}
        \lVert{X}\rVert _ {a, b}
        &= \sup _ {v \ne 0} \frac{\lVert{Xv}\rVert _ a}{\lVert{v}\rVert _ b}\newline
        &= \sup \\{\lVert{Xv}\rVert _ a \mid \lVert{v}\rVert _ b = 1\\}\newline
        &= \sup \\{u ^ T X v \mid \lVert{u}\rVert _ {a, *} = 1, \lVert{v}\rVert _ b = 1\\}
    \end{align}
    其中 \\(u ^ T X v\\) 对于给定的 \\(u, v\\) 是关于 \\(X\\) 的凸函数, 所以诱导范数也是凸函数.

### 复合

这一节研究由函数 \\(h \colon \mathbb{R} ^ k \to \mathbb{R}\\) 和 \\(g \colon \mathbb{R} ^ n \to \mathbb{R} ^ k\\) 构成的复合函数 \\(f \colon \mathbb{R} ^ n \to \mathbb{R}\\)

\\[f(x) = (h \circ g)(x) = h(g(x))\\]

在定义域 \\(\mathrm{dom}(f) = \\{x \in \mathrm{dom}(g) \mid g(x) \in \mathrm{dom}(h)\\}\\) 上的凹凸性. 因为一个函数是凸的当且仅当它在任何 [与定义域相交的直线](https://snowztail.com/cvx-3-functions/#%E5%92%8C%E5%AE%9A%E4%B9%89%E5%9F%9F%E7%9B%B8%E4%BA%A4%E7%9A%84%E7%9B%B4%E7%BA%BF) 上是凸的, 所以在下面的讨论中不妨令 \\(n = 1\\).

#### 标量复合

标量复合对应 \\(k = 1\\), 即 \\(h \colon \mathbb{R} \to \mathbb{R}\\), \\(g \colon \mathbb{R} \to \mathbb{R}\\). 假设 \\(h, g\\) 二次可微且 \\(\mathrm{dom}(h) = \mathrm{dom}(g) = \mathbb{R}\\). 复合函数 \\(f\\) 的一阶和二阶导数分别是

\begin{align}
    f'(x) &= h'(g(x))g'(x)\newline
    f''(x) &= h''(g(x))g'(x) ^ 2 + h'(g(x))g''(x)
\end{align}

我们知道由 \\(f''(x) \ge 0, \forall x \in \mathbb{R}\\) 可知 \\(f\\) 是凸函数, 所以

- 如果 \\(h\\) 是非减凸函数 (\\(h' \ge 0, h ^ {\prime \prime} \ge 0\\)) 且 \\(g\\) 是凸函数 (\\(g ^ {\prime \prime} \ge 0\\)), 则 \\(f\\) 是凸函数.
- 如果 \\(h\\) 是非增凸函数 (\\(h' \le 0, h ^ {\prime \prime} \ge 0\\)) 且 \\(g\\) 是凹函数 (\\(g ^ {\prime \prime} \le 0\\)), 则 \\(f\\) 是凸函数.
- 如果 \\(h\\) 是非减凹函数 (\\(h' \ge 0, h ^ {\prime \prime} \le 0\\)) 且 \\(g\\) 是凹函数 (\\(g ^ {\prime \prime} \le 0\\)), 则 \\(f\\) 是凹函数.
- 如果 \\(h\\) 是非增凹函数 (\\(h' \le 0, h ^ {\prime \prime} \le 0\\)) 且 \\(g\\) 是凸函数 (\\(g ^ {\prime \prime} \ge 0\\)), 则 \\(f\\) 是凹函数.

定义 \\(\tilde{h}\\) 为 \\(h\\) 的 __扩展值延伸 (extended-value extension)__:

\begin{equation}
    \tilde{h}(x) =
    \begin{cases}
        h(x), & x \in \mathrm{dom}(h)\newline
        \infty (- \infty), & x \notin \mathrm{dom}(h), h \ \text{convex (concave)}
    \end{cases}
\end{equation}

对于更加一般的情况 (\\(n > 1\\), 无需 \\(h, g\\) 可微和 \\(\mathrm{dom}(h) = \mathbb{R}, \mathrm{dom}(g) = \mathbb{R} ^ n\\)), 那么

- 如果 \\(h\\) 是凸函数, \\(\tilde{h}\\) 是非减函数, 且 \\(g\\) 是凸函数, 则 \\(f\\) 是凸函数.
- 如果 \\(h\\) 是凸函数, \\(\tilde{h}\\) 是非增函数, 且 \\(g\\) 是凹函数, 则 \\(f\\) 是凸函数.
- 如果 \\(h\\) 是凹函数, \\(\tilde{h}\\) 是非减函数, 且 \\(g\\) 是凹函数, 则 \\(f\\) 是凹函数.
- 如果 \\(h\\) 是凹函数, \\(\tilde{h}\\) 是非增函数, 且 \\(g\\) 是凸函数, 则 \\(f\\) 是凹函数.

\\(\tilde{h}\\) 非减即对于任意 \\(x < y\\) 都有 \\(\tilde{h}(x) < \tilde{h}(y)\\). 如果 \\(\tilde{h}\\) 是非减凸函数, 那么若 \\(y \in \mathrm{dom}(h)\\), 则 \\(x \in \mathrm{dom}(h)\\), 也就是 \\(\mathrm{dom}(h)\\) 在负方向 \\(\mathrm{R} _ -\\) 上无限延伸.

{{< figure src="/figures/cvx-4-operations/4-extended-value-extension.png" title="左: \(x ^ 2\) 在定义域 \(\mathbb{R} _ +\) 上是非减凸函数, 但它的扩展值延伸不是非减函数 (在 \(\mathbb{R} _ -\) 上取值 \(\infty\)); 右: \(\max\{x, 0\} ^ 2\) 在 \(\mathbb{R}\) 上是非减凸函数." >}}

<details>
    <summary>证明: 如果 \(h\) 是凸函数, \(\tilde{h}\) 是非减函数, 且 \(g\) 是凸函数, 则 \(f = h \circ g\) 是凸函数</summary>
    假设 \(0 \le \theta \le 1\), \(x, y \in \mathrm{dom}(f)\) (即 \(x, y \in \mathrm{dom}(g)\), \(g(x), g(y) \in \mathrm{dom}(h)\)). 所以有 \(\theta x + (1 - \theta) y \in \mathrm{dom}(g)\), \(\theta g(x) + (1 - \theta) g(y) \in \mathrm{dom}(h)\). 由 \(g\) 是凸函数可知
    \begin{equation}
        g(\theta x + (1 - \theta) y) \le \theta g(x) + (1 - \theta) g(y)
    \end{equation}
    其中不等式右侧在 \(\mathrm{dom}(h)\) 中. 由 \(h\) 是凸函数及 \(\tilde{h}\) 非减可知, \(\mathrm{dom}(h)\) 在负方向上无限延伸, 所以 \(g(\theta x + (1 - \theta) y) \in \mathrm{dom}(h)\), 即 \(\theta x + (1 - \theta) y \in \mathrm{dom}(f)\), 表明 \(\mathrm{dom}(f)\) 是凸集. 又因为 \(\tilde{h}\) 非减, 所以由上不等式可知
    \begin{equation}
        h(g(\theta x + (1 - \theta) y)) \le h(\theta g(x) + (1 - \theta) g(y))
    \end{equation}
    因为 \(h\) 是凸函数, 所以
    \begin{equation}
        h(\theta g(x) + (1 - \theta) g(y)) \le \theta h(g(x)) + (1 - \theta) h(g(y))
    \end{equation}
    合并可知
    \begin{equation}
        h(g(\theta x + (1 - \theta) y)) \le \theta h(g(x)) + (1 - \theta) h(g(y))
    \end{equation}
    即 \(f\) 是凸函数.
</details>

下面是几个标量复合函数的例子:

- 如果 \\(g\\) 是凸函数, 那么 \\(e ^ {g(x)}\\) 也是凸函数
    - \\(h(z) = e ^ z\\) 是凸函数
    - \\(g(x) \in \mathrm{dom}(h) = \mathbb{R}\\)
    - \\(\tilde{h}\\) 是非减函数

- 如果 \\(g\\) 是值域为正的凹函数, 那么 \\(\log(g(x))\\) 也是凹函数
    - \\(h(z) = \log(z)\\) 是凹函数
    - \\(g(x) \in \mathrm{dom}(h) = \mathbb{R} _ {++}\\)
    - \\(\tilde{h}\\) 是非减函数

- 如果 \\(g\\) 是值域为正的凹函数, 那么 \\(1 / g(x)\\) 是凸函数
    - 定义域为 \\(\mathrm{dom}(h) = \mathbb{R} _ {++}\\) 的 \\(h(z) = 1 / z\\) 是凸函数
    - \\(g(x) \in \mathrm{dom}(h) = \mathbb{R} _ {++}\\)
    - \\(\tilde{h}\\) 是非增函数

- 如果 \\(g\\) 是值域非负的凸函数且 \\(p \ge 1\\), 那么 \\(g(x) ^ p\\) 是凸函数
    - 定义域为 \\(\mathrm{dom}(h) = \mathbb{R}\\) 的 \\(h(z) = \max\\{z, 0\\} ^ p\\), \\(p \ge 1\\) 是凸函数
    - \\(g(x) \in \mathrm{dom}(h) = \mathbb{R}\\)
    - \\(\tilde{h}\\) 是非减函数

- 如果 \\(g\\) 是凸函数, 那么 \\(-\log{(-g(x))}\\) 在 \\(\\{x \mid g(x) < 0\\}\\) 上是凸函数
    - 定义域为 \\(\mathrm{dom}(h) = \mathbb{R} _ {\-\-}\\) 的 \\(h(z) = -\log(-z)\\) 是凸函数
    - 当 \\(g(x)\\) 为负值时, \\(g(x) \in \mathrm{dom}(h) = \mathbb{R} _ {\-\-}\\)
    - \\(\tilde{h}\\) 是非减函数

请注意, 结论里对扩展值延伸函数 \\(\tilde{h}\\) 的单调性要求不能简化为对原函数 \\(h\\) 的单调性要求. 比如, 令 \\(g(x) = x ^ 2\\), \\(h(z) = 0\\), \\(\mathrm{dom}(g) = \mathbb{R}\\), \\(\mathrm{dom}(h) = [1, 2]\\). 这里 \\(g\\) 是凸函数, \\(h\\) 是非减凸函数, 但复合函数

\\[f = h \circ g = 0, \quad \mathrm{dom}(f) = \left[-\sqrt{2}, -1\right] \cup \left[1, \sqrt{2}\right]\\]

不是凸函数, 因为它的定义域不是凸的. 这里的 \\(\tilde{h}\\) 就不是单调函数.

#### 矢量复合

矢量复合对应 \\(k > 1\\), 即 \\(h \colon \mathbb{R} ^ k \to \mathbb{R}\\), \\(g _ i \colon \mathbb{R} \to \mathbb{R}, i = 1, \dots, k\\), \\(f(x) = h(g(x)) = h(g _ 1(x), \dots, g _ k(x)) \colon \mathbb{R} ^ k \to \mathbb{R}\\). 假设 \\(h, g\\) 二次可微且 \\(\mathrm{dom}(h) = \mathbb{R} ^ k\\), \\(\mathrm{dom}(g) = \mathbb{R}\\). 复合函数 \\(f\\) 的一阶和二阶导数分别是

\begin{align}
    f'(x) &= \nabla{h(g(x))} ^ T g'(x)\newline
    f''(x) &= g'(x) ^ T \nabla ^ 2 {h(g(x))} g'(x) + \nabla{h(g(x))} ^ T g''(x)
\end{align}

我们知道由 \\(f''(x) \ge 0, \forall x \in \mathbb{R}\\) 可知 \\(f\\) 是凸函数, 所以

- 如果 \\(h\\) 是凸函数 (\\(\nabla ^ 2 {h} \succeq 0\\)), 在每个分量上非减 (\\(\partial{h} / \partial{z _ i} \ge 0\\)) 且 \\(g _ i\\) 是凸函数 (\\(g _ i ^ {\prime \prime} \ge 0\\)), 则 \\(f\\) 是凸函数.
- 如果 \\(h\\) 是凸函数 (\\(\nabla ^ 2 {h} \succeq 0\\)), 在每个分量上非增 (\\(\partial{h} / \partial{z _ i} \ge 0\\)) 且 \\(g _ i\\) 是凹函数 (\\(g _ i ^ {\prime \prime} \le 0\\)), 则 \\(f\\) 是凸函数.
- 如果 \\(h\\) 是凹函数 (\\(\nabla ^ 2 {h} \preceq 0\\)), 在每个分量上非减 (\\(\partial{h} / \partial{z _ i} \le 0\\)) 且 \\(g _ i\\) 是凹函数 (\\(g _ i ^ {\prime \prime} \le 0\\)), 则 \\(f\\) 是凹函数.
- 如果 \\(h\\) 是凹函数 (\\(\nabla ^ 2 {h} \preceq 0\\)), 在每个分量上非增 (\\(\partial{h} / \partial{z _ i} \le 0\\)) 且 \\(g _ i\\) 是凸函数 (\\(g _ i ^ {\prime \prime} \ge 0\\)), 则 \\(f\\) 是凹函数.

类似地, 这个结论也可以推广到一般的情况, 对应的扩展值延伸 \\(\tilde{h}\\) 也需要满足单调条件. \\(\tilde{h}\\) 非减即对任意 \\(u \preceq v\\) 都有 \\(\tilde{h}(u) \le \tilde{h}(v)\\). 如果 \\(\tilde{h}\\) 是非减凸函数, 那么若 \\(v \in \mathrm{dom}(h)\\), 则 \\(u \in \mathrm{dom}(h)\\), 也就是 \\(\mathrm{dom}(h)\\) 在负方向 \\(\mathrm{R} _ - ^ {k}\\) 上无限延伸.

下面是几个矢量复合函数的例子:

- 如果 \\(g _ i\\) 是凸函数, 那么指数和的对数 \\(\log{\left(\sum _ {i=1} ^ k {e ^ {g _ i}}\right)}\\) 也是凸函数
    - \\(h(z) = \log{\left(\sum _ {i=1} ^ k {e ^ {z _ i}}\right)}\\) 是凸函数
    - \\(g(x) \in \mathrm{dom}(h) = \mathbb{R} ^ k\\)
    - \\(\tilde{h}\\) 在每个分量上都是是非减函数

- 如果 \\(g _ i\\) 是值域非负的凹函数且 \\(0 < p \le 1\\), 那么 \\(\left(\sum _ {i=1} ^ k {g _ i(x) ^ p}\right) ^ {1 / p}\\) 也是凹函数
    - 定义域为 \\(\mathrm{dom}(h) = \mathbb{R} _ + ^ k\\) 的 \\(h(z) = \left(\sum _ {i=1} ^ k {z _ i ^ p}\right) ^ {1 / p}\\) 是凹函数
    - \\(g(x) \in \mathrm{dom}(h) = \mathbb{R} _ + ^ k\\)
    - \\(\tilde{h}\\) 在每个分量上都是是非减函数

- 如果 \\(g _ i\\) 是值域非负的凸函数且 \\(p \ge 1\\), 那么 \\(\ell _ p\\) 范数 \\(\left(\sum _ {i=1} ^ k {g _ i(x) ^ p}\right) ^ {1 / p}\\) 是凸函数
    - 定义域为 \\(\mathrm{dom}(h) = \mathbb{R} ^ k\\) 的 \\(h(z) = \left(\sum _ {i=1} ^ k {\max\\{z _ i, 0\\} ^ p}\right) ^ {1 / p}\\) 是凸函数
    - \\(g(x) \in \mathrm{dom}(h) = \mathbb{R}\\)
    - \\(\tilde{h}\\) 在每个分量上都是是非减函数

- 如果 \\(g _ i\\) 是值域非负的凸函数, 那么几何平均函数 \\(\left(\prod _ {i=1} ^ k {g _ i}\right) ^ {1 / k}\\) 也是值域非负的凸函数.
    - 定义域为 \\(\mathrm{dom}(h) = \mathbb{R} _ {+} ^ k\\) 的 \\(h(z) = \left(\prod _ {i=1} ^ k {z _ i}\right) ^ {1 / k}\\) 是凸函数
    - \\(g(x) \in \mathrm{dom}(h) = \mathbb{R} _ {+} ^ k\\)
    - \\(\tilde{h}\\) 在每个分量上都是是非减函数

### 最小化

如果 \\(f\\) 是关于 \\((x, y)\\) 的凸函数 并且 \\(C\\) 是非空凸集, 那么

\\[g(x) = \inf _ {y \in C} \\{f(x, y)\\}\\]

在 \\(\mathrm{dom}(g) = \\{x \mid (x, y) \in \mathrm{dom}(f), \exists y \in C\\}\\) 上是关于 \\(x\\) 的凸函数.

<details>
    <summary>证明: 在非空凸集上最小化得到凸函数</summary>
    假设 \(x _ 1, x _ 2 \in \mathrm{dom}(g)\), \(0 \le \theta \le 1\). 对于任意 \(\epsilon > 0\) 存在 \(y _ 1, y _ 2 \in C\) 满足 \(f(x _ i, y _ i) \le g(x _ i) + \epsilon\). 所以
    \begin{align}
        g(\theta x _ 1 + (1 - \theta) x _ 2)
        &= \inf _ {y \in C} \{f(\theta x _ 1 + (1 - \theta) x _ 2, y)\}\\
        &\le f(\theta x _ 1 + (1 - \theta) x _ 2, \theta y _ 1 + (1 - \theta) y _ 2)\\
        &\le \theta f(x _ 1, y _ 1) + (1 - \theta) f(x _ 2, y _ 2)\\
        &\le \theta g(x _ 1) + (1 - \theta) g(x _ 2) + \epsilon
    \end{align}
    上式对任意 \(\epsilon > 0\) 均成立, 所以 \(g\) 是关于 \(x\) 的凸函数. 此外也可以用上境图来证明. \(g\) 的上境图是
    \begin{equation}
        \mathrm{epi}(g) = \{(x, t) \mid (x, y, t) \in \mathrm{epi}(f), \exists y \in C\}
    \end{equation}
    \(\mathrm{epi}(g)\) 是凸集 \(\mathrm{epi}(f)\) 在其中几个分量上的投影, 所以也是凸集.
</details>

- Schur 补

    基于对称矩阵 \\(A, C\\) 的二次函数 \\(f(x, y) = x ^ T A x + 2 x ^ T B y + y ^ T C y\\) 是关于 \\((x, y)\\) 的凸函数等价于 \\(M = \left[\begin{smallmatrix}A & B \\\ B ^ T & C\end{smallmatrix}\right] \succeq 0\\). 对应的最小化函数是

    \\[g(x) = \inf _ y \\{f(x, y)\\} = x ^ T (A - B C ^ {\dagger} B ^ T)\\]

    因为 \\(g(x)\\) 是凸函数, 所以 \\(A - B C ^ {\dagger} B ^ T \succeq 0\\). 如果 \\(C\\) 是可逆矩阵 (\\(C \succ 0\\)), 那么 \\(S = A - B C ^ {-1} B ^ T\\) 称为矩阵 \\(M\\) 关于 \\(C\\) 的 __Schur 补 (Schur complement)__. 也就是说, 如果定义 \\(M = \left[\begin{smallmatrix}A & B \\\ B ^ T & C\end{smallmatrix}\right]\\), 将它的逆矩阵记作 \\(M ^ {-1} = \left[\begin{smallmatrix}D & E \\\ E ^ T & F\end{smallmatrix}\right]\\), 其中 \\((A, F)\\) 以及 \\((C, D)\\) 构成了两对互补矩阵. 那么

    - 如果 \\(A\\) 可逆, 那么 \\(F ^ {-1} = C - B ^ T A ^ {-1} B\\)
    - 如果 \\(C\\) 可逆, 那么 \\(D ^ {-1} = A - B C ^ {-1} B ^ T\\)

- 点到集合的距离

    点 \\(x\\) 到集合 \\(S \subseteq \mathbb{R} ^ n\\) 的由 \\(\lVert{\cdot}\rVert\\) 定义的距离是

    \\[\mathrm{dist}(x,S) = \inf _ {y \in S} \lVert{x - y}\rVert\\]

    其中 \\(\lVert{x - y}\rVert\\) 是关于 \\((x, y)\\) 的凸函数, 所以如果 \\(S\\) 是凸集, 那么距离函数 \\(\mathrm{dist}(x,S)\\) 也是关于 \\(x\\) 的凸函数.

### 透视函数

函数 \\(f \colon \mathbb{R} ^ n \to \mathbb{R}\\) 的透视函数 \\(g \colon \mathbb{R} ^ {n + 1} \to \mathbb{R}\\) 定义为

\\[g(x, t) = t f(x, t)\\]

它的定义域是 \\(\mathrm{dom}(g) = \\{(x, t) \mid x / t \in \mathrm{dom}(f), t > 0\\}\\). 透视函数 \\(g\\) 继承了原函数 \\(f\\) 的凹凸性.

<blockquote cite="透视函数和凹凸性">
透视函数继承了原函数的凹凸性.
</blockquote>

<details>
    <summary>证明: 透视函数 \(g\) 继承了原函数 \(f\) 的凹凸性</summary>
    对于任意 \(t > 0\), 都有
    \begin{align}
        (x, t, s) \in \mathrm{epi}(g)
        &\Leftrightarrow t f(x / t) \le s\\
        &\Leftrightarrow f(x / t) \le s / t\\
        &\Leftrightarrow (x / t, s / t) \in \mathrm{epi}(f)
    \end{align}
    因此 \(\mathrm{epi}(g)\) 是 \(\mathrm{epi}(f)\) 在从 \(x, t, s\) 到 \(x / t, s / t\) 的透视函数下的原像, 是一个凸集. 所以 \(g\) 也是凸函数.
</details>

下面是几个透视函数的例子:

- Euclidean 范数的平方

    定义在 \\(\mathrm{R} ^ n\\) 上的凸函数 \\(f(x) = x ^ T x\\) 的透视函数是

    \\[g(x, t) = t (x / t) ^ T (x / t) = \frac{x ^ T x}{t}\\]

    \\(g\\) 在 \\(t > 0\\) 时是关于 (x, t) 的凸函数. 它可以看作是多个二次线性分式 \\(x _ i ^ 2 / t\\) 的和, 也可以看作是一个特殊的矩阵分式 \\(x ^ T (t I) ^ {-1} x\\).

- 负对数

    定义在 \\(\mathrm{R} _ {++}\\) 上的凸函数 \\(f(x) = -\log{(x)}\\) 的透视函数是

    \\[g(x, t) = -t \log{(x / t)} = t \log{(t / x)} = t \log{(t)} - t \log{(x)}\\]

    \\(g\\) 在 \\(\mathbb{R} _ {++} ^ 2\\) 上是凸函数. 实际上, \\(g\\) 是从 \\(x\\) 到 \\(t\\) 的 [相对熵](https://snowztail.com/cvx-3-functions/#%E5%B8%B8%E8%A7%81%E5%87%BD%E6%95%B0%E7%9A%84%E5%87%B9%E5%87%B8%E6%80%A7). 当 \\(x = 1\\) 时, \\(g\\) 简化为负熵. 这个结论可以推广到两个向量 \\(u, v \in \mathbb{R} _ {++} ^ n\\) 的相对熵

    \\[\sum _ {i=1} ^ n {u _ i \log(u _ i / v _ i)}\\]

    向量的相对熵是关于 \\(u, v\\) 的凸函数, 因为它是标量 \\(u _ i, v _ i\\) 的相对熵之和. 类似地, 向量 \\(v\\) 到 \\(u\\) 的 __K-L 散度 (Kullback-Leibler divergence)__ 定义为

    \\[D _ {kl} (u, v) = \sum _ {i=1} ^ n (u _ i \log{(u _ i / v _ i)} - u _ i + v _ i)\\]

    K-L 散度是相对熵加上一个关于 \\(u, v\\) 的线性函数, 它满足 \\(D _ {kl} (u, v) \ge 0\\) 且 \\(D _ {kl} (u, v) = 0\\) 当且仅当 \\(u = v\\). K-L 散度不是距离函数, 因为不满足交换律 \\(D _ {kl} (u, v) \ne D _ {kl} (v, u)\\). 当 \\((u, v)\\) 为概率向量 (\\(\boldsymbol{1} ^ T u = \boldsymbol{1} ^ T v = 1\\)) 时, K-L 散度等价于相对熵.

    对于相对熵函数, 反转分式并取 \\(v _ i = \boldsymbol{1} ^ T u\\) 就得到 __归一化熵 (normalized entropy)__

    \\[\sum _ {i=1} ^ n {u _ i \log(\boldsymbol{1} ^ T u / u _ i)} = (\boldsymbol{1} ^ T u) \sum _ {i=1} ^ n {z _ i \log(1 / z _ i)}\\]

    其中 \\(z = u / (\boldsymbol{1} ^ T u)\\) 是归一化向量或概率分布. 归一化熵是凹函数, 它的值等于 \\((\boldsymbol{1} ^ T u)\\) 乘以熵.
