import { of } from "rxjs";
import { Tree } from "../../src/types";


export const NULL_TREE: Tree<{ id: number }> = null;

export const EMPTY_TREE: Tree<{ id: number }> = {};

export const SINGLETON_TREE: Tree<{ id: number }> = {
  id: 0
};

export const TREE_A: Tree<{ id: number }> = {
  id: 0,
  children: [
    {
      id: 1
    },
    {
      id: 2,
      children: [
        {
          id: 3
        }
      ]
    }
  ]
};

export const TREE_B: Tree<{ id: number }> = {
  id: 0,
  children: [
    {
      id: 1,
      children: [
        {
          id: 4,
          children: [
            {
              id: 7,
              children: []
            },
            {
              id: 8,
              children: []
            }
          ]
        },
        {
          id: 5,
          children: []
        }
      ]
    },
    {
      id: 2,
      children: [
        {
          id: 6,
          children: [
            {
              id: 9,
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 3,
      children: []
    }
  ]
};

export const TREE_C: Tree<{ id: number }> = {
  id: 0,
  customChildrenProp: [
    {
      id: 1,
      customChildrenProp: []
    }
  ]
};

export const projectFunction = (node: { id: number }) => of({
  name: node.id || node.id === 0 ? 'N'+node.id : ''
});
