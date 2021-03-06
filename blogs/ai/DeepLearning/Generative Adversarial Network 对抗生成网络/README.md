本课程是针对李宏毅教授在Youtube上上传的机器学习课程视频的学习笔记。

[课程视频地址](https://www.youtube.com/watch?v=G0dZc-8yIjE)

[toc]

# Introduction

某人在Quara上的问题：非监督学习领域最近有没有什么突破性的进展呢？

Lecun大神亲自回答：**对抗训练**可能是有史以来（since sliced bread，有一个好东西出现的意思）最酷的东西。

又有人问：最近在深度学习领域最近有没有什么突破性的进展呢？

Lecun大神答：Generative Adversarial Network (also called GAN), it's the most interesting idea in the last 10 years in ML in my opinion。

- How to pronounce "GAN" (2333)

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/1.png)

# Outline

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/2.png)

# Basic Idea of GAN

我们通常用GAN来生成某些东西，即需要一个生成器（Generator），他可以是一个神经网络（NN），或者任意一个函数。

那生成器怎么生成东西呢？我们会喂给生成器一个向量，这样它就会给定一个我们想要的输出。至于输出什么就取决于我们需要什么。比如我们需要输出图片，那么实际上生成器就应该输出一个能表示图片的矩阵。也可以让生成器输出一句话/sequence。

如下图：我们用二次元人脸生成作为例子。

输入给生成器的向量的不同维度代表了输出结果的某些特征。比如假设第一个维度代表了人物头发的长度，那么其值越大，生成的人物的头发就越长。或者假设倒数第二维决定头发是不是蓝色；或者假设最后一个维度代表嘴巴是张开的还是闭着的。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/3.png)

**GAN的突出部分在于：它还引入了另一个角色--判别器（Discriminator）。**

判别器本身也是一个NN。当将一个图片输入判别器，它会输出一个标量（scalar），表示**该图片有多大可能性是人画出来的**，值越大表示它认为这张图片越可能是人画的，反之则认为是机器生成的。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/4.png)

能不能比较准确地判别取决于判别器学得好不好。

*那为什么我们会需要判别器呢？*

Ian Goodfellow（GAN的作者）给了一个很符合直觉的比喻：

> 印假钞的犯罪者会尽量制作和真钞尽可能想象的钞票（生成器），而警察会尽力去判别哪些钞票是真的，哪些是假的（判别器），而针对警察鉴别能力的提升，犯罪者也会不断针对性地提高印假钞的技术，使得警察无法鉴别真钞和假钞，即骗过警察。

这里，李老师也举了一个例子：

> 枯叶蝶可以很好地伪装成一个枯萎的树叶的样子，但它的祖先其实并不是这样，而是和普通的蝴蝶一样颜色五彩缤纷，还很鲜艳。但是枯叶蝶一直有一个天敌鸟，天敌鸟会认为彩色的明显是蝴蝶，不会是枯叶的那种棕色的。于是由于物竞天择，枯叶蝶进化了一代，变成了棕色，但是不久后，天敌鸟也学到了，它进一步了解到，蝴蝶是不会有叶脉的的。于是又由于物竞天择，枯叶蝶生成了叶脉纹路，进化成了今天的样子。而，天敌鸟也跟着进化...两者的进化不断交替，不断升级...

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/5.png)

在这个例子中，枯叶蝶扮演了生成器的角色，而天敌鸟扮演了判别器的角色。



*那生成器和判别器的互动是怎么进行的呢？*

如下图，一开始，生成器NN的参数是随机的，给它输入，它一般会产生很混乱、不符合期望的图片。而我们会给它喂人造的图片（real images），让它学习人画的图片是什么样子的，有哪些特征？然后判别器就来判断：某张图片是生成器生成的，还是人画的。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/6.png)

比如，可能第一代的生成器(v1)很弱，只能生成黑白的图片，而人造图片都是彩色的，所以判别器只需要看图片是黑白还是彩色就能准确判断。

那么接着，生成器就会**有针对性地**进化到第二代(v2)，**进化的方向是能够骗过当前的判别器**，比如第一代的判别器靠颜色来判断，那生成器就会开始也生成彩色图片。

而判别器发现它会被生成器伪造的的彩色图片骗过后，它也会开始有针对性地进化，即开始尝试发现真实彩色照片和生成器伪造彩色照片之间的差别，比如说可能伪造的照片都没有嘴巴，而真实的照片都有。于是，判别器开始根据有无嘴巴来判断。

那么，接着，生成器也继续进化（v3），开始画嘴巴...两者如此互相交替循环地针对对方的新能力进行进化，互相角力，促使彼此都做得更好。（这也就是对抗生成网络中的“对抗”（adversarial）一词的由来）

- 那为什么不能说生成器和判别器是合作互相促进呢？

答：其实也可以，只是说法问题。我们再看下面的例子：

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/7.png)

把生成器看做学生，判别器看做老师。老师知道什么样的人物画是好的，什么样的不好，而学生就要和老师学习判别的能力。

那么一年级的学生（v1）什么都不会，画的东西给一年级老师看，一年级老师指出来不行，没有眼睛。

然后学生学了一年画眼睛后，把画给现在的二年级的老师看，以为二年级的老师会表扬他画得好，结果二年级的老师说，不行，没有嘴巴。

然后学生又学了一年画嘴巴....

这样，学生画的越来越好，老师也变得越来越严格。

**这样，我们又有了两个新的问题：**

- 为什么生成器不能自己照着真实图片学，非要判别器和它对抗呢？
- 为什么判别器不自己做呢？（自己画好的东西）

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/8.png)

接下来，我们将逐渐尝试回答上述两个问题。

老师自己用GAN做的成果：

- update 100次：

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/9.png)

- update 1000次：生成器学到了要产生眼睛



![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/10.png)

- update 2000次：生成器学到了要产生嘴巴

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/11.png)

- update 5000次：生成器学到了动漫人物要有水汪汪的大眼睛

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/12.png)

- update 10000次：

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/13.png)

- update 20000次：生成器学到了不能有模糊的部分

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/14.png)

- update 50000次，收敛：生成器学到了不能有两个眼睛不一样的图片，整体效果不错，不过仍有些图片有大小眼问题。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/15.png)

如下图，那么除了产生二次元人物头像以外，还能用于产生真人头像。但是这样做的意义在哪里呢？如果只是要获得头像，去街上拍照不是会更快吗？

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/16.png)

不过，GAN厉害的地方在于，它能产生**本来不存在的头像**，但它却非常像实际中可能存在的真人的头像。

但是，光让机器产生人物头像是没有什么特别的地方，因为机器很有可能是“背好了”训练数据中的图片，而我们需要生成器去输出一张照片时，它可能只是在训练数据里找了一张背好的图丢出来即可。

**那么，为了避免生成器背图，我们可以怎么做呢？**

答：我们可以要求生成器产生两张图片的interpolation（窜改，插补）。

如下图，我们假设生成器在输入[0,0]时，会产生最左边的图片，输入[0.9,0.9]时，会产生最右边的图片，那么输入[0,0]和[0.9,0.9]之间的各种向量时，就会产生中间状态的图片（比如从严肃脸到微笑脸，从头向左看到向右看），而这些中间状态的图片就是本来不存在的一些图片，这些图片状态时机器自己学到的。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/17.png)

*不过到现在为止，举得例子都是GAN做影像生成，似乎GAN的用途还是不甚明确。*


# When do we need GAN?

有些人认为：**GAN可以用来生成更多训练数据，帮忙解决训练数据少的问题**。

但是李老师不是很赞成这个想法：比如如果要训练一个马的判别器，而假设已有的训练数据中的马都是朝左侧的，那就算用GAN也只能生成朝左的马，不会生成很不一样的训练数据，不如自己搜集更多的数据更有效率。如果要让GAN产生更多的有用的数据，前提是需要**加入更多的信息**。比如，训练数据的马都是朝左的，但是还有别的斑马的数据，有些斑马是朝右的，那么利用后面会讲到的cycle GAN就可以生成朝左的马的数据，就可能有用。

另外，如果要训练的分类器是不具备泛化能力的（比如knn分类器），它看过的图片越多，能力就一定会越强。但是，像NN这样具备很泛化能力的，不一定更多的照片会有更好的效果。而针对类似knn的分类器，GAN生成的更多的数据也会是有用的。

> 这里李老师指的“泛化能力”不太明白其意思，存个疑。

李老师认为GAN可以用到的地方：


-  Structured Learning

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/18.png)

结构化学习会要求机器输出一个复杂的object，它是由很多组件（component）以一定方式组合而成的。而很多机器学习的教材可能不教结构化学习，甚至会说，机器学习的问题只包含回归和分类，这就好比告诉你，这个世界就是这五大洲，而其实这个五大洲之外还有一个很大的黑暗大陆（李老师23333），那就是结构化学习。而从五大洲到黑暗大陆的一个跨越途径，就是GAN。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/19.png)


**所以GAN的应用其实还蛮广泛的**：

在输出序列方面：

- 机器翻译
- 语音识别
- 聊天机器人

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/20.png)


在输出矩阵方面：

- 图片生成（模型图转真实图片，图片上色）
- 根据文本叙述生成相应图片

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/21.png)


在决策制定与控制方面：

之前在强化学习里面提到过，Actor会采取一系列的action来应对Observation，而这些action共同组成了一个序列（sequence）的整体，所以这种问题也可以看做是一种结构化学习的问题。因此，我们也可以尝试把GAN的概念引入。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/22.png)


- 为什么结构化学习很具有挑战性呢？（机器解结构化学习能力必须具备的能力）

1.因为结构化学习本身是一个One-shot/Zero-shot Learning的问题：

  > One-shot/Zero-shot learning是迁移学习课程中讲到过的概念，可以回顾一下。简而言之，就是某些类的训练数据很少，只有一个，或者甚至是没有。
   
在一般的分类问题中，每个类都是有对应的一些训练样例的。但是在结构化学习中，如果把每个可能的输出都当成一类，那很可能所有可能的输出是一个无法穷举的集合。所以训练的时候，很多类都没有对应的训练样例的。

因此，在一般分类中，机器实际上做的事情可以称之为“归纳”，即每个类都给定一些样例，机器去归纳每个类对应的特征有哪些。但在结构化学习中，机器需要“创造”，因为它要面对从未见过的类。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/23.png)

2.机器必须有规划（planning）的能力/大局观

机器生成对象时，是逐元素（component-by-component）进行的（生成句子时是逐字进行，生成图像时，是逐像素进行）。因此，如果要生成有意义的、人看的明白的对象，就需要机器有“大局观”，即它最后生成的对象是要在整体上合理的，即机器在产生每个元素时，它需要进行**全局考虑**。

如下图，在图像生成中，在图的中央点一个点本身无好坏之分，但是在生成数字1和数字0时所产生的对图像的影响就完全不一样，因此机器在生成数字时需要考虑每个元素是否在整体上看来也是合理的。

还有在语句生成中（比如诗句生成中），也是这样。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/24.png)

- 结构化学习的途径

  - Bottom Up:学习去逐元素的产生对象。
  - Top Down:评估对象整体，并找到最好的那个。（疑问是：怎么用top down的方法去产生对象，因为它好像只学会了如何评估一个对象）

**而其实，GAN中的生成器采用的就是bottom up的方法，而判别器采用的就是top down的方法**

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/25.png)

# GAN as structured learning algorithm

做Generation方面，GAN生成器可以接收向量然后生成图像或句子等，但是光这么做似乎用处不大。真正有用的应该是Conditional Generation（让机器根据不同的情境产生不同的输出）。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/26.png)

 > 这里有学生提到输入向量的维度问题：怎么确定输入维度，能不能和图片的维度一样，甚至超过图片的维度。但李老师也不确定，让学生在做作业时尝试一下。
 

如下图，**回到之前的两个重要问题，我们现在来尝试回答：**

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/27.png)

## 问题一：为什么生成器不自己学

其实按理来说，生成器完全可以自己学，它只要有输出的目标图片和对应的图片输入向量（编码，code）就可以自己去训练了，不过一般来说，目标图片我们是比较容易搜集的，关键在于图片对应的输入向量从何处来呢？

**先假设我们有办法获得目标图片的对应编码**，那么我们对每个图片现在都能获得一个编码，然后我们就拿编码当输入数据，让生成器尽量产生和目标图片相近的图片就好了。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/28.png)

而这个过程我们可以对照分类任务来看：分类是输入图片（高维），然后输出图片所属的类别（低维）。

那么，**问题就落脚到了如何获得图片的编码上，我们的做法是：训练出一个自编码器（Auto-encoder）**。

> 自编码器的详细知识可以参考前面已有的同名博客。

自编码器本质就是对输入数据做降维，获得输入数据的低维编码。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/29.png)

- 快速带过自编码器的知识：

编码器（encoder）和解码器（decoder）单独都无法学习，需要合作。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/30.png)

那么GAN中的生成器做的事情就很像自编码器中的解码器：**吃进编码，输出图片**。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/31.png)

因此，学出一个自编码器，拿出其中的解码器，就可以当做一个GAN的生成器。


- 下面是MNIST上的尝试效果：

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/32.png)

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/33.png)

回到GAN！好，那么现在我们也可以获得目标图片的编码了，但是还有一个问题：

假设我们有编码a和编码b，但是很有可能，我们没有编码a和b以某种方式（比如平均）组合所得的编码对应的目标图片，那面对这种编码，生成器该如何生成图片？可能生成器只能产生noise。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/34.png)

解决这种问题的方法之一是用**VAE（Variational Auto-encoder）**。

VAE就是编码器在产生编码的同时，还会产生一组随机噪声（服从正态分布），并把噪声和编码组合加在一起，给解码器训练。于是利用VAE，我们可以增强解码器的抗干扰能力，即它面对没看过的编码，也可能输出好的结果。

不过同样地，编码器生成噪音时，为了减小reconstruction error，它会有动机将噪音全部设置为0，这样就回到了普通的自编码器，于是我们需要在噪音过小时，给自编码器一些惩罚（penalty）。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/35.png)

- 还少了什么？

目前看来没什么问题，

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/36.png)

思考：生成器在学习做生成的时候，它是怎么学的？

学习过程中，希望目标图片和生成图片越接近越好（接近即：两张图片pixel-wise的l1或l2范数），而如果生成器可以完全地复制目标图片，看起来似乎没什么问题。但是这样产生和已有数据一模一样的数据就又没什么意义了，于是我们要允许生成器犯一点错误。不过错误有严重的，有轻微的...

但是如下图，问题在于：有时候的错误虽然较少（像素的错误），但是反而是更不能接受的结果。比如下面四副图中的上面两幅，都是一个像素的错误（多了一点或少了一点），而下面两幅都是六个像素的错误。可是上面两幅的小错误就造成了整幅图的不合理，而下面两幅图就还能够接受！

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/37.png)

因此，组件之间的关联是很重要的。（还是上图的例子：我们更希望，如果生成器多涂了某个点，则它应该把和主体以及多涂的点之间的点也都涂上颜色，这样才比较合理）

而联系到NN模型本身，因为生成器本质就是一个NN，它的最后一层输出层的每个神经元都和一个输出图片的像素相对应，于是当输出层某个神经元要输出颜色时，它会希望它相邻的神经元也输出颜色（“旁边的，我们产生一样的颜色”），但是输出层的任一神经元的输出都是由上一个隐藏层决定的，因此不会受相邻神经元的影响（“谁管你！”）。

那怎么办呢？

答：用深度架构去捕捉组件之间的关系。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/38.png)

假设我们现在想要一个生成器学习生成下图中蓝色的点，那么我们就可以训练一个VAE，但是我们会发现很难让生成器拟合目标点。虽然生成器知道蓝色点密集的地方，但是它也会在密集区之间也产生很多点。

>这里不太明白李老师想表达的意思...


![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/39.png)



## 问题一：为什么机器不自己做

**判别器一直在批评，那它为什么不自己来做呢？**

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/40.png)

- Discriminator

判别器可以看做一个binary的分类器，其本质是一个函数D（网络，可以是深层的）。

判别器在不同的文献上还有不同的名字：评估函数（evaluation function），potential function（潜在函数），energy function（能量函数），它们的作用和判别器一样。

**问题是：我们能用判别器来产生对象吗**

答：可以！

**top-down的方法（判别器的学习策略）更容易捕捉到组件之间的关系。**

举例来说，对于下图中的两个“2”图像，判别器可以很容易地学习到应该给左边多了一个像素颜色的“2”打较低分，给右边的“2”打较高分。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/41.png)

- 怎么用判别器生成对象

**穷举所有input，哪个input能够在判别器这里得到相应最好的分数，那个input就作为输出。**

但是，穷举x看起来是个很荒谬的做法！！！不过，我们先假设能做到...

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/42.png)

于是，问题再次落脚到：**我们怎么训练出一个判别器去判断对象的好坏呢？**

常规思路当然是：给判别器一些分别对应好的对象以及坏的对象的训练数据。

不过，我们手上一般只有好的对象的数据（人手绘的图），所以光有这些数据，判别器肯定是没办法学的。因此，**我们需要一些负例（Negative Examples）**。

> 就好比一个小孩从小在都是好人的世界里成长，长大后他就会以为人人都是善良的，它无法分辨善恶，明辨是非。

**那怎么产生负例呢？**

有人想到，可以随机生成一些很烂的图片作负例，但是这样会有一个问题：当判别器碰到实际也很差，但是因为之前给它学的图片都太烂了，导致它认为只要是比它学的那些图片好一点的，都能打高分，那也不行。

> 好比每天让人吃难吃的草根、昆虫，突然有一天给了他一桶方便面，他便坚定认为方便面是世界上最好吃的事物，这种打分是有失偏颇的。

因此，要学出好的判别器，**我们给它的负例也一定要越接近真实越好。**

比如下图中的右边两张图，我们生成一个很接近真实图片的人物图，但是由于她的眼睛是异色的，所以它其实也是一个负例。那么判别器就从这个负例中学到：好图的任务眼睛应该是同色的。



那又要怎么产生非常好的假的图片呢？

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/43.png)

**诶！注意了！这个问题不就是我们【生成器】的要求吗？那么，这样一想，生成器和判别器的训练问题，不就成了一个鸡生蛋，蛋生鸡的互相依赖了吗？这不就跟自编码器很像吗？**

- 判别器——训练

  - 一般算法

  先用已有的正例和随机生成的一些负例训练判别器，然后再用训练后的判别器生成一些新的负例。

  ![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/44.png)

  再用新的负例和原来的正例一起训练判别器，再让训练后的判别器生成新的负例。

  ![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/45.png)

  迭代上述过程......

下面我们再换个方式讲解一下判别器的训练过程。

如下图，假设对象只有一个特征，横轴代表特征的取值，纵轴是判别器给对象的打分。绿色的点代表真实样例，蓝色的点代表假的样例（负例），我们希望判别器学习后的效果是：真实样例点对应的评分更高，假样例点得到的评分更低。不过，**因为我们不可能穷举所有假的样例**，因此，如果要全面降低非真实样例分布的区域的评分值，我们需要用一些聪明的方法来找出需要压低的区域。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/46.png)

如下图，假设最开始学出的判别函数的分布如最上面的那副图，于是当我们再次用判别函数随机生成一些负例后，再用新的负例和原来的正例更新判别器参数时，判别器函数的分布就会变成中间的那副图，再重复一次，得到最下面的图......最后，我们的判别器所产生的样例和正例是重合的，即判别器函数和正例的分布基本相同。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/47.png)

- 李老师转谈结构化学习的架构

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/48.png)

- 生成器和判别器的优缺点


![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/49.png)


## 生成器+判别器

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/50.png)

**由生成器来解argmax问题：生成器生成的$\widetilde{x}$就是argmax问题的解**

现在，我们希望找到一些image，它丢到判别器里产生的output值越大越好（之前我们单独针对判别器讨论时，说的是穷举所有image），而现在，我们要用生成器来产生这些image。

因为生成器和判别器本质都是神经网络（假设都是5层的NN），那么我们现在将**两个NN接在一起**，作为一个NN的隐藏层（10层），整个新NN的输入是code，输出是评分。

假设我们要生成的image是100*100像素的，那么隐藏层第五层的神经元的数目就是100*100，它的输出拿出来就是对应的image。

而我们训练的目的就是使得最后的评分尽可能的高，而方法就是不断去调生成器的参数（梯度上升）。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/51.png)

- 训练方法

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/52.png)

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/53.png)

- GAN的好处

  - 从判别器角度来看：生成器是用来生成负例的；
  - 从生成器角度来看：它自己仍然是一个一个组件地在生成对象，不过它从判别器那里学会了大局观。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/54.png)


- 例子

训练目标是产生下图中蓝色的点，但训练好后，GAN也会产生一些非蓝色区域的点。以及VAE和GAN比较起来，VAE生成的图片大多比较模糊（蓝点群之间的离异点）。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/55.png)

# Conditional Generation by GAN

之前，生成器都是在随机生成一些图片，**不过现在，我们希望机器能根据指令来生成对应图片。**

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/56.png)

我们之前讲到，input code的不同维度就对应了一些图片的特质，但是我们如何把维度和特质一一进行对应起来呢？


![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/57.png)

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/58.png)

我们现在有一个生成器（输入z，输出x），可是我们的问题是：给定x，我们怎么知道对应的z是什么样子的？

答：借鉴自编码器的思想，训练一个编码器（输入x，输出z）。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/59.png)

当我们获得了一个训练好的编码器，它就能帮我们确定一个图片对应的正确编码是什么样子。

下图中，我们将短发人物变成长发人物（En(x)代表编码器函数）

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/60.png)

下面是NVIDIA做出来的一个效果：

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/61.png)

- Conditional GAN

如下图：如果用监督学习的方式来做根据指令（比如”正在行驶的火车“）生成图片，那么机器会产生模糊的结果，因为对于监督学习模型来说，它会从自己的数据库里面去找到所有符合指令的图片，并**取它们的平均**，而这个结果不是我们想要的。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/62.png)

因此，我们需要用GAN的思路来做：我们给生成器输入指令c和先验分布z，c控制生成图像的内容（火车对象），而z控制生成图像的具体形式（正面的火车还是侧面的火车）。

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/63.png)

那么，判别器该怎么设计呢？

如果只用传统的方法，让判别器去关注生成器的结果是否足够真实，则这回促使生成器**根本不在意**我们的c输入，而只输出判别器会打高分的内容（比如我们想让生成器生成”火车“，但是判别器目前的状况是只认为含有猫的图片是真实的，于是促使生成器生成猫的图片，而不生成火车）。

为了避免这个问题，我们要让**判别器同时关注生成器的输入与输出**，即它给出的评分包括两部分：

- x是否真实？
- c和x是否匹配？

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/64.png)

- 文献中的例子

输入文字，产生对应图片：

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/65.png)

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/66.png)

输入图片，产生图片：

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/67.png)

这种GAN怎么训练呢？

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/68.png)

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/69.png)

这种技术可以应用于：

- 低像素图片的清晰化

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/70.png)

- 影片生成

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/71.png)

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/72.png)

- 语音去噪

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/73.png)

![](http://tech-blog-pictures.oss-cn-beijing.aliyuncs.com/2017/对抗生成网络：李宏毅/74.png)





