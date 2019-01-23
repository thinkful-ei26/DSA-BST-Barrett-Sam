'use strict'; 

class BinarySearchTree {
  constructor(key=null, value=null, parent=null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    //if the tree is empty then this key being inserted is the root node of the tree
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }

    //If the tree already exist, then start at the root, 
    //and compare it to the key you want to insert
    // If the new key is less than the node's key 
    //then the new node needs to live in the left-hand branch.
    else if (key < this.key) {
      //if the existing node does not have any left child, 
      //meaning that if the `left` pointer is empty 
      //then we can just instantiate and insert the new node 
      //as the left child of that node, passing `this` as the parent.  
      if (this.left === null) {
          
        this.left = new BinarySearchTree(key, value, this);
      }
      //if the node has an existing left child, 
      //then we recursively call the `insert` method 
      //so the node is added further down the tree.
      else {
        this.left.insert(key, value);
      }
    }
    //Similarly, if the new key is greater than the node's key 
    //then you do the same thing, but on the right-hand side.
    else {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }
  find(key) {
    //if the item is found at the root then return that value
    if (this.key === key) {
      return this.value;
    }
    //if the item you are looking for is less than the root 
    //then follow the left child
    //if there is an existing left child, 
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    //if the item you are looking for is greater than the root 
    //then follow the right child
    //if there is an existing right child, 
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    //You have search the treen and the item is not in the tree
    else {
      throw new Error('Key Error');
    }
  }
  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      //If the node only has a left child, 
      //then you replace the node with its left child.  
      else if (this.left) {
        this._replaceWith(this.left);
      }
      //And similarly if the node only has a right child 
      //then you replace it with its right child.
      else if (this.right) {
        this._replaceWith(this.right);
      }
      //If the node has no children then
      //simply remove it and any references to it 
      //by calling "this._replaceWith(null)".
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }
  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      }
      else if (this === this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

}

// let maxCounter = 0;
// let counter = 1;
// function height(tree){
//   if (!tree.left && !tree.right) {
//     console.log('i made it to the base case', counter);
//     return maxCounter;
    
//   } if (tree.left){
//     counter++;
//     console.log('im left',counter);
//     height(tree.left);
//   } else if (counter > maxCounter) {
//     maxCounter = counter;
//     console.log('set the max counter to', maxCounter);
//     counter = 1;
//   }
//   if (tree.right) {
//     counter++;
//     console.log('im right',counter);
//     height(tree.right);
//   } else if (counter > maxCounter) {
//     maxCounter = counter;
//     console.log('set the max counter to', maxCounter);
//     counter = 1;
//   }
//   return maxCounter;

//}

// function height(tree){
//   let height = 0;
//   let left = 0;
//   let right = 0;


//   return height;
// }

function height(tree) {
  if (!tree) {
    return null;
  }
  console.log(tree);
  if (tree.left && tree.right) {
    let treeLeft = height(tree.left);
    let treeRight = height(tree.right);
    if (treeLeft >= treeRight) {
      return 1 + treeLeft;
    } else if (treeLeft < treeRight){
      return 1 + treeRight;
    }
  }
  if (tree.left){
    
    return 1 + height(tree.left);
  }
  if (tree.right){
    return 1 + height(tree.right);
  }
  return 1; 
}

function isBST(tree){
  if (!tree) {
    return null;
  }

  if (tree.left){
    console.log(tree.left.key);
    if(tree.left.key > tree.key){
      return false;
    }else{
      console.log('yeee haww');
      return isBST(tree.left);
    }
  }
  if (tree.right){
    if(tree.right.key < tree.key){
      return false;
    }else{
      console.log('wooo hooo');
      return isBST(tree.right);
    }
  }
  return true;
}
 
// function thirdLargest(tree) {
//   let maxTree = function(tree) {
//     if (!tree.right) {
//       return tree;
//     }
//     return maxTree(tree.right);
//   };
//   console.log(maxTree(tree));
//   if (maxTree.parent.left) {
//     return maxTree.parent.left;
//   } 
//   return maxTree.parent.parent;
// }

function thirdLargest(tree) {
  let maxTree;
  let third;
  if (!tree.right) {
    maxTree = tree;
    // console.log('>>',maxTree);
    if (maxTree.parent.left) {
      third = maxTree.parent.left;
    } 
    third = maxTree.parent.parent;
    // return maxTree;
  } else if (tree.right) {
    
    return thirdLargest(tree.right);
  }
  
  // console.log(third.key);
  //   return maxTree;
  return third.key;
}

function tL(tree){
  const treeArr = [];
  if (tree.left && tree.right) {
    let treeLeft = tL(tree.left);
    let treeRight = tL(tree.right);
    if (treeLeft >= treeRight) {
      treeArr.push(tree.left.key);
      return treeLeft;
    } else if (treeLeft < treeRight){
      treeArr.push(tree.right.key);
      return treeRight;
    }
  }
  if (tree.left){
    treeArr.push(tree.left.key);
    return  tL(tree.left);
  }
  if (tree.right){
    treeArr.push(tree.right.key);
    return  tL(tree.right);
  }
//   console.log(treeArr);
  return treeArr; 
    
}

function main(){

  const BST = new BinarySearchTree();
  BST.insert(3);
  BST.insert(1);
  BST.insert(4);
  BST.insert(6);
  BST.insert(9);
  BST.insert(2);
  BST.insert(5);
  BST.insert(10);
  BST.insert(11);
  BST.insert(13);
  BST.insert(12);
  BST.insert(14);
  // console.log(BST);
  //   console.log('>>',height(BST));
  //   console.log(maxCounter);
  //   height(BST);
  // console.log(isBST(BST));
  //   console.log('>>',BST._findMin());
  //   console.log(thirdLargest(BST));
  console.log(thirdLargest(BST));
  tL(BST);
}
main();
// console.log(main());

// module.exports = { BinarySearchTree }