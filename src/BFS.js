const BFS = node => {
  if (!node) return;
  const nodeList = [];
  const sequence = [];
  sequence.push(node);
  while (sequence.length) {
    const _node = sequence.shift();
    nodeList.push(_node);
    const childNodes = node.children;
    for (let childNode of childNodes) {
      sequence.push(childNode);
    }
  }
  return nodeList;
};
