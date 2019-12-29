import { of } from 'rxjs';
import { initData, mapFn, resetData } from './test-data';
import { treeMap } from '../../src/tree-handling/tree-map';
import { Tree } from '../../src/types';


describe('[ treeMap ]', () => {

  let data: any;

  beforeEach(() => data = initData());
  afterEach(() => data = resetData());


  test('error if null tree', done => {
    of( data.TREE_NULL ).pipe(
      treeMap( mapFn )
    ).subscribe({
      next: () => fail(),
      complete: () => fail(),
      error: () => done()
    });
  });

  test('handle empty tree', done => {
    of( data.TREE_EMPTY ).pipe(
      treeMap( mapFn )
    ).subscribe((mappedTree: Tree<{ name: string }>) => {
      expect( mappedTree ).toEqual(
        { name: '', children: [] }
      );
      done();
    });
  });

  test('handle singleton tree', done => {
    of( data.TREE_SINGLETON ).pipe(
      treeMap( mapFn )
    ).subscribe((mappedTree: Tree<{ name: string }>) => {
      expect( mappedTree ).toEqual(
        { name: 'N0', children: [] }
      );
      done();
    });
  });

  test('simple use case', done => {
    of( data.TREE_A ).pipe(
      treeMap( mapFn )
    ).subscribe((mappedTree: Tree<{ name: string }>) => {
      expect( mappedTree ).toEqual(
        {
          name: 'N0',
          children: [
            {
              name: 'N00',
              children: [
                { name: 'N000', children: [] },
                { name: 'N001', children: [] }
              ]
            },
            {
              name: 'N01',
              children: [
                { name: 'N010', children: [] },
                {
                  name: 'N011',
                  children: [
                    { name: 'N0110', children: [] },
                    { name: 'N0111', children: [] }
                  ]
                },
                {
                  name: 'N012',
                  children: [
                    { name: 'N0120', children: [] }
                  ]
                }
              ]
            },
            { name: 'N02', children: [] }
          ]
        }
      );
      done();
    });
  });

  test('custom children prop', done => {
    of( data.TREE_B ).pipe(
      treeMap( mapFn, { childrenProperty: 'customChildrenProp' } )
    ).subscribe((mappedTree: Tree<{ name: string }>) => {
      expect( mappedTree ).toEqual(
        {
          name: 'N0',
          customChildrenProp: [
            { name: 'N00', customChildrenProp: [] },
            { name: 'N01', customChildrenProp: [] }
          ]
        }
      );
      done();
    });
  });

});
