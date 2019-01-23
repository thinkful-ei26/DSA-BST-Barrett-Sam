'use strict';

function height(tree) {
  if (!tree.left && !tree.right) {
    return 1;     
  }
  if (tree.left && tree.right) {
    
    if (height(tree.left) > height(tree.right))
      return 1 + height(tree.left);
  } else if (height(tree.left) < height(tree.right)){
    return 1 + height(tree.right);
  }

  if (tree.left){
    return 1 + height(tree.left);
  }
  if (tree.right){
    return 1 + height(tree.right);
  }

}

