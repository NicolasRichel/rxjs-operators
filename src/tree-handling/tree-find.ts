import { Observable, of, zip, concat } from 'rxjs';
import { concatMap, reduce } from 'rxjs/operators';
import { hasChildren, Tree } from '../types';


export function treeFind<N extends any, T extends Tree<N>>(
  findFn: (node: T) => boolean,
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
          of( findFn(tree) ? node : [] ),
          ...( hasChildren(tree, childrenProp) ? tree[childrenProp] : [] ).map(
            (child: T) => of(child).pipe( treeFind( findFn, options ) )
          )
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
