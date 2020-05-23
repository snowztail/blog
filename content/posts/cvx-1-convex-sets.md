---
title: "凸优化 1 - 凸集"
author: "SnowzTail"
date: 2019-11-24T12:41:28Z
math: true
draft: false
categories:
 - Optimization
tags:
 - Convex Optimization
featured_image:
---

## 仿射集和凸集

### 直线和线段
假设在 \\({\mathbb{R}^n}\\) 中有两个不同点 \\({x_1} \ne {x_2}\\), 那么

\\[\begin{array}{*{20}{c}}{y = \theta {x_1} + (1 - \theta ){x_2},}&{\theta  \in \mathbb{R}}\end{array}\\]

表示穿越 \\({x_1}\\) 和 \\({x_2}\\) 的 __直线 (line)__, 而

\\[\begin{array}{*{20}{c}}{y = \theta {x_1} + (1 - \theta ){x_2},}&{\theta  \in [0,1]}\end{array}\\]

表示穿越 \\({x_1}\\) 和 \\({x_2}\\) 的 __线段 (line segment)__.

### 仿射集
如果通过集合 \\(C \subseteq {\mathbb{R}^n}\\) 中任意两个不同点的直线仍然在集合 \\(C\\) 中, 那么集合 \\(C\\) 是一个 __仿射集 (affine set)__:

对于任何 \\({x_1},{x_2} \in C\\) 和 \\({\theta  \in \mathbb{R}}\\),

\\\[\theta {x_1} + (1 - \theta ){x_2} \in C\\\]

也就是说, 集合 \\(C\\) 是一个仿射集, 当且仅当它包含了其中任意两点的系数为 1 的线性组合.

### 仿射组合
对于多个点的情况, 点 \\({x_1}, \ldots ,{x_k}\\) 的 __仿射组合 (affine combination)__ 定义为:

\\[\begin{array}{*{20}{c}}{{\theta _1}{x_1} +  \ldots  + {\theta _k}{x_k},}&{{\theta _1} +  \ldots  + {\theta _k} = 1}\end{array}\\]

请注意, 仿射集是对于集合而言的, 仿射组合是对于点而言的. 根据定义可知, 仿射集包含其中任意点的仿射组合. 如果集合 \\(C\\) 是一个仿射集, \\({x_1}, \ldots ,{x_k} \in C\\), 并且 \\({{\theta _1} +  \ldots  + {\theta _k} = 1}\\), 那么

\\[{\theta _1}{x_1} +  \ldots  + {\theta _k}{x_k} \in C\\]

### 子空间与维数
如果集合 \\(C\\) 是一个仿射集并且 \\({x_0} \in C\\), 那么根据 __子空间 (subspace)__ 的定义 (对于加法和数乘封闭) 可知, 集合

\\[V = C - {x_0} = \\{ {x - {x_0}|x \in C} \\}\\]

是一个子空间, 即对于任意 \\({v_1},{v_2} \in V\\) 以及 \\(\alpha ,\beta  \in \mathbb{R}\\), 存在 \\(\alpha {v_1} + \beta {v_2} \in V\\).

<details>
    <summary>证明: 仿射集等价于对应的子空间添加一个任意偏移</summary>
    <p>\[\alpha {v_1} + \beta {v_2} + {x_0} = \alpha ({v_1} + {x_0}) + \beta ({v_2} + {x_0}) + (1 - \alpha  - \beta ){x_0}\]</p>
    <p>是点 \(({v_1} + {x_0})\), \(({v_2} + {x_0})\), \({x_0}\) 的仿射集合, 并且这些点都在集合 \(C\) 内, 所以</p>
    <p>\[\alpha {v_1} + \beta {v_2} + {x_0} \in C\]</p>
    <p>因此</p>
    <p>\[\alpha {v_1} + \beta {v_2} \in C - {x_0} = V\]</p>
</details>

我们定义仿射集 \\(C\\) 的 __维数 (dimension)__ 为对应子空间 \\(V = C - {x_0}\\) 的维数, 它代表描述一个点所需要的独立参数的个数.

<blockquote cite="线性方程与仿射集">
线性方程组的解集是一个仿射集合. 反之, 任意一个仿射集合可以写成线性方程组的解集.
</blockquote>

<details>
    <summary>证明: 线性方程组的解等价于一个仿射集合</summary>
    <p>已知 \(C\) 是线性方程组的解集. 从定义出发, 取 \({x_1},{x_2} \in C\) 和 \(\theta  \in \mathbb{R}\), 我们需要证明</p>
    <p>\[\theta {x_1} + (1 - \theta ){x_2} \in C\]</p>
    <p>由于 \({x_1},{x_2} \in C\), 故 \(A{x_1} = b,A{x_2} = b\), 我们可以得到</p>
    <p>\[A(\theta {x_1} + (1 - \theta ){x_2}) = \theta A{x_1} + (1 - \theta )A{x_2} = \theta b + (1 - \theta )b = b\]</p>
    <p>也就是说 \({x_1},{x_2}\) 的仿射组合在集合 \(C\) 中, 所以集合 \(C\) 是仿射集.</p>
</details>

### 仿射包与仿射维数
定义由任意集合 \\(C \subseteq {\mathbb{R}^n}\\) 中的点组成的所有仿射组合为集合 \\(C\\) 的 __仿射包 (affine hull)__:

\\[{\rm{aff}}\(C) = \\{ {{\theta _1}{x_1} +  \cdots  + {\theta _k}{x_k}|{x_1}, \ldots ,{x_k} \in C,{\theta _1} +  \cdots  + {\theta _k} = 1} \\}\\]

这里的集合 \\(C\\) 可以不是仿射集. 仿射包 \\({\rm{aff}}\(C)\\) 是包含 \\(C\\) 的最小的仿射集.

仿射包的维数称为集合 \\(C\\) 的 __仿射维数 (affine dimension)__. 用一个简单的例子区分集合的维数与仿射维数: \\({\mathbb{R}^2}\\) 上的单位圆环 \\(\\{ {x \in {\mathbb{R}^2}|x_1^2 + x_2^2 = 1} \\}\\) 的维度为 1, 因为其中的任意一点可以用单个连续的自变量表示为 \\((\cos \theta ,\sin \theta )\\) 或是 \\((2t,1 - {t^2})/1 + {t^2}\\). 然而这个圆环的仿射维度是 2, 因为它的仿射包是整个 \\({\mathbb{R}^2}\\).

### 内部与相对内部
我们从 __内点 (interior point)__ 的定义出发. 一个点 \\({x_0} \in {\mathbb{R}^n}\\) 被称作集合 \\(C\\) 的内点, 当且仅当存在一个以 \\({x_0}\\) 为球心且半径足够小的球完全属于集合 \\(C\\):

\\[\begin{array}{*{20}{c}}{B({x_0},\varepsilon ) \subseteq C,}&{\exists \varepsilon  > 0}\end{array}\\]

这里的球记作 \\(B({x_0},\varepsilon ) = \\{ {y|\\| {y - x} \\| \le r} \\}\\), 其中 \\(\\|  \cdot  \\|\\) 可以是任意范数. 集合 \\(C\\) 的 __内部 (interior)__ 定义为所有内点的集合, 记作 \\({{\rm int}}\(C)\\). 它可以看成是 \\(C\\) 相对于全空间 \\({\mathbb{R}^n}\\) 的内部.

如果集合 \\(C \subseteq {\mathbb{R}^n}\\) 的仿射维数小于 \\(n\\), 那么根据定义可知它的仿射包就不是整个空间 \\({\rm{aff}}\(C) \ne {\mathbb{R}^n}\\). 它的 __相对内部 (relative interior)__ \\({\rm{relint}}\(C)\\) 是  \\(C\\) 相对于仿射包 \\({\rm{aff}}\(C)\\) 的内部:

\\[{\rm{relint}}\(C) = \\{ {x \in C|B(x,\varepsilon ) \cap {\rm{aff}}\(C) \subseteq C} \\}\\]

最后, 我们定义集合 \\(C\\) 的 __边界 (boundary)__ \\({\rm{bd}}\(C)\\) 和 __相对边界 (relative boundary)__ \\({\rm{relbd}}\(C)\\) 为与之对应的 __闭包__ \\({\rm{cl}}\(C)\\) (定义为自身和它所有的极值点) 中除去内部和相对内部的部分. 用一个例子来帮助理解. 考虑 \\({\mathbb{R}^3}\\) 中处于 \\(({x_1},{x_2})\\) 平面的正方形:

\\[C = \\{ {x \in {\mathbb{R}^3}| - 1 \le {x_1} \le 1, - 1 \le {x_2} \le 1,{x_3} = 0} \\}\\]

集合 \\(C\\) 的仿射包是 \\(({x_1},{x_2})\\) 平面

\\[{\rm{aff}}\(C) = \\{ {x \in {\mathbb{R}^3}|{x_3} = 0} \\}\\]

\\(C\\) 的内部为空 (因为找不到任意被它自身包含的三维球), 但其相对内部为

\\[{\rm{relint}}\(C) = \\{ {x \in {\mathbb{R}^3}| - 1 < {x_1} < 1, - 1 < {x_2} < 1,{x_3} = 0} \\}\\]

同理, \\(C\\) 在 \\({\mathbb{R}^3}\\) 中的边界是它本身, 而相对边界是其边框

\\[\\{ {x \in {\mathbb{R}^3}|\max \\{ {\| {{x_1}} \|,\| {{x_2}} \|} \\} = 1,{x_3} = 0} \\}\\]

### 凸集
如果连接集合中任意两点的线段仍然在这个集合中, 那么我们称这个集合为 __凸集 (convex set)__. 也就是说, 对于 \\({x_1},{x_2} \in C\\) 和任意 \\(0 \le \theta  \le 1\\):

\\[\theta {x_1} + (1 - \theta ){x_2} \in C\\]

从几何意义上来说, 凸集中的每个点都可以被所有其他点沿着一条无阻碍的路径看见. 这里的无阻碍是指整个路径 (线段) 都在集合中. 可以想象, 所有的仿射集都是凸集, 因为它包含了连接其中任意两点的直线 (因而包括线段).

{{< figure src="/figures/cvx-1-convex-sets/1-convex-sets.jpg" title="凸集需要包含连接其中任意两点的线段 (第一个是凸集)" >}}

### 凸组合
定义点 \\({x_1}, \ldots ,{x_k}\\) 的 __凸组合 (convex combination)__ 为:

\\[\begin{array}{*{20}{c}}{{\theta _1}{x_1} +  \ldots  + {\theta _k}{x_k},}&{{\theta _1} +  \ldots  + {\theta _k} = 1}\end{array},{\theta _i} \ge 0,i = 1, \ldots ,k\\]

相比仿射组合, 这里多了一个参数非负的约束条件. 凸组合可以理解成所有点的加权平均, 其中参数 \\({\theta _i}\\) 是点 \\({{x_i}}\\) 的权重. 一个集合是凸集等价于它包含其中所有点的凸组合.

凸组合可以拓展到无穷级数, 积分和概率分布 (对于 \\(C \subseteq {\mathbb{R}^n}\\) 为凸集):

- 无穷级数

    假设 \\({\theta _ i} \ge 0,i = 1, \ldots ,k\\) 且 \\(\sum\nolimits_{i = 1}^k {{\theta _i}}  = 1\\), 对于 \\({x_1},{x_2}, \ldots  \in C\\). 如果下面的级数收敛, 那么:

\\[\sum\limits_{i = 1}^\infty  {{\theta _i}{x_i}}  \in C\\]

- 积分

    假设函数 \\(p:{\mathbb{R}^n} \to \mathbb{R}\\) 对于所有 \\(x \in C\\) 满足 \\(p(x) \ge 0\\) 和 \\(\int_C {p(x)} dx = 1\\). 如果下面的积分存在, 那么:

\\[\int_C {xp(x)} dx \in C\\]

- 概率分布

    假设随机变量 \\(x\\) 满足 \\(P(x \in C) = 1\\), 那么:

\\[\mathbb{E}(x) \in C\\]

### 凸包
集合 \\(C\\) 中所有点的凸组合的集合称为 \\(C\\) 的 __凸包 (convex hull)__:

\\[{\rm{conv}}\(C) = \\{ {{\theta _1}{x_1} +  \ldots  + {\theta _k}{x_k}|{x_i} \in C,{\theta _i} \ge 0,{\theta _1} +  \ldots  + {\theta _k} = 1,i = 1, \ldots ,k} \\}\\]

凸包 \\({\rm{conv}}\(C)\\) 是包含 \\(C\\) 最小的凸集.

{{< figure src="/figures/cvx-1-convex-sets/2-convex-hulls.jpg" title="凸包是包含原集合最小的凸集" >}}

### 锥
如果对于所有的 \\(x \in C\\) 和 \\(\theta  \ge 0\\) 都满足 \\(\theta x \in C\\), 那么称集合 \\(C\\) 为 __锥 (cone)__.  凸的锥就是 __凸锥 (convex cone)__, 即对于所有 \\({x_1},{x_2} \in C\\) 和 \\({\theta _1},{\theta _2} \ge 0\\):

\\[{\theta _1}{x_1} + {\theta _2}{x_2} \in C\\]

根据定义, 锥需要满足的一个特殊情况是 \\({\theta} = 0\\), 也就是说锥必须包含原点. 它的边是通过原点和 \\(x\\) 的射线.

{{< figure src="/figures/cvx-1-convex-sets/3-convex-cone.jpg" title="锥需要通过原点且是开集" >}}

### 锥组合
定义点 \\({x_1}, \ldots ,{x_k}\\) 的 __锥组合 (conic combination)__ 为:

\\[\begin{array}{*{20}{c}}{{\theta _1}{x_1} +  \ldots  + {\theta _k}{x_k},}&{{\theta _i} \ge 0,i = 1, \ldots ,k}\end{array}\\]

相比凸组合, 这里少了一个系数和为 1 的约束条件. 一个集合是凸锥等价于它包含其中所有点的锥组合. 类似仿射组合和凸组合, 锥组合也可以扩展到无穷级数, 积分和概率分布.

### 锥包
集合 \\(C\\) 中所有点的锥组合的集合称为 \\(C\\) 的 __锥包 (conic hull)__:

\\[\\{ {{\theta _1}{x_1} +  \ldots  + {\theta _k}{x_k}|{x_i} \in C,{\theta _i} \ge 0,i = 1, \ldots ,k} \\}\\]

锥包是包含 \\(C\\) 最小的凸锥.

{{< figure src="/figures/cvx-1-convex-sets/4-conic-hulls.jpg" title="锥包是基于点集定义的" >}}

## 一些例子

### 超平面和半空间
__超平面 (hyperplane)__ 具有以下形式:

\\[\\{ {x|{a^T}x = b} \\}\\]

其中 \\(a \in {\mathbb{R}^n},a \ne 0\\) 是法向量, 决定了超平面的方向, \\(b \in \mathbb{R}\\) 代表超平面从原点的偏移. 它等价于对应线性方程组的解集, 所以是仿射集. 比如二维空间的超平面可以写成 \\(\\{ {({x_1},{x_2})|{a_1}{x_1} + {a_2}{x_2} = b} \\}\\), 也就是一条直线. 令空间一点 \\({x_0}\\) 满足 \\(b = {a^T}{x_0}\\), 超平面也可以写成:

\\[\\{ {x|{a^T}(x - {x_0}) = 0} \\}\\]

也就是说, 它包含了所有从 \\({x_0}\\) 出发并且与 \\(a\\) 垂直的向量.

{{< figure src="/figures/cvx-1-convex-sets/5-hyperplane.jpg" title="参数 \(a,b\) 定义了唯一的超平面" >}}

超平面把 \\({\mathbb{R}^n}\\) 分割成了两个 __半空间 (halfspace)__:

\\[\\{ {x|{a^T}x \le b} \\}\\]

它等价于对应线性不等式组的解集, 所以是凸集.

{{< figure src="/figures/cvx-1-convex-sets/6-halfspaces.jpg" title="法向量 \(a\) 指向半空间的外部" >}}

同理, 半空间也可以写成

\\[\\{ {x|{a^T}(x - {x_0}) \le 0} \\}\\]

也就是说, 它包含了所有从 \\({x_0}\\) 出发并且与 \\(a\\) 夹角大于等于 \\(\pi /2\\) 的向量.

{{< figure src="/figures/cvx-1-convex-sets/7-halfspace-and-angle.jpg" title="半空间内的向量与 \(a\) 成直角或钝角" >}}

### 球和椭球
\\({\mathbb{R}^n}\\) 中的 __球 (ball)__ 可以表示成:

\\[B({x_c},r) = \\{ {x|{{\\| {x - {x_c}} \\|}_2} \le r} \\} = \\{ {x|{{(x - {x_c})}^T}(x - {x_c}) \le {r^2}} \\}\\]

其中 \\({x_c}\\) 是球心, \\({r}\\)是半径. 另一种等价的表示方法是:

\\[B({x_c},r) = \\{ {{x_c} + ru|{{\\| u \\|}_2} \le 1} \\}\\]

这里的 \\(u\\) 是以原点为球心的单位球. 球是凸集.

<details>
    <summary>证明: 球是凸集</summary>
    <p>对于两个球 \({\\| {{x_1} - {x_c}} \\|_2} \le r,{\\| {{x_2} - {x_c}} \\|_2} \le r\) 和 \(0 \le \theta  \le 1\),</p>
    <p>\[\begin{array}{c}{\\| {\theta {x_1} + (1 - \theta ){x_2} - {x_c}} \\|_2} = {\\| {\theta ({x_1} - {x_c}) + (1 - \theta )({x_2} - {x_c})} \\|_2}\\ \le \theta {\\| {{x_1} - {x_c}} \\|_2} + (1 - \theta ){\\| {{x_2} - {x_c}} \\|_2}\\ \le r\end{array}\]</p>
    <p>第一个 \(\le\) 因为 \({\\|  \cdot  \\|_2}\) 是凸函数 (后续文章会提到), 第二个是根据已知球的定义.</p>
</details>

__椭球 (ellipsoid)__ 可以看成是球的推广:

\\[\mathcal{E} = \\{ {x|{{(x - {x_c})}^T}{P^{ - 1}}(x - {x_c}) \le 1} \\}\\]

其中 \\({x_c}\\) 是球心, \\(P\\) 是正定矩阵. \\(P\\) 的特征向量决定了椭球的轴向, 特征值决定了椭球的轴长.

{{< figure src="/figures/cvx-1-convex-sets/8-ellipsoid-and-positive-definite-matrix.jpg" title="\(P\) 决定了椭球的轴向和轴长" >}}

椭球有时也写成如下的形式:

\\[\mathcal{E} = \\{ {{x_c} + Au|{{\\| u \\|}_2} \le 1} \\}\\]

其中 \\(A\\) 是非奇异的方阵.

### 范数球和范数锥
对于 \\({\mathbb{R}^n}\\) 中的任意范数 \\(\\|  \cdot  \\|\\), __范数球 (norm ball)__ 定义为:

\\[C = \\{ {x|\\| {x - {x_c}} \\| \le r} \\} \subseteq {\mathbb{R}^n}\\]

__范数锥 (norm cone)__ 定义为:

\\[C = \\{ {(x,t)|\\| x \\| \le t} \\} \subseteq {\mathbb{R}^{n + 1}}\\]

注意这里的 \\((x,t)\\) 是一个长度为 \\({n + 1}\\) 的列向量, 其中前 \\({n}\\) 项 \\(x \in {\mathbb{R}^n}\\) 受最后一项 \\(t \in \mathbb{R}\\) 的约束. 范数锥是一类特殊的凸锥.

{{< figure src="/figures/cvx-1-convex-sets/9-norm-cone.jpg" title="\({\mathbb{R}^3}\) 中的范数锥. 对于一个给定的 \(t\), \(({x_1},{x_2})\) 的集合构成了一个半径为 \(t\) 的圆" >}}

### 多面体
__多面体 (polyhedron)__ 是有限个线性等式和不等式的解集, 同时也是有限个超平面和半空间的交集:

\\[\mathcal{P} = \\{ {x|a_j^Tx \le {b_j},j = 1, \ldots ,m,c_j^Tx = {d_j},j = 1, \ldots p} \\}\\]

多面体也可以写成向量不等式的形式:

\\[\mathcal{P} = \\{ {x|Ax \preceq b,Cx = d} \\}\\]

其中 \\( \preceq \\) 是 \\({\mathbb{R}^m}\\) 上的 [向量不等式](https://snowztail.com/cvx-3-ordering-separating-and-supporting/#%E5%B9%BF%E4%B9%89%E4%B8%8D%E7%AD%89%E5%BC%8F), 表示在每个方向上的分量都不大于.

{{< figure src="/figures/cvx-1-convex-sets/10-polyhedron.jpg" title="多面体 \(\mathcal{P}\) 是法向量为 \({a_1}, \ldots ,{a_5}\) 的半空间群的交集" >}}

一个有代表性的多面体是非负象限 \\(\mathbb{R}_ + ^n = \\{ {x \in {\mathbb{R}^n}|x \succeq 0} \\}\\), 它是每个方向上的正半空间的交集. 此外, 对于矩阵 \\(A \in \mathbb{C}^{m \times n}\\), \\(C = \\{x \in \mathbb{R}^n | Ax \succeq 0\\}\\) 是由 \\(m\\) 个经过原点的半空间相交组成的多面体, 其中每个半空间由 \\(A\\) 的对应行定义. \\(C\\) 也是一个锥.

### 单纯形
__单纯形 (simplex)__ 是多面体的一个子类. 假设 \\({\mathbb{R}^n}\\) 中存在 \\(k + 1\\) 个仿射独立的点 \\({v_0}, \ldots ,{v_k}\\) (这里的 \\(v\\) 表示点, 也就是说向量 \\({v_1} - {v_0}, \ldots ,{v_k} - {v_0}\\) 线性独立), 那么这些点可以决定一个单纯形:

\\[C =  {\rm{conv}}\\{ {{v_0}, \ldots ,{v_k}} \\} = \\{ {{\theta _0}{v_0} +  \cdots  + {\theta _k}{v_k}|\theta \succeq 0,{{\bf{1}}^T}\theta  = 1} \\}\\]

其中 \\({\bf{1}}\\) 表示所有分量都是 1 的向量. 这个单纯形由 \\(k + 1\\) 个点 (或者 \\(k\\) 个向量) 定义, 仿射维数为 \\(k\\), 称为 \\({\mathbb{R}^n}\\) 空间的 \\(k\\) 维单纯形. 它的表达式和凸包非常类似, 实际上, \\(k\\) 维单纯形就是 \\(k + 1\\) 个位于一般位置的点的凸包.

考虑一些例子:

- 两个仿射独立的点 (一个向量) 组成线段, 是 1 维单纯形
- 三个仿射独立的点 (两个向量) 组成三角形, 是 2 维单纯形
- 四个仿射独立的点 (三个向量) 组成四面体, 是 3 维单纯形
- (\\(n\\) 维) __单位单纯形 (unit simplex)__ 由零向量 0 和单位向量 \\({e_1}, \ldots ,{e_n}\\) 决定 (注意单位单纯形并不具有单位体积): \\[\\{ {x|x \succeq 0,{{\bf{1}}^T}x \le 1} \\}\\]
- (\\(n - 1\\) 维) __概率单纯形 (probability simplex)__ 由单位向量 \\({e_1}, \ldots ,{e_n}\\) 决定, 对应单位单纯形的边界 (概率单纯形中的向量的第 \\(i\\) 个分量对应概率): \\[\\{ {x|x \succeq 0,{{\bf{1}}^T}x = 1} \\}\\]

为了用来表示多面体, 凸包表达式的一个扩展是:

\\[\\{ {{\theta _1}{x_1} +  \ldots  + {\theta _k}{x_k}|{\theta _i} \ge 0,{\theta _1} +  \ldots  + {\theta _m} = 1,i = 1, \ldots ,k} \\}\\]

其中 \\(m \le k\\), 也就是说仅要求前 \\(m\\) 个点的系数和为 1. 它等价于前 \\(m\\) 个点的凸包

\\[\\{ {{\theta _1}{x_1} +  \ldots  + {\theta _m}{x_m}|{\theta _i} \ge 0,{\theta _1} +  \ldots  + {\theta _m} = 1,i = 1, \ldots ,m} \\}\\]

加上其余 \\(k - m\\) 个点的锥包

\\[\\{ {{\theta _ {m + 1}}{x_{m + 1}} +  \ldots  + {\theta _k}{x_k}|{\theta _j} \ge 0,j = m + 1, \ldots ,k} \\}\\]

总而言之, 多面体可以有很多种表达形式, 而这些描述方式的规模可能相差很大. 考虑一个 \\({\mathbb{R}^n}\\) 上的 \\({l_\infty }\\) 范数单位球:

\\[C = \\{ {x|\| {{x_i}} \| \le 1,i = 1, \ldots ,n} \\}\\]

它可以用 \\(2n\\) 个线性不等式 \\( \pm e_i^Tx \le 1\\) 的交集表示, 也可以用 \\({2^n}\\) 个点的凸包表示 (其中每个点的维度为 \\(n\\), 每个分量的取值是 1 或 -1 ).

### 半正定锥
将所有 \\(n \times n\\) 对称矩阵的集合表示为:

\\[{\mathbb{S}^n} = \\{ {X \in {\mathbb{R}^{n \times n}}|X = {X^T}} \\}\\]

半正定矩阵的集合表示为:

\\[\mathbb{S}_ + ^n = \\{ {X \in {\mathbb{S}^n}|X \succeq 0} \\}\\]

正定矩阵的集合表示为:

\\[\mathbb{S}_{ +  + }^n = \\{ {X \in {\mathbb{S}^n}|X \succ 0} \\}\\]

半正定矩阵是一个凸锥, 正定矩阵是凸集但不是锥 (因为它不包含原点).

<details>
    <summary>证明: 正定矩阵是凸集</summary>
    <p>根据凸集的定义, \(\mathbb{S}_ + ^n\) 是凸的当且仅当对于 \({\theta _ 1},{\theta _ 2} \ge 0\) 和 \(A,B \in \mathbb{S} _ + ^n\), \({\theta _ 1}A + {\theta _ 2}B \in \mathbb{S} _ + ^n\) 成立. 根据半正定矩阵的定义, 它包含原点而且满足锥的放缩条件 (所以是锥), 并且对于任意 \(x \in {\mathbb{R}^n}\) 满足 \({x^T}Ax \ge 0,{x^T}Bx \ge 0\). 所以</p>
    <p>\[{\theta _1}{x^T}Ax + {\theta _2}{x^T}Bx = {x^T}({\theta _1}A + {\theta _2}B)x \ge 0\]</p>
    <p>也就是说 \({\theta _1}A + {\theta _2}B\) 是半正定矩阵, 从而证明 \(\mathbb{S} _ + ^n\) 是凸的.</p>
</details>

{{< figure src="/figures/cvx-1-convex-sets/11-positive-semidefinite-cone.jpg" title="一个 \({\mathbb{S}^2}\) 上的半正定锥: \(x \ge 0,z \ge 0,xz \ge {y^2}\)" >}}
