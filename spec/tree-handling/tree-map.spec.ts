import { of } from 'rxjs';
import { treeMap } from '../../src/tree-handling/tree-map';
import { Tree } from '../../src/types';

// Test Data
import {
  EMPTY_TREE, NULL_TREE, projectFunction, SINGLETON_TREE, TREE_A, TREE_C
} from './test-data';


describe('[ treeMap ]', () => {

  test('error if null tree', done => {
    of( NULL_TREE ).pipe(
      treeMap( projectFunction )
    ).subscribe({
      next: () => fail(),
      complete: () => fail(),
      error: () => done()
    });
  });

  test('handle empty tree', done => {
    of( EMPTY_TREE ).pipe(
      treeMap( projectFunction )
    ).subscribe((mappedTree: Tree<any>) => {
      expect( mappedTree ).toEqual({ name: '', children: [] });
      done();
    });
  });

  test('handle singleton tree', done => {
    of( SINGLETON_TREE ).pipe(
      treeMap( projectFunction )
    ).subscribe((mappedTree: Tree<any>) => {
      expect( mappedTree ).toEqual({ name: 'N0', children: [] });
      done();
    });
  });

  test('simple use case', done => {
    of( TREE_A ).pipe(
      treeMap( projectFunction )
    ).subscribe((mappedTree: Tree<any>) => {
      expect( mappedTree ).toEqual(
        { name: 'N0', children: [
          { name: 'N1', children: [] },
          { name: 'N2', children: [
            { name: 'N3', children: [] }
          ] }
        ] }
      );
      done();
    });
  });

  test('custom children prop', done => {
    of( TREE_C ).pipe(
      treeMap( projectFunction, 'customChildrenProp' )
    ).subscribe((mappedTree: Tree<any>) => {
      expect( mappedTree ).toEqual(
        { name: 'N0', customChildrenProp: [
          { name: 'N1', customChildrenProp: [] }
        ] }
      );
      done();
    });
  });

});
