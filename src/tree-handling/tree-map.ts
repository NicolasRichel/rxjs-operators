import { Observable, of, zip } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { isLeaf, Tree } from '../types';


export function treeMap<T extends Tree<any>, R extends Tree<any>>(
  mapFn: (node: T) => Observable<R>,
  options: any = {
    childrenProperty: 'children'
  }
): (source: Observable<T>) => Observable<R> {
  const childrenProp = options.childrenProperty || 'children';
  return (source: Observable<T>) => source.pipe(
    mergeMap((tree: T) =>
      mapFn( tree ).pipe(
        mergeMap(
          (node: R) => (isLeaf(tree, childrenProp) ? of([]) : zip(
            ...tree[childrenProp].map(
              (child: T) => of(child).pipe( treeMap( mapFn, options ) )
            )
          )).pipe(
            map( (children: R[]) => Object.assign(node, { [childrenProp]: children }) )
          )
        )
      )
    )
  );
}
