import { Observable, of, concat } from 'rxjs';
import { concatMap, reduce } from 'rxjs/operators';
import { hasChildren, Tree } from '../types';


export function treePath<N extends any, T extends Tree<N>>(
  position: number[] = [],
  options: any = {
    childrenProperty: 'children'
  }
): (souce: Observable<T>) => Observable<N[]> {
  const childrenProp = options.childrenProperty || 'children';
  return (source: Observable<T>) => source.pipe(
    concatMap((tree: T) => {
      if (tree) {
        const node = Object.assign({}, tree);
        delete node[childrenProp];
        return concat(
          of( node ),
          position.length > 0 && hasChildren(tree, childrenProp) ?
            of( tree[childrenProp][ position.shift() ] ).pipe( treePath( position, options ) ) :
            of( [] )
        );
      } else {
        return of( [] );
      }
    }),
    reduce(
      (path: N[], node: N | N[]) => path.concat( node ), []
    )
  );
}
