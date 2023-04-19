const array2list = function(arr) {
  const head = {
    value: arr[0],
    next: null,
  };
  const pnode = head;
  for (let i = 1; i < arr.length; i++) {
    const node = {
      value: arr[i],
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
