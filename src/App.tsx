import NodeElement from "./components/node/nodeElement";
import { Node, BST } from "./utils/tree";

const bst = new BST();
bst.insert(10)
bst.insert(5)
bst.insert(15)
bst.insert(3)
bst.insert(7)
bst.insert(13)
bst.insert(17)

console.log(bst)
function App() {
  return (
    <div className="App">
      {/* <NodeElement /> */}

    </div>
  );
}

export default App;
