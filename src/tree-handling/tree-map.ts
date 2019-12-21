import { Observable, of, zip } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { isLeaf, Tree } from '../types';


export function treeMap<T extends Tree<any>, R extends Tree<any>>(
  project: (node: T) => Observable<R>,
  childrenProperty: string = 'children'
): (source: Observable<T>) => Observable<R> {
  return (source: Observable<T>) => source.pipe(
    mergeMap((tree: T) =>
      project( tree ).pipe(
        mergeMap(
          (node: R) => (isLeaf(tree, childrenProperty) ? of([]) : zip(
            ...tree[childrenProperty].map(
              (child: T) => of(child).pipe( treeMap(project, childrenProperty) )
            )
          )).pipe(
            map( (children: R[]) => Object.assign(node, { [childrenProperty]: children }) )
          )
        )
      )
    )
  );
}
