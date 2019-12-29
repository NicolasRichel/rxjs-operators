import { Observable } from 'rxjs';
import { subTree } from './sub-tree';
import { Tree } from '../types';


export function treeGet<N extends any, T extends Tree<N>>(
  position: number[] = [],
  options: any = {
    childrenProperty: 'children'
  }
): (souce: Observable<T>) => Observable<N> {
  return (source: Observable<T>) => source.pipe(
    subTree( position, { ...options, nodeObject: true } )
  );
}
