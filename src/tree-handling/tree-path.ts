import { Observable } from 'rxjs';
import { Tree } from '../types';


export function treePath<N, T extends Tree<N>>(): (souce: Observable<T>) => Observable<N[]> {
  return null;
}
