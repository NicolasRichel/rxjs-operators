import { Observable } from 'rxjs';
import { treeGet } from './tree-get';
import { Tree } from '../types';


export function treeRoot<N extends any, T extends Tree<N>>(): (souce: Observable<T>) => Observable<N> {
  return (source: Observable<T>) => source.pipe( treeGet() );
}
