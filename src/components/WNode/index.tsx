import {WNodeProps} from './type'
import WHandle from '../WHandle'
import { HandleType, Position } from "react-flow-renderer"

export default function WNode(props: WNodeProps) {
    return (
        <div className="w-node">
            <WHandle
                type='source'
                position={Position.Top}
            />
            <div className="text-center">
                click here to see Transform tools
            </div>
        </div>
    )
}