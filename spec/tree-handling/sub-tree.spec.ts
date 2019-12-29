import { of } from 'rxjs';
import { subTree } from '../../src/tree-handling/sub-tree';
import { Tree } from '../../src/types';
import { initData, resetData } from './test-data';


describe('[ subTree ]', () => {

  let data: any;

  beforeEach(() => data = initData());
  afterEach(() => data = resetData());


  test('get null if null tree', done => {
    of( data.TREE_NULL ).pipe(
      subTree( [ 1, 0 ] )
    ).subscribe((subTree: Tree<{ id: string }>) => {
      expect( subTree ).toBeNull();
      done();
    });
  });

  test('get root node', done => {
    of( data.TREE_A ).pipe(
      subTree( [], { nodeObject: true } )
    ).subscribe((subTree: Tree<{ id: string }>) => {
      expect( subTree ).toEqual(
        { id: '0' }
      );
      done();
    });
  });

  test('get an existing tree', done => {
    of( data.TREE_A ).pipe(
      subTree( [ 1, 1 ] )
    ).subscribe((subTree: Tree<{ id: string }>) => {
      expect( subTree ).toEqual(
        {
          id: '011',
          children: [
            { id: '0110' },
            { id: '0111' }
          ]
        }
      );
      done();
    });
  });

  test('get an existing node', done => {
    of( data.TREE_A ).pipe(
      subTree( [ 1, 1 ], { nodeObject: true } )
    ).subscribe((node: { id: string }) => {
      expect( node ).toEqual(
        { id: '011' }
      );
      done();
    });
  });

  test('get null if tree doesn\'t exist', done => {
    of( data.TREE_A ).pipe(
      subTree( [ 2, 4 ] )
    ).subscribe((subTree: Tree<{ id: string }>) => {
      expect( subTree ).toBeNull();
      done();
    });
  });

  test('get with custom children property', done => {
    of( data.TREE_B ).pipe(
      subTree( [ 0 ], { childrenProperty: 'customChildrenProp' } )
    ).subscribe((subTree: Tree<{ id: string }>) => {
      expect( subTree ).toEqual(
        { id: '00' }
      );
      done();
    });
  });

});
