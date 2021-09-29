// vnode结构：
// {
//   tag,
//   attrs,
//   children,
// }

// Virtual DOM => DOM

function render(vnode, container) {
  container.appendChild(vnode);
}

function _render(vnode) {
  if (typeof vnode === 'number') {
    vnode = String(vnode);
  }
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
  }
  const dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key];
      dom.setAttribute(key, value);
    });
  }
  for (const child of vnode.children) render(child, dom);
  return dom;
}

_render(vnode);
