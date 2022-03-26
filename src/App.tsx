import { useEffect } from 'react';
import { useCallback, useMemo, useState } from 'react';
import ReactFlow, {
    Node,
    useNodesState
} from 'react-flow-renderer';
import WNode from 'src/components/WNode';
  
export default function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const nodeTypes = useMemo(() => ({ resizable: WNode }), []);
  
    useEffect(() => {
        const onChange = (id: string, value: any) => {
            // find the node with <id> and save value
            setNodes((nds) =>
                nds.map((node) => (
                    node.id !== id ? node : {...node, ...value}
                )
            ))
        };
        setNodes([
            { id: '1', data: { label: 'click here to see Transform tools', onChange: onChange }, type: 'resizable', position: { x: 5, y: 5 }},
        ])
    }, []);
    
    return (
        <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            nodeTypes={nodeTypes}
        />
    )
}