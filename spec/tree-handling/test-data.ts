import { of } from 'rxjs';


export const mapFn = (node: { id: string }) => of({
  name: node.id ? 'N'+node.id : ''
});

export const findFn = (node: { id: string }) => node.id === '01' || node.id === '0120';



/**
 * Setup and Teardown functions.
 */

export function initData(): any {
  return {
    TREE_NULL: null,
    TREE_EMPTY: {},
    TREE_SINGLETON: { id: '0' },
    TREE_A: {
      id: '0',
      children: [
        {
          id: '00',
          children: [
            { id: '000' },
            { id: '001', children: [] }
          ]
        },
        {
          id: '01',
          children: [
            { id: '010' },
            {
              id: '011',
              children: [
                { id: '0110' },
                { id: '0111' }
              ]
            },
            {
              id: '012',
              children: [
                { id: '0120', children: [] }
              ]
            }
          ]
        },
        { id: '02' }
      ]
    },
    TREE_B: {
      id: '0',
      customChildrenProp: [
        { id: '00' },
        { id: '01', customChildrenProp: [] }
      ]
    }
  };
}

export function resetData(): any {
  return {};
}
