import {WNodeProps} from './type'
import { Handle, HandleType, Position } from "react-flow-renderer"

export default function WNode(props: WNodeProps) {
    return (
        <div className="w-node">
            <Handle
                type='source'
                position={Position.Top}
            />
            <div className="text-center">
                click here to see Transform tools
            </div>
        </div>
    )
}