# 合并两个有序链表

## 题目描述

将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

```
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]
```

## 题目解析

合并有序


## 参考答案

```javascript
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  if (!l1) {
    return l2;
  }
  if (!l2) {
    return l1;
  }

  let result = new ListNode();
  let tempResult = result;

  while (l1 && l2) {
    let min = l1.val;
    if (l1.val < l2.val) {
      l1 = l1.next;
    } else {
      min = l2.val;
      l2 = l2.next;
    }
    const nextNode = new ListNode(min);
    tempResult.next = nextNode;
    tempResult = tempResult.next;
  }

  // 合并剩余的链表
  if (l1) {
    tempResult.next = l1;
  }
  if (l2) {
    tempResult.next = l2;
  }

  return result.next;
};
```
