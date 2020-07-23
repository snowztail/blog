---
title: "凸优化 4 - 凸函数"
author: "SnowzTail"
date: 2020-07-20T22:20:09Z
math: true
draft: false
categories:
 - Optimization
tags:
 - Convex Optimization
featured_image:
---

这一章介绍凸函数的性质.

## 凸函数
如果函数 \\(f \colon \mathbb{R}^n \to \mathbb{R}\\) 同时满足:

- \\(f\\) 的定义域 \\(\mathrm{dom}(f)\\) 是凸集
- 对于所有的 \\(x, y \in \mathrm{dom}(f)\\) 和 \\(\theta \in [0, 1]\\), 都满足

\\[f(\theta x + (1 - \theta) y) \le \theta f(x) + (1 - \theta) f(y)\\]

那么称 \\(f\\) 为 __凸函数 (convex function)__. 如果不等式对于所有的 \\(x \ne y\\) 和 \\(\theta \in (0, 1)\\) 都取不到等号, 那么称 \\(f\\) 是 __严格凸 (strictly convex)__ 的. 和中文字形相反, 连接凸函数上任意两点的线段都不位于函数的下方.

{{< figure src="/figures/cvx-4-convex-functions/1-convex-function.png" title="连接凸函数上任意两点的线段都不位于函数的下方" >}}

如果 \\(-f\\) 是凸函数, 那么 \\(f\\) 是 __凹函数 (concate function)__. 如果 \\(-f\\) 是严格凸的, 那么 \\(f\\) 是 __严格凹 (strictly concate)__ 的.

<strong>仿射函数是既凹又凸的; 如果一个函数既凹又凸, 那么它是仿射函数.</strong> 所以在解很多二次非凸问题的时候, 常常通过二次项的泰勒展开式得到仿射逼近, 把原问题转化成一系列凸问题求解. 比如对于 \\(x \in \mathbb{C}^{n}\\), \\(A \in \mathbb{S}^{n \times n}\\), 在第 \\(i\\) 次迭代有 \\((x^{(i)})^H A x^{(i)} \ge 2\Re\\{(x^{(i)})^H A x^{(i-1)}\\} - (x^{(i-1)})^H A x^{(i-1)}\\).

## 判断条件
除定义外, 常用以下几个条件来判断函数凹凸性.

### 和定义域相交的直线
<blockquote cite="在直线上判断凹凸性">
一个函数是凸的当且仅当它在任何与定义域相交的直线上表现出凸性.
</blockquote>

对于所有的 \\(x \in \mathrm{dom}(f)\\) 和 \\(v \in \mathbb{R}^n\\), 关于 \\(t \in \mathbb{R}\\) 的函数 \\(g(t)=f(x+tv)\\) 在它的定义域 \\(\mathrm{dom}(g)=\\{t \mid x+tv \in \mathrm{dom}(f)\\}\\) 上是凸函数.

<details>
    <summary>证明: 函数的凸性等价于和定义域相交直线上的函数的凸性</summary>
    <ul>
        <li>\((\Rightarrow)\)</li>
        \begin{align}
            g(\theta t _ 1 + (1 - \theta) t _ 2)
            & = f(x + (\theta t _ 1 + (1 - \theta) t _ 2)v)\\
            & \le \theta f(x + t _ 1 v) + (1 - \theta) f(x + t _ 2 v)\\
            & = \theta g(t _ 1) + (1 - \theta) g(t _ 2)
        \end{align}
        <li>\((\Leftarrow)\)</li>
        \begin{align}
            g(\theta t _ 1 + (1 - \theta) t _ 2) & \le \theta g(t _ 1) + (1 - \theta) g(t _ 2)\\
            f(x + (\theta t _ 1 + (1 - \theta) t _ 2)v) & \le \theta f(x + t _ 1 v) + (1 - \theta) f(x + t _ 2 v)
        \end{align}
        <p>取 \(x = x _ 1\), \(v = x _ 2 - x _ 1\), \(t _ 1 = 0\), \(t _ 2 = 1\), 就有</p>
        \begin{equation}
            f(\theta t _ 1 + (1 - \theta) t _ 2) \le \theta f(t _ 1) + (1 - \theta) f(t _ 2)
        \end{equation}
    </ul>
</details>

{{< figure src="/figures/cvx-4-convex-functions/2-functions-restricted-to-lines.png" title="两个在 \(\mathbb{R}^2\) 上的函数, 在 \(xy\) 平面上任意画一条直线. 左: 在这条直线上总是凸函数 (开口向上的抛物线); 右: 在这条直线上可能是凹函数 (开口向下的抛物线)" >}}

### 一阶条件
如果函数 \\(f\\) 是可微的 (即梯度 \\(\nabla{f}\\) 在开集 \\(\mathrm{dom}(f)\\) 内处处存在), 那么 \\(f\\) 是凸函数当且仅当

- \\(\mathrm{dom}(f)\\) 是凸集
- 对于所有 \\(x, y \in \mathrm{dom}(f)\\) 都满足

\\[f(y) \ge f(x) + \nabla{f(x)} ^ T (y - x)\\]

其中关于 \\(y\\) 的仿射函数 \\(f(y) \ge f(x) + \nabla{f(x)} ^ T (y - x)\\) 是 \\(f\\) 在已知点 \\(x\\) 附近的一阶泰勒展开式. 也就是说, 凸函数的一阶泰勒展开式是一个全局下估计 (给出了一个下界). 反过来, 如果一个函数的一阶泰勒展开式总是一个全局下估计, 那么这个函数是一个凸函数.

类似地, \\(f\\) 是凹函数当且仅当

- \\(\mathrm{dom}(f)\\) 是凸集 (!)
- 对于所有 \\(x, y \in \mathrm{dom}(f)\\) 都满足

\\[f(y) \le f(x) + \nabla{f(x)} ^ T (y - x)\\]

\\(f\\) 是严格凸函数等价于

- \\(\mathrm{dom}(f)\\) 是凸集
- 对于所有的 \\(x, y \in \mathrm{dom}(f), x \ne y\\), 都有

\\[f(y) > f(x) + \nabla{f(x)} ^ T (y - x)\\]

<details>
    <summary>证明: 一阶凸性条件</summary>
    <ul>
        <li>\((\Rightarrow)\)</li>
        <p>假设 \(f\) 是凸函数, 由定义可知 \(\mathrm{dom}(f)\) 是凸集. 令 \(x, y \in \mathrm{dom}(f)\). 因为 \(\mathrm{dom}(f)\) 是凸的, 所以对于所有 \(t \in (0, 1]\) 有 \(x + t (y - x) \in \mathrm{dom}(f)\). 根据凸函数的定义, 有</p>
        \[f(x + t(y - x)) \le (1 - t) f(x) + t f(y)\]
        <p>所以</p>
        \begin{align}
            f(y)
            & \ge \frac{f(x + t(y - x)) - (1 - t) f(x)}{t}\\
            & = f(x) + \frac{f(x + t(y - x)) - f(x)}{t}
        \end{align}
        <p>根据 <a href="https://en.wikipedia.org/wiki/Directional_derivative">方向导数</a> 的定义可知
        \[\nabla _ {y - x} f(x) = \lim _ {t \to 0} \frac{f(x + t(y - x)) - f(x)}{t}\]
        由方向导数和 <a href="https://en.wikipedia.org/wiki/Gradient">梯度</a> 的关系可知
        \[\nabla _ {y - x} f(x) = \nabla{f(x)} ^ T (y - x)\]
        <li>\((\Leftarrow)\)</li>
        <p>假设 \(\mathrm{dom}(f)\) 是凸集 且 \(f(y) \ge f(x) + \nabla{f(x)} ^ T (y - x)\). 对于任意 \(x \ne y\) 和 \(\lambda \in [0, 1]\), 令 \(z = \lambda x + (1 - \lambda) y\). 用两次不等式得到</p>
        \begin{align}
            f(x) - f(z) & \ge \nabla{f(z)} ^ T (x - z)\\
            f(y) - f(z) & \ge \nabla{f(z)} ^ T (y - z)
        \end{align}
        所以
        \[\lambda f(x) + (1 - \lambda) f(y) - f(z) \ge \nabla{f(z)} ^ T \underbrace{(\lambda x + (1 - \lambda) y - z)}_{= 0}\]
        即得凸函数的定义
         \[\lambda f(x) + (1 - \lambda) f(y) \ge f(z)\]
    </ul>
</details>

{{< figure src="/figures/cvx-4-convex-functions/3-first-order-condition.png" title="对于凸函数上的任意一点, 都能找到对应的支撑超平面将函数分隔在一侧" >}}

一阶导数不等式也说明, 如果一个函数是凸函数, 那么我们可以从局部信息推导出全局信息. 比如, 如果凸函数 \\(f\\) 在 \\(x\\) 处的梯度 \\(\nabla{f(x)} = 0\\), 那么对于任何 \\(y \in \mathrm{dom}(f)\\) 都有 \\(f(y) \ge f(x)\\), 即 \\(x\\) 是 \\(f\\) 的全局极小点.

<blockquote cite="凸函数的极小点判断">
可微凸函数的全局极小点是梯度为零的点.
</blockquote>

### 二阶条件
如果函数 \\(f\\) 是二阶可微的 (即 [Hessian 矩阵](https://en.wikipedia.org/wiki/Hessian_matrix) \\(\nabla ^ 2 {f}\\) 在开集 \\(\mathrm{dom}(f)\\) 内处处存在), 那么 \\(f\\) 是凸函数当且仅当

- \\(\mathrm{dom}(f)\\) 是凸集
- 对于所有的 \\(x \in \mathrm{dom}(f)\\), 都有

\\[\nabla ^ 2 {f} \succeq 0\\]

对于定义在 \\(\mathbb{R}\\) 上的函数 \\(f\\), 不等式条件简化为 \\(f''(x) \ge 0\\), 即 \\(f'(x)\\) 是非递减函数.

类似地, \\(f\\) 是凹函数当且仅当

- \\(\mathrm{dom}(f)\\) 是凸集
- 对于所有的 \\(x \in \mathrm{dom}(f)\\), 都有

\\[\nabla ^ 2 {f} \preceq 0\\]

说明 \\(f\\) 是严格凸函数需要以下条件 \\((\Leftarrow)\\)

- \\(\mathrm{dom}(f)\\) 是凸集
- 对于所有的 \\(x, y \in \mathrm{dom}(f), x \ne y\\), 都有

\\[\nabla ^ 2 {f} \succ 0\\]

这个结论反过来不成立: 严格凸函数 \\(f\\) 也可以满足 \\(\nabla{f} = 0\\) (如 \\(f(x) = x ^ 2\\)).

#### 例子
- 定义域为 \\(\mathbb{R} ^ n\\) 的二次函数 \\(f(x) = (1 / 2) x ^ T P x + q ^ T x + r\\), 其中 \\(P \in \mathbb{S} ^ n\\), \\(q \in \mathbb{R} ^ n\\), \\(r \in \mathbb{R}\\). 它的二阶导数 \\(\nabla{f} = P\\), 当 \\(P \succeq 0\\) 时为凸函数, 当 \\(P \preceq 0\\) 时为凹函数.
- 定义域为 \\(\\{x \in \mathbb{R} \mid x \ne 0\\}\\) 的函数 \\(f(x) = 1 / x ^ 2\\) 对所有 \\(x \in \mathrm{dom}(f)\\) 都满足 \\(f''(x) > 0\\), 但它不是凸函数, 因为它的定义域不是凸集.
