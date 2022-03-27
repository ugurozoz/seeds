class Node {
    value: number;
    left: any;
    right: any;
    constructor(value:number) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  class BST {
    root:null | Node;
    

    constructor() {
      this.root = null;
    }
  
    insert(value:number) {
      const newNode = new Node(value);
      if (this.root === null) {
        this.root = newNode;
        return this;
      }
  
      let current = this.root;
      while (current) {
        if (value < current.value) {
          if (current.left === null) {
            current.left = newNode;
            return this;
          } else {
            current = current.left;
          }
        } else if (value > current.value) {
          if (current.right === null) {
            current.right = newNode;
            return this;
          } else {
            current = current.right;
          }
        } else {
          return this;
        }
      }
    }
  
    parent(value:number) {
      if (typeof value !== "number") return false;
      if(this.root === null) return false;
      let current = this.root;
      let parent = null;
      while (current.value !== value) {
        if (value < current.value) {
          parent = current;
          current = current.left;
        } else if (value > current.value) {
          parent = current;
          current = current.right;
        }
      }
      return parent;
    }
  
    search(value:number) {
      if (typeof value !== "number") return false;
      let current = this.root;
      while (current) {
        if (value < current.value) {
          current = current.left;
        } else if (value > current.value) {
          current = current.right;
        } else {
          //Found
          return current;
        }
      }
      return false;
    }
  
    successor(value:number) {
      let node = this.search(value);
      if (!node) return false;
      if (node.right) {
        if (node.right.left === null) return node.right;
        let successor = node.right.left;
        while (successor.left) {
          successor = successor.left;
        }
        return successor;
      } else {
        let current = node;
        let parent = this.parent(node.value);
        while (parent) {
          if (parent.left === current) {
            console.log(value, ">>", parent.value);
            return parent;
          } else {
            current = parent;
            parent = this.parent(parent.value);
          }
        }
        return false;
      }
    }
  
    remove(value:number) {
      const nodeToBeRemoved = this.search(value);
      if(!nodeToBeRemoved) return null;
      const parent = this.parent(value);
      if(!parent) return null;
      // LEFT NULL
      if(nodeToBeRemoved.left === null){
        if(parent === null){
          this.root = nodeToBeRemoved.right;
          return this;
        }
        if(parent.left === nodeToBeRemoved){
          parent.left = nodeToBeRemoved.right;
        }else{
          parent.right = nodeToBeRemoved.right;
        }            
      }else if(nodeToBeRemoved.right === null){// RIGHT NULL
        if(parent === null){
          this.root = nodeToBeRemoved.left;
          return this;
        }
        if(parent.left === nodeToBeRemoved){
          parent.left = nodeToBeRemoved.left;
        }else{
          parent.right = nodeToBeRemoved.left;
        }
      }else{// NODE HAS BOTH LEFT AND RIGHT CHILDREN
        if(nodeToBeRemoved.right.left === null){
          if(parent === null){
            if(this.root === null) return null;
            nodeToBeRemoved.right.left = this.root.left;
            this.root = nodeToBeRemoved.right;
          }else{
            if(parent.left === nodeToBeRemoved){
              nodeToBeRemoved.right.left = nodeToBeRemoved.left;
              parent.left = nodeToBeRemoved.right;
            }else{
              nodeToBeRemoved.right.left = nodeToBeRemoved.left;
              parent.right = nodeToBeRemoved.right;            
            }
          }
          return this;
        }else{
          //let successor = this.successor(nodeToBeRemoved.value);
          //console.log("SUCCESSOR", successor);
          //Don't do with successor (not efficient);        
          let LeftMostParent = nodeToBeRemoved.right;
          let nodeLeftMost = nodeToBeRemoved.right.left;
          
          while(nodeLeftMost.left !== null){
            LeftMostParent = nodeLeftMost;
            nodeLeftMost = nodeLeftMost.left;          
          }
  
          if(nodeLeftMost.right){
            LeftMostParent.left = nodeLeftMost.right
          }
          nodeLeftMost.left = nodeToBeRemoved.left;
          nodeLeftMost.right = nodeToBeRemoved.right;
  
          if(parent === null) {
            this.root = nodeLeftMost;
          }else{
            if(parent.left === nodeToBeRemoved){
              parent.left = nodeLeftMost;          
            }else{
              parent.right = nodeLeftMost;                         
            }
          }
          console.log("LeftMostParent>>",LeftMostParent,"nodeLeftMost",nodeLeftMost);
        }      
      }    
      return this;
    }
  
  
  
    traverseInOrder(){   
      const nodes:Array<number> = [];
      
      function traverse(node:Node | null,nodes:Array<number>){        
        if(node === null) return;
        traverse(node.left,nodes);
        nodes.push(node.value);
        traverse(node.right,nodes);      
      }
  
      traverse(this.root,nodes);    
      return nodes;  
    }
  
    traversePreOrder(){   
      const nodes:Array<number> = [];
      
      function traverse(node:Node | null,nodes:Array<number>){        
        if(node === null) return;
        nodes.push(node.value);
        traverse(node.left,nodes);      
        traverse(node.right,nodes);      
      }
  
      traverse(this.root,nodes);    
      return nodes;  
    }
  
    traversePostOrder(){   
      const nodes:Array<number> = [];
      
      function traverse(node:Node | null,nodes:Array<number>){        
        if(node === null) return;
        
        traverse(node.left,nodes);      
        traverse(node.right,nodes);
        nodes.push(node.value);
      }
  
      traverse(this.root,nodes);    
      return nodes;  
    }
  
  
    
  }


  export {Node,  BST}