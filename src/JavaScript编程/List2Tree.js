/**
 * // 原始 list 如下
let list =[
    {id:1,name:'部门A',parentId:0},
    {id:2,name:'部门B',parentId:0},
    {id:3,name:'部门C',parentId:1},
    {id:4,name:'部门D',parentId:1},
    {id:5,name:'部门E',parentId:2},
    {id:6,name:'部门F',parentId:3},
    {id:7,name:'部门G',parentId:2},
    {id:8,name:'部门H',parentId:4}
];
手写 convert 函数，要求转换后结果如下：
let result = [
    {
      id: 1,
      name: '部门A',
      parentId: 0,
      children: [
        {
          id: 3,
          name: '部门C',
          parentId: 1,
          children: [
            {
              id: 6,
              name: '部门F',
              parentId: 3
            }, {
              id: 16,
              name: '部门L',
              parentId: 3
            }
          ]
        },
        {
          id: 4,
          name: '部门D',
          parentId: 1,
          children: [
            {
              id: 8,
              name: '部门H',
              parentId: 4
            }
          ]
        }
      ]
    },
  ···
];
 */

const List2Tree = list => {
  const res = [];
  const ListMap = list.reduce((prev, curr) => {
    const { id } = curr;
    prev[id] = curr;
  }, {});
  for (let item of list) {
    const { parentId } = item;
    if (parentId === 0) {
      res.push(item);
      continue;
    }
    if (ListMap[parentId]) {
      const parent = ListMap[parentId];
      parent.children = parent.children || [];
      parent.children.push(item);
    }
  }
  return res;
};

const Tree2List = (tree, result = []) => {
  if (tree) {
    const { children } = tree;
    result.push(tree);
    for (let child of children) {
      Tree2List(child, result);
    }
  }
  return result;
};
