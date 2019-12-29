import { of } from 'rxjs';
import { initData, resetData } from './test-data';
import { treeLeafs } from '../../src/tree-handling/tree-leafs';


describe('[ treeLeafs ]', () => {

  let data: any;

  beforeEach(() => data = initData());
  afterEach(() => data = resetData());


  test('get an empty array if null tree', done => {
    of( data.TREE_NULL ).pipe(
      treeLeafs()
    ).subscribe((leafs: Array<{ id: string }>) => {
      expect( leafs ).toEqual( [] );
      done();
    });
  });

  test('get root node if singleton tree', done => {
    of( data.TREE_SINGLETON ).pipe(
      treeLeafs()
    ).subscribe((leafs: Array<{ id: string }>) => {
      expect( leafs ).toEqual([
        { id: '0' }
      ]);
      done();
    });
  });

  test('get tree leafs array', done => {
    of( data.TREE_A ).pipe(
      treeLeafs()
    ).subscribe((leafs: Array<{ id: string }>) => {
      expect( leafs.length ).toEqual( 7 );
      expect( leafs ).toEqual(expect.arrayContaining([
        { id: '02' },
        { id: '000' },
        { id: '001' },
        { id: '010' },
        { id: '0110' },
        { id: '0111' },
        { id: '0120' },
      ]));
      done();
    });
  });

  test('get tree leafs with custom children prop', done => {
    of( data.TREE_B ).pipe(
      treeLeafs( { childrenProperty: 'customChildrenProp' } )
    ).subscribe((leafs: Array<{ id: string }>) => {
      expect( leafs.length ).toEqual( 2 );
      expect( leafs ).toEqual(expect.arrayContaining([
        { id: '00' },
        { id: '01' }
      ]));
      done();
    });
  });

});
