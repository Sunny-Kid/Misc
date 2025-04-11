// 输入一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。
// k 是一个正整数，它的值小于或等于链表的长度。
// 如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
// 输入描述
// 1. head = [1,2,3,4,5], k = 2
// 2. head = [1,2,3,4,5], k = 3
// 3. head = [1,2,3,4,5], k = 1
// 4. head = [1], k = 1
// 输出描述
// 1. [2,1,4,3,5]
// 2. [3,2,1,4,5]
// 3. [1,2,3,4,5]
// 4. [1]
// 注：这里的 [1,2,3,4,5] 并不是数组，而是链表结构，只是为了方便表达才如此描述。

class LinkedList {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

const transformListToArr = (head) => {
  const arr = [];
  let current = head;
  while (current!== null) {
    arr.push(current.val);
    current = current.next;
  }
  return arr;
}

const reverseLinkedList = (head, tail) => {
  let prev = null;
  let current = head;
  while (current!== tail) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  head.next = tail;
  return prev;
}

const reverseKLinkedList = (list, head, k) => {
  const result = [];
  const arr = transformListToArr(list);
  for (let i = 0;i < arr.length;i++) {
    if (i % k === 0) {
      const 
    }
  }
}
