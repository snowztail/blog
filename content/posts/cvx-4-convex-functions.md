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

### 在直线上判断凹凸性
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
