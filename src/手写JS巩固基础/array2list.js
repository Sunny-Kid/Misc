const array2list = function(arr) {
  const head = {
    value: arr[0],
    next: null,
  };
  let pnode = head;
  for (const item of arr) {
    const node = {
      value: item,
      next: null,
    };
    pnode.next = node;
    pnode = node;
  }
  return head;
};

const list2array = function(list) {
  const res = [];
  let node = list;
  while (node) {
    res.push(node.value);
    node = node.next;
  }
  return res;
};
