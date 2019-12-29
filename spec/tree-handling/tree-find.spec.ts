import { of } from 'rxjs';
import { findFn, initData, resetData } from './test-data';
import { treeFind } from '../../src/tree-handling/tree-find';


describe('[ treeFind ]', () => {

  let data: any;

  beforeEach(() => data = initData());
  afterEach(() => data = resetData());


  test('get an empty array if null tree', done => {
    of( data.TREE_NULL ).pipe(
      treeFind( findFn )
    ).subscribe((nodes: Array<{ id: string }>) => {
      expect( nodes ).toEqual( [] );
      done();
    });
  });

  test('get an empty array if not found', done => {
    of( data.TREE_A ).pipe(
      treeFind( (node: any) => node.id === '-1' )
    ).subscribe((nodes: Array<{ id: string }>) => {
      expect( nodes ).toEqual( [] );
      done();
    });
  });

  test('find existing nodes', done => {
    of( data.TREE_A ).pipe(
      treeFind( findFn )
    ).subscribe((nodes: Array<{ id: string }>) => {
      expect( nodes ).toEqual([
        { id: '01' },
        { id: '0120' }
      ]);
      done();
    });
  });

  test('find an existing nodes with custom chilrden prop', done => {
    of( data.TREE_B ).pipe(
      treeFind( findFn, { childrenProperty: 'customChildrenProp' } )
    ).subscribe((nodes: Array<{ id: string }>) => {
      expect( nodes ).toEqual([
        { id: '01' }
      ]);
      done();
    });
  });

});
