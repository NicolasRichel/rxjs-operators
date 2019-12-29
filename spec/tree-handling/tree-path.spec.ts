import { of } from 'rxjs';
import { initData, resetData } from './test-data';
import { treePath } from '../../src/tree-handling/tree-path';


describe('[ treePath ]', () => {

  let data: any;

  beforeEach(() => data = initData());
  afterEach(() => data = resetData());


  test('get an empty array if null tree', done => {
    of( data.TREE_NULL ).pipe(
      treePath( [ 1, 0 ] )
    ).subscribe((path: Array<{ id: string }>) => {
      expect( path ).toEqual( [] );
      done();
    });
  });

  test('get tree path array', done => {
    of( data.TREE_A ).pipe(
      treePath( [ 1, 1, 0 ] )
    ).subscribe((path: Array<{ id: string }>) => {
      expect( path ).toEqual([
        { id: '0' },
        { id: '01' },
        { id: '011' },
        { id: '0110' }
      ]);
      done();
    })
  });

  test('get tree path array with custom children prop', done => {
    of( data.TREE_B ).pipe(
      treePath( [ 1 ], { childrenProperty: 'customChildrenProp' } )
    ).subscribe((path: Array<{ id: string }>) => {
      expect( path ).toEqual([
        { id: '0' },
        { id: '01' }
      ]);
      done();
    });
  });

  test('get truncated path if node doesn\'t exists', done => {
    of( data.TREE_A ).pipe(
      treePath( [ 0, 4 ] )
    ).subscribe((path: Array<{ id: string }>) => {
      expect( path ).toEqual([
        { id: '0' },
        { id: '00' }
      ]);
      done();
    });
  });

  test('get truncated path if max depth is reached', done => {
    of( data.TREE_A ).pipe(
      treePath( [ 0, 0, 0, 0, 0 ] )
    ).subscribe((path: Array<{ id: string }>) => {
      expect( path ).toEqual([
        { id: '0' },
        { id: '00' },
        { id: '000' }
      ]);
      done();
    });
  });

});
