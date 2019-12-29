import { of } from 'rxjs';
import { initData, resetData } from './test-data';
import { treeRoot } from '../../src/tree-handling/tree-root';


describe('[ treeRoot ]', () => {

  let data: any;

  beforeEach(() => data = initData());
  afterEach(() => data = resetData());


  test('get null if null tree', done => {
    of( data.TREE_NULL ).pipe(
      treeRoot()
    ).subscribe((root: { id: string }) => {
      expect( root ).toBeNull();
      done();
    });
  });

  test('get root node', done => {
    of( data.TREE_A ).pipe(
      treeRoot()
    ).subscribe((root: { id: string }) => {
      expect( root ).toEqual(
        { id: '0' }
      );
      done();
    });
  });

});
