// Tree Type
export type Tree<T> = T | { [children: string]: Array<Tree<T>> };


export function hasChildren(node: Tree<any>, childrenProperty: string): boolean {
  return (
    node[childrenProperty] &&
    node[childrenProperty] instanceof Array &&
    node[childrenProperty].length > 0
  );
}

export function isRoot(node: Tree<any>): boolean {
  return false;
}

export function isLeaf(node: Tree<any>, childrenProperty: string): boolean {
  return !hasChildren(node, childrenProperty);
}
