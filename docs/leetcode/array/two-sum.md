# 两数之和

## 题目描述

给定一个整数数组 **nums** 和一个整数目标值 **target**，请你在该数组中找出 和为目标值 **target**  的那 **两个** 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案

## 思路

和四六级单词书中第一个单词 *abandon* 一样，两数之和已经成了一个梗了，年年刷LeetCode，年年刷两数之和。

这道题如果仅仅为了解决的话，两层for循环也可以实现，将**nums.length < 1**的数字，都与他们后面的每一个数字相加，检查是否等于target，直到得到结果。但是这样，时间复杂度为 <i>O(N<sup>2</sup>)</i>，必然不符合预期。

使用hash表的方式，是因为hash读取的时间复杂度为 *O(1)*，这样我们从数组下标 `[0]` 开始，一边读取判断，一边将数值作为map的key，将下标作为map的value。

* 读取：target - [num1] 就是当前值 `(被加数)` 需要的另一个加数，我们将该值作为key去map中判断是否存在。
  * 如果存在，则直接获取该key的value，就是下标index值。
  * 如果不存在，则进入存储步骤
* 存储：将值作为map的key，index作为map的value存储到map中，以供读取使用。

![](https://cdn.thisjs.com/blog_images/20210604160809.png)

## 参考答案

```ts
function twoSum(nums: number[], target: number): number[] {
  const numMap = new Map<number, number>();

  for(let i = 0; i < nums.length; i++) {
    if ( numMap.has(target - nums[i]) ) {
      return [i, numMap.get(target - nums[i])];
    }
    numMap.set(nums[i], i);
  }

  return [];
};
```

