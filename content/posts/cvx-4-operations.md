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

    已知凸集 \\({S_1},{S_2} \subseteq {\mathbb{R}^n}\\), 那么它们的和 \\({S_1} + {S_2} = \\{ {x + y \mid x \in {S_1},y \in {S_2}} \\}\\) 是凸集; 笛卡尔积 (Cartesian product) \\({S_1} \times {S_2} = \\{ {\( {{x_1},{x_2}} \) \mid {x_1} \in {S_1},{x_2} \in {S_2}} \\}\\) 是凸集. 笛卡尔积也称为直积, 它包含了两个集合所有可能的有序对.

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

下面介绍一些保持函数凸性的运算.
