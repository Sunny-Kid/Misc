const DFS = (node, nodeList = []) => {
  if (node) {
    nodeList.push(node);
    const childNodes = node.children;
    for (let childNode of childNodes) {
      DFS(childNode, nodeList);
    }
  }
  return nodeList;
};
