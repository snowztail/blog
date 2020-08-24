---
title: "数据处理 1 - 稀疏回归和贪心算法"
author: "SnowzTail"
date: 2020-05-09T00:37:42Z
math: true
draft: false
categories:
 - Data Processing
tags:
 - Data Processing
featured_image:
---

## 稀疏回归

__稀疏回归 (sparse regression)__ 是一种通过求解欠定方程的稀疏解从训练样本 \\(x\\) 和结果 \\(y\\) 中找出它们的对应关系 \\(f\\), 使得

\\[y_i \approx f(x_i), \quad x_i \in \mathbb{R}^n, i = 1,\dots,m\\]

其中 \\(n\\) 为参数的个数, \\(m\\) 为样本数. [Netflix 问题](https://en.wikipedia.org/wiki/Netflix_Prize) 是一个著名的例子:

<blockquote cite="Netflix 问题">
如何根据用户对某些电影的评分, 在没有任何其他信息的情况下, 来预测这些用户对其他电影的评分?
</blockquote>


其中 \\(n\\) 是所有电影的数量, \\(m\\) 是用户评分的数量 -- 样本数远少于参数的个数, 构成了一个欠定方程 (\\(m < n\\)). 此外, 在高维空间的数据分析会出现 __维数灾难 (curse of dimensionality)__:

- 计算复杂度指数增加 \\(\mathcal{O}(m^n)\\)
- 数据内在问题
    * 样本点孤立

        考虑以下问题: 在 \\(n\\) 维空间内, 要满足对于任意一个测试样本都有一个和它距离 1 以内的训练样本, 需要多少个训练样本?

        它等价于用单位球填满超空间 \\([0, 1]^n \subset \bigcup_{i=1}^m B_n(\boldsymbol{x}^{(i)}, 1)\\) 所需单位球的数量

        \\[m \ge \frac{\Gamma(n/2+1)}{\pi^{n/2}}\\]

        下表是一些例子:

        <center>

        | \\(n\\) | \\(20\\) |      \\(50\\)     |     \\(100\\)     |
        |:-------:|:--------:|:-----------------:|:-----------------:|
        | \\(m\\) | \\(39\\) | \\(5.7×10^{12}\\) | \\(4.2×10^{39}\\) |

        </center>

    * 伪结构

        对于 \\(\boldsymbol{x}^{(1)},\dots,\boldsymbol{x}^{(m)} \in \mathbb{R}^n\\) 满足 \\(\boldsymbol{x}^{(i)} \sim \mathcal{N}(0,\boldsymbol{I})\\), 它的经验协方差矩阵是

        \\[\boldsymbol{\Sigma}^\hat = \frac{1}{m} \sum_{i=1}^m \boldsymbol{x}^{(i)}\boldsymbol{x}^{(i)T}\\]

        根据大数定律可知 \\(\boldsymbol{\Sigma}^\hat \to \boldsymbol{I}\\) 仅当 \\(m \gg n\\) 时成立.

        {{< figure src="/figures/dp-1-sparse-regression-and-greedy-algorithms/1-empirical-covariance-identity.png" title="\(m = 10^5, n = 200\; (m \gg n)\) 时, 经验协方差矩阵的特征值分布" >}}
        {{< figure src="/figures/dp-1-sparse-regression-and-greedy-algorithms/2-empirical-covariance-biased.png" title="\(m = 10^4, n = 2000\; (m \gtrapprox n)\) 时, 经验协方差矩阵的特征值分布" >}}

    * 过拟合

        对于 \\(m\\) 个样本点, 我们知道存在一个 \\(m - 1\\) 次多项式完全拟合数据. 然而高次多项式存在过拟合放大噪声的情况, 不具有一般性.

        {{< figure src="/figures/dp-1-sparse-regression-and-greedy-algorithms/3-polynomial-overfitting.png" title="使用 \(39\) 次多项式拟合 \(40\) 个样本点" >}}
        {{< figure src="/figures/dp-1-sparse-regression-and-greedy-algorithms/4-polynomial-overfitting-zoomed-in.png" title="放大之后的 \(f(x)\)" >}}

        通过保留其中的低次项系数得到一个稀疏的 \\(f\\), 也可以大致描述 \\(x\\) 和 \\(y\\) 的关系:

        {{< figure src="/figures/dp-1-sparse-regression-and-greedy-algorithms/5-sparse-fitting.png" title="使用 \(4\) 次多项式拟合 \(40\) 个样本点" >}}

我们知道压缩图片算法是通过离散余弦变换或小波变换获取对应域内的系数并丢弃其中无关紧要的部分. 在函数拟合中, 也假设存在某种变换使得未知函数可以由几个 __核心 (kernel)__ 来近似表示. 稀疏回归的本质就是在给定精度要求下, 找出这些核心来拟合原函数.

### 稀疏信号和可压缩信号
信号 \\(\boldsymbol{x} \in \mathbb{R}^n\\) 称为 __稀疏信号 (sparse signal)__, 如果它的非零元素的个数 \\(S\\) 满足 \\(S \ll n\\). \\(\boldsymbol{x}\\) 的 __稀疏度__ 为 \\(S\\) (\\(S\\)-sparse).

{{< figure src="/figures/dp-1-sparse-regression-and-greedy-algorithms/6-sparse-signals.png" title="很多信号可以通过某种变换成为稀疏信号, \(B\) 是变换或字典矩阵" >}}

如果一个信号可以由稀疏度为 \\(S\\) 的稀疏信号近似表示, 那么称这个信号为 __可压缩信号 (compressible signal)__.

{{< figure src="/figures/dp-1-sparse-regression-and-greedy-algorithms/7-compressible-signal.png" title="信号幅值和稀疏度: 蓝色是可压缩信号, 红色是稀疏信号" >}}

假设样本 \\(\boldsymbol{y} \in \mathbb{R}^{m}\\) 和词典 \\(\boldsymbol{A} \in \mathbb{R}^{m \times n}\\) 已知, 我们希望获取稀疏信号 \\(\boldsymbol{x} \in \mathbb{R}^{n}\\) 满足 \\(\boldsymbol{y} \approx \boldsymbol{A}\boldsymbol{x}\\). 当 \\(m < n\\) 时 \\(\boldsymbol{x}\\) 有无数个解, 求其中的稀疏解等价于以下两个问题:

- 求解非零元素的位置
- 求解非零元素的值

### 一些定义
__\\(l _ 0\\) 伪范数 (pseudo norm)__ 定义为 \\(\boldsymbol{x} \in \mathbb{R}^n\\) 的非零元素个数:

\\[\lVert\boldsymbol{x}\rVert _ 0 =  \verb|#| (i|x _ i \ne 0)\\]

\\(l _ 0\\) 是一个伪范数, 因为它不满足范数的 [绝对可延展性](https://en.wikipedia.org/wiki/Norm_(mathematics)#Definition): \\(\lVert\lambda\boldsymbol{x}\rVert _ 0 \ne \lvert\lambda\rvert\lVert\boldsymbol{x}\rVert _ 0\\). \\(l _ 0\\) 伪范数是一个不连续的非凸运算.

<details>
    <summary>证明: \(l _ 0\) 伪范数的不连续性和非凸性</summary>
    <p>令 \(\boldsymbol{e_1}=[1,0,\dots,0]^T\), \(\boldsymbol{e_2}=[0,1,\dots,0]^T\).</p>
    <ul>
        <li>不连续性: 由于 \(\lVert\boldsymbol{e_1}\rVert_0 = 1\), 但对于任意小的 \(\epsilon\) 都有 \(\lVert\boldsymbol{e_1} + \epsilon\boldsymbol{e}_2\rVert_0 = 2\)</li>
        <li>非凸性: \(\lVert\lambda\boldsymbol{e_1}+(1-\lambda)\boldsymbol{e_2}\rVert_0 = 2 > \lambda\lVert\boldsymbol{e_1}\rVert _ 0+(1-\lambda)\lVert\boldsymbol{e_2}\rVert_0 = \lambda + (1 - \lambda) = 1\)</li>
    </ul>
</details>

__支撑集 (support set)__ 定义为 \\(\boldsymbol{x} \in \\) 非零元素的位置 (维度) 的集合:

\\[\mathrm{supp}(\boldsymbol{x}) = \\{i:x _ i \ne 0\\}\\]

令 \\(\mathcal{I} = \mathrm{supp}(\boldsymbol{x})\\), \\(\boldsymbol{A} _ \mathcal{I}\\) 为由 \\(\boldsymbol{A}\\) 的列 \\(\mathcal{I}\\) 组成的矩阵, \\(\boldsymbol{x} _ \mathcal{I}\\) 为由 \\(\boldsymbol{x}\\) 的元素 \\(\mathcal{I}\\) 组成的向量, 那么

\\[\boldsymbol{y}=\boldsymbol{A}\boldsymbol{x}=\boldsymbol{A} _ \mathcal{I}\boldsymbol{x} _ \mathcal{I}\\]

{{< figure src="/figures/dp-1-sparse-regression-and-greedy-algorithms/8-truncation.png" title="样本完全取决与非零元素" >}}

__互相关 (mutual coherence)__ 指矩阵 \\(\boldsymbol{A} \in \mathbb{R}^{m \times n}\\) 任意两列的最大相关系数的幅值:

\\[\mu(\boldsymbol{A}) = \max _ {i \ne j} \frac{\lvert \langle \boldsymbol{a} _ i, \boldsymbol{a} _ j \rangle \rvert}{\lVert \boldsymbol{a} _ i \rVert _ 2 \lVert \boldsymbol{a} _ j \rVert _ 2}\\]

如果 \\(\lVert \boldsymbol{a} _ i \rVert _ 2 = 1, \forall i \in [n]\\), 那么 \\(\mu(\boldsymbol{A}) = \max _ {i \ne j} {\lvert \langle \boldsymbol{a} _ i, \boldsymbol{a} _ j \rangle \rvert}\\). 互相关用来衡量特征 (维度) 的独立性.

__硬阈值函数 (hard thresholding function)__ 保留原向量幅值最大的 \\(S\\) 个元素, 并且把其他元素置零:

\\[\lbrack H _ S (\boldsymbol{x}) \rbrack _ i =
\begin{cases}
    x _ i, & i \in \mathcal{I}\newline
    0,     & i \notin \mathcal{I}
\end{cases}
\\]

其中 \\(\mathcal{I}\\) 是对应的支撑集. 由定义可知 \\(\mathrm{supp}(H _ 1(\boldsymbol{A}^T\boldsymbol{y})) = \arg \max _ i \lvert \langle \boldsymbol{y}, \boldsymbol{a} _ i \rangle \rvert\\).

### 优化问题和稀疏解
我们知道最小二乘优化问题

\\[\min _ \boldsymbol{x} \lVert\boldsymbol{x}\rVert _ 2, \quad \mathrm{s.t.}\  \boldsymbol{y} = \boldsymbol{A}\boldsymbol{x}\\]

的解是

\\[\hat{\boldsymbol{x}} = \boldsymbol{A}^{\dagger} \boldsymbol{y}\\]

最小二乘法的解虽然是闭式解, 但不满足稀疏条件. 相比之下, 获取稀疏解要求解优化问题

\\[\min _ \boldsymbol{x} \lVert\boldsymbol{x}\rVert _ 0, \quad \mathrm{s.t.}\  \boldsymbol{y} = \boldsymbol{A}\boldsymbol{x}\\]

在有噪声的情况下, 这个问题变成

\\[\min _ \boldsymbol{x} \lVert\boldsymbol{x}\rVert _ 0, \quad \mathrm{s.t.}\  \lVert\boldsymbol{y} - \boldsymbol{A}\boldsymbol{x}\rVert_2 \le \epsilon \label{1}\tag{1}\\]

写成无约束优化问题就是

\\[\min _ \boldsymbol{x} \frac{1}{2} \lVert\boldsymbol{y} - \boldsymbol{A}\boldsymbol{x}\rVert_2^2 + \lambda\lVert\boldsymbol{x}\rVert _ 0 \label{2}\tag{2}\\]

其中 \\(\lambda\\) 表示稀疏度的权重

- \\(\lambda \to 0 \Rightarrow \boldsymbol{y} = \boldsymbol{A}\boldsymbol{x}\\)&emsp;(保持数据一致性)
- \\(\lambda \to \infty \Rightarrow \boldsymbol{x} = \boldsymbol{0}\\)&emsp;(稀疏度最低)

解决非凸问题 (\ref{1}) 往往需要穷举法: 对于 \\(s = 1,\dots,S\\), 遍历所有满足 \\(\forall \lvert\mathcal{I}\rvert = s\\) 的 \\(\mathcal{I}\\), 复杂度是 \\(\mathcal{O}(n^S)\\). 那么有没有其他方法获得稀疏解呢?

## 贪心算法
__贪心算法 (greedy algorithm)__ 是一类 __[启发式 (heuristic)](https://en.wikipedia.org/wiki/Heuristic)__ 算法, 它在每个阶段作出快速的局部最优选择, 并且期待据此能够得到全局最优解. 贪心算法在大多数问题中并不能够保证全局最优, 但是可以在短时间内得到一些比较好的解来逼近最优解.

对于方程 \\(\boldsymbol{y} = \boldsymbol{A}\boldsymbol{x}\\) 中的字典矩阵 \\(\boldsymbol{A}\\), 假设以下条件成立:

- \\(\lVert\boldsymbol{a}_i\rVert_2 = 1, \forall i\\)&emsp;(\\(\boldsymbol{A}\\) 的列归一)
- \\(\boldsymbol{a}_i^T\boldsymbol{a}_j \approx 0, \forall i \ne j\\)&emsp;(\\(\boldsymbol{A}\\) 的列近似正交)

这样一来,

\\[\boldsymbol{A}^T\boldsymbol{A} \approx \boldsymbol{I} \Rightarrow \boldsymbol{A}^T\boldsymbol{y} = \boldsymbol{A}^T\boldsymbol{A}\boldsymbol{x} \approx \boldsymbol{x}\\]

也就是说 __可以通过 \\(\boldsymbol{A}^T\boldsymbol{y}\\) 来近似 \\(\boldsymbol{x}\\)__. 这两个条件可以分别通过归一化和通过选取不相关的特征来满足.

### 正交匹配追踪
__正交匹配追踪 (orthogonal matching pursuit)__ 是一类稀疏回归算法, 本质是将信号分解为一系列正交基的加权和. 假设

\\[\boldsymbol{y} = \boldsymbol{A}\boldsymbol{x}_0 + \boldsymbol{w}\\]

其中 \\(\boldsymbol{x} _ 0\\) 的稀疏度为 \\(S\\) 且噪声满足 \\(\lVert \boldsymbol{w} \rVert_2 \le \epsilon\\). 考虑以下已知稀疏度 \\(S\\) 的情况:

- \\(S = 1\\) 时:
    * 非零元素的位置: \\(i^\star = \arg\max _ i \lvert\boldsymbol{a}_i^T\boldsymbol{y}\rvert\\)
    * 非零元素的值: \\(x _ {i^\star} = \boldsymbol{a} _ i ^ {\dagger}\boldsymbol{y} = \boldsymbol{a} _ i ^ T\boldsymbol{y} \\)

- \\(S = 2\\) 时: 假设由上已知其中一个非零元素的位置, 即支撑集 \\(\mathcal{I} = \\{i _ 1, ?\\}\\)
    * 取消来自 \\(i _ 1\\) 的影响: \\(\boldsymbol{y} _ r = \boldsymbol{y} - \boldsymbol{a} _ {i _ 1}\boldsymbol{a} _ {i _ 1} ^ {\dagger}\boldsymbol{y} = \boldsymbol{y} - \boldsymbol{a} _ {i _ 1}\boldsymbol{a} _ {i _ 1} ^ T\boldsymbol{y}\\)
    * 非零元素 \\(i _ 2\\) 的位置: \\(i _ 2 = \arg\max _ i \lvert\langle\boldsymbol{a} _ i, \boldsymbol{y} _ r\rangle\rvert\\)
    * 非零元素 \\(x _ {i _ 2}\\) 的值: \\(x _ {i _ 2} =  \boldsymbol{a} _ {i _ 2} ^ T\boldsymbol{y} _ r \\)
    * 由 \\(\langle \boldsymbol{y} _ r, \boldsymbol{a} _ {i _ 1} \rangle = 0\\) 可知 \\(i _ 2 \ne i _ 1\\), 满足 \\(S = 2\\)

- \\(S = 3\\) 时: 支撑集 \\(\mathcal{I} = \\{i _ 1, i _ 2, ?\\}\\)
    * 取消来自 \\(\mathcal{I} _ 2 = \\{i _ 1, i _ 2\\}\\) 的影响: \\(\boldsymbol{y} _ r = \boldsymbol{y} - \boldsymbol{A} _ {\mathcal{I} _ 2}\boldsymbol{A} _ {\mathcal{I} _ 2} ^ T\boldsymbol{y}\\)
    * 非零元素 \\(i _ 3\\) 的位置: \\(i _ 3 = \arg\max _ i \lvert\langle\boldsymbol{a} _ i, \boldsymbol{y} _ r\rangle\rvert\\)
    * 非零元素 \\(x _ {i _ 3}\\) 的值: \\(x _ {i _ 3} =  \boldsymbol{a} _ {i _ 3} ^ T\boldsymbol{y} _ r \\)
    * \\(i _ 3 \notin \mathcal{I} _ 2\\), 满足 \\(S = 3\\)

通过上面的例子可以归纳出 OMP 算法:

---
__Algorithm 1__ Orthogonal Matching Pursuit (OMP)

---
- __Input:__ \\(S, \boldsymbol{A}, \boldsymbol{y}\\)
- __Initialization:__ \\(\boldsymbol{x} = \boldsymbol{0}, \mathcal{T}^0 = \varnothing, \boldsymbol{y} _ r = \boldsymbol{y}\\)
- __Iteration:__ \\(l = 1,\dots,S\\)
    * \\(i _ l = \arg \max \lvert \langle \boldsymbol{a} _ j,\boldsymbol{y} _ r \rangle \rvert\\)&emsp;(找出剩余部分最主要的非零系数)
    * \\(\mathcal{T}^l = \mathcal{T}^{l - 1} \cup \\{i _ l\\}\\)&emsp;(添加系数到支撑集)
    * \\(\boldsymbol{x} _ {\mathcal{T}^{l}} = \boldsymbol{A} _ {\mathcal{T}^{l}} ^ {\dagger} \boldsymbol{y}, \quad \boldsymbol{x} _ {(\mathcal{T}^{l})^c} = \boldsymbol{0}\\)&emsp;(估计稀疏度为 \\(l\\) 的信号)
    * \\(\boldsymbol{y} _ r = \boldsymbol{y} - \boldsymbol{A}\boldsymbol{x}^l\\)&emsp;(计算估计误差)

---

那么 OMP 的精度有多好, 即 \\(\lVert \hat{\boldsymbol{x}} - \boldsymbol{x} _ 0 \rVert _ 2\\) 的上界是多少呢? 考虑以下三种情况:

- 无噪声 \\((\epsilon = 0)\\):
    * \\(\hat{\boldsymbol{x}} = \boldsymbol{x} _ 0\\) 会何时成立?
- 有噪声 \\((\epsilon = 0)\\):
    * \\(\lVert \hat{\boldsymbol{x}} - \boldsymbol{x} _ 0 \rVert _ 2\\) 与 \\(\epsilon\\) 之间的关系?
- 近似稀疏 \\((\lvert \mathcal{I} \rvert \ne S)\\): 令 \\(\boldsymbol{x} _ {0,S}\\) 表示 \\(\boldsymbol{x} _ 0\\) 的稀疏度为 \\(S\\) 的最好估计, 则
    * \\(\lVert \hat{\boldsymbol{x}} - \boldsymbol{x} _ 0 \rVert _ 2\\) 与 \\(\epsilon\\) 之间的关系?
    * \\(\lVert \hat{\boldsymbol{x}} - \boldsymbol{x} _ 0 \rVert _ 2\\) 与 \\(\lVert \boldsymbol{x} _ 0 - \boldsymbol{x} _ {0,S} \rVert _ 2\\) 之间的关系?

答案是, OMP 算法能够从 \\(y\\) 中恢复出所有稀疏度为 \\(S\\) 的信号 \\(x\\), 前提是字典 \\(\boldsymbol{A}\\) 满足

\\[\mu < \frac{1}{2S}\\]

<details>
    <summary>证明: 特征近似正交时, OMP 算法可以准确估计稀疏信号</summary>
    <ul>
        <li>首先证明 \(i _ 1 = \arg \max _ i \lvert \langle \boldsymbol{a} _ i, \boldsymbol{y} \rangle \rvert \in \mathcal{T} _ 0\):</li>
        <ul>
            <li>对于所有 \(i \notin \mathcal{T} _ 0\), 有 \(\max _ {i \notin \mathcal{T} _ 0} \lvert \langle \boldsymbol{a} _ i, \boldsymbol{y} \rangle \rvert \le \mu \sqrt{S} \lVert \boldsymbol{x} \rVert _ 2\), 因为</li>
            \begin{split}
                \lvert \langle \boldsymbol{a} _ i, \boldsymbol{y} \rangle \rvert
                &= \lvert \langle \boldsymbol{a} _ i, \sum _ {j \in \mathcal{T} _ 0} \boldsymbol{a} _ j x _ {0,j} \rangle \rvert = \lvert \sum _ {j \in \mathcal{T} _ 0} x _ {0,j} \langle \boldsymbol{a} _ i, \boldsymbol{a} _ j \rangle \rvert \\
                &\le \sum _ {j \in \mathcal{T} _ 0} \lvert x _ {0,j} \rvert \lvert \langle \boldsymbol{a} _ j x _ {0,j} \rangle \rvert \\
                &\overset{(a)}{\le} \mu \sum _ {j \in \mathcal{T} _ 0} \lvert x _ {0,j} \rvert \\
                &\overset{(b)}{\le} \mu \sqrt{S} \lVert \boldsymbol{x} \rVert _ 2 \\
            \end{split}
            <p>其中 (a) 由互相关的定义可知, (b) 因为 Cauchy-Schwartz 不等式 \(\lVert \boldsymbol{x} \rVert _ 1 \le \sqrt{n} \lVert \boldsymbol{x} \rVert _ 2 \).</p>
            <li>对于所有 \(i \in \mathcal{T} _ 0\), 有 \(\max _ {i \in \mathcal{T} _ 0} \lvert \langle \boldsymbol{a} _ i, \boldsymbol{y} \rangle \rvert \ge \frac{1}{\sqrt{S}} \lVert \boldsymbol{x} \rVert _ 2 - \mu \sqrt{S} \lVert \boldsymbol{x} \rVert _ 2\), 因为</li>
            \begin{split}
                \lvert \langle \boldsymbol{a} _ i, \boldsymbol{y} \rangle \rvert
                &= \lvert \sum _ {j \in \mathcal{T} _ 0} x _ {0,j} \langle \boldsymbol{a} _ i, \boldsymbol{a} _ j \rangle \rvert \\
                &\overset{(a)}{\ge} \lvert x _ {0,i} \langle \boldsymbol{a} _ i, \boldsymbol{a} _ i \rangle \rvert - \lvert \sum _ {j \ne i} x _ {0,j} \langle \boldsymbol{a} _ i, \boldsymbol{a} _ j \rangle \rvert \\
                &\ge \lvert x _ {0,i} \rvert - \mu \sum _ {j \ne i} \lvert x _ {0,j} \rvert \\
                &\overset{(b)}{\ge} \lvert x _ {0,i} \rvert - \mu \sqrt{S} \lVert \boldsymbol{x} \rVert _ 2
            \end{split}
            <p>其中 (a) 由三角不等式可知, (b) 由 Cauchy-Schwartz 不等式可知. 又因为</p>
            \begin{split}
                \frac{1}{\sqrt{S}} \lVert \boldsymbol{x} \rVert _ 2
                &= \frac{(\sum _ {i \in \mathcal{T} _ 0} x _ i ^ 2) ^ \frac{1}{2}}{\sqrt{S}} \\
                &\le \frac{(S\max _ {i \in \mathcal{T} _ 0} \lvert x _ i \rvert ^ 2) ^ \frac{1}{2}}{\sqrt{S}} \\
                &= \max _ {i \in \mathcal{T} _ 0} \lvert x _ i \rvert
            \end{split}
            <p>所以不等式成立.</p>
            <li>现在假设 \(\mu < \frac{1}{2S}\) 成立, 可得 \(\frac{1}{\sqrt{S}} \lVert \boldsymbol{x} \rVert _ 2 > 2 \mu \sqrt{S} \lVert \boldsymbol{x} \rVert _ 2\)</li>
        </ul>
        <p>合并以上不等式</p>
        \[\max _ {i \in \mathcal{T} _ 0} \lvert \langle \boldsymbol{a} _ i, \boldsymbol{y} \rangle \rvert \ge \frac{1}{\sqrt{S}} \lVert \boldsymbol{x} \rVert _ 2 - \mu \sqrt{S} \lVert \boldsymbol{x} \rVert _ 2 \ge \mu \sqrt{S} \lVert \boldsymbol{x} \rVert _ 2 \ge \max _ {i \notin \mathcal{T} _ 0} \lvert \langle \boldsymbol{a} _ i, \boldsymbol{y} \rangle \rvert\]
        <p>所以 \(i _ 1 \in \mathcal{T} _ 0\).</p>
        <li>假设前 \(l - 1\) 个循环得到非零元素的位置 \(\mathcal{T} ^ {l - 1} = \\{i _ 1, \dots, i _ {l - 1}\\}\) 且 \(\mathcal{T} ^ {l - 1} \in \mathcal{T} _ 0\), 需要证明</li>
            <ul>
                <li>\(i _ l \in \mathcal{T} _ 0\)</li>
                <li>\(i _ l \notin \mathcal{T} _ {l - 1}\)</li>
            </ul>
        <p>前者由上述结论可知; 后者由 \(\boldsymbol{A} _ {\mathcal{T} ^ {l - 1}} ^ T \boldsymbol{y} _ r = 0\) 可知. 所以 OMP 算法在维度互相关较低 \((\mu < \frac{1}{2S})\) 时能够从采样中完全恢复出稀疏信号.</p>
    </ul>
</details>

总结一下, OMP 假设 \\(\boldsymbol{A}\\) 的任意两列近似正交, 每次添加一个索引, 迭代次数是 \\(S\\). 下面的算法均假设 \\(\boldsymbol{A}\\) 中所有不相交的子矩阵近似正交, 且每个循环更新多个索引.

### 子空间追踪
 __子空间追踪 (subspace pursuit)__ 算法在每次迭代中更新维度为 \\(2S\\) 的候选集, 并从中取出 \\(S\\) 个最大的索引.

---
__Algorithm 2__ Subspace Pursuit (SP)

---
- __Input:__ \\(S, \boldsymbol{A}, \boldsymbol{y}\\)
- __Initialization:__
    * \\(\mathcal{T}^0 = \mathrm{supp}(H _ S(\boldsymbol{A}^T\boldsymbol{y}))\\)
    * \\(\boldsymbol{y} _ r = \mathrm{resid}(\boldsymbol{y}, \boldsymbol{A} _ {\mathcal{T}^{0}}) = \boldsymbol{y} - \boldsymbol{A} _ {\mathcal{T}^{0}} \boldsymbol{A} _ {\mathcal{T}^{0}} ^ {\dagger} \boldsymbol{y}\\)
- __Iteration:__ \\(l = 1,2,\dots\\) until convergence
    * \\(\tilde{\mathcal{T}}^l = \mathcal{T} ^ {l - 1} \cup \mathrm{supp}(H _ S(\boldsymbol{A}^T\boldsymbol{y} _ r))\\)&emsp;(扩展候选集)
    * \\(\boldsymbol{b} _ {\tilde{\mathcal{T}}^l} = \boldsymbol{A} _ {\tilde{\mathcal{T}}^l} ^ {\dagger} \boldsymbol{y}, \quad \boldsymbol{b} _ {(\tilde{\mathcal{T}}^l)^c} = \boldsymbol{0}\\)&emsp;(估计稀疏度为 \\(2S\\) 的信号)
    * \\(\mathcal{T}^l = \mathrm{supp}(H _ S (\boldsymbol{b}))\\)&emsp;(更新支撑集)
    * \\(\boldsymbol{x} _ {\mathcal{T}^{l}} = \boldsymbol{A} _ {\mathcal{T}^{l}} ^ {\dagger} \boldsymbol{y}, \quad \boldsymbol{x} _ {(\mathcal{T}^{l})^c} = \boldsymbol{0}\\)&emsp;(估计稀疏度为 \\(l\\) 的信号)
    * \\(\boldsymbol{y} _ r = \boldsymbol{y} - \boldsymbol{A}\boldsymbol{x}^l\\)&emsp;(计算估计误差)

---

因为每次更新 \\(S\\) 个索引, SP 所需迭代次数较少 (通常为 \\(\mathcal{O}(\log S)\\), 不超过 \\(S\\)), 代价是需要在每次迭代中对之前的解重新评估, 重构精度不如 OMP. 把循环中 (\ref{1}) (\ref{2}) 扩展到 \\(3S\\) 子空间就得到了 CoSaMP 算法.

{{< figure src="/figures/dp-1-sparse-regression-and-greedy-algorithms/9-subspace-pursuit.png" title="\(\boldsymbol{A} _ {\mathcal{T}^l}\) 出自 \(\boldsymbol{A} _ {\tilde{\mathcal{T}}^l}, 本质上由 \boldsymbol{A} _ {\mathcal{T}^{(l - 1)}} 和 \boldsymbol{y} _ r\) 决定" >}}

### 迭代硬阈值
__迭代硬阈值 (iterative hard thresholding)__ 算法通过迭代给出优化问题

\\[\min _ \boldsymbol{x} \frac{1}{2} \lVert \boldsymbol{y} - \boldsymbol{A}\boldsymbol{x}\rVert _ 2 ^ 2, \quad \mathrm{s.t.}\  \lVert\boldsymbol{x}\rVert _ 0 \le S \label{3}\tag{3}\\]

的一个局部最优解. 在已知稀疏度 \\(S\\) 的情况下这个问题和原问题 (\ref{1}) 是等价的, 它们都可以写成 (\ref{2}) 的形式.

---
__Algorithm 3__ Iterative Hard Thresholding (IHT)

---
- __Input:__ \\(S, \boldsymbol{A}, \boldsymbol{y}\\)
- __Initialization:__ \\(\boldsymbol{x}^0 = 0\\)
- __Iteration:__ \\(l = 1,2,\dots\\) until convergence
    * \\(\boldsymbol{x} ^ l = H _ S (\boldsymbol{x} ^ {(l - 1)} + \boldsymbol{A}^T(\boldsymbol{y} - \boldsymbol{A}\boldsymbol{x}^{(l - 1)}))\\)&emsp;(基于估计误差更新信号)

---

IHT 典型的循环次数也是 \\(\mathcal{O}(\log S)\\). 更一般的 IHT 可以写成:

\\[\boldsymbol{x} ^ l = H _ S (\boldsymbol{x} ^ {(l - 1)} + \mu\boldsymbol{A}^T(\boldsymbol{y} - \boldsymbol{A}\boldsymbol{x}^{(l - 1)}))\\]

其中 \\(\mu > 0\\).
