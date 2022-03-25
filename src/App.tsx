import { useCallback, useMemo, useState } from 'react';
import ReactFlow, {
    applyNodeChanges,
    Node,
    NodeChange,
} from 'react-flow-renderer';
import WNode from 'src/components/WNode';
  
const initialNodes: Node[] = [
    { id: '1', data: { label: 'Node 1' }, position: { x: 5, y: 5 }, type: 'resizable' },
];
  
export default function App() {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const nodeTypes = useMemo(() => ({ resizable: WNode }), []);
  
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    
  
    return (
        <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            nodeTypes={nodeTypes}
        />
    )
}