---
title: "凸优化 3 - 函数"
author: "SnowzTail"
date: 2020-03-20T22:20:09Z
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
如果函数 \\(f \colon \mathbb{R} ^ n \to \mathbb{R}\\) 同时满足:

- \\(f\\) 的定义域 \\(\mathrm{dom}(f)\\) 是凸集
- 对于所有的 \\(x, y \in \mathrm{dom}(f)\\) 和 \\(\theta \in [0, 1]\\), 都满足

\\[f(\theta x + (1 - \theta) y) \le \theta f(x) + (1 - \theta) f(y)\\]

那么称 \\(f\\) 为 __凸函数 (convex function)__. 如果不等式对于所有的 \\(x \ne y\\) 和 \\(\theta \in (0, 1)\\) 都取不到等号, 那么称 \\(f\\) 是 __严格凸 (strictly convex)__ 的. 和中文字形相反, 连接凸函数上任意两点的线段都不位于函数的下方.

{{< figure src="/figures/cvx-3-functions/1-convex-function.png" title="连接凸函数上任意两点的线段都不位于函数的下方" >}}

如果 \\(-f\\) 是凸函数, 那么 \\(f\\) 是 __凹函数 (concate function)__. 如果 \\(-f\\) 是严格凸的, 那么 \\(f\\) 是 __严格凹 (strictly concate)__ 的. 仿射函数是且仅是唯一既凹又凸的函数. 所以在解很多二次非凸问题的时候, 常常通过二次项的泰勒展开式得到仿射逼近, 把原问题转化成一系列凸问题求解. 比如对于 \\(x \in \mathbb{C}^{n}\\), \\(A \in \mathbb{S}^{n \times n}\\), 在第 \\(i\\) 次迭代有 \\((x^{(i)})^H A x^{(i)} \ge 2\Re\\{(x^{(i)})^H A x^{(i-1)}\\} - (x^{(i-1)})^H A x^{(i-1)}\\).

<blockquote cite="仿射函数的凹凸性">
仿射函数是且仅是唯一既凹又凸的函数.
</blockquote>

---

## 判断条件
除定义外, 常用以下几个条件来判断函数凹凸性.

### 和定义域相交的直线
对于所有的 \\(x \in \mathrm{dom}(f)\\) 和 \\(v \in \mathbb{R} ^ n\\), 关于 \\(t \in \mathbb{R}\\) 的函数 \\(g(t)=f(x+tv)\\) 在它的定义域 \\(\mathrm{dom}(g)=\\{t \mid x+tv \in \mathrm{dom}(f)\\}\\) 上是凸函数.

<blockquote cite="在直线上判断凹凸性">
一个函数是凸的当且仅当它在任何与定义域相交的直线上表现出凸性.
</blockquote>

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

{{< figure src="/figures/cvx-3-functions/2-functions-restricted-to-lines.png" title="两个在 \(\mathbb{R}^2\) 上的函数, 在 \(xy\) 平面上任意画一条直线. 左: 在这条直线上总是凸函数 (开口向上的抛物线); 右: 在这条直线上可能是凹函数 (开口向下的抛物线)" >}}

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

{{< figure src="/figures/cvx-3-functions/3-first-order-condition.png" title="对于凸函数上的任意一点, 都能找到对应的支撑超平面将函数分隔在一侧" >}}

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

这个结论反过来不成立: 严格凸函数 \\(f\\) 也可以满足 \\(\nabla{f} ^ 2 = 0\\) (如 \\(f(x) = x ^ 2\\)). 下面是两个例子:

- 定义域为 \\(\mathbb{R} ^ n\\) 的二次函数 \\(f(x) = (1 / 2) x ^ T P x + q ^ T x + r\\), 其中 \\(P \in \mathbb{S} ^ n\\), \\(q \in \mathbb{R} ^ n\\), \\(r \in \mathbb{R}\\). 它的二阶导数 \\(\nabla{f} = P\\), 当 \\(P \succeq 0\\) 时为凸函数, 当 \\(P \preceq 0\\) 时为凹函数.
- 定义域为 \\(\\{x \in \mathbb{R} \mid x \ne 0\\}\\) 的函数 \\(f(x) = 1 / x ^ 2\\) 对所有 \\(x \in \mathrm{dom}(f)\\) 都满足 \\(f''(x) > 0\\), 但它不是凸函数, 因为它的定义域不是凸集.

### 常见函数的凹凸性
以下函数是凸函数:

- __指数 (exponential)__ \\(e ^ {ax}\\): \\(\forall a\\), \\(x \in \mathbb{R}\\)
- __范数 (norm)__ \\(\lVert{x}\rVert\\): \\(x \in \mathbb{R} ^ n\\)
- __绝对值幂函数 (powers of absolute value)__ \\(\lvert{x}\rvert ^ p\\): \\(p \ge 1\\), \\(x \in \mathbb{R}\\)
- __最大值 (max)__ \\(\max\\{x _ 1, \dots, x _ n\\}\\): \\(x \in \mathbb{R} ^ n\\)
- __二次线性分式 (quadratic-over-linear)__ \\(x ^ 2 / y\\): \\(x \in \mathbb{R}, y \in \mathbb{R} _ {++}\\)
- __矩阵分式 (matrix fractional)__ \\(x ^ T Y ^ {-1} x\\): \\(x \in \mathbb{R} ^ n, Y \in \mathbb{S} _ {++} ^ n\\)
- __指数和的对数 (log-sum-exp)__ \\(\log{(\sum _ {i=1} ^ n {e ^ {x _ i}})}\\): \\(x \in \mathbb{R} ^ n\\)
- 从 \\(q\\) 到 \\(p\\) 的 __相对熵 (relative entropy)__ \\(\sum _ {i=1} ^ n {p _ i \log{(p _ i / q _ i)}}\\): \\(p, q \in \mathbb{R} _ +\\)

以下函数是凹函数:
- __对数 (logarithm)__ \\(\log{(x)}\\): \\(x \in \mathbb{R} _ {++}\\)
- __熵 (entropy)__ \\(-\sum _ {i=1} ^ n {x\log(x)}\\): \\(x \in \mathbb{R} _ +\\)
- __几何平均 (geometric mean)__ \\(\left(\prod _ {i=1} ^ n {x _ i}\right) ^ {1 / n}\\): \\(x \in \mathbb{R} _ {++} ^ n\\)
- __对数 - 行列式 (log-determinant)__ \\(\log{\det{(X)}}\\): \\(X \in \mathbb{S} _ {++} ^ n\\)

以下函数的凹凸性取决于参数或定义域:
- __幂函数 (powers)__ \\(x ^ a\\): 当 \\(a \ge 1\\) 或 \\(a \le 0\\) 是 \\(x \in \mathbb{R} _ {++}\\) 上的凸函数; 当 \\(0 \le a \le 1\\) 是 \\(x \in \mathbb{R} _ {++}\\) 上的凹函数
- __倒数 (reciprocal)__ \\(1 / x\\): 是 \\(x \in \mathbb{R} _ {++}\\) 上的凸函数; 是 \\(x \in \mathbb{R} _ {\-\-}\\) 上的凹函数

---

## 集合和不等式
下面介绍一些和凸函数相关的集合和不等式.

### 下水平集
函数 \\(f \colon \mathbb{R} ^ n \to \mathbb{R}\\) 的 \\(\alpha\\) - __下水平集 (sublevel set)__ 定义为

\\[C_{\alpha}=\\{x \in \mathrm{dom}{(f)} \mid f(x) \le \alpha\\}\\]

对于任意的 \\(\alpha\\), 凸函数的下水平集都是凸集. 这个结论反过来不成立: 非凸函数也可以满足所有的下水平集都是凸集. 比如, 凹函数 \\(f(x) = - e ^ x\\) 的 \\(\alpha\\) - 下水平集是 \\(x \ge - \log{(\alpha)}\\), 对于任意 \\(\alpha\\) 都是凸集.

<blockquote cite="凸函数和下水平集">
凸函数的下水平集是凸集.
</blockquote>

<details>
    <summary>证明: 凸函数的下水平集是凸集</summary>
    <p>由下水平集的定义可知 \(x, y \in C _ {\alpha} \Rightarrow f(x), f(y) \le \alpha\), 故对于任意 \(0 \le \theta \le 1\) 有 \(f(\theta x + (1 - \theta) y) \le \alpha\), 即 \(\theta x + (1 - \theta) y \in C _ {\alpha}\).</p>
</details>

反过来, 凹函数的 \\(\alpha\\) - __上水平集 (superlevel set)__ \\(\\{x \in \mathrm{dom}(f) \mid f(x) \ge \alpha\\}\\) 也是凸集. 所以, 想要证明一个集合是凸集, 可以将它表示为一个凸函数的下水平集或一个凹函数的上水平集. 比如, 由 [算术 - 几何均值不等式](#算术-几何均值不等式) 可知, 对于 \\(A(x) = (1 / n) \sum _ {i=1} ^ n {x _ i}\\) 和 \\(G(x) = \left(\prod _ {i=1} ^ n {x _ i}\right) ^ {1 / n}\\), 有

\\[A(x) \ge G(x)\\]

假设对于 \\(0 \le \alpha \le 1\\) 存在非空集合 \\(\\{x \in \mathbb{R} _ + ^ n \mid G(x) - \alpha A(x) \ge 0\\}\\). 这个集合是凸集, 因为它是凹函数 \\(G(x) - \alpha A(x)\\) 的 0 - 上水平集. 实际上这个集合是 [正齐次](https://en.wikipedia.org/wiki/Homogeneous_function) 的, 所以它是一个凸锥.

### 上境图
函数 \\(f \colon \mathbb{R} ^ n \to \mathbb{R}\\) 的 __上境图 (epigraph)__ 定义为

\\[\mathrm{epi}(f) = \\{(x, t) \mid x \in \mathrm{dom}(f), t \ge f(x)\\}\\]

它表示函数图像及其上方的部分. 请注意上境图和上水平集的区别: 对于 \\(f \colon \mathbb{R} ^ n \to \mathbb{R}\\), 前者是由满足条件的自变量 \\(x\\) 和函数值 \\(f(x)\\) 构成的 \\(\mathbb{R} ^ {n + 1}\\) 空间中的子集; 后者是由满足条件的自变量 \\(x\\) 构成的 \\(\mathbb{R} ^ {n}\\) 空间中的子集. 上境图构造了凸函数和凸集之间的联系, 一个函数是凸函数等价于它的上境图是凸集.

{{< figure src="/figures/cvx-3-functions/4-epigraph.png" title="上境图表示函数图像及其上方的部分" >}}

<blockquote cite="凸函数和上境图">
一个函数是凸函数等价于它的上境图是凸集.
</blockquote>

反过来, 一个函数是凹函数等价于它的 __下境图 (hypograph)__ \\(\mathrm{hypo}(f) = \\{(x, t) \mid x \in \mathrm{dom}(f), t \le f(x)\\}\\) 是凸集.

<details>
    <summary>证明: 矩阵分式函数 \(x ^ T Y ^ {-1} x\) 是 \(x \in \mathbb{R} ^ n, Y \in \mathbb{S} _ {++} ^ n\) 上的凸函数</summary>
    \(f\) 的上境图是
    \begin{equation}
        \mathrm{epi}(f) = \{(x, Y, t) \mid Y \succ 0, x ^ T Y ^ {-1} x \le t\}
    \end{equation}
    <p>其中约束条件 \(S \triangleq t - x ^ T Y ^ {-1} x \ge 0\) 是 <a href="https://en.wikipedia.org/wiki/Schur_complement">Schur 补</a> 的形式, 由此可以构造矩阵</p>
    \begin{equation}
        M = \begin{bmatrix} Y & x \\ x ^ T & t \end{bmatrix}
    \end{equation}
    <p>由 Schur 补的性质可知, 当 \(Y \succ 0\) 时, \(M \succeq 0\) 当且仅当 \(S \ge 0\). 所以</p>
    \begin{equation}
        \mathrm{epi}(f) = \left\{(x, Y, t) \mid Y \succ 0, \left[ \begin{smallmatrix} Y & x \\ x ^ T & t \end{smallmatrix} \right] \succeq 0 \right\}
    \end{equation}
    其中 \(\left[ \begin{smallmatrix} Y & x \\ x ^ T & t \end{smallmatrix} \right] \succeq 0\) 可以化简成一个 <a href="https://en.wikipedia.org/wiki/Linear_matrix_inequality">线性矩阵不等式</a>, 所以 \(\mathrm{epi}(f)\) 是凸集.
</details>

凸函数的一阶条件也可以用上境图解释. 如果 \\((y, t) \in \mathrm{epi}(f)\\), 那么 \\(t \ge f(y) \ge f(x) + \nabla{f(x)} ^ T (y - x)\\), 即

\\[(y, t) \in \mathrm{epi}(f) \Rightarrow \begin{bmatrix} \nabla{f(x)} \\\ -1 \end{bmatrix} ^ T \left( \begin{bmatrix} y \\\ t \end{bmatrix} - \begin{bmatrix} x \\\ f(x) \end{bmatrix} \right) \le 0\\]

{{< figure src="/figures/cvx-3-functions/5-epigraph-and-convex-function.png" title="法向量为 \((\nabla{f(x)}, -1)\) 的超平面在边界点 \((x, f(x))\) 支撑 \(\mathrm{epi}(f)\)" >}}

### Jensen 不等式
__Jensen 不等式__ 可以看作凸函数性质的推广. 如果 \\(f\\) 是凸函数, \\(x _ 1, \dots, x _ k \in \mathrm{dom}(f)\\), \\(\theta _ 1, \dots, \theta _ k \ge 0\\), \\(\sum _ {i=1} ^ k {\theta _ i} = 1\\), 那么

\\[f\left(\sum _ {i=1} ^ k {\theta _ i x _ i}\right) \le \sum _ {i=1} ^ k \theta _ i f(x _ i)\\]

它也可以进一步推广到无穷项和, 积分和期望. 如果凸函数 \\(f\\) 在 \\(x \in S \subseteq \mathrm{dom}(f)\\) 上满足 \\(p(x) \ge 0\\), \\(\int _ S {p(x)} dx = 1\\), 那么

\\[f\left(\int _ S {x p(x)} dx\right) \le \int _ S {f(x) p(x)} dx\\]

当积分存在时成立. 如果自变量 \\(x\\) 在凸函数 \\(f\\) 的定义域上的概率是 1, 即 \\(\mathbb{E}(x \in \mathrm{dom}(f)) = 1\\), 那么

\\[f(\mathbb{E}(x)) \le \mathbb{E}(f(x))\\]

当期望存在 (收敛) 时成立. 比如, 当 \\(x \in \mathrm{dom}(f)\\) 和 \\(z\\) 满足 \\(\mathbb{E}(z) = 0\\) 时, 有

\\[f(\mathbb{E}(x + z)) = f(x) \le \mathbb{E}(f(x + z))\\]

也就是说, 在自变量上增加一个均值为零的额外变量不会减少凸函数的均值.

### <a name="算术-几何均值不等式"></a>算术 - 几何均值不等式
__算术 - 几何均值不等式 (AM-GM inequality)__ 的一般形式是, 如果 \\(\theta _ 1, \dots, \theta _ k \ge 0\\), \\(\sum _ {i=1} ^ k {\theta _ i} = 1\\), 那么对于任意 \\(x \in \mathbb{R} ^ n\\) 有

\\[\sum _ {i=1} ^ n {\theta _ i x _ i} \ge \left(\prod _ {i=1} ^ n {x _ i ^ {\theta _ i}}\right)\\]

其中左侧是一般算术均值不等式, 右侧是一般几何均值不等式. 它可以由 Jensen 不等式导出.

<details>
    <summary>证明: 算术 - 几何均值不等式</summary>
    <p>选取凸函数 \(f(x) = - \log(x)\). 由 Jensen 不等式可知</p>
    \begin{equation}
        -\log\left(\sum _ {i=1} ^ n {\theta _ i x _ i}\right) \le \sum _ {i=1} ^ n {\theta _ i (-\log{x _ i})} = -\log\left(\prod _ {i=1} ^ n {x _ i ^ {\theta _ i}}\right)
    \end{equation}
    <p>因为 \(\log\) 在 \\(\mathbb{R} _ +\\) 上是单调增函数, 所以由 \(\log\left(\sum _ {i=1} ^ n {\theta _ i x _ i}\right) \ge \log\left(\prod _ {i=1} ^ n {x _ i ^ {\theta _ i}}\right)\) 可知 \(\sum _ {i=1} ^ n {\theta _ i x _ i} \ge \left(\prod _ {i=1} ^ n {x _ i ^ {\theta _ i}}\right)\).</p>
</details>

### Hölder 不等式
__Hölder 不等式__ 的求和形式是, 如果 \\(p > 1\\) 且 \\(1 / p + 1 / q = 1\\), 那么对于任意 \\(x, y \in \mathbb{R} ^ n\\) 有

\\[\sum _ {i=1} ^ n {\lvert{x _ i y _ i}\rvert} \le \lVert{x}\rVert _ p \lVert{y}\rVert _ q = \left(\sum _ i ^ n \lvert{x _ i}\rvert ^ p\right) ^ {1 / p} \left(\sum _ i ^ n \lvert{y _ i}\rvert ^ q\right) ^ {1 / q}\\]

取 \\(p = q = 2\\), 两边平方就得到 __Cauchy 不等式__

\\[\left(\sum _ {i=1} ^ n {x _ i y _ i}\right) ^ 2 \le \lVert{x}\rVert _ 2 ^ 2 \lVert{y}\rVert _ 2 ^ 2 = \left(\sum _ i ^ n {x _ i ^ 2}\right) \left(\sum _ i ^ n {y _ i ^ 2}\right)\\]

<details>
    <summary>证明: Hölder 不等式</summary>
    <p>由算术 - 几何均值不等式可知</p>
    \begin{equation}
        a ^ {\theta} b ^ {1 - \theta} \le \theta a + (1 - \theta) b
    \end{equation}
    <p>对于任意 \(a, b \ge 0\) 和 \(0 \le \theta \le 1\) 都成立. 选取</p>
    \begin{equation}
        a = \frac{\lvert{x _ i}\rvert ^ p}{\sum _ {j=1} ^ n {\lvert{x _ i}\rvert ^ p}}, \quad b = \frac{\lvert{y _ i}\rvert ^ q}{\sum _ {j=1} ^ n {\lvert{y _ i}\rvert ^ q}}, \quad \theta = 1 / p
    \end{equation}
    <p>则有</p>
    \begin{equation}
        \left(\frac{\lvert{x _ i}\rvert ^ p}{\sum _ {j=1} ^ n {\lvert{x _ i}\rvert ^ p}}\right) ^ {1 / p} \left(\frac{\lvert{y _ i}\rvert ^ q}{\sum _ {j=1} ^ n {\lvert{y _ i}\rvert ^ q}}\right) ^ {1 / q} \le \frac{\lvert{x _ i}\rvert ^ p}{p \sum _ {j=1} ^ n {\lvert{x _ i}\rvert ^ p}} + \frac{\lvert{y _ i}\rvert ^ q}{q \sum _ {j=1} ^ n {\lvert{y _ i}\rvert ^ q}}
    \end{equation}
    两边关于 \(i\) 求和得到
    \begin{equation}
        \sum _ {i=1} ^ n {\frac{\lvert{x _ i}\rvert}{\left(\sum _ {j=1} ^ n {\lvert{x _ i}\rvert ^ p}\right) ^ {1 / p}} \frac{\lvert{y _ i}\rvert}{\left(\sum _ {j=1} ^ n {\lvert{y _ i}\rvert ^ q}\right) ^ {1 / q}}} \le \frac{\sum _ {i=1} ^ n {\lvert{x _ i}\rvert ^ p}}{p \sum _ {j=1} ^ n {\lvert{x _ i}\rvert ^ p}} + \frac{\sum _ {i=1} ^ n {\lvert{y _ i}\rvert ^ q}}{q \sum _ {j=1} ^ n {\lvert{y _ i}\rvert ^ q}} = 1
    \end{equation}
    即
    \begin{equation}
        \sum _ {i=1} ^ n {\lvert{x _ i y _ i}\rvert} \le \left(\sum _ i ^ n \lvert{x _ i}\rvert ^ p\right) ^ {1 / p} \left(\sum _ i ^ n \lvert{y _ i}\rvert ^ q\right) ^ {1 / q}
    \end{equation}
</details>

---

## 共轭函数

函数 \\(f(x) \colon \mathbb{R} ^ n \to \mathbb{R}\\) 的共轭函数定义为

\\[f ^ * (y) = \sup _ {x \in \mathrm{dom}(f)} \left(y ^ T x - f(x)\right)\\]

其中定义域 \\(\mathrm{dom}(f ^ * (y)) = \\{y \in \mathbb{R} ^ n \mid y ^ T x - f(x) < \infty, x \in \mathrm{dom}(f)\\}\\). 如果 \\(f\\) 可微, 最大差值点出现在 \\(f'(x) = y\\) 时. 无论 \\(f(x)\\) 是否是凸函数, 共轭函数 \\(f ^ *(y)\\) 都是凸函数, 因为它是一系列关于 \\(y\\) 的凸函数的逐点上确界.

{{< figure src="/figures/cvx-3-functions/6-conjugate-function.png" title="对于每一个 \(y\) 的取值都有一条过原点的直线 \(xy\). \(f\) 的共轭函数在 \(y\) 点的取值定义为 \(y ^ T x\) 与 \(f(x)\) 的最大差值 (注意差值的正负号)" >}}
