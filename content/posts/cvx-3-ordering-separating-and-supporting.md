---
title: "凸优化 3 - 关系"
author: "SnowzTail"
date: 2020-01-14T20:08:25Z
math: true
draft: false
categories:
 - Optimization
tags:
 - Convex Optimization
featured_image:
---

这一章介绍集合间的代数与几何关系.

## 正常锥
如果锥 \\(K \subseteq {\mathbb{R}^n}\\) 同时满足

- __凸__: 连接 \\(K\\) 中任意两点的线段完全包含在 \\(K\\) 中
- __闭__: \\(K\\) 包含其中所有点的极限
- __实 (solid)__: \\(K\\) 具有非空内部
- __尖 (pointed)__: \\(K\\) 不包含直线

那么 \\(K\\) 就是一个 __正常锥 (proper cone)__.


## 广义不等式
正常锥可以定义描述集合间代数关系的 __广义不等式 (generalized inequality)__. 类似于 \\(\mathbb{R}\\) 上的 __标准序 (standard ordering)__ 即标准不等式, \\({\mathbb{R}^n}\\) 上的 __偏序 (partial ordering)__ 可以用广义不等式表达为:

\\[x \preceq _ K y \Leftrightarrow y \succeq _ K x \Leftrightarrow y - x \in K\\]

与之对应的严格偏序关系 (严格广义不等式) 为:

\\[x \prec _ K y \Leftrightarrow y \succ _ K x \Leftrightarrow y - x \in {\rm{int}}(K)\\]

广义不等式是 \\(\mathbb{R}\\) 上的不等式推广到 \\({\mathbb{R}^n}\\) 上的情况: 通过判断引入的正常锥 \\(K\\) 是否包含差集 \\(y - x\\), 输出成立 \\(x \preceq _ K y\\) 与不成立 \\(x \npreceq _ K y\\). 这一点十分类似于普通不等式的逻辑: 通过比较 0 是否小于差值 \\(y - x\\), 输出成立 \\(x \le y\\) 与不成立 \\(x \nleq y\\). 包含关系可以与不同的参考集合 \\(K\\) 比较, 而大小关系默认与 0 比较, 所以广义不等式中作为参考的正常锥 \\(K\\) 起决定性作用. 反之, 对于任意的正常锥我们都可以定义与之相关的广义不等式 \\(\preceq _ K\\).

当 \\(K = {\mathbb{R}_ + }\\) (正常锥对应 \\(\mathbb{R}\\) 的正半轴) 时, 偏序关系 \\(\preceq _ K\\) 就是 \\(\mathbb{R}\\) 上的标准序 \\( \le \\), 严格偏序关系 \\(\prec _ K\\) 就是 \\(\mathbb{R}\\) 上的严格序 \\( < \\).

- 非负象限和分量不等式

    非负象限 \\(\mathbb{R}_ + ^n\\) 是一个正常锥, 对应的广义不等式等价于向量间的分量不等式. 对于 \\(i = 1, \ldots ,n\\):

    \\[x \preceq _ {K = \mathbb{R} _ + ^n} y \Leftrightarrow {x_i} \le {y_i}\\]
    \\[x \prec _ {K = \mathbb{R} _ + ^n} y \Leftrightarrow {x_i} < {y_i}\\]

    由于我们常常需要判断向量分量的大小关系 (也就是比较对应非负象限的偏序关系), 下标 \\(\mathbb{R}_ + ^n\\) 有时被省略. 也就是说, 当比较对象为向量时, 单纯的 \\(\preceq \\) 和 \\(\prec \\) 表示分量不等式.

- 半正定锥和矩阵不等式

    半正定锥 \\(\mathbb{S}_ + ^n\\) 是一个正常锥, 对应的广义不等式等价于矩阵间的 (半) 正定不等式 (表示差矩阵是否 (半) 正定):

    \\[X \preceq _ {K = \mathbb{S} _ + ^n} Y \Leftrightarrow Y - X \subseteq \mathbb{S}_ + ^n\\]
    \\[X \prec _ {K = \mathbb{S} _ + ^n} Y \Leftrightarrow Y - X \subseteq \mathbb{S}_{ +  + }^n\\]

    由于我们常常需要判断矩阵的 (半) 正定性 (也就是比较对应半正定锥的偏序关系), 下标 \\(\mathbb{S}_ + ^n\\) 有时被省略. 也就是说, 当比较对象为矩阵时, 单纯的 \\(X \preceq Y\\) 和 \\(X \prec Y\\) 表示 \\(Y - X\\) 为 (半) 正定矩阵; \\(X \succeq 0\\) 和 \\(X \succ 0\\) 表示 \\(X\\) 为 (半) 正定矩阵.

偏序 \\(\preceq _ K\\) 满足一些性质:

- 对于加法保序: \\(x \preceq _ K y,u \preceq _ K v \Rightarrow x + u \preceq _ K y + v\\)
- 对于数乘保序: \\(x \preceq _ K y,\alpha \ge 0 \Rightarrow \alpha x \preceq _ K \alpha y\\)
- 对于极限保序: 如果 \\({x_i} \preceq _ K {y_i},i = 1,2, \ldots \\), 而且 \\({\lim _{i \to \infty }}{x_i} = x,{\lim _{i \to \infty }}{y_i} = y\\), 那么 \\(x \preceq _ K y\\)
- 反对称: \\(x \preceq _ K y,y \preceq _ K x \Rightarrow x = y\\)
- 传递性: \\(x \preceq _ K y,y \preceq _ K z \Rightarrow x \preceq _ K z\\)
- 自反性: \\(x \preceq _ K x\\)

## 最小与极小元
标准不等式 \\( \le \\) 的一个特点是, 作为 \\(\mathbb{R}\\) 上的 __线性序 (linear ordering)__, 任何两点都是 __可比(comparable)__ 的 (即标量 \\(x \le y,y \le x\\) 至少有一个成立). 相比而言, 广义不等式 \\(\preceq _ K\\) 不满足这样的结论. 我们基于可比性定义集合的最小元与极小元:

### 最小元
如果对于每个 \\(y \in S\\) 都满足 \\(x \preceq _ K y\\), 那么称 \\(x \in S\\) 是集合 \\(S\\) (关于广义不等式 \\(\preceq _ K\\) 的) __最小元 (minimum)__. 换句话说, 集合 \\(S\\) 中的所有元素与 \\(x\\) 相比时都不小于它. 注意这句话包含了三个信息:

- \\(S\\) 中的所有元素与 \\(x\\) 都可以比较
- \\(S\\) 中的任意元素都不小于 \\(x\\)
- \\(S\\) 中的最小元唯一

用集合语言来说, 元素 \\(x \in S\\) 是集合 \\(S\\) 的最小元, 当且仅当

\\[S \subseteq x + K\\]

其中 \\(x + K\\) 表示与 \\(x\\) 可比且 (根据广义不等式 \\(\preceq _ K\\) ) 大于等于 \\(x\\) 的所有元素的集合. \\(S\\) 包含于这个集合.

### 极小元
如果由 \\(y \in S\\), \\(y \preceq _ K x\\) 可以推出 \\(y = x\\), 那么称 \\(x \in S\\) 是集合 \\(S\\) (关于广义不等式 \\(\preceq _ K\\) 的) __极小元 (minimal)__. 也就是说, 如果在集合 \\(S\\) 中与 \\(x\\) 可比的元素构成的子集中, \\(x\\) 是最小的元素 (也就是这个子集的最小元), 那么 \\(x\\) 是集合 \\(S\\) 的极小元. 这句话也包含了三个信息:

- \\(S\\) 中某些元素与 \\(x\\) 不可比
- \\(S\\) 找不到比 \\(x\\) 更小的元素
- \\(S\\) 中的极小元不唯一

用集合语言来说, 元素 \\(x \in S\\) 是集合 \\(S\\) 的最小元, 当且仅当

\\[(x - K) \cap S = \{ x\} \\]

其中 \\(x - K\\) 表示与 \\(x\\) 可比且 (根据广义不等式 \\(\preceq _ K\\) ) 小于等于 \\(x\\) 的所有元素的集合. \\(S\\) 与这个集合的唯一交集就是极小元 \\(x\\).

对于 \\(K = {\mathbb{R}_ + }\\) (对应\\(\mathbb{R}\\) 上的线性序), 最小与极小的概念一致, 也符合集合最小元素的定义.

- _\\({\mathbb{R}^2}\\) 上的分量不等式与几何描述_

    广义不等式 \\(x \preceq y\\) 表示 \\(y\\) 的每个分量都大于 \\(x\\) 的对应分量, 在 \\({\mathbb{R}^2}\\) 上体现为 \\(y\\) 同时位于 \\(x\\) 的右方和上方. \\(x\\) 是集合 \\(S\\) 的最小元表示 \\(S\\) 中所有其他点都在 \\(x\\) 的 (同时) 右上方; \\(x\\) 是集合 \\(S\\) 的极小元表示 \\(S\\) 中没有其他点在 \\(x\\) 的 (同时) 左下方, 虽然某些点可能在 \\(x\\) 的左方或下方 (但不是同时).

    {{< figure src="/figures/cvx-3-ordering-separating-and-supporting/1-minimum-vs-minimal-in-r2.jpg" title="\({x_1}\) 是 \({S_1}\) 的最小元, 因为 \(S_1 \subseteq x_1 + K\) (后者为浅色阴影); \({x_2}\) 和它所在的边都是 \({S_2}\) 的极小元, 因为 \((x_2 - K) \cap S_2 = \{ x_2\} \) (前者为浅色阴影)" >}}

- 对称矩阵集合中的最小元和极小元

    用 \\(A \in S_{ +  + }^n\\) 表示一个圆心在原点的椭圆

    \\[{\mathcal{E}_A} = \\{ {x|{x^T}{A^{ - 1}}x \le 1} \\}\\]

    可知 \\(A \le B \Leftrightarrow {\mathcal{E}_A} \subseteq {\mathcal{E}_B}\\). 对于点 \\({v_1}, \ldots {v_k} \in {\mathbb{R}^n}\\), 定义包含这些点的椭圆的集合

    \\[S = \\{ {P \in \mathbb{S}_{ +  + }^n|v_i^T{P^{ - 1}}{v_i} \le 1,i = 1, \ldots k} \\}\\]

    集合 \\(S\\) 没有最小元, 因为对于任意一个包含 \\({v_1}, \ldots {v_k}\\) 的椭圆, 都可以找到另一个包含这些点但不可比 (相互包含) 的椭圆. 一个椭圆是极小的, 当且仅当它包含这些点但没有更小 (完全被它包含) 的椭圆也包含这些点.

    {{< figure src="/figures/cvx-3-ordering-separating-and-supporting/2-minimum-vs-minimal-in-symmetric-matrices.jpg" title="\({\mathcal{E} _ 1},{\mathcal{E} _ 3}\) 不是极小的, 因为存在包含这些点且比它们小的椭球; \(\mathcal{E} _ 2\) 是极小的, 因为不存在包含这些点且被它包含的椭球" >}}

## 分离与支撑超平面
这一节我们关注凸集之间的位置关系. 对于两个不相交的凸集, 我们总能找到某个超平面 (或者仿射函数) 将它们分离, 这就是 __超平面分离定理 (separating hyperplane theorem)__. 严格的叙述如下: 假设对于凸集 \\(C\\) 和 \\(D\\) 有 \\(C \cap D = \emptyset \\), 那么存在 \\(a \ne 0\\) 和 \\(b\\) 满足对于所有 \\(x \in C\\) 有 \\({a^T}x \le b\\), 对于所有 \\(x \in D\\) 有 \\({a^T}x \ge b\\). 这个描述等价于仿射函数 \\({a^T}x - b\\) 在 \\(C\\) 中非正, 而在 \\(D\\) 中非负. 超平面 \\({a^T}x = b\\) 称为集合 \\(C\\) 和 \\(D\\) 的 __分离超平面 (separating hyperplane)__.

{{< figure src="/figures/cvx-3-ordering-separating-and-supporting/3-separating-hyperplane.jpg" title="超平面分离了两个不相交的凸集 \(C\) 和 \(D\)" >}}

- 仿射集与凸集的分离

    对于不相交的凸集 \\(C\\) 和仿射集 \\(D = \\{ {Fu + g|F \in {\mathbb{R}^{n \times m}},u \in {\mathbb{R}^m}} \\}\\), 根据超平面分离定理存在 \\(a \ne 0\\) 和 \\(b\\) 满足 \\({a^T}x \ge b\\) 对于所有 \\(x \in D\\) 都成立. 由此可知, 对于任意 \\({u \in {\mathbb{R}^m}}\\) 都有 \\({a^T}(Fu + g) \ge b \Rightarrow {a^T}Fu \ge b - {a^T}g\\). 注意不等式左侧是关于 \\(u\\) 的线性函数, 而线性函数在 \\({{\mathbb{R}^m}}\\) 上有 (下) 界当且仅当这个函数为 0. 因此, 对于任何 \\({u \in {\mathbb{R}^m}}\\) 有 \\({a^T}Fu = 0 \Rightarrow {a^T}F = 0 \Rightarrow b \le {a^T}g\\). 综上所述, 存在 \\(a \ne 0\\) 使得 \\({a^T}F = 0\\) 和 \\({a^T}x \le {a^T}g\\) 对于所有 \\(x \in C\\) 都成立, 也就是说存在超平面平行于仿射集且分离仿射集与凸集.

## 对偶
__对偶 (dual)__ 在优化领域是一个有趣且重要的关系. 对于向量, 集合, 运算, 甚至是优化问题, 我们都可以找到与之一一对应的对偶对象.

### 对偶范数
__对偶范数 (dual norm)__ 是对于范数而言的对偶, 其本质也是一个范数. 首先定义 __算子范数 (operator norm)__: 对于 \\(\mathbb{R}^m\\) 和 \\(\mathbb{R}^n\\) 上的范数 \\(\lVert\cdot\rVert_a\\) 和 \\(\lVert\cdot\rVert_a\\), 定义在 \\(\mathbb{R}^{m \times n}\\) 上的算子范数

\\[\lVert X \rVert_{a,b} = \mathrm{sup}\\{\lVert Xu \rVert_a | \lVert u \rVert_b \le 1\\}\\]

__谱范数 (spectral norm)__ 是两个 Euclidean 范数的算子范数, 定义为 \\(\mathbb{R}^{n \times n}\\) 上矩阵的最大奇异值

\\[\lVert X \rVert_2 = \mathrm{sup}\\{\lVert Xu \rVert_2 | \lVert u \rVert_2 \le 1\\} = \sigma _ {\mathrm{max}}(X)\\]

当 \\(u\\) 取 \\(X\\) 的最大特征向量时目标取到上界 \\(\sigma _ {\mathrm{max}}(X)\\).

我们知道所有 \\(\mathbb{R}^n\\) 上所有的范数都是等价的 (因为它们可以用来定义相同的开集和收敛序列). 考虑任意一个 \\(\mathbb{R}^n\\) 上的范数 \\(\lVert\cdot\rVert\\), 它的对偶范数 \\(\lVert\cdot\rVert_*\\) 定义为

\\[\lVert z \rVert_* = \mathrm{sup}\\{z^Tx|\lVert x \rVert \le 1\\} = \mathrm{sup} _ {x \ne 0} \frac{z^Tx}{\lVert x \rVert}\\]

它测量 \\(z\\) 作为一个线性变换的影响, 表示变换结果 \\(z^Tx\\) 相比与原范数 \\(\lVert x \rVert\\) 的最大比值. 由定义可知,不等式 \\(z^Tx \le \lVert x \rVert \lVert z \rVert_*\\) 对于所有的 \\(z,x\\) 都成立, 且存在 \\(x\\) 使等式成立. 对偶范数的对偶是原范数: \\(\lVert z \rVert _{**} = \lVert z \rVert\\).

- l1-范数的对偶

    \\(l _ 1\\)-范数的对偶是 \\(l _ \infty\\)-范数. 由对偶范数的定义, \\(\lVert z \rVert _ {1,* } = \mathrm{sup}\\{z^Tx | \lVert x \rVert _ 1 \le 1\\} = \mathrm{max}\\{\lvert z_1 \rvert, \dots, \lvert z_n \rvert\\} = \lVert z \rVert _ \infty\\).

- l2-范数的对偶

    在 \\(\mathbb{R}^n\\) 上的 \\(l _ 2\\)-范数 (Euclidean 范数) 的对偶是它本身. 由 Cauchy–Schwarz 不等式可知, \\(\lVert z \rVert _ {2,*} = \mathrm{sup} _ {x \ne 0} z^Tx/\lVert x \rVert_2 = \lVert z \rVert_2\\).

    在 \\(\mathbb{R}^{m \times n}\\) 上的 \\(l _ 2\\)-范数 (谱范数) 的对偶是核范数. 其中, __核范数 (nuclear norm)__ 定义为矩阵的奇异值之和. 根据对偶范数的定义, \\(\lVert Z \rVert _ {2,* } = \mathrm{sup}\\{\mathrm{tr}(Z^TX) | \lVert X \rVert _ 2 \le 1\\}\\), 其中 \\(\lVert X \rVert _ 2 \le 1 \Rightarrow \sigma _ {\mathrm{max}}(X) \le 1 \Rightarrow \sigma _ 1(X), \dots, \sigma _ r(X) = 1\\), 所以 \\(\lVert Z \rVert _ {2, *} = \sigma _ 1(Z) + \dots + \sigma _ r(Z)\\).

- lp-范数的对偶

    \\(l _ p\\)-范数的对偶是 \\(l _ q\\)-范数, 其中 \\(q\\) 满足 \\(1/p + 1/q = 1\\).

### 对偶锥
对于一个锥 \\(K\\), 集合

\\[{K^*} = \\{y | {x^T}y \ge 0, \forall x \in K\\}\\]

是它的 __对偶锥 (dual cone)__. \\(K^*\\) 由 \\(x\\) 的对偶向量 \\(y\\) 构成, 这里的对偶指 \\(x\\) 和 \\(y\\) 的夹角不超过 90 度. 每个 \\(y\\) 都可以看作是一个超平面的内法向量, 对偶锥是这些超平面的交集.

{{< figure src="/figures/cvx-3-ordering-separating-and-supporting/4-dual-cone.jpg" title="锥 \(K\) 和它的对偶锥 \(K^*\)" >}}

- 子空间的对偶锥

    子空间 \\(V \subseteq \mathbb{R}^n\\) 的对偶锥是它的正交补 \\(V^\perp = \\{y | {y^T}v = 0, \forall v \in V\\} \\).

    <details>
        <summary>证明: 子空间的对偶锥是它的正交补</summary>
        <p>由 \(V^\perp = \\{y | {y^T}v = 0, \forall v \in V\\} \) 和 \(V^* = \\{y | {y^T}v \ge 0, \forall v \in V\\} \) 可知 \({V^\perp} \subseteq {V^*}\).</p>
        <p>由子空间定义可知, 如果 \(v \in V\), 那么 \(-v \in V\). \(V^* = \\{y | {y^T}v \ge 0, \forall v \in V\\} \Rightarrow {y^T}v \ge 0, {y^T}(-v) \ge 0 \Rightarrow {y^T}v = 0, \forall v \in V\).</p>
        <p>所以 \(V^* = V^\perp\).</p>
    </details>

- 范数锥的对偶锥

    [范数锥](https://snowztail.com/cvx-1-convex-sets/#%E8%8C%83%E6%95%B0%E7%90%83%E5%92%8C%E8%8C%83%E6%95%B0%E9%94%A5) 的对偶是由对偶范数定义的锥

    \\[K^* = \\{(u,v) \in \mathbb{R}^{n+1} | \lVert u \rVert_* \le v\\}\\]


如果一个锥的对偶是它本身, 那么这个锥是 __自对偶 (self dual)__ 的. 以下是两个例子:

- 非负象限 \\(\mathbb{R}^n_+\\): \\({y^T}x \ge 0, \forall x \succeq 0 \Leftrightarrow y \succeq 0\\).

- 半正定锥 \\(\mathbb{S}^n_+\\): \\(\text{Tr}(XY) \ge 0, \forall x \succeq 0 \Leftrightarrow y \succeq 0\\).

对偶锥 \\(K^*\\) 满足以下性质:

- \\(K^*\\) 是闭凸集
- 由 \\(K_1 \subseteq K_2\\\) 可知 \\(K_2^* \subseteq K_1^*\\\)
- 如果 \\(K\\) 具有非空内部, 那么 \\(K^*\\) 是尖的
- 如果 \\(K\\) 的闭包是尖的, 那么 \\(K^*\\) 具有非空内部
- \\(K^{**}\\) 是 \\(K\\) 的 [凸包](https://snowztail.com/cvx-1-convex-sets/#%E5%87%B8%E5%8C%85) 的 [闭包](https://snowztail.com/cvx-1-convex-sets/#%E5%86%85%E9%83%A8%E4%B8%8E%E7%9B%B8%E5%AF%B9%E5%86%85%E9%83%A8)
- 如果 \\(K\\) 是闭凸集, 那么 \\(K^{**} = K\\)
- 如果 \\(K\\) 是正常锥, 那么 \\(K^*\\) 也是正常锥, 并且 \\(K^{**} = K\\)

### 对偶广义不等式
__对偶广义不等式 (dual generalized inequality)__ 是广义不等式的对偶. 因为广义不等式 \\(\preceq _ K\\) 由正常锥 \\(K\\) 定义, 并且 \\(K^* \\) 也是正常锥, 所以根据 \\(K^* \\) 也可以定义一个广义不等式 \\(\preceq _ {K^*} \\) 作为原广义不等式的对偶. 以下是两个重要的性质:

- \\(x \preceq _ K y\\\) 当且仅当 \\(\lambda^Tx \le \lambda^Ty\\) 对于所有 \\(\lambda \succeq _{K^*} 0\\) 都成立
- \\(x \prec _ K y\\\) 当且仅当 \\(\lambda^Tx < \lambda^Ty\\) 对于所有 \\(\lambda \succeq _{K^*} 0, \lambda \ne 0\\) 都成立

其中 \\(\lambda \succeq _{K^* } 0\\) 表示 \\(\lambda \in K^* \\). 根据对偶原理可以得出以下结论:

- \\(\lambda \preceq _ {K^*} \mu\\) 当且仅当 \\(\lambda^Tx \le \mu^Tx\\) 对于所有 \\(x \succeq _K 0\\) 都成立
- \\(\lambda \prec _ {K^*} \mu\\) 当且仅当 \\(\lambda^Tx < \mu^Tx\\) 对于所有 \\(x \succeq _K 0, x \ne 0\\) 都成立

对偶广义不等式可以将一个偏序问题转化为满足一个偏序条件的全序问题.

### Farkas 引理和择一定理
__Farkas 引理 (Farkas' lemma)__ 是一个线性不等式组的可解性定理. 对于给定的矩阵 \\(A \in \mathbb{C}^{m \times n}\\) 和向量 \\(b \in \mathbb{C}^m\\), 下列两个方程组有且只有一个有解:

\\[Ax = b, \quad x \succeq 0 \tag{1a}\\]
\\[A^Ty \succeq 0, \quad b^Ty < 0 \tag{1b}\\]

从几何意义上看, Farkas 引理描述的是点和凸锥的位置关系 -- 点在锥内或边界 (1a) 和点在锥外 (1b). 我们知道矩阵 \\(A\\) 的行可以 [张成一个凸锥](https://snowztail.com/cvx-1-convex-sets/#%E5%A4%9A%E9%9D%A2%E4%BD%93) \\(K = \\{x \in \mathbb{R}^n | Ax \succeq 0\\}\\), 那么

- 如果 \\(b\\) 在锥内或边界, 则 \\(b\\) 可以由 \\(A\\) 的行线性表示, 且由锥的定义可知其中系数 \\(x\\) 非负
- 如果 \\(b\\) 在锥外, 由 [超平面分离定理](https://snowztail.com/cvx-3-ordering-separating-and-supporting/#%E5%88%86%E7%A6%BB%E4%B8%8E%E6%94%AF%E6%92%91%E8%B6%85%E5%B9%B3%E9%9D%A2) 可知, 存在过原点的平面 \\(y\\) 将凸锥 \\(A\\) 和锥外一点 \\(b\\) 分开

__择一定理 (theorem of alternative)__ 指在多个系统中有且只有一个有解. Farkas 引理是择一定理的一个例子, 其中的两个系统由广义线性不等式约束. Farkas 引理的一个变体是:

\\[Ax \prec b \tag{2a}\\]
\\[A^T\lambda = 0, \quad \lambda^Tb \le 0, \quad \lambda \ne 0, \quad \lambda \succeq 0 \tag{2b}\\]

<details>
    <summary>证明: 广义不等式的择一定理</summary>
    <p>我们知道 (2a) 等价于 \(0 \preceq _ {\mathbb{R} _ {++}^m} b - Ax\), 那么如果 (2a) 不成立, \(C = \\{b - Ax | x \in \mathbb{R}^n\\}\) 和 \(D = \mathbb{R} _ {++}^m = \\{y \in \mathbb{R}^m | y \succ 0\\}\) 没有交集. 根据超平面分离定理, 存在一个由 \(\lambda \in \mathbb{R}^m, \lambda \ne 0\) 和 \(\mu \in \mathbb{R}\) 定义的超平面使得</p>
    \[\lambda^Ty \le \mu, \forall y \in C, \quad \lambda^Ty \ge \mu, \forall y \in D\]
    <p>这个结论可以进一步简化:</p>
    <ul>
        <li>前者即 \(\lambda^T(b - Ax) \le \mu, \forall x \in \mathbb{R}^n\). 因为线性函数在 \({{\mathbb{R}^m}}\) 上有 (上) 界当且仅当这个函数为 0, 可知 \(\lambda^TA = 0\) 且 \(\lambda^Tb \le \mu\)</li>
        <li>后者即 \(\lambda^Ty \ge \mu, \forall y \succ 0\). 它在 \(\lambda \succeq 0, \lambda \ne 0\) 和 \(\mu \le 0\) 时成立</li>
    </ul>
    <p>所以, 如果 (2a) 不成立, 取 \(\mu = 0\) 就可以推出 (2b). 反过来, 如果 (2b) 成立, 假设 (2a) 也成立, 那么由 \(\lambda \ne 0, \lambda \succeq 0\) 和 \(b - Ax \succ 0\) 可知 \(\lambda^T(b - Ax) > 0\). 又因为 \(A^T\lambda = 0\), 所以推出 \(\lambda^Tb > 0\), 与 (2b) 的 \(\lambda^Tb \le 0\) 矛盾. 所以, (2a) 和 (2b) 是一对择一不等式组.</p>
</details>

它也可以推广到一般广义不等式的情况:

\\[Ax \prec _ K b \tag{3a}\\]
\\[A^T\lambda = 0, \quad \lambda^Tb \le 0, \quad \lambda \ne 0, \quad \lambda \succeq _ {K^*} 0 \tag{3b}\\]

<details>
    <summary>证明: 一般广义不等式的择一定理</summary>
    <p>如果 (3a) 不成立, \(C = \{b - Ax | x \in \mathbb{R}^n\}\) 和 \(D = \mathrm{int}(K)\) 没有交集. 根据超平面分离定理, 存在一个由 \(\lambda \in \mathbb{R}^m, \lambda \ne 0\) 和 \(\mu \in \mathbb{R}\) 定义的超平面使得</p>
    \(\lambda^Ty \le \mu, \forall y \in C\) 和 \(\lambda^Ty \ge \mu, \forall y \in D\).
    <ul>
        <li>由前者可知 \(\lambda^TA = 0\) 且 \(\lambda^Tb \le \mu\)</li>
        <li>后者即 \(\lambda^Ty \ge \mu, \forall y \in \mathrm{int}(K)\). 它在 \(\lambda \in K^ *, \lambda \ne 0\) 和 \(\mu \le 0\) 时成立.</li>
    </ul>
    <p>所以, 如果 (3a) 不成立, 取 \(\mu = 0\) 就可以推出 (3b). 反过来, 假设 (3a) (3b) 同时成立, 由 \(\lambda \ne 0, \lambda \succeq _ {K^ *} 0\) 和 \(b - Ax \succ _ K 0\) 可知 \(\lambda^T(b - Ax) > 0\). 又因为 \(A^T\lambda = 0\), 所以推出 \(\lambda^Tb > 0\), 与 \(\lambda^Tb \le 0\) 矛盾. 所以, (3a) 和 (3b) 是一对择一不等式组.</p>
</details>
