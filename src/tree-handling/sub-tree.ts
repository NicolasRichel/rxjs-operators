import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Tree } from '../types';
import { hasChildren } from '../types/tree';


export function subTree<N extends any, T extends Tree<N>>(
  position: number[] = [],
  options: any = {
    childrenProperty: 'children',
    nodeObject: false
  }
): (souce: Observable<T>) => Observable<N> {
  const childrenProp = options.childrenProperty || 'children';
  return (source: Observable<T>) => source.pipe(
    switchMap((tree: T) => {
      if (position.length === 0) {
        if (tree) {
          const subTree = Object.assign({}, tree);
          if (options.nodeObject) {
            delete subTree[childrenProp];
          }
          return of( subTree );
        } else {
          return of( null );
        }
      } else {
        if (hasChildren(tree, childrenProp)) {
          return of( tree[childrenProp][ position.shift() ] ).pipe(
            subTree( position, options )
          );
        } else {
          return of( null );
        }
      }
    })
  );
}
