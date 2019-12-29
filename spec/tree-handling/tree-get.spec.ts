import { of } from 'rxjs';
import { initData, resetData } from './test-data';
import { treeGet } from '../../src/tree-handling/tree-get';


describe('[ treeGet ]', () => {

  let data: any;

  beforeEach(() => data = initData());
  afterEach(() => data = resetData());


  test('get null if null tree', done => {
    of( data.TREE_NULL ).pipe(
      treeGet([ 1, 0 ])
    ).subscribe((node: { id: string }) => {
      expect( node ).toBeNull();
      done();
    });
  });

  test('get root node', done => {
    of( data.TREE_A ).pipe(
      treeGet()
    ).subscribe((node: { id: string }) => {
      expect( node ).toEqual(
        { id: '0' }
      );
      done();
    });
  });

  test('get an existing node', done => {
    of( data.TREE_A ).pipe(
      treeGet([ 1, 2 ])
    ).subscribe((node: { id: string }) => {
      expect( node ).toEqual(
        { id: '012' }
      );
      done();
    });
  });

  test('get null if node doesn\'t exist', done => {
    of( data.TREE_A ).pipe(
      treeGet([ 5 ])
    ).subscribe((node: { id: string }) => {
      expect( node ).toBeNull();
      done();
    });
  });

});
