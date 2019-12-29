import { Observable, concat, of } from 'rxjs';
import { mergeMap, reduce } from 'rxjs/operators';
import { Tree } from '../types';
import { isLeaf } from '../types/tree';


export function treeLeafs<N extends any, T extends Tree<N>>(
  options: any = {
    childrenProperty: 'children'
  }
): (souce: Observable<T>) => Observable<N[]> {
  const childrenProp = options.childrenProperty || 'children';
  return (source: Observable<T>) => source.pipe(
    mergeMap((tree: T) => {
      if (!tree) {
        return of( [] );
      } else if (isLeaf(tree, childrenProp)) {
        const leaf = Object.assign({}, tree);
        delete leaf[childrenProp];
        return of( leaf );
      } else {
        return concat(
          ...tree[childrenProp].map((child: N) => of(child).pipe(
            treeLeafs( options )
          ))
        );
      }
    }),
    reduce(
      (leafs: N[], leaf: N | N[]) => leafs.concat( leaf ), []
    )
  );
}
