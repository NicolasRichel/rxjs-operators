import { Observable } from 'rxjs';
import { Tree } from '../types';


export function subTree<T extends Tree<any>>(): (souce: Observable<T>) => Observable<T> {
  return null;
}
